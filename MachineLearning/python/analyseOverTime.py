import numpy as np
import pandas as pd 

states = pd.read_csv('improvementOverTime.csv', sep = ',', header = None)
states = states.values

#Row, Column
print(states[103][4])

for j in range (len(states[0] - 1)):

    if j == 0 or j == 1 or j == 2 or j ==3:
        continue

    string = ""

    for i in range(len(states)-1):
        #print(states[i][j])
        #if (states[i][j] == 0.497) or (states[i][j] == 0.495) or (states[i][j] == 0.493) or (states[i][j] == 0.491) or  (states[i][j] == 0.489) or (states[i][j] == 0.487) or (states[i][j] == 0.485) or (states[i][j] == 0.483) or (states[i][j] == 0.481) or (states[i][j] == 0.479):
        #    continue
        #else:
        #    string = string + "," + str(states[i][j])
        if states[i][j] == 1 or states[i][j] == 0.5 or states [i][j] == 0 or states[i][j] == 0.670:
            string = string + "," + str(states[i][j])

    print(string)
