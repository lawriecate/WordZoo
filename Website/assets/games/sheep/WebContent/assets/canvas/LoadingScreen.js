// Global variables
var timeCounter;
var timeoutPoint = 15;


/**
 * LoadingScreen.
 */
function LoadingScreen()
{
	Phaser.State.call(this);
}

/** @type Phaser.State */
var LoadingScreen_proto = Object.create(Phaser.State.prototype);
LoadingScreen.prototype = LoadingScreen_proto;
LoadingScreen.prototype.constructor = LoadingScreen;

LoadingScreen.prototype.init = function ()
{
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.scale.pageAlignHorizontally = true;
	this.scale.pageAlignVertically = true;
	this.stage.backgroundColor = '#ffffff';
};

LoadingScreen.prototype.preload = function ()
{
	this.load.pack('startScreen', '/games/sheep/WebContent/assets/pack.json');	
};

LoadingScreen.prototype.create = function ()
{
	var _background = this.add.sprite(0, 0, 'background');
	_background.scale.setTo(1, 1.16);

	var _preloader = this.game.add.sprite(965,880,'preloader',0);
    _preloader.scale.setTo(1.91,1.91);
	_preloader.anchor.setTo(0.5, 0.5);

	// preloader animation
 	var _preloaderAni = _preloader.animations.add('preloader',
 		[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],30,true);
	_preloaderAni.play();


	// Time (record timeout)
	var timer = this.time.create(false);
	timer.loop(Phaser.Timer.SECOND, this.updateTime, this);
	timeCounter = 0;
	timer.start();


    // Get random words
    var context = this;
    $.get('/student/getWords', function(data)
    {
        var baseWords = data;
        console.log("baseWord: "+baseWords);



        // ******************************************************************************************************************************
        // ************************************************* HARD CODED GETPAIR OF WORD *************************************************
        // ******************************************************************************************************************************
    
        var groups = [0,1,2,3,4,5,6,7,8,9,0,0,0,1,1,1,1,2,2,2,3,4,4,4,5,6,6,7,7,7,8,8,8,9,9,9,10,11,12,13,14,15,16,17,18,19,10,11,12,
        12,12,13,13,14,15,15,15,16,16,17,18,18,19,19,20,108,21,22,23,24,25,26,27,28,20,20,108,21,22,22,23,24,24,24,25,25,25,26,26,27,
        28,28,29,30,31,32,33,34,35,36,37,38,29,29,29,29,30,30,30,30,31,31,31,31,32,32,32,32,33,33,33,33,34,34,34,34,34,34,35,36,36,36,
        37,37,37,37,38,39,40,41,42,43,44,45,46,47,48,39,39,39,40,41,42,42,42,42,42,43,43,44,44,44,44,44,45,46,46,47,48,49,50,51,52,53,
        54,109,55,56,57,49,49,49,50,51,52,52,53,53,54,54,109,55,56,57,57,58,59,60,61,62,63,64,65,66,67,58,58,58,58,58,59,59,60,61,61,
        62,63,63,63,63,64,64,64,65,66,67,67,67,68,69,70,71,72,73,74,75,76,77,68,99,69,69,69,70,70,70,70,71,71,72,73,74,75,76,77,78,79,
        80,81,82,83,84,85,86,87,78,79,79,79,80,81,81,81,81,82,83,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,88,89,90,91,92,93,94,95,
        96,97,98,99,100,101,102,103,104,105,106,107,98,98,100,101,101,102,103,104,104,105,106,107];

        var words =
        ["back", "bake", "meat", "beaches", "ben", "big", "pope", "brown", "mine", "bun", "sack", "black", "crack", "brake", "cake",
        "lake", "rake", "feet", "sweet", "wheat", "peaches", "men", "hen", "ten", "pig", "rope", "soap", "town", "clown", "crown",
        "wine", "pine", "nine", "son", "nun", "sun", "bushes", "cages", "cloak", "cold", "cream", "cub", "day", "dish", "dome",
        "donkey", "brushes", "pages", "oak", "yolk", "smoke", "gold", "bald", "steam", "pub", "tub", "club", "tray", "play", "fish",
        "home", "gnome", "monkey", "turkey", "dot", "dump", "dust", "hose", "farm", "fin", "flour", "foil", "liquid", "green", "hot",
        "pot", "jump", "rust", "nose", "clothes", "arm", "bin", "pin", "tin", "tower", "flower", "shower", "soil", "oil", "squid",
        "queen", "clean", "hair", "hall", "head", "hell", "hip", "hop", "house", "lead", "kick", "kid", "stair", "square", "chair",
        "bear", "tall", "fall", "ball", "wall", "red", "bed", "shed", "bread", "smell", "spell", "well", "bell", "lip", "tip", "zip",
        "ship", "mop", "pop", "top", "stop", "chop", "shop", "mouse", "read", "seed", "weed", "sick", "tick", "click", "brick", "lid",
        "land", "moss", "mouth", "log", "look", "mane", "mash", "nap", "noodle", "owl", "band", "hand", "sand", "cross", "south",
        "cog", "dog", "fog", "hog", "frog", "book", "cook", "brain", "drain", "rain", "train", "plane", "cash", "rap", "tap",
        "poodle", "towel", "pink", "potato", "potatoes", "price", "rag", "ram", "roast", "page", "path", "throne", "ink", "sink",
        "wink", "tomato", "tomatoes", "dice", "ice", "tag", "flag", "pram", "lamb", "toast", "cage", "bath", "stone", "cone", "rug",
        "shape", "shark", "sheep", "toad", "king", "vest", "wax", "weather", "wet", "bug", "hug", "jug", "mug", "plug", "grape", "tape",
        "park", "sleep", "sweep", "road", "ring", "swing", "wing", "spring", "west", "nest", "chest", "fax", "feather", "jet", "vet",
        "net", "mad", "can", "bat", "hut", "car", "leg", "six", "box", "ant", "wrench", "sad", "third", "fan", "man", "pan", "cat",
        "hat", "mat", "rat", "nut", "foot", "star", "peg", "kiss", "fox", "plant", "bench", "dress", "lock", "duck", "bill", "gift",
        "plum", "glass", "bank", "shelf", "three", "chess", "rock", "sock", "clock", "truck", "hill", "mill", "pill", "grill", "lift",
        "thumb", "drum", "class", "tank", "elf", "tree", "wave", "plate", "wood", "kite", "fire", "cube", "beach", "bow", "girl",
        "deer", "grave", "eight", "mud", "knight", "tyre", "tube", "peach", "snow", "pearl", "spear", "balloon", "bird", "puzzle",
        "calf", "fountain", "britain", "boat", "goal", "door", "pancake", "moon", "spoon", "bubble", "half", "scarf", "mountain",
         "curtain", "coat", "goat", "bowl", "four", "snowflake"];


        function shuffleBoth()
        {
            var j, x, i;
            for (i = groups.length - 1; i > 0; i--) 
            {
                j = Math.floor(Math.random() * (i + 1));
        
                //First array
                x = groups[i];
                groups[i] = groups[j];
                groups[j] = x;
                
                //Second Array
                x = words[i];
                words[i] = words[j];
                words[j] = x;
            }
        }

        function getRhymingPair(word)
        {
          //Get the rhyming group of a given word
          var rhymingGroup = -1;
          for(var x = 0; x < words.length; x++)
          {
            if(word == words[x])
            {
              rhymingGroup = groups[x];
              break;
            }
          }

          //Loop through rhyming groups list until we have a word with the same rhyming group
          for(var i = 0; i < groups.length; i++)
          {
            if(groups[i] == rhymingGroup)
            {
              if(words[i] != word)
              {
                return words[i];
              }
            }
          }

          return "error";
        }

        // ******************************************************************************************************************************
        // ***************************************************** END OF HARD CODED ******************************************************
        // ******************************************************************************************************************************



        // Loop through all baseWords
        shuffleBoth();
        groupWords = new Array();
        for(var i=0; i<baseWords.length; i++)
        {
        	groupWords[i] = new Array();
            groupWords[i][0] = baseWords[i];
            groupWords[i][1] = getRhymingPair(baseWords[i]);
        }

        // Log complete word index
        console.log(groupWords);

        // Move to playing state
        context.state.start('play');
    }
        ).fail(function()
    {
        console.log('i failed');
    });
};


// record time on this menu, if too big -> show timeout message + exit
LoadingScreen.prototype.updateTime = function ()
{
	// If reached timeout point, show error
	if(timeCounter > timeoutPoint)
	{
		// Exit
		this.state.start('start');
	}

	// increase time
	timeCounter++;

	// log counter
	console.log('Timeout in '+(timeoutPoint - timeCounter));
};