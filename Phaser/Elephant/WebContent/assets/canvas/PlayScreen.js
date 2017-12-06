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
	this.load.pack('PlayScreen', 'assets/pack.json');	
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
    scoreText = this.game.add.text(1700, 30, "Score: 0", smallStyle);    
    scoreText.anchor.setTo(0.5);

    winnerItemText = this.game.add.text(1590, 315, "", medStyle);
    winnerItemText.anchor.setTo(0.5);

    timeText = this.game.add.text(1070, 30, "Time: "+startingTime, smallStyle);
    timeText.anchor.setTo(0.5);


    //If user closes window, record data
    window.onbeforeunload = function() 
    {
        this.recordData();
    };
    
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
    numWordHistory = 0;
    numClickHistory = 0;
	this.reset();
	timer.start();
};


// onClick any stones
PlayScreen.prototype.reset = function (clickedLane)
{	
	// Get random matching pair
	var matchingRandom = Math.floor((Math.random() * matchingWords.length) + 0);
	var matchingPair = matchingWords[matchingRandom];

	// Get random position to put pair on
	var position = Math.floor((Math.random() * 3) + 0);
	
	// Which word to show in text vs show in picture
	var binary = Math.floor((Math.random() * 1) + 0);


	// Get 2 random values for incorrect choices
	var RandomA = Math.floor((Math.random() * randomWords.length) + 0);
	var RandomB = Math.floor((Math.random() * randomWords.length) + 0);

	// Make sure they aren't the same 
	while(RandomA == RandomB)
	{
		RandomB = Math.floor((Math.random() * randomWords.length) + 0);
	}


	// Set pics/text
	switch(position){
		case 0: position == 0;
			
			// Set correct
			winningLane = 0;
			if(binary == 0)
			{
				winnerItemText.setText(matchingPair[0]);
				winnerText = matchingPair[0];
				item0 = this.game.add.sprite(120, 250, matchingPair[1]);
			}
			else
			{
				winnerItemText.setText(matchingPair[1]);
				winnerText = matchingPair[1];
				item0 = this.game.add.sprite(120, 250, matchingPair[0]);
			}		

			// Set incorrect
			item1 = this.game.add.sprite(555, 250, randomWords[RandomA]);
			item2 = this.game.add.sprite(998, 250, randomWords[RandomB]);
			item1Text = randomWords[RandomA];
			item2Text = randomWords[RandomB];
			break;

		case 1: position == 1;
		
			// Set correct
			winningLane = 1;
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
			item0 = this.game.add.sprite(120, 250, randomWords[RandomA]);
			item2 = this.game.add.sprite(998, 250, randomWords[RandomB]);
			item0Text = randomWords[RandomA];
			item2Text = randomWords[RandomB];
			break;

		case 2: position == 2;
		
			// Set correct
			winningLane = 2;
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
			item0 = this.game.add.sprite(120, 250, randomWords[RandomA]);
			item1 = this.game.add.sprite(555, 250, randomWords[RandomB]);
			item0Text = randomWords[RandomA];
			item1Text = randomWords[RandomB];
			break;
	}

	// Scale items
    item0.scale.setTo(3, 3);
    item1.scale.setTo(3, 3);
    item2.scale.setTo(3, 3);
    
    
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
		wordHistory[numWordHistory] = [winnerText, null, true, finishTime - startTime];
		numWordHistory++;
		
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
		
		var finishTime = Math.floor(Date.now());
		wordHistory[numWordHistory] = [winnerText, clickedItemText, false, finishTime - startTime];		
		numWordHistory++;

		// reset
		this.reset();
	}
};





// display current time to screen (with --)
PlayScreen.prototype.updateTime = function ()
{	
	// If no time remaining, game finished
	if(timeLeft <= 0){
		this.recordData();
		this.endGame();
	}
	
	// show current time
	timeText.setText("Time: "+ --timeLeft, true);	
};


// display current score to screen
PlayScreen.prototype.updateScore = function ()
{	
	scoreText.setText("Score: "+score, true);
};


// Check how many lives remaining, show correct frame
PlayScreen.prototype.checkLives = function() 
{
	console.log('checkLives: '+livesLeft);

	if(livesLeft <= 0)
	{
		livesBox = this.add.sprite(0, 0, 'Lives', 3);
		
		// Record Data + Exit
		this.recordData();
		this.endGame();
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
	clickHistory[numClickHistory++] = [x, y, timeStamp];
};

// Record statistical data from game
PlayScreen.prototype.recordData = function() 
{
	// Save gameStartTime
	// Save score
	// Save timeLeft
	// Save livesLeft
	// Save wordHistory
	// Save clickHistory 
};


// Game has finished, move to finish state
PlayScreen.prototype.endGame = function() 
{
	this.state.start('finish');
};