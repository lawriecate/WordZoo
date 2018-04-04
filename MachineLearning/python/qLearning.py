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
        init = tf.truncated_normal_initializer(mean=0.0,stddev=2e-2)

        #Convulation Layers
        self.input = tf.placeholder(shape = [None,18,18,1], dtype = tf.float32)

        network = tf.layers.conv2d(self.input, 16, [3,3], strides = (2,2), padding = 'SAME', kernel_initializer = init, activation = tf.nn.relu)
        network = tf.layers.conv2d(network, 32, [3,3], strides = (2,2), padding = 'SAME', kernel_initializer = init, activation = tf.nn.relu)
        network = tf.layers.conv2d(network, 64, [3,3], strides = (1,1), padding = 'SAME', kernel_initializer = init, activation = tf.nn.relu)
        #Fully connected layer
        network = tf.layers.dense(tf.contrib.layers.flatten(network),units=256,kernel_initializer=init, activation=tf.nn.relu)
        #Output Layer
        network = tf.layers.dense(inputs=network, name='actions',units=numberOfWords,kernel_initializer=init, activation=tf.nn.relu)

        #Save the network
        self.network = network

        #Input for new q values
        self.newQValues = tf.placeholder(tf.float32, shape = [None, numberOfWords], name='newQValues')

        #For Running
        self.sess = tf.Session()

        self.learningRate = tf.placeholder(dtype=tf.float32, shape=[])

        #For Saving the Model
        self.saver = tf.train.Saver()

        #Loss Function from the paper
        errorSquared = tf.square(self.network - self.newQValues)
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
        qValues = self.sess.run(self.network,feed_dict = feedDict)
        return qValues;

    def optimise(self,learningRate,replayMemory):
        #Gonna assume a sample of 100
        stateBatch, qValueBatch = replayMemory.randomBatch()
        feed_dict = {self.input: stateBatch, self.newQValues: qValueBatch, self.learningRate: learningRate}
        #Run the optimisation
        lossValue, _ = self.sess.run([self.loss,self.optimizer],feed_dict=feed_dict)


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

    def __init__(self):
        print("starting")
        

    def training(self,episodes,timeSteps):
        #Initialise ReplayMemory D to capacity N
        d = ReplayMemory(capacity=100000)
        #Initialise action-value function Q with random Weights
        functionQ = Network(numberOfWords=323)
        #The "Gym" - Where we create states, and query what effect certain actions will have
        #gym = Gym()

        self.generateEpsilonValue(episodes = episodes)
        #Number of States looked at
        counter = 0

        '''
        Training Variables
        '''
        self.learning_rate_control = LinearControlSignal(start_value=1e-3, end_value=1e-5, num_itterations=5e6)
        self.loss_limit_control = LinearControlSignal(start_value=0.1,end_value=0.015,num_itterations=5e6)
        self.max_epochs_control = LinearControlSignal(start_value=5.0,end_value=10.0, num_itterations=5e6)

        #Main training loop
        for i in range(episodes):
            #Clear the replay Memory
            d.clear()
            #Initial State
            #state = gym.createEmptyState()
            state = np.full((18,18,1),0.5)
            #Time step into the future
            for t in range (timeSteps):
                #Calculate Q values for the State
                qValues = functionQ.calculateQValues(states= state)[0]
                epsilon = epslionValue(iteration=i)
                #With prob epislon
                if (np.random.random() < epsilon):
                    #Random Action
                    action = np.random.randint(low=0, high=323)
                else:
                    #highest Value
                    action = np.argmax(qValues)

                #Execute Action in Gym and observe reward
                #newState = gym.executeAction(previousState = state, action = action)
                #reward = gym.calculateReward(oldState = state, newState = newState)
                newState = state
                reward = 0
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

    def generateEpsilonValue(self,episodes):
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

    def __init__(self,capacity):
        self.index = 0
        self.capacity = capacity
        self.states = np.zeros(shape = [capacity] + [18,18], dtype = np.float)
        self.qValues = np.zeros(shape = [capacity,323], dtype = np.float)
        self.actions = np.zeros(shape = [capacity,323], dtype = np.int8)
        self.rewards = np.zeros(shape = capacity, dtype = np.int8)
        self.estimateError = np.zeros(shape = capacity, dtype = np.float)
        self.discountFactor = 0.99

    #Clear the Memory
    def clear(self):
        self.index = 0

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

    def __init__(self):
        #Shape of the state
        self.stateShape = (18,18,1)

        #Load Word Reward costs
        self.values = np.array([9.35,10.55,1.3,9.3,0.1,13.8,6.3,8.85,7.15,13.45,13.6,3.6,14.1,11.35,3.3,4.8,8.8,5.25,5.6,1.6,12.95,13.3,12.75,15.05,5.2,3.45,11.2,16.15,7.1,6.1,1.35,13.9,14.15,11.0,6.5,14.75,4.1,15.35,7.35,2.45,13.1,3.65,15.2,9.7,7.75,1.45,2.9,12.3,7.05,10.3,4.35,10.95,3.0,10.1,1.1,1.7,12.25,15.5,14.95,4.65,13.2,15.1,1.05,6.6,15.85,1.75,14.55,13.7,14.0,8.4,0.85,8.95,9.75,12.35,0.25,6.8,4.85,4.95,4.3,5.5,4.2,9.85,5.15,2.15,4.6,1.15,6.7,15.95,3.15,13.55,15.3,10.05,5.75,11.4,12.7,7.45,0.05,15.8,0.7,6.45,11.6,5.3,10.6,3.35,6.9,12.15,2.1,8.2,6.4,2.3,12.85,15.55,11.7,0.5,14.2,7.3,11.3,11.8,15.65,4.5,14.3,12.55,15.6,10.2,10.25,0.9,0.4,13.25,2.6,1.65,1.9,2.4,8.45,4.05,6.55,8.9,3.8,7.9,3.25,10.9,15.0,14.05,6.05,4.4,14.7,6.2,7.0,3.9,5.55,11.5,10.45,10.35,13.5,16.05,12.2,12.6,11.95,1.8,5.45,2.7,15.15,15.9,0.3,13.95,11.55,11.65,7.95,2.35,3.85,13.65,0.75,0.0,11.85,11.15,2.2,2.5,14.8,10.65,11.45,14.45,9.4,11.9,8.0,4.15,10.5,1.95,11.25,5.35,2.0,7.65,3.75,5.65,12.8,13.15,4.75,9.8,5.4,5.9,11.05,4.55,9.65,8.35,0.65,8.7,3.7,1.85,10.7,12.05,3.1,1.4,12.65,4.7,6.95,8.1,7.5,10.0,2.85,12.45,16.1,12.0,3.95,7.4,3.05,7.55,4.45,9.05,6.65,2.65,10.15,9.25,3.55,14.6,6.25,2.95,7.2,8.25,0.8,2.75,9.15,5.7,15.4,16.0,0.2,10.85,8.6,3.2,1.0,14.5,8.3,12.9,2.55,9.55,15.45,1.2,9.95,3.5,7.25,7.85,15.75,13.0,13.05,9.6,6.0,9.9,15.25,6.35,7.7,6.15,14.85,10.8,8.05,0.6,13.4,14.9,13.85,10.75,14.25,9.5,9.1,4.25,9.0,14.65,12.5,0.15,2.25,4.0,7.8,0.95,8.65,15.7,4.9,13.35,8.5,5.05,10.4,0.45,2.05,9.2,11.75,6.85,5.8,5.85,8.75,2.8,8.55,8.15,5.1,1.25,14.35,5.95,9.45,5.0,1.5,14.4,12.1,11.1,0.55,6.75,3.4,1.55,7.6,12.4,0.35,13.75])
        self.values.reshape(self.stateShape)
        
        def generator(noise , reuse = False):
            with tf.variable_scope('Generator', reuse=reuse):
                #Layer1
                net = tf.layers.conv2d_transpose(noise, 1024, [4,4], strides = (2,2), padding = 'SAME')
                net = tf.layers.batch_normalization(inputs = net, training = False, epsilon = 1e-5)
                #Layer 2
                net = tf.layers.conv2d_transpose(net, 512, [4,4], strides = (2,2), padding = 'SAME')
                net = tf.layers.batch_normalization(inputs = net, training = False, epsilon = 1e-5)
                #Layer 3
                net = tf.layers.conv2d_transpose(net, 256, [4,4], strides = (2,2), padding = 'SAME')
                net = tf.layers.batch_normalization(inputs = net, training = False, epsilon = 1e-5)
                #Output Layer
                net = tf.layers.conv2d_transpose(net, 128, [4,4], strides = (2,2), padding = 'SAME')
                net = tf.layers.batch_normalization(inputs = net, training = False, epsilon = 1e-5)
                #Normalise so the values are between 0 and 1
                net = tf.layers.conv2d_transpose(net, 1, [18,18], strides = (1,1), padding = 'SAME')
                #Normalsie the values between 0 and 1
                net = tf.nn.tanh(net)
                return net
        '''
        Takes in an 18x18 state, and returns a single value for the prob. that it is real
        '''
        def discriminator(state, reuse = False, training = False):
            with tf.variable_scope('Discriminator', reuse=reuse):
                #Layer 1
                net = tf.layers.conv2d(state, 128, [4,4], strides = (2,2), padding = 'SAME')
                net = tf.nn.leaky_relu(tf.layers.batch_normalization(net, training = training))
                #Layer 2
                net = tf.layers.conv2d(net, 256, [4,4], strides = (2,2), padding = 'SAME')
                net = tf.nn.leaky_relu(tf.layers.batch_normalization(net, training = training))
                #Layer 3
                net = tf.layers.conv2d(net, 512, [4,4], strides = (2,2), padding = 'SAME')
                net = tf.nn.leaky_relu(tf.layers.batch_normalization(net, training = training))
                #Layer 4
                net = tf.layers.conv2d(net, 1024, [4,4], strides = (4,4), padding = 'SAME')
                net = tf.nn.leaky_relu(tf.layers.batch_normalization(net, training = training))
                #Output Layer
                net = tf.layers.dense(tf.contrib.layers.flatten(net), 1, activation = tf.nn.sigmoid)
                #Normalise output between 0 and 1
                #net = tf.nn.sigmoid(net)
                return net;

        def lrelu(x, leak = 0.2):
            return tf.maximum(leak * x, x)

        ##################################################
        # BUILD THE GAN MODEL
        ##################################################
        noiseLength = 100
        learningRate = 0.0002
        beta1 = 0.5
        #Place holder inputs
        noise = tf.placeholder(shape = [None,1, 1, noiseLength], dtype = tf.float32)
        self.state = tf.placeholder(shape = [None,18,18,1], dtype = tf.float32)
        #Define the sub Networks
        G = generator(noise)
        self.Dreal = discriminator(self.state, reuse = False)
        Dfake = discriminator(G,reuse = True)
        #Optimizers
        Dtrainer = tf.train.AdamOptimizer(learning_rate = learningRate, beta1 = beta1)
        Gtrainer = tf.train.AdamOptimizer(learning_rate = learningRate, beta1 = beta1)
        #Loss functions from the paper
        # Note, In order to minimize, we maximise the negative value, hence the minus in front of the functions
        dLoss = -tf.reduce_mean(tf.log(self.Dreal) + tf.log(1-Dfake))
        gLoss = -tf.reduce_mean(tf.log(Dfake))
        #Variables of the Graph
        tvars = tf.trainable_variables()
        dVars = [var for var in tvars if var.name.startswith('Discriminator')]
        gVars = [var for var in tvars if var.name.startswith('Generator')]


        #Load the Discriminator
        #init = tf.global_variables_initializer()
        saver = tf.train.Saver()
        self.sess = tf.Session()
        ckpt = tf.train.get_checkpoint_state("./models")
        saver.restore(self.sess,ckpt.model_checkpoint_path)

        #Create the decay array
        return
    

    def executeAction(self,previousState,action):
        #Executes the given action on a state
        #Creates the new state
        proposedState = self.updateState(state = previousState, action = action, value = 1)
        #Calculate the prob. this is real - Limits it down to a value
        prob = self.sess.run(self.Dreal,feed_dict = {self.state : proposedState})
        trueState = self.updateState(state = proposedState, action = action, value = prob)

        return trueState

    def updateState(self,state,action,value):
        '''
        Takes in a state, and flattens it
        action is equal to the index
        Value is the value to update that index
        '''
        tempState = state.reshape(324,)
        tempState = np.multiply(tempState,0.995)
        tempState[action] = value

        #Round all of the values 
        for i in range(323):
            tempState[i] = round(tempState[i],3)

        tempState = tempState.reshape(18,18,1)
        return tempState

    def calculateReward(self,oldState,newState):
        '''
        The reward is the differece of the values between the two states
        '''
        x = self.valueOfState(state=oldState)
        y = self.valueOfState(state=newState)

        return (y - x)

    def valueOfState(self,state):
        #The Confidence values multiplied by the reward for each word
        #Remember to not include the central value :) , 144
        return np.sum(np.multiply(state,self.values))

    def createEmptyState(self):
        #Create a State of All 0.5's
        state = np.full(self.stateShape,0.5)
        #Random number between the number of types of users we have
        #userType = random.randrange(0,self.userTypes)
        #state[self.centrePoint][self.centrePoint] = userType
        #return the state
        return state

class LinearControlSignal:

    def __init__(self, num_itterations,start_value, end_value):
        self.start_value = start_value
        self.end_value = end_value
        self.num_itterations = num_itterations

        # Calculate the linear coefficient.
        self._coefficient = (end_value - start_value) / num_itterations

    def get_value(self, iteration):
        if iteration < self.num_itterations:
            value = iteration * self._coefficient + self.start_value
        else:
            value = self.end_value

        return value

###################################################
#Training 
###################################################
#test = Gym()
#state = np.full((18,18,1),0.5)

#for i in range(323):
#    newState = test.executeAction(previousState = state, action = i)
#    print(test.calculateReward(state,newState))
#test.training(episodes = 1, timeSteps = 1, stateShape = (18,18,1))

test = Agent()

test.training(episodes = 1,timeSteps = 1)


