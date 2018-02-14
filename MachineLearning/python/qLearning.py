import tensorflow as tf
import numpy as np
import random

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
        self.input = tf.placeholder(tf.float32,shape=(18,18))

        network = tf.layers.conv2d(inputs=self.input,name='hidden_layer1',filters=16,
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
        self.network = network

        #For Running
        self.session = tf.Session()

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
        feedDict = {self.x: states}
        #Run session with qValues Network, and the feed dictionary, and return it
        qValues = self.session.run(self.network,feed_dict = feedDict)
        return qValues;

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

    def training(self,episodes,timeSteps,stateShape, userTypes):
        #Initialise ReplayMemory D to capacity N
        d = ReplayMemory(capacity=100000,stateShape = (18,18))
        #Initialise action-value function Q with random Weights
        functionQ = Network(numberOfWords=323)
        '''ADD ARGUEMENTS'''
        #The "Gym" - Where we create states, and query what effect certain actions will have
        gym = Gym();

        #Main training loop
        for i in range(episodes):
            #Initial State
            state = gym.createEmptyState()
            #Time step into the future
            for t in range (timeSteps):
                #Calculate Q values for the State
                qValues = functionQ.calculateQValues(states=[state])[0]
                epsilon = generateEpisolonValue(iteration=i)
                #With prob epislon
                if (np.random.random() < epsilon):
                    #Random Action
                    action = np.random.randint(low=0, high=323)
                else:
                    #highest Value
                    action = np.argmax(qValues)

                #Execute Action in Gym and observe reward
                    #Create 2 new states, run both by the Discriminator
                    #Which ever has the higher prob. is the more "real"
                    #From this, calculate the netchange - i.e. - the reward

                    #Set this new State as our current state

                    #Store transition in M


                    #Select minibatch of transitions from D
                    #Perform gradient desent step on the network

    def generateEpisolonValue(self):
        self.epsilon = LinearControlSignal(num_itterations=, start_value=1, end_value=0.01, repeat=)

    def epslionValue(self,iteration):
        return self.epsilon.get_value(iteration=iteration)
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
        self.estimates = np.zeros(shape = capacity, dtype = np.float)

    #Clear the Memory
    def clear(self):
        self.index = 0;

    #Add a value into memory
    def add(self,state,qValueOld,qValue,action,reward):
        #Input into Memory
        self.states[self.index] = state
        self.qValuesOld[self.index] = qValueOld
        self.qValues[self.index] = qValue
        self.actions[self.index] = action
        self.rewards[self.index] = reward
        #IncreaseIndex
        self.index = self.index + 1


'''
Responsible for handling the effects of the given actions and state
'''
class Gym:

    def __init__(self,stateShape,userTypes):
        #Load the Discriminator
        self.discriminator = tf.loadmodel.....
        self.stateShape = stateShape
        self.userTypes = userTypes

        #Load Values
        self.values = 0

        #Centre Point of the Array - where the userType is stored
        self.centrePoint = np.floor(self.stateShape[0]/2)
        #Create the decay array
        self.decay = np.full(self.stateShape,0.96)
        self.decay[self.centrePoint][self.centrePoint] = 1


    def calculateRewardOfAction(self,previousState,action):
        #The original State
        sumOfOriginalState = valueOfState(state=previousState)
        #Query The GAN, with the chance they get this chosen word 100% correct or 0%
        #Whichever is more likely, is our result of this action
        correct, failed = createNewStates(action=action,previousState=previousState)
        outcome = queryState(correctState = correct, failedState = failed)
        sumOfNewState = valueOfState(state=outcome)
        #The Reward is the net difference between the previous state and the predicted new state
        '''
        Possibly a thing here about the difference between the two values -> Close together, more likely to be 50/50
        Far Apart, very confident with the value

        Perhaps just go with the prob. it's real of the one that's more likely?
        I.e. - if it's 90 percent certain with correct, then it should be 0.9

        Would rely on seeing the results of the GAN
        '''
        return (sumOfNewState - sumOfOriginalState)


    def queryState(self,correctState,failedState):
        #Which ever is larger (prob. of real), return that state
        if(gan.XXXX > gan.YYYY):
            return correctState
        else:
            return failedState

    def valueOfState(self,state):
        #The Confidence values multiplied by the reward for each word
        #Remember to not include the central value :) , 144
        return np.sum(np.multiply(state,self.values))

    def createEmptyState(self):
        #Create a State of All 0.5's
        state = np.full(self.stateShape,0.5)
        #Random number between the number of types of users we have
        userType = random.randrange(0,self.userTypes)
        state[self.centrePoint][self.centrePoint] = userType
        #return the state
        return state

    def createNewStates(self,action,previousState):
        wordCorrectState = previousState[:]
        wordFailedState = previousState[:]
        #Get the Word ID
        wordId = wordToID(word=action)

        wordCorrectState[wordId] = 1;
        wordFailedState[wordId] = 0;

        return wordCorrectState, wordFailedState

    def decayState(self,state):
        return np.multiply(state,self.decay)

    def wordToID(self,word):
        #Script From Python Script
