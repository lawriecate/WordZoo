'''
Robert Sadler:
www.robertsadler.co.uk

wordZoo:
www.wordZoo.co.uk
'''
#Imports
import numpy as np
import tensorflow as tf
import tensorflow.contrib.slim as slim
import time

#Leaky Relu - Needed for Discriminator network
def lrelu(x, leak=0.2, name="lrelu"):
    with tf.variable_scope(name):
        f1 = 0.5 * (1 + leak)
        f2 = 0.5 * (1 - leak)
        return (f1 * x) + (f2 * abs(x))

#Creation of States and state formatting



#Discriminator
'''
Takes in a State - Either from the GAN or a Real State
Reverse of the generator, produces a single value of prob.
'''
def discriminator(state, reuse):
    #Layer 1
    dis = slim.convolution2d(state,16,[4,4],stride=[2,2],padding="SAME",biases_initializer=None,activation_fun=lrelu,reuse=reuse,scope='d_conv1',weights_intializer=initialiser)
    #Layer 2
    dis = slim.convolution2d(dis,16,[4,4],stride=[2,2],padding="SAME",biases_initializer=None,activation_fun=lrelu,reuse=reuse,scope='d_conv2',weights_intializer=initialiser)
    #Layer 3
    dis = slim.convolution2d(dis,16,[4,4],stride=[2,2],padding="SAME",biases_initializer=None,activation_fun=lrelu,reuse=reuse,scope='d_conv3',weights_intializer=initialiser)
    #d_out - Output the prob. value
    dis = slim.fully_connected(slim.flatten(dis),1,activation_fn=tf.nn.sigmoid,reuse=reuse,scope='d_output',weights_intializer=initialiser)
    #return
    return dis

#Generator
'''
Takes in a random Vector of noise, and returns the X by Z Size repesentation
of a state

MAY NEED TO LOOK AT KERNEL SIZES AND STRIDES
'''
def generator(noise):
    #Initial Input - takes the input noise of a fixed size
    gen = slim.fully_connected(noise,**SIZE**,normalizer_fn = slim.batch_norm,activation_fn=tf.nn.relu,scope='**COMEBACKTO**', weights_intializer = initialiser)
    #Level 1 - Convolutional layer
    gen = slim.convolution2d_transpose(gen,num_outputs=64,kernel_size=[5,5],stride=[2,2],padding="SAME",normalizer_fun=slim.batch_norm,activation_fn=tf.nn.relu,scope='g_layer1',weights_intializer = initialiser)
    #Level 2 - Convoultional Layer
    gen = slim.convolution2d_transpose(gen,num_outputs=64,kernel_size=[5,5],stride=[2,2],padding="SAME",normalizer_fun=slim.batch_norm,activation_fn=tf.nn.relu,scope='g_layer2',weights_intializer = initialiser)
    #Level 3 - Convolutional Layer
    gen = slim.convolution2d_transpose(gen,num_outputs=64,kernel_size=[5,5],stride=[2,2],padding="SAME",normalizer_fun=slim.batch_norm,activation_fn=tf.nn.relu,scope='g_layer3',weights_intializer = initialiser)
    #Output Layer
    #Kernel size is the same as the output shape
    gen = slim.convolution2d_transpose(gen,num_outputs=1,kernel_size[X,X],padding="SAME",biases_initializer=None,activation_fn=tf.nn.tanh,scope='g_output',weights_intializer=initialiser)
    #Return the model
    return gen


#Define GAN model
tf.reset_default_graph()
#Initialise the weights for both models
initialiser = tf.truncated_normal_initializer(stddev=0.02)

#Place Holders
'''
Maybe change dtypes to ints
'''
z = tf.placeholder(shape=[None,100],dtype=tf.float32)
real = tf.placeholder(shape=[None,X,X,1],dtype=tf.float32)

#Define the Networks
gen = generator(z)
xi = discriminator(real,False)
zi = discriminator(gen,True)

#Loss Functions - From the Paper
disLoss = -tf.reduce_mean(tf.log(xi) + tf.log(1.0 - zi))
genLoss = tf.reduce_mean(tf.log(1 - zi))
#genLoss = -tf.reduce_mean(tf.log(zi))

#Training variables
tvars = tf.trainable_variables()

#Apply the gradient descent to update the models
trainerD = tf.train.AdamOptimizer(learning_rate=0.0002,beta1=0.5)
trainerG = tf.train.AdamOptimizer(learning_rate=0.0002,beta1=0.5)

d_grads = trainerD.compute_gradients(disLoss,tvars[9:])
g_grads = trainerG.compute_gradients(genLoss,tvars[0:9])

updateDis = trainerD.apply_gradients(d_grads)
updateGen = trainerG.apply_gradients(g_grads)


'''
Training:
for numberOfIts:
    for:k Steps
        Sample Minibatch m noise samples
        Sample minibath of m examples
        Update discriminator by ascending its stochastic gradient
    end
    sample minibatch of m noise samples
    Update Generator by descending it's sochastic gradient
end
'''
trainingIterations = 500000
kSteps = 10
batchSize = 50

#Tensorflow Variables
init = tf.initialize_all_variables()
saver = tf.train.Saver()
with tf.Session as sess:
    sess.run(init)
    for i in range(trainingIterations):
        #Generate Random noise
        zs = np.random.uniform(-1.0,1.0,size=[batchSize,100]).astype(np.float32)
        #Random Batch of real values
        xs = '''Function'''

        #Update the discriminator
        _,dLoss = sess.run([updateDis,disLoss],feed_dict={z:zs,real:xs})
        #Update the Generator
        _,gLoss = sess.run([updateGen,genLoss],feed_dict={z:zs})
        _,gLoss = sess.run([updateGen,genLoss],feed_dict={z:zs})

        if i % kSteps == 0:
            print("Discriminator Loss" + str(dLoss) + " Generator Loss:" + str(gLoss)))
            zs2 =  np.random.uniform(-1.0,1.0,size=[batchSize,100]).astype(np.float32)
            newZ = sess.run(gen,feed_dict={z:zs2})

        #Save the Results
        if i % 1000 == 0 and i != 0:
            #Save the Model
            saver.save(sess,model_directory)
