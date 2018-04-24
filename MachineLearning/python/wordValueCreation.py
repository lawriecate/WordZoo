import numpy as np
import pandas as pd 


def wordToPosition(word):
    if "sheep" == word:
        return 0
    elif "foil" == word:
        return 1
    elif "land" == word:
        return 2
    elif "plane" == word:
        return 3
    elif "back" == word:
        return 4
    elif "log" == word:
        return 5
    elif "hall" == word:
        return 6
    elif "clean" == word:
        return 7
    elif "son" == word:
        return 8
    elif "farm" == word:
        return 9
    elif "lamb" == word:
        return 10
    elif "click" == word:
        return 11
    elif "three" == word:
        return 12
    elif "jet" == word:
        return 13
    elif "rust" == word:
        return 14
    elif "bed" == word:
        return 15
    elif "nose" == word:
        return 16
    elif "tub" == word:
        return 17
    elif "plug" == word:
        return 18
    elif "top" == word:
        return 19
    elif "green" == word:
        return 20
    elif "flag" == word:
        return 21
    elif "flower" == word:
        return 22
    elif "balloon" == word:
        return 23
    elif "pin" == word:
        return 24
    elif "four" == word:
        return 25
    elif "meat" == word:
        return 26
    elif "mill" == word:
        return 27
    elif "stop" == word:
        return 28
    elif "west" == word:
        return 29
    elif "box" == word:
        return 30
    elif "drum" == word:
        return 31
    elif "nest" == word:
        return 32
    elif "tree" == word:
        return 33
    elif "kick" == word:
        return 34
    elif "cone" == word:
        return 35
    elif "bird" == word:
        return 36
    elif "yolk" == word:
        return 37
    elif "fan" == word:
        return 38
    elif "bank" == word:
        return 39
    elif "smell" == word:
        return 40
    elif "wave" == word:
        return 41
    elif "throne" == word:
        return 42
    elif "jug" == word:
        return 43
    elif "kiss" == word:
        return 44
    elif "tag" == word:
        return 45
    elif "sink" == word:
        return 46
    elif "cold" == word:
        return 47
    elif "fog" == word:
        return 48
    elif "drain" == word:
        return 49
    elif "mop" == word:
        return 50
    elif "weed" == word:
        return 51
    elif "cook" == word:
        return 52
    elif "shower" == word:
        return 53
    elif "sick" == word:
        return 54
    elif "pop" == word:
        return 55
    elif "wood" == word:
        return 56
    elif "toast" == word:
        return 57
    elif "pages" == word:
        return 58
    elif "bat" == word:
        return 59
    elif "hog" == word:
        return 60
    elif "cloak" == word:
        return 61
    elif "tap" == word:
        return 62
    elif "ball" == word:
        return 63
    elif "mountain" == word:
        return 64
    elif "hot" == word:
        return 65
    elif "cube" == word:
        return 66
    elif "pill" == word:
        return 67
    elif "hair" == word:
        return 68
    elif "house" == word:
        return 69
    elif "fox" == word:
        return 70
    elif "poodle" == word:
        return 71
    elif "road" == word:
        return 72
    elif "nine" == word:
        return 73
    elif "pot" == word:
        return 74
    elif "bell" == word:
        return 75
    elif "day" == word:
        return 76
    elif "rag" == word:
        return 77
    elif "park" == word:
        return 78
    elif "wine" == word:
        return 79
    elif "vet" == word:
        return 80
    elif "tray" == word:
        return 81
    elif "pan" == word:
        return 82
    elif "hill" == word:
        return 83
    elif "ant" == word:
        return 84
    elif "hip" == word:
        return 85
    elif "fall" == word:
        return 86
    elif "fountain" == word:
        return 87
    elif "brick" == word:
        return 88
    elif "bear" == word:
        return 89
    elif "clothes" == word:
        return 90
    elif "mane" == word:
        return 91
    elif "snow" == word:
        return 92
    elif "sleep" == word:
        return 93
    elif "squid" == word:
        return 94
    elif "rug" == word:
        return 95
    elif "can" == word:
        return 96
    elif "potato" == word:
        return 97
    elif "lid" == word:
        return 98
    elif "sock" == word:
        return 99
    elif "grape" == word:
        return 100
    elif "fin" == word:
        return 101
    elif "brake" == word:
        return 102
    elif "tape" == word:
        return 103
    elif "fax" == word:
        return 104
    elif "peach" == word:
        return 105
    elif "lip" == word:
        return 106
    elif "jump" == word:
        return 107
    elif "tick" == word:
        return 108
    elif "mat" == word:
        return 109
    elif "queen" == word:
        return 110
    elif "weather" == word:
        return 111
    elif "puzzle" == word:
        return 112
    elif "bill" == word:
        return 113
    elif "gold" == word:
        return 114
    elif "rock" == word:
        return 115
    elif "beach" == word:
        return 116
    elif "hose" == word:
        return 117
    elif "square" == word:
        return 118
    elif "bath" == word:
        return 119
    elif "tyre" == word:
        return 120
    elif "rake" == word:
        return 121
    elif "curtain" == word:
        return 122
    elif "price" == word:
        return 123
    elif "plate" == word:
        return 124
    elif "ben" == word:
        return 125
    elif "big" == word:
        return 126
    elif "owl" == word:
        return 127
    elif "wing" == word:
        return 128
    elif "hat" == word:
        return 129
    elif "kid" == word:
        return 130
    elif "mug" == word:
        return 131
    elif "mouth" == word:
        return 132
    elif "lift" == word:
        return 133
    elif "calf" == word:
        return 134
    elif "liquid" == word:
        return 135
    elif "elf" == word:
        return 136
    elif "hell" == word:
        return 137
    elif "swing" == word:
        return 138
    elif "door" == word:
        return 139
    elif "roast" == word:
        return 140
    elif "peg" == word:
        return 141
    elif "head" == word:
        return 142
    elif "leg" == word:
        return 143
    elif "cage" == word:
        return 144
    elif "chop" == word:
        return 145
    elif "sack" == word:
        return 146
    elif "bun" == word:
        return 147
    elif "book" == word:
        return 148
    elif "soil" == word:
        return 149
    elif "noodle" == word:
        return 150
    elif "monkey" == word:
        return 151
    elif "hen" == word:
        return 152
    elif "potatoes" == word:
        return 153
    elif "shape" == word:
        return 154
    elif "tower" == word:
        return 155
    elif "pearl" == word:
        return 156
    elif "mad" == word:
        return 157
    elif "mine" == word:
        return 158
    elif "pink" == word:
        return 159
    elif "pancake" == word:
        return 160
    elif "tomato" == word:
        return 161
    elif "rat" == word:
        return 162
    elif "feet" == word:
        return 163
    elif "donkey" == word:
        return 164
    elif "stair" == word:
        return 165
    elif "hut" == word:
        return 166
    elif "mud" == word:
        return 167
    elif "cub" == word:
        return 168
    elif "duck" == word:
        return 169
    elif "fish" == word:
        return 170
    elif "clown" == word:
        return 172
    elif "dress" == word:
        return 173
    elif "wet" == word:
        return 174
    elif "pub" == word:
        return 175
    elif "crown" == word:
        return 176
    elif "peaches" == word:
        return 177
    elif "spell" == word:
        return 178
    elif "brain" == word:
        return 179
    elif "chess" == word:
        return 180
    elif "wrench" == word:
        return 181
    elif "dish" == word:
        return 182
    elif "frog" == word:
        return 183
    elif "turkey" == word:
        return 184
    elif "sun" == word:
        return 185
    elif "look" == word:
        return 186
    elif "class" == word:
        return 187
    elif "pig" == word:
        return 188
    elif "dog" == word:
        return 189
    elif "read" == word:
        return 190
    elif "vest" == word:
        return 191
    elif "south" == word:
        return 192
    elif "moon" == word:
        return 193
    elif "ten" == word:
        return 194
    elif "shelf" == word:
        return 195
    elif "truck" == word:
        return 196
    elif "shed" == word:
        return 197
    elif "oil" == word:
        return 198
    elif "half" == word:
        return 199
    elif "plum" == word:
        return 200
    elif "toad" == word:
        return 201
    elif "ring" == word:
        return 202
    elif "rope" == word:
        return 203
    elif "shark" == word:
        return 204
    elif "car" == word:
        return 205
    elif "flour" == word:
        return 206
    elif "train" == word:
        return 207
    elif "lead" == word:
        return 208
    elif "ram" == word:
        return 209
    elif "spoon" == word:
        return 210
    elif "red" == word:
        return 211
    elif "band" == word:
        return 212
    elif "bowl" == word:
        return 213
    elif "cog" == word:
        return 214
    elif "foot" == word:
        return 215
    elif "club" == word:
        return 216
    elif "soap" == word:
        return 217
    elif "snowflake" == word:
        return 218
    elif "bubble" == word:
        return 219
    elif "nun" == word:
        return 220
    elif "tin" == word:
        return 221
    elif "dump" == word:
        return 222
    elif "girl" == word:
        return 223
    elif "ship" == word:
        return 224
    elif "wheat" == word:
        return 225
    elif "gift" == word:
        return 226
    elif "tank" == word:
        return 227
    elif "dice" == word:
        return 228
    elif "pope" == word:
        return 229
    elif "moss" == word:
        return 230
    elif "boat" == word:
        return 231
    elif "glass" == word:
        return 232
    elif "bald" == word:
        return 233
    elif "cash" == word:
        return 234
    elif "pine" == word:
        return 235
    elif "bow" == word:
        return 236
    elif "ice" == word:
        return 237
    elif "dome" == word:
        return 238
    elif "cake" == word:
        return 239
    elif "towel" == word:
        return 240
    elif "tomatoes" == word:
        return 241
    elif "rap" == word:
        return 242
    elif "cream" == word:
        return 243
    elif "kite" == word:
        return 244
    elif "plant" == word:
        return 245
    elif "men" == word:
        return 246
    elif "beaches" == word:
        return 247
    elif "spring" == word:
        return 248
    elif "bushes" == word:
        return 249
    elif "ink" == word:
        return 250
    elif "lake" == word:
        return 251
    elif "stone" == word:
        return 252
    elif "six" == word:
        return 253
    elif "bench" == word:
        return 254
    elif "tube" == word:
        return 255
    elif "well" == word:
        return 256
    elif "nut" == word:
        return 257
    elif "gnome" == word:
        return 258
    elif "oak" == word:
        return 259
    elif "cross" == word:
        return 260
    elif "rain" == word:
        return 261
    elif "play" == word:
        return 262
    elif "sweet" == word:
        return 263
    elif "feather" == word:
        return 264
    elif "black" == word:
        return 265
    elif "nap" == word:
        return 266
    elif "tall" == word:
        return 267
    elif "sweep" == word:
        return 268
    elif "brown" == word:
        return 269
    elif "fire" == word:
        return 270
    elif "path" == word:
        return 271
    elif "deer" == word:
        return 272
    elif "grave" == word:
        return 273
    elif "eight" == word:
        return 274
    elif "knight" == word:
        return 275
    elif "home" == word:
        return 276
    elif "third" == word:
        return 277
    elif "brushes" == word:
        return 278
    elif "sand" == word:
        return 279
    elif "mouse" == word:
        return 280
    elif "bread" == word:
        return 281
    elif "goal" == word:
        return 282
    elif "man" == word:
        return 283
    elif "lock" == word:
        return 284
    elif "net" == word:
        return 285
    elif "zip" == word:
        return 286
    elif "shop" == word:
        return 287
    elif "thumb" == word:
        return 288
    elif "britain" == word:
        return 289
    elif "hug" == word:
        return 290
    elif "dust" == word:
        return 291
    elif "steam" == word:
        return 292
    elif "dot" == word:
        return 293
    elif "scarf" == word:
        return 294
    elif "tip" == word:
        return 295
    elif "king" == word:
        return 296
    elif "cages" == word:
        return 297
    elif "smoke" == word:
        return 298
    elif "star" == word:
        return 299
    elif "pram" == word:
        return 300
    elif "crack" == word:
        return 301
    elif "goat" == word:
        return 302
    elif "mash" == word:
        return 303
    elif "chest" == word:
        return 304
    elif "wink" == word:
        return 305
    elif "hop" == word:
        return 306
    elif "bug" == word:
        return 307
    elif "page" == word:
        return 308
    elif "town" == word:
        return 309
    elif "spear" == word:
        return 310
    elif "hand" == word:
        return 311
    elif "arm" == word:
        return 312
    elif "chair" == word:
        return 313
    elif "coat" == word:
        return 314
    elif "seed" == word:
        return 315
    elif "wax" == word:
        return 316
    elif "clock" == word:
        return 317
    elif "bake" == word:
        return 318
    elif "cat" == word:
        return 319
    elif "bin" == word:
        return 320
    elif "grill" == word:
        return 321
    elif "sad" == word:
        return 322
    elif "wall" == word:
        return 323
    else:
        return "Error"

