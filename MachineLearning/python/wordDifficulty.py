'''
Robert Sadler:
www.robertsadler.co.uk

wordZoo:
www.wordZoo.co.uk
'''
#Imports
import numpy as np          #Linear operations
import tflearn              #The Magic
import pandas as pd
import numpy as np

#Global Model
model = 0
wordAttributes = 0

'''
Creates the model
'''
def createAndTrainModel():
    #Import Data
    data, labels = tflearn.data_utils.load_csv(r'../input/TrainingSet.csv', target_column = 56, categorical_labels=True , n_classes= 2)
    #Assume the Data is pre-processed by Excel

    #----Network Parameters ------
    layer1 = 32
    layer2 = 32
    outLayer = 2
    epochCount = 30
    batchSize = len(labels)
    #-----------------------------

    #Build the Network
    network = tflearn.input_data(shape = [None, 56])
    network = tflearn.fully_connected(network,layer1)
    network = tflearn.fully_connected(network,layer2)
    network = tflearn.fully_connected(network,outLayer, activation = 'softmax')
    network = tflearn.regression(network)

    #Define Network Model
    global model
    model = tflearn.DNN(network)
    #Training and Validation
    model.fit(data,labels, n_epoch = epochCount, batch_size = batchSize, show_metric = True , validation_set = 0.1)

    #Once Training is complete, save it
    #model.save('wordDifficulty')
    return;

'''
Loads the Words and their attributes into memory
'''
def loadWords():
    global wordAttributes
    wordAttributes = pd.read_csv(r'../input/wordAttributes.csv')
    #Create List of Words and randomly shuffle them
    #df.sample(frac=1)
    return;

'''
Given a word, returns the properties of that word
'''
def getWordAtributes(word):
    attributes = wordAttributes.loc[wordAttributes['word'] == word]
    return attributes;

'''
Takes in 2 list of word attributes
-removes the 'word' column
-Copys into a new list to query the model with
'''
def createQuery(word1,word2):
    word1 = word1.values
    word2 = word2.values
    #Remove the 'Words' column
    word1 = np.delete(word1, 0)
    word2 = np.delete(word2, 0)
    #Create Query Return
    query = np.concatenate((word1,word2))
    return query;

def test():
    #test = [4,1,0,1,4.25,0,1,0,1,4,0.25,0,3,-1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,4,1,0,1,4.92,0,0,0,1,4,0.25,0,4,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0]
    test = createQuery(getWordAtributes("cat"),getWordAtributes("elephant"))
    pred = model.predict([test])
    return pred;

if __name__ == "__main__":
    loadWords()
    #createQuery(getWordAtributes("cat"),getWordAtributes("cat"))
    createAndTrainModel()
    pred = test()
    print(pred[0][0], " ", pred[0][1])

    if (pred[0][0] > pred[0][1]):
        print("class 0")
    else:
        print("class 1")
