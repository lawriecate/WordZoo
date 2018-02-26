//global variables
var elephant = elephant|| {};


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
	this.load.pack('PlayScreen', '/games/elephant/assets/pack.json');

	// Load items
	for(var i = 0; i < matchingWords.length; i++)
	{
		var temp = matchingWords[i];
		this.load.image(temp[0],'/images/words/'+temp[0]+'.png');
	}

	// Clear + expand words list
	wordHistory = new Array ();
	clickHistory = new Array ();
	for(var i = 0; i < matchingWords.length; i++)
	{
		wordHistory[i] = new Array ();
	}
};

PlayScreen.prototype.create = function ()
{
	// load background
    background = this.game.add.tileSprite(0, 0, 1920, 1080, 'Background');
    background.scale.setTo(1.51, 1.51);

    //Set up easels
	easel1 = this.add.button(98, 225, 'easel', this.click0, this, null, null, null, null);
	easel2 = this.add.button(528, 225, 'easel', this.click1, this, null, null, null, null);
	easel3 = this.add.button(963, 225, 'easel', this.click2, this, null, null, null, null);

    easel1.scale.setTo(1.35, 1.3);
    easel2.scale.setTo(1.35, 1.3);
    easel3.scale.setTo(1.35, 1.3);


	// Add Lives box
	livesBox = this.add.sprite(0, 0, 'Lives', 0);

	// Timer
	timeLeft = startingTime;
	timer = this.time.create(false);
	timer.loop(Phaser.Timer.SECOND, this.updateTime, this);


    //Add in text
    scoreText = this.game.add.text(1000, 1000, "Score: 0", bigStyle);
    scoreText.anchor.setTo(0.5);
    scoreText.addColor('#FF9933', 0);

    winnerItemText = this.game.add.text(1590, 315, "", medStyle);
    winnerItemText.anchor.setTo(0.5);
    winnerItemText.addColor('#FF9933', 0);

    timeText = this.game.add.text(400, 1000, "Time Remaining: "+startingTime, bigStyle);
    timeText.anchor.setTo(0.5);
	timeText.addColor('#FF9933', 0);


    //If user closes window, record data
    //window.onbeforeunload = function()
    //{
    //    this.recordData();
    //};

    // Record screen clicks
    this.game.input.onDown.add(function(touchStart) {
    		this.recordScreenPress(touchStart.clientX, touchStart.clientY);
    	}, this);

    // Record Game Start Time
    var time = new Date();
    gameStartTime = time.toUTCString();

    // Start Game
    livesLeft = startingLives;
    score = 0;
	this.reset();
	timer.start();
};


