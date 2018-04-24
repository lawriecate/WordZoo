import numpy as np
import pandas as pd 


#Import the state

states = pd.read_csv('oliStates.csv', sep = ',', header = None)
states = states.values

#print (len(states))
for i in range(len(states) - 1):
    #Ignore first row
    if i == 0:
        continue
    
    for j in range(len(states[0]) - 1):

        if (states[i - 1][j] == 0.497) or (states[i - 1][j] == 0.495) or (states[i - 1][j] == 0.493) or (states[i - 1][j] == 0.491) or not (states[i - 1][j] == 0.489) or (states[i - 1][j] == 0.487) or (states[i - 1][j] == 0.485) or (states[i - 1][j] == 0.483) or (states[i - 1][j] == 0.481) or (states[i - 1][j] == 0.479):
            states[i][j] = states[i - 1][j] * 0.995 




np.savetxt('fixedStates.csv',states, delimiter = ',')
print("Complete")


