import numpy as np
import tensorflow as tf
import pandas as pd


def loadRealStates():
    states = pd.read_csv('realStates.csv', sep = ',', header = None)
    states = states.values

    formattedStates = []

    for ele in range(len(states) - 1):
        formattedStates.append(states[ele].reshape(18,18,1))

    return formattedStates


sess = tf.Session()


states = loadRealStates()

saver = tf.train.import_meta_graph('ganModel-50.cptk.meta')
saver.restore(sess,tf.train.latest_checkpoint('./'))

#newZ = sess.run(Dreal,feed_dict={state: states})


