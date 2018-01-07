from PIL import Image
import numpy as np
from random import *
import time

width = 200
height = 200

data = np.zeros((width,height,3), dtype=np.uint8)

start = time.time()

for x in range(width):
    for y in range (height):
        r = randint(1,255)
        data[x,y] = [r]

img = Image.fromarray(data,'RGB')
img.save('my.png')

end = time.time()

print(end - start)
