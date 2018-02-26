from sklearn.cluster import KMeans
import numpy as np
import pickle


def importDataSet():
    '''
    Import the CSV of the Clusters
    '''



#Import the Data Set
dataSet = importDataSet()
#Cluster
kmeans = KMeans(n_clusters=5, random_state=0).fit(dataSet)
#Save the Model
s = pickle.dumps(kmeans)

#For the Query
kmeans.predict([N dimension Array])
