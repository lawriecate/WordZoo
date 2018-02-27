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

        #Input for new q values
        self.newQValues = tf.placeholder(tf.float32, shape = [None, numberOfWords], name='newQValues')

        #For Running
        self.session = tf.Session()

        #For Saving the Model
        self.saver = tf.train.Saver()

        #Loss Function from the paper
        errorSquared = tf.square(self.qValues - self.qValuesNew)
        sumErrorSquared = tf.reduce_sum(errorSquared,axis=1)
        self.loss = tf.reduce_mean(sumErrorSquared)

        self.optimizer = tf.train.RMSPropOptimizer(learning_rate=self.learningRate).minimize(self.loss)


    '''
    For the states given, calculate the Q-Values
    '''
    def calculateQValues(self,states):
        #Create a feed dictionary
        feedDict = {self.input: states}
        #Run session with qValues Network, and the feed dictionary, and return it
        qValues = self.session.run(self.network,feed_dict = feedDict)
        return qValues;

    def optimise(self,learningRate,replayMemory):
        #Gonna assume a sample of 100
        stateBatch, qValueBatch = replayMemory.randomBatch()
        feed_dict = {self.input: stateBatch, self.newQValues: qValueBatch, self.learningRate: learningRate}
        #Run the optimisation
        lossValue, _ = self.session.run([self.loss,self.optimizer],feed_dict=feed_dict)


    def saveModel(self, statesProcessed):
        self.saver.save(save_path = '/', global_step = statesProcessed)

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

        generateEpisolonValue(episodes = episodes)
        #Number of States looked at
        counter = 0

        '''
        Training Variables
        '''
        self.learning_rate_control = LinearControlSignal(start_value=1e-3, end_value=1e-5, num_iterations=5e6)
        self.loss_limit_control = LinearControlSignal(start_value=0.1,end_value=0.015,num_iterations=5e6)
        self.max_epochs_control = LinearControlSignal(start_value=5.0,end_value=10.0, num_iterations=5e6)

        #Main training loop
        for i in range(episodes):
            #Clear the replay Memory
            d.clear()
            #Initial State
            state = gym.createEmptyState()
            #Time step into the future
            for t in range (timeSteps):
                #Calculate Q values for the State
                qValues = functionQ.calculateQValues(states=[state])[0]
                epsilon = epslionValue(iteration=i)
                #With prob epislon
                if (np.random.random() < epsilon):
                    #Random Action
                    action = np.random.randint(low=0, high=323)
                else:
                    #highest Value
                    action = np.argmax(qValues)

                #Execute Action in Gym and observe reward
                newState = gym.executeAction(previousState = state, action = action)
                reward = gym.calculateReward(oldState = state, newState = newState)
                #Store transition in d
                d.add(state = state , qValue = qValues, action = action, reward = reward)
                #Set this new State as our current state
                state = newState

                #Increase State Counter
                counter = counter + 1

                #Every X TimeSteps, update replay Memory Q Values
                if(t % 100 == 0):
                    d.updateQValues()
                    #Select minibatch of transitions from D
                    #Perform gradient desent step on the network
                    # These are changed linearly depending on the state-counter.
                    learning_rate = self.learning_rate_control.get_value(iteration=counter)
                    loss_limit = self.loss_limit_control.get_value(iteration=counter)
                    max_epochs = self.max_epochs_control.get_value(iteration=counter)
                    functionQ.optimise(learningRate = learning_rate, replayMemory = d)

                    #Save the model
                    functionQ.saveModel(statesProcessed = counter)

    def generateEpisolonValue(self,episodes):
        self.epsilon = LinearControlSignal(num_itterations=episodes, start_value=1, end_value=0.01)

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

    def __init__(self,capacity,stateShape, discountFactor):
        self.index = 0
        self.capacity = capacity
        self.states = np.zeros(shape = [capacity] + stateShape, dtype = np.float)
        self.qValues = np.zeros(shape = capacity, dtype = np.float)
        self.actions = np.zeros(shape = capacity, dtype = np.int8)
        self.rewards = np.zeros(shape = capacity, dtype = np.int8)
        self.estimateError = np.zeros(shape = capacity, dtype = np.float)
        self.discountFactor = discountFactor

    #Clear the Memory
    def clear(self):
        self.index = 0;

    #Add a value into memory
    def add(self,state,qValue,action,reward):
        #Input into Memory
        self.states[self.index] = state
        self.qValues[self.index] = qValue
        self.actions[self.index] = action
        self.rewards[self.index] = reward
        #IncreaseIndex
        self.index = self.index + 1

    #Update the Q Values
    def updateQValues(self):
        '''
        Uses the formula of reward = reward(state) + discount * reward(state + 1)

        Since replay memory is in order, i.e. , position i + 1 is the state after i, we can just itterate through and update the Q values

        This is also the function to calculate the error

        Itterates backwards
        <----------
        [ | | | | ]
        '''

        for i in reversed(range(self.index - 1)):
            #IF at the start of end of erray, value is equal to the rewards, else it's the discount factor
            if (i == 0) or (i == (self.index - 1)):
                value = rewards[i]
            else:
                value = rewards[i] + (self.discountFactor * np.max(self.qValues[k + 1]))

            #Error between the Estimate of the Q-Network and the true calculated value
            self.estimateError[i] = abs(value - self.qValues[i,self.actions[i]])

            #Update Q value
            self.qValues[i,self.actions[i]] = value

    def randomBatch(self):
        '''
        Of the Replay Memory, returns a random batch of all elements in memory
        '''
        batchSample = np.random.choice(self.index - 1, 100)
        stateBatch = []
        qValuesBatch = []
        #Generate the State and q_values batches for these values
        for i in range(len(batchSample)):
            np.append(stateBatch,states[batchSample[i]])
            np.append(qValuesBatch,qValues[batchSample[i]])

        return stateBatch, qValuesBatch


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
        self.values = 0 '''COMEBACK TO'''

        #Centre Point of the Array - where the userType is stored
        self.centrePoint = np.floor(self.stateShape[0]/2)
        #Create the decay array
        self.decay = np.full(self.stateShape,0.96)
        self.decay[self.centrePoint][self.centrePoint] = 1

    def executeAction(self,previousState,action):
        #Executes the given action on a state
        #Returns the new State
        newState = updateState(state=previousState,action=action,value = 1)
        realisticValue = gan XXXX(newState)
        #Update the State with the new value
        newState = updateState(state=previousState,action=action,value = realisticValue)

        return newState

    def updateState(self,state,action,value):
        '''
        Takes in a state, and flattens it
        action is equal to the index
        Value is the value to update that index
        '''
        tempState = state.flatten()
        tempState[action] = value
        tempState.reShape(self.stateShape)

        return tempState

    def calculateReward(self,oldState,newState):
        '''
        The reward is the differece of the values between the two states
        '''
        x = valueOfState(state=oldState)
        y = valueOfState(state=newState)

        return (y - x)

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

class LinearControlSignal:

    def __init__(self, start_value, end_value, num_iterations):
        self.start_value = start_value
        self.end_value = end_value
        self.num_iterations = num_iterations

        # Calculate the linear coefficient.
        self._coefficient = (end_value - start_value) / num_iterations

    def get_value(self, iteration):
    """Get the value of the control signal for the given iteration."""

    if iteration < self.num_iterations:
        value = iteration * self._coefficient + self.start_value
    else:
        value = self.end_value

    return value
