// Global variables
var zebra = zebra|| {}; 


function PlayScreen() 
{	
	Phaser.State.call(this);
}

/** @type Phaser.State */
var PlayScreen_proto = Object.create(Phaser.State.prototype);
PlayScreen.prototype = PlayScreen_proto;
PlayScreen.prototype.constructor = PlayScreen;

PlayScreen.prototype.init = function () 
{	
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.scale.pageAlignHorizontally = true;
	this.scale.pageAlignVertically = true;
	this.stage.backgroundColor = '#ffffff';	
};

PlayScreen.prototype.preload = function () 
{	
	this.load.pack('PlayScreen', '/games/zebra/assets/pack.json');

	// Load items
	for(var i = 0; i < words.length; i++)
	{
		this.load.image(words[i] ,'/images/words/'+words[i]+'.png');
	}		

	// Clear + expand words list
	wordHistory = new Array ();
	clickHistory = new Array ();
	for(var i = 0; i < words.length; i++)
	{
		wordHistory[i] = new Array ();
	}	
};

PlayScreen.prototype.create = function () 
{	
	// Add background
	background = this.add.tileSprite(0, 0, 1920, 1080, 'Background');
	background.scale.setTo(1.51, 1.51);
	
	// Add zebra + walking animation
	zebra = this.game.add.sprite(50, playerLanePositions[0], 'zebra');
	zebra.scale.setTo(1.5, 1.5);
    zebraWalk = zebra.animations.add('right', [0, 1, 2, 3], 10, true);
    zebraWalk.play(10,true);
	

    //	Correct item text box
	var correctBox = this.add.sprite(740, 100, 'ScoreBackground');
	correctBox.scale.setTo(3, 1.5);
	
	// Correct item text
	correctItemText = this.game.add.text(960, 160, "", bigStyle);
    correctItemText.anchor.setTo(0.5);
    correctItemText.addColor('#FF9933', 0);
	 

	// Add Score box + score value
	var scoreBox = this.add.sprite(1664, 182, 'ScoreBackground');
	scoreBox.scale.setTo(1.5, 1.5);
	scoreText = this.add.text(1710, 225, "Score: "+score, smallStyle);
	scoreText.addColor('#FF9933', 0);
	
	// Add Time box + time value
	var timeBox = this.add.sprite(1664, 32, 'ScoreBackground');
	timeBox.scale.setTo(1.5, 1.5);
	timeText = this.add.text(1710, 75, "Time: "+startingTime, smallStyle);
	timeText.addColor('#FF9933', 0);

	// Add Lives box
	livesBox = this.add.sprite(0, 0, 'Lives', 0);
	
	// Time
	timeLeft = startingTime;
	timer = this.time.create(false);
	timer.loop(Phaser.Timer.SECOND, this.updateTime, this);
	timer.start();


	// Keyboard controls
	this.game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(this.moveUp, this);
  	this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(this.moveDown, this);
  	this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(this.moveRight, this);

    // touchscreen controls
    this.game.input.onDown.add(function(touchStart) { 
    	startPoint = touchStart.clientY; this.recordScreenPress(touchStart.clientX, touchStart.clientY);
    }, this);
    this.game.input.onUp.add(function(touchEnd) { endPointY = touchEnd.clientY; endPointX = touchEnd.clientX;
	    if((startPoint - endPointY) > 100) 
	    {
	    	this.moveUp();
	    } 
	    else if((endPointY - startPoint) > 100) 
	    {
	    	this.moveDown();
	    } 
	    else if((endPointX - startPoint) > 10) 
	    {
	    	this.moveRight();
	    }
  	}, this);
  	
   
    // Record Game Start Time
    var time = new Date();
    gameStartTime = time.toUTCString();


	// Reset starting values for each playthrough
	normalSpeed = speed;
	currentSpeed = normalSpeed;
	timeLeft = startingTime;
	score = 0;
	livesLeft = startingLives;
	
	// Start game
	this.spawnItems();
};