words = pd.read_csv('wordsSorted.csv', header = None)


difficulties = np.zeros((324,))
value = 0

for i in range(323):
    #print(wordToPosition(words[0][i]))
    pos = wordToPosition(words[0][i])
    value = value + 0.05
    difficulties[pos] = round(value,2)


#print(difficulties)

string = "["
for i in range(324):
    string = string + (str(difficulties[i]) + ",")

string = string + "]"

values = np.array([9.35,10.55,1.3,9.3,0.1,13.8,6.3,8.85,7.15,13.45,13.6,3.6,14.1,11.35,3.3,4.8,8.8,5.25,5.6,1.6,12.95,13.3,12.75,15.05,5.2,3.45,11.2,16.15,7.1,6.1,1.35,13.9,14.15,11.0,6.5,14.75,4.1,15.35,7.35,2.45,13.1,3.65,15.2,9.7,7.75,1.45,2.9,12.3,7.05,10.3,4.35,10.95,3.0,10.1,1.1,1.7,12.25,15.5,14.95,4.65,13.2,15.1,1.05,6.6,15.85,1.75,14.55,13.7,14.0,8.4,0.85,8.95,9.75,12.35,0.25,6.8,4.85,4.95,4.3,5.5,4.2,9.85,5.15,2.15,4.6,1.15,6.7,15.95,3.15,13.55,15.3,10.05,5.75,11.4,12.7,7.45,0.05,15.8,0.7,6.45,11.6,5.3,10.6,3.35,6.9,12.15,2.1,8.2,6.4,2.3,12.85,15.55,11.7,0.5,14.2,7.3,11.3,11.8,15.65,4.5,14.3,12.55,15.6,10.2,10.25,0.9,0.4,13.25,2.6,1.65,1.9,2.4,8.45,4.05,6.55,8.9,3.8,7.9,3.25,10.9,15.0,14.05,6.05,4.4,14.7,6.2,7.0,3.9,5.55,11.5,10.45,10.35,13.5,16.05,12.2,12.6,11.95,1.8,5.45,2.7,15.15,15.9,0.3,13.95,11.55,11.65,7.95,2.35,3.85,13.65,0.75,0.0,11.85,11.15,2.2,2.5,14.8,10.65,11.45,14.45,9.4,11.9,8.0,4.15,10.5,1.95,11.25,5.35,2.0,7.65,3.75,5.65,12.8,13.15,4.75,9.8,5.4,5.9,11.05,4.55,9.65,8.35,0.65,8.7,3.7,1.85,10.7,12.05,3.1,1.4,12.65,4.7,6.95,8.1,7.5,10.0,2.85,12.45,16.1,12.0,3.95,7.4,3.05,7.55,4.45,9.05,6.65,2.65,10.15,9.25,3.55,14.6,6.25,2.95,7.2,8.25,0.8,2.75,9.15,5.7,15.4,16.0,0.2,10.85,8.6,3.2,1.0,14.5,8.3,12.9,2.55,9.55,15.45,1.2,9.95,3.5,7.25,7.85,15.75,13.0,13.05,9.6,6.0,9.9,15.25,6.35,7.7,6.15,14.85,10.8,8.05,0.6,13.4,14.9,13.85,10.75,14.25,9.5,9.1,4.25,9.0,14.65,12.5,0.15,2.25,4.0,7.8,0.95,8.65,15.7,4.9,13.35,8.5,5.05,10.4,0.45,2.05,9.2,11.75,6.85,5.8,5.85,8.75,2.8,8.55,8.15,5.1,1.25,14.35,5.95,9.45,5.0,1.5,14.4,12.1,11.1,0.55,6.75,3.4,1.55,7.6,12.4,0.35,13.75])
values.reshape(18,18)

print(values)
