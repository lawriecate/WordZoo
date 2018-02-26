import numpy as np
import tensorflow as tf

'''
Generates an 18x18 state from noise vector
'''
def generator(noise , reuse = False):
    
    return net
'''
Conv -> Conv -> Fully Connected -> Soft Max -> Single Value out

'''
def discriminator(state, reuse = False):

    return net;

#Build GAN Network
initialiser = tf.truncated_normal_initializer(stddev=0.02)
noiseLength = 100
learningRate = 0.0002
beta1 = 0.5
tvars = tf.trainable_variables()
#Place holder inputs
noise = tf.placeholder(shape = [None, noiseLength], dtype = tf.float32)
state = tf.placeholder(shape = [None,18,18,1], dtype = tf.float32)
#Define the sub Networks
G = generator(noise)
Dreal = discriminator(state, reuse = False)
Dfake = discriminator(G,reuse = True)

Dtrainer = tf.train.AdamOptimizer(learning_rate = learningRate, beta1 = beta1)
Gtrainer = tf.train.AdamOptimizer(learning_rate = learningRate, beta1 = beta1)
#Loss functions from the paper
dLoss = -tf.reduce_mean(tf.log(Dreal) + tf.log(1-Dfake))
gLoss = -tf.reduce_mean(tf.log(Dfake))
#Gradient descent calulcators
GgradientDescent = Dtrainer.compute_gradients(dLoss, tvars[0:9])
DgradientDescent = Gtrainer.compute_gradients(gLoss, tvars[9:])
'''USE THIS IN THE LOOP'''
updateD = Dtrainer.apply_gradients(DgradientDescent)
updateG = Gtrainer.apply_gradients(GgradientDescent)