// display current time to screen (with --)
PlayScreen.prototype.updateTime = function ()
{	
	// update game
	this.update();

	// If no time remaining, game finished
	if(timeLeft <= 0)
	{
		this.recordData();
	}
	
	timeText.setText("Time: "+ --timeLeft, true);	
};


// display current score to screen
PlayScreen.prototype.updateScore = function ()
{	
	scoreText.setText("Score: "+score, true);
};




// Move Zebra up a row
PlayScreen.prototype.moveUp = function ()
{	
	// if in top lane, can't move higher -> return
	if(currentLane == 0)
	{
		return;
	}

	// else, more Zebra to row above;
	currentLane--;
	zebra.y = playerLanePositions[currentLane];
};


// Move Zebra down a row
PlayScreen.prototype.moveDown = function ()
{	
	// if in top lane, can't move higher -> return
	if(currentLane == 2)
	{
		return;
	}

	// else, more Zebra to row below;
	currentLane++;
	zebra.y = playerLanePositions[currentLane];
};


// Move Zebra right
PlayScreen.prototype.moveRight = function ()
{	
	// move screen at 20 speed or double playspeed, which ever is higher
	if(normalSpeed < 10)
	{
		currentSpeed = 20;
	}
	else
	{
		currentSpeed = normalSpeed * 2;
	}
};




// Spawn items
PlayScreen.prototype.spawnItems = function ()
{	
	// random index for correct item position
	correctLane = Math.floor(Math.random() * 3);

	// random indexs for words
	correctWordIndex = Math.floor(Math.random() * words.length);
	correctName = words[correctWordIndex];
	var incorrectItem1 = words[Math.floor(Math.random() * words.length)];
	var incorrectItem2 = words[Math.floor(Math.random() * words.length)];

	// While 2 are the same, reset util you get unique
	while(correctName == incorrectItem1 || correctName == incorrectItem2 || incorrectItem1 == incorrectItem2)
	{
		incorrectItem1 = words[Math.floor(Math.random() * words.length)];
		incorrectItem2 = words[Math.floor(Math.random() * words.length)];
	}

	// Set text values
    correctItemText.text = correctName;
	if(correctLane == 0)
	{
    	item0 = this.game.add.sprite(1920, itemLanePositions[0], correctName);
    	TOPraw = correctName;

		item1 = this.add.sprite(1920, itemLanePositions[1], incorrectItem1);
		MIDraw = incorrectItem1;

		item2 = this.add.sprite(1920, itemLanePositions[2], incorrectItem2);
		BOTraw = incorrectItem2;
	}
	else if(correctLane == 1)
	{
		item0 = this.game.add.sprite(1920, itemLanePositions[0], incorrectItem1);
    	TOPraw = incorrectItem1;

		item1 = this.add.sprite(1920, itemLanePositions[1], correctName);
		MIDraw = correctName;

		item2 = this.add.sprite(1920, itemLanePositions[2], incorrectItem2);
		BOTraw = incorrectItem2;
	}
	else
	{
		item0 = this.game.add.sprite(1920, itemLanePositions[0], incorrectItem1);
    	TOPraw = incorrectItem1;

		item1 = this.add.sprite(1920, itemLanePositions[1], incorrectItem2);
		MIDraw = incorrectItem2;

		item2 = this.add.sprite(1920, itemLanePositions[2], correctName);
		BOTraw = correctName;
	}


	// Set scales
	item0.scale.setTo(1.5, 1.5);
	item1.scale.setTo(1.5, 1.5);
	item2.scale.setTo(1.5, 1.5);

    //This ensures the player never goes behind the objects once they are spawned
    this.world.bringToTop(zebra);

    // Set timer for time taken to answer
    startTime = Math.floor(Date.now());
}



