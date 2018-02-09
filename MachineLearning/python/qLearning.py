import tensorflow as tf
import numpy as np

'''
The network for Q Learning
'''
class Network:
    '''
    Define the Neural Network
    '''
    def __init__(self, numberOfWords):
        init = tf.truncated_normal_initialzer(mean=0.0,stdev=2e-2)

        #Convulation Layers
        input = self.x

        network = tf.layers.conv2d(inputs=input,name='hidden_layer1',filters=16,
                                    kernel_size=3,strides=2,
                                    padding='SAME',kernel_initializer=init,activation=tf.nn.relu)

        network = tf.layers.conv2d(inputs=network,name='hidden_layer2',filters=32,
                                    kernel_size=3,strides=2,
                                    padding='SAME',kernel_initializer=init,activation=tf.nn.relu)

        network = tf.layers.conv2d(inputs=network,name='hidden_layer3',filters=64,
                                    kernel_size=3,strides=1,
                                    padding='SAME',kernel_initializer=init,activation=tf.nn.relu)

        #Flatten
        network = tf.contrib.layers.flatten(network)

        #Fully Connected Layer

        '''
        MAYBE Add More Layers
        '''
        network = tf.layers.dense(inputs=network, name='fullyConnected', units=256,
                                    kernel_initializer=init, activation=tf.nn.relu)

        #Output Layer
        network = tf.layers.dense(inputs=network, name='actions',units=numberOfWords,
                                    kernel_initializer=init, activation=tf.nn.relu)

        #Save the network
        self.qValues = network

        #Loss Function from the paper
        errorSquared = tf.square(self.qValues - self.qValuesNew)
        sumErrorSquared = tf.reduce_sum(errorSquared,axis=1)
        self.loss = tf.reduce_mean(sumErrorSquared)

        self.optimizer = tf.train.RMSPropOptimizer(learning_rate=0.97).minimize(self.loss)


    '''
    For the states given, calculate the Q-Values
    '''
    def calculateQValues(self,states):
        #Create a feed dictionary
        #Run session with qValues Network, and the feed dictionary, and return it
        return;

class Agent:
    '''
    From the DeepMindPaper:
        for episode = 1 do:
            Initialise sequence s1 = {x1} and preprocessed sequence O1 = O(S1)
            for t = 1 do:
                with prob. E - select a random action at
                Otherwise select at = maxQ*(O(st),a;theta)

                Execute action at in emulator and observe eward rt and image xt+1

                Set st+1 = St,at,xt+1, and preprocess Ot+1 = O(st+1)

                Store Transition in ReplayMemory

                Sample random Minibatch of transitions from ReplayMemory

                set yi = rj
                         rj + gamma maxQ(Oj+1,a';O)

                Perform a gradient desent on (y1 = Q(OJ, aJ, O))^2 according to formula
    '''

    def training():
        #Initialise ReplayMemory D to capacity N
        d = ReplayMemory(capacity=100000,stateShape=)
        #Initialise action-value function Q with random Weights
        functionQ = Network(numberOfWords=400)
        #Initial State
        state = np.zeros(shape=stateShape, dtype = np.int8)

        for i in range(episodes):
            #Check Current State is not Terminal, and if it is, reset state to nothing

            #Get State
            #Calculate QValues for the states
            #Determine the action
            #Take a Step
            #Add Reward to episode reward
            #Increase counter for number of states processed

            #Add to Replay Memory

            #If Replay memory is getting full, update Q-Values in replay-Memory through a backwards-sweep

                #Optimise
                #Take a random batch from the replay memory, and optimise
                #Save Network
                #Clear ReplayMemory



'''
    Replace Memory

    [State] - n x n shape
    [qvalueOld] - float
    [qValue] - float`
    [action] - int
    [reward] - int
    [terminal] - bool
    [estimate] - float - estimate of Q value
'''
class ReplayMemory:

    def __init__(self,capacity,stateShape):
        self.index = 0
        self.capacity = capacity
        self.states = np.zeros(shape = [capacity] + stateShape, dtype = np.int8)
        self.qValuesOld = np.zeros(shape = capacity, dtype = np.float)
        self.qValues = np.zeros(shape = capacity, dtype = np.float)
        self.actions = np.zeros(shape = capacity, dtype = np.int8)
        self.rewards = np.zeros(shape = capacity, dtype = np.int8)
        self.terminals = np.zeros(shape = capacity, dtype = np.bool)
        self.estimates = np.zeros(shape = capacity, dtype = np.float)

    #Clear the Memory
    def clear(self):
        self.index = 0;

    #Add a value into memory
    def add(self,state,qValueOld,qValue,action,reward,terminal):
        #Input into Memory
        self.states[self.index] = state
        self.qValuesOld[self.index] = qValueOld
        self.qValues[self.index] = qValue
        self.actions[self.index] = action
        self.rewards[self.index] = reward
        self.terminals[self.index] = terminal
        #IncreaseIndex
        self.index = self.index + 1


'''
Responsible for handling the effects of the given actions and state
'''
class Gym:

    def __init__(self):
        #Load the Discriminator

    def calculateRewardOfState(self,state):
        sumOfState = 0:
        #We have the 2 shapes, the State, and the Reward for each word
        #State value * reward, sum all


    def createNewStates(self,word,previousState):
        wordCorrectState = previousState[:]
        wordFailedState = previousState[:]
        #Get the Word ID
        wordId = wordToID(word=word)

        wordCorrectState[wordId] = 1;
        wordFailedState[wordId] = 0;

        return wordCorrectState, wordFailedState


    def wordToID(self,word):
        #Script From Python Script
