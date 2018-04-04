from PIL import Image
import numpy as np
from random import *
import time

width = 18
height = 18

#data = np.zeros((width,height,3), dtype=np.uint8)




start = time.time()
counter = 0

for x in range(width):
    for y in range (height):

        if (counter % 2) == 0:
            data[x,y] = 255
        else:
            data[x,y] = 0

        counter = counter + 1


img = Image.fromarray(data,'RGB')
img.save('realState.png')

end = time.time()

print(end - start)
