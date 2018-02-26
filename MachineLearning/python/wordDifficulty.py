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
import csv

'''
Creates the model
'''
def createAndTrainModel():
    #Import Data
    data, labels = tflearn.data_utils.load_csv(r'../input/trainingSet.csv', target_column = 56, categorical_labels=True , n_classes= 2)
    #Assume the Data is pre-processed by Excel

    #----Network Parameters ------
    layer1 = 32
    layer2 = 32
    outLayer = 2
    epochCount = 50
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
    model.fit(data,labels, n_epoch = epochCount, batch_size = batchSize, show_metric = True , validation_set = 0.3)

    #Once Training is complete, save it
    #model.save('wordDifficulty')
    return;

'''
Loads the Words and their attributes into memory
'''
def loadWords():
    global wordAttributes
    wordAttributes = pd.read_csv(r'../input/wordAttributesFINAL.csv')
    #Create List of Words and randomly shuffle them
    global words
    words = wordAttributes.ix[:,0]
    words = words.sample(frac=1).reset_index(drop=True)
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

'''
Sorts the words based on their wordDifficulty
Done using Bubble sort, and the Neural Network assesses if one word is harder than the other
if this is true, then swap the order, else don't
Repeat n^2 times
'''
def sortWords():
    #run Bubble Sort
    for passnum in range(len(words) - 1):
        for i in range (passnum):
            #Create the query
            query = createQuery(getWordAtributes(words[i]),getWordAtributes(words[i+1]))
            #Query the Model
            pred = model.predict([query])
            #print(pred)
            #Check, if this is true, then the swap if it is
            if (pred[0][0] > pred [0][1]):
                temp = words[i]
                words[i] = words[i+1]
                words[i+1] = temp

    #Print out Solution
    print(words)

    return;

if __name__ == "__main__":
    loadWords()
    createAndTrainModel()

    #Convert to Numpy
    #global words
    words = words.values
    #For Testing
    #words = words[:5]
    #Repeat 5 times to properly make sure the list is well sorted
    for i in range(20):
        print("Itteration" + str(i))
        sortWords()
        fileName = 'output' + str(i)
        #Save the words out
        f = open(fileName,'w')
        for ele in words:
            f.write(ele+'\n')
        f.close()
