import numpy as np
import tensorflow as tf

def loadRealStates():
    return None

def sampleRealStates():
    return None

'''
Leaky relu function for the discriminator
'''
def lrelu(x, leak = 0.2):
    return tf.maximum(leak * x, x)

'''
Generates an 18x18 state from noise vector
'''
def generator(noise , reuse = False):
    with tf.variable_scope('Generator', reuse=reuse):
        #Layer1
        net = tf.layers.conv2d_transpose(noise, 1024, [4,4], strides = (1,1), padding = 'SAME')
        #Layer 2
        net = tf.layers.conv2d_transpose(net, 512, [4,4], strides = (1,1), padding = 'SAME')
        #Layer 3
        net = tf.layers.conv2d_transpose(net, 256, [4,4], strides = (1,1), padding = 'SAME')
        #Output Layer
        net = tf.layers.conv2d_transpose(net, 128, [4,4], strides = (1,1), padding = 'SAME')
        #Normalise so the values are between 0 and 1
        net = tf.layers.conv2d_transpose(net, 1, [4,4], strides = (18,18), padding = 'SAME')
        #Normalsie the values between 0 and 1
        net = tf.nn.tanh(net)
        return net

'''
Takes in an 18x18 state, and returns a single value for the prob. that it is real
'''
def discriminator(state, reuse = False, training = True):
    with tf.variable_scope('Discriminator', reuse=reuse):
        #Layer 1
        net = tf.layers.conv2d(state, 128, [4,4], strides = (2,2), padding = 'SAME')
        net = lrelu(tf.layers.batch_normalization(net, training = training))
        #Layer 2
        net = tf.layers.conv2d(state, 256, [4,4], strides = (2,2), padding = 'SAME')
        net = lrelu(tf.layers.batch_normalization(net, training = training))
        #Layer 3
        net = tf.layers.conv2d(state, 512, [4,4], strides = (2,2), padding = 'SAME')
        net = lrelu(tf.layers.batch_normalization(net, training = training))
        #Layer 4
        net = tf.layers.conv2d(state, 1024, [4,4], strides = (2,2), padding = 'SAME')
        net = lrelu(tf.layers.batch_normalization(net, training = training))
        #Output Layer
        #net = tf.layers.conv2d(net, 1, [4,4], strides = (1,1), padding = 'VALID')
        net = tf.layers.dense(net, 1, activation = tf.nn.sigmoid)
        #Normalise output between 0 and 1
        net = tf.nn.sigmoid(net)
        return net;

'''This is just something that will need to be added to the main model'''
def loadAndRunSimulator():
    model = '/gan.py'
    saver = tf.train.Saver()
    with tf.Session() as sess:
        print("GAN loaded")
        modelPath = tf.train.get_checkpoint_state(model)
        saver.restore(sess, modelPath.model_checkpoint_path)

        #With some state
        output = sess.run(Dfake, feed_dict{state: queryState})

        return output

'''
This loads the realStates we gathered from testing. Loads the CSV and saves the dataframe globally
'''
def loadRealStates():

'''
Randomly samples the loaded states and returns batchSize number of states for the GAN to train on
'''
def sampleRealStates(batchSize):


##################################################
# BUILD THE GAN MODEL
##################################################
noiseLength = 100
learningRate = 0.0002
beta1 = 0.5
#Place holder inputs
noise = tf.placeholder(shape = [None,1, 1, noiseLength], dtype = tf.float32)
state = tf.placeholder(shape = [None,18,18,1], dtype = tf.float32)
#Define the sub Networks
G = generator(noise)
Dreal = discriminator(state, reuse = False)
Dfake = discriminator(G,reuse = True)
#Optimizers
Dtrainer = tf.train.AdamOptimizer(learning_rate = learningRate, beta1 = beta1)
Gtrainer = tf.train.AdamOptimizer(learning_rate = learningRate, beta1 = beta1)
#Loss functions from the paper
# Note, In order to minimize, we maximise the negative value, hence the minus in front of the functions
dLoss = -tf.reduce_mean(tf.log(Dreal) + tf.log(1-Dfake))
gLoss = -tf.reduce_mean(tf.log(Dfake))
#Variables of the Graph
tvars = tf.trainable_variables()
dVars = [var for var in tvars if var.name.startswith('Discriminator')]
gVars = [var for var in tvars if var.name.startswith('Generator')]
#Optimizers - Uses the loss functions and applies them to the graph
Dgrads = Dtrainer.compute_gradients(dLoss, var_list = dVars)
Ggrads= Gtrainer.compute_gradients(dLoss, var_list = gVars)
#Gradient applys
'''Maybe add this into the loop'''
#updateDisc = Dtrainer.apply_gradients(Dgrads)
#updateGen = Gtrainer.apply_gradients(Ggrads)
##################################################
# TRAINING
##################################################
batchSize = 1000
itterations = 50000
initialiser = tf.global_variables_initializer()
saver = tf.train.Saver()
modelPath = '../models'
#Load the real states
loadRealStates()

#Main training loop
with tf.Session() as sess:
    sess.run(initialiser)
    for k in range(itterations):
        #Random sample of noise
        zs = np.random.uniform(-1.0,1.0, size = [batchSize,noiseLength]).astype(np.float32)
        #Random batch of real states
        xs = sampleRealStates(batchSize)
        #Update Discriminator
        _, discLoss = sess.run([Dtrainer.apply_gradients(Dgrads)], feed_dict = {noise: zs, state: xs})
        #Update Generator
        _, genLoss = sess.run([Gtrainer.apply_gradients(Ggrads)], feed_dict = {noise: zs})
        if (i % 20) == 0:
            print ("Disc: " + str(discLoss) + " Gen: " + str(genLoss))

            #Run Sample Test on the Discriminator
            print("Running Quality Test")
            '''
            This will be my own test.
            Give it a bunch of Real states, and make sure they come back with a true accuracy.
            Run some obviously fake, and make sure they are super lower.
            '''

            #Save Model
            print("Saving Model " + str(i))
            saver.save(sess, modelPath + "ganModel-" + str(i) + ".cptk")