// onClick any stones
PlayScreen.prototype.reset = function (clickedLane)
{
	// Get random matching pair
	matchingRandom = Math.floor((Math.random() * matchingWords.length) + 0);
	var matchingPair = matchingWords[matchingRandom];

	// Get random position to put pair on
	winningLane = Math.floor((Math.random() * 3) + 0);

	// Which word to show in text vs show in picture
	var binary = Math.floor((Math.random() * 1) + 0);


	// Get 2 random values for incorrect choices
	var RandomA = Math.floor((Math.random() * matchingWords.length) + 0);
	var RandomB = Math.floor((Math.random() * matchingWords.length) + 0);


	// Make sure RandomA isn't the correct answer
	while(matchingRandom == RandomA)
	{
		RandomA = Math.floor((Math.random() * matchingWords.length) + 0);
	}


	// Make sure they aren't the same / the correct answer
	while(RandomA == RandomB || matchingRandom == RandomB)
	{
		RandomB = Math.floor((Math.random() * matchingWords.length) + 0);
	}


	// Get names from incorrect
	RandomA = matchingWords[RandomA];
	RandomB = matchingWords[RandomB];


	// Set pics/text
	switch(winningLane){
		case 0: winningLane == 0;

			// Set correct
			if(binary == 0)
			{
				winnerItemText.setText(matchingPair[0]);
				winnerText = matchingPair[0];
				item0 = this.game.add.sprite(120, 250, matchingPair[1]);
				item0.scale.setTo(0.5,0.5);
			}
			else
			{
				winnerItemText.setText(matchingPair[1]);
				winnerText = matchingPair[1];
				item0 = this.game.add.sprite(120, 250, matchingPair[0]);
				item0.scale.setTo(0.5,0.5);
			}

			// Set incorrect
			item1 = this.game.add.sprite(555, 250, RandomA[0]);
			item2 = this.game.add.sprite(998, 250, RandomB[0]);
			item1Text = RandomA[0];
			item2Text = RandomB[0];
			break;

		case 1: winningLane == 1;

			// Set correct
			if(binary == 0)
			{
				winnerItemText.setText(matchingPair[0]);
				winnerText = matchingPair[0];
				item1 = this.game.add.sprite(555, 250, matchingPair[1]);
			}
			else
			{
				winnerItemText.setText(matchingPair[1]);
				winnerText = matchingPair[1];
				item1 = this.game.add.sprite(555, 250, matchingPair[0]);
			}

			// Set incorrect
			item0 = this.game.add.sprite(120, 250, RandomA[0]);
			item2 = this.game.add.sprite(998, 250, RandomB[0]);
			item0Text = RandomA[0];
			item2Text = RandomB[0];
			break;

		case 2: winningLane == 2;

			// Set correct
			if(binary == 0)
			{
				winnerItemText.setText(matchingPair[0]);
				winnerText = matchingPair[0];
				item2 = this.game.add.sprite(998, 250, matchingPair[1]);
			}
			else
			{
				winnerItemText.setText(matchingPair[1]);
				winnerText = matchingPair[1];
				item2 = this.game.add.sprite(998, 250, matchingPair[0]);
			}

			// Set incorrect
			item0 = this.game.add.sprite(120, 250, RandomA[0]);
			item1 = this.game.add.sprite(555, 250, RandomB[0]);
			item0Text = RandomA[0];
			item1Text = RandomB[0];
			break;
	}


    // Set timer for time taken to answer
    startTime = Math.floor(Date.now());
};



// onClick buttons
PlayScreen.prototype.click0 = function ()
{
	this.validate(0);
};
PlayScreen.prototype.click1 = function ()
{
	this.validate(1);
};
PlayScreen.prototype.click2 = function ()
{
	this.validate(2);
};


// validate user choice
PlayScreen.prototype.validate = function (clickedLane)
{
	// Kill items
	item0.kill();
	item1.kill();
	item2.kill();


	// check if correct
	if(winningLane == clickedLane)
	{
		// increase score
		score++;
		this.updateScore();

		// record word answers
		var finishTime = Math.floor(Date.now());
		wordHistory[matchingRandom][wordHistory[matchingRandom].length] = [null, true, finishTime - startTime];

		// reset
		this.reset();
	}
	else
	{
		// lose a life
		livesLeft--;
		this.checkLives();

		// record word answers
		var clickedItemText;
		if(clickedLane == 0)
		{
			clickedItemText = item0Text;
		}
		else if(clickedLane == 1)
		{
			clickedItemText = item1Text;
		}
		else
		{
			clickedItemText = item2Text;
		}

		// record answer
		var finishTime = Math.floor(Date.now());
		wordHistory[matchingRandom][wordHistory[matchingRandom].length] = [clickedItemText, false, finishTime - startTime];

		// reset
		this.reset();
	}
};





// display current time to screen (with --)
PlayScreen.prototype.updateTime = function ()
{
	// If no time remaining, game finished
	if(timeLeft <= 0)
	{
		// Record Data + Exit
		this.recordData();
	}

	// show current time
	timeText.setText("Time Remaining: "+ --timeLeft, true);
};


// display current score to screen
PlayScreen.prototype.updateScore = function ()
{
	scoreText.setText("Score: "+score, true);
};


// Check how many lives remaining, show correct frame
PlayScreen.prototype.checkLives = function()
{
	if(livesLeft <= 0)
	{
		livesBox = this.add.sprite(0, 0, 'Lives', 3);

		// Record Data + Exit
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


// Game has finished, record data + move to finish state
PlayScreen.prototype.endGame = function()
{
	this.state.start('finish');
};