// Update
PlayScreen.prototype.update = function ()
{	
    if (item0.x <= 120) 
    {
    	// if correct
    	if(correctLane == currentLane)
    	{
			// record word answers
			var finishTime = Math.floor(Date.now());
			wordHistory[correctWordIndex][wordHistory[correctWordIndex].length] = [null, true, finishTime - startTime];

    		// increase score + normalSpeed
    		score++;
    		normalSpeed++;

    		// update current speed
    		currentSpeed = normalSpeed;

    		// reset items
    		item0.kill();
        	item1.kill();
        	item2.kill();
    		this.spawnItems();
    	}
    	// if incorrect
    	else
    	{
    		// get incorrect answer
    		var actualWord;
    		if(currentLane == 0)
    		{
    			actualWord = TOPraw;
    		}
    		else if(currentLane == 1)
    		{
    			actualWord = MIDraw;
    		}
    		else
    		{
    			actualWord = BOTraw;
    		}

			// record word answers
			var finishTime = Math.floor(Date.now());
			wordHistory[correctWordIndex][wordHistory[correctWordIndex].length] = [actualWord, false, finishTime - startTime];

    		// lose a life
    		livesLeft--;
    		this.checkLives();


    		// speed reduction
    		if(normalSpeed >= 7 && normalSpeed <= 12)
    		{
    			normalSpeed -= 2;
    		}
    		else if(normalSpeed > 12)
    		{
    			normalSpeed -5;
    		}

    		// update current speed
    		currentSpeed = normalSpeed;


    		// reset items
    		item0.kill();
        	item1.kill();
        	item2.kill();
    		this.spawnItems();
    	}
    }

    //Kills items when they move off the screen.
    if (item0.x <= 0 || item1.x <= 0 || item2.x <= 0) 
    {
        item0.kill();
        item1.kill();
        item2.kill();
        this.spawnItems();
    }

    //Moves item across screen at currentSpeed
    background.tilePosition.x -= (currentSpeed*2)/3;
    item0.x -= currentSpeed;
    item1.x -= currentSpeed;
    item2.x -= currentSpeed;

    //check score
    this.updateScore();
}

// Check how many lives remaining, show correct frame
PlayScreen.prototype.checkLives = function() 
{
	if(livesLeft <= 0)
	{
		livesBox = this.add.sprite(0, 0, 'Lives', 3);
		this.recordData();
	}
	else if(livesLeft == 1)
	{
		livesBox = this.add.sprite(0, 0, 'Lives', 2);
	}
	else if(livesLeft == 2)
	{
		livesBox = this.add.sprite(0, 0, 'Lives', 1);
	}
};

// Record screen clicks
PlayScreen.prototype.recordScreenPress = function(x, y) 
{
	// Get current time
	var timeStamp = new Date(); 
	timeStamp.toUTCString();

	// Add to records
	clickHistory[clickHistory.length] = [x, y, timeStamp];
};

// Record statistical data from game
PlayScreen.prototype.recordData = function()
{
	// Prep array
	var output = new Array();
	for(var i=0; i<10; i++)
	{
		output[i] = 0.5;
	}


	// for each word tested
	for(var i=0; i<wordHistory.length; i++)
	{
		// if never tested, set to default
		if(wordHistory[i].length == 0)
		{
			output[i] = 0.5
		}
		else
		{
			var rightCounter = 0;
			var wrongCounter = 0;

			// for each answer of a word
			for(var j=0; j<wordHistory[i].length; j++)
			{
				// if correct, record correct
				if(wordHistory[i][j][1])
				{
					rightCounter++;
				}
				else
				{
					wrongCounter++;
				}
			}

			// Calculate output value
			output[i] = Math.round((rightCounter / (rightCounter+ wrongCounter)) * 100) / 100;;
		}
	}


	console.log(output);
/*
	// Send out
	console.log(output);
	$.post('end',{words:output, clicks:clickHistory, score:score}, function(data)
	{
  		// Log returned data
  		console.log("RETURNED" + data);
	});
*/

	// End
	this.endGame();
};

// Game has finished, move to finish state
PlayScreen.prototype.endGame = function() 
{
	this.state.start('finish');
};