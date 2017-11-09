// Global variables
var giraffe = giraffe|| {}; 



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
	// Add background
	background = this.add.tileSprite(0, 0, 1920, 1080, 'Background');
	background.scale.setTo(1.51, 1.51);
	
	// Add giraffe
	giraffe = this.game.add.sprite(playerLanePositionsX[0], playerLanePositionsY[0], 'GiraffeAnimation', 0);
	giraffe.scale.setTo(1.5, 1.5);

	// giraffe animations
    giraffeFall = giraffe.animations.add('fall', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 10);
    giraffeFall.onComplete.add(function () { giraffe.frame = 0; this.leaveStone(); }, this);
	giraffeWalk0 = this.game.add.tween(giraffe).to({x: '+290'}, 800, Phaser.Easing.Linear.None, false);
	giraffeWalk0.onComplete.add(function (){currentColoumn++;}, this);
	giraffeWalk1 = this.game.add.tween(giraffe).to({x: '+290'}, 800, Phaser.Easing.Linear.None, false);
	giraffeWalk1.onComplete.add(function (){currentColoumn++;}, this);
	giraffeWalk2 = this.game.add.tween(giraffe).to({x: '+290'}, 800, Phaser.Easing.Linear.None, false);
	giraffeWalk2.onComplete.add(function (){this.reset();}, this);


    // Add word headings
    titleA = this.add.sprite(260, 110, 'wordDisplay');
    titleA.scale.setTo(1.5, 1.5);
    titleTextA = this.add.text(410, 150, "Word", bigStyle);

    titleB = this.add.sprite(860, 110, 'wordDisplay');
    titleB.scale.setTo(1.5, 1.5);
    titleTextB = this.add.text(1010, 150, "Word", bigStyle);
    
    titleC = this.add.sprite(1480, 110, 'wordDisplay');
    titleC.scale.setTo(1.5, 1.5);
    titleTextC = this.add.text(1630, 150, "Word", bigStyle);


    // First stones word text
    wordA0 = this.add.text(410, 360, "Word", medStyle);
	wordA1 = this.add.text(410, 550, "Word", medStyle);
    wordA2 = this.add.text(410, 750, "Word", medStyle);
    wordA3 = this.add.text(410, 950, "Word", medStyle);

    // Second stones word text
    wordB0 = this.add.text(1020, 360, "Word", medStyle);
	wordB1 = this.add.text(1020, 560, "Word", medStyle);
    wordB2 = this.add.text(1020, 770, "Word", medStyle);
    wordB3 = this.add.text(1020, 960, "Word", medStyle);

    // Third stones word text
    wordC0 = this.add.text(1630, 360, "Word", medStyle);
	wordC1 = this.add.text(1630, 560, "Word", medStyle);
    wordC2 = this.add.text(1630, 770, "Word", medStyle);
    wordC3 = this.add.text(1630, 960, "Word", medStyle);


	// Buttons behind frist stones
	buttonA0 = this.add.button(300, 300, 'Empty', this.clickA0, this, null, null, null, null);
	buttonA0.scale.setTo(2, 2);
	buttonA1 = this.add.button(300, 500, 'Empty', this.clickA1, this, null, null, null, null);
	buttonA1.scale.setTo(2, 2);
	buttonA2 = this.add.button(300, 700, 'Empty', this.clickA2, this, null, null, null, null);
	buttonA2.scale.setTo(2, 2);
	buttonA3 = this.add.button(300, 900, 'Empty', this.clickA3, this, null, null, null, null);
	buttonA3.scale.setTo(2, 2);

	// Buttons behind second stones
	buttonB0 = this.add.button(910, 310, 'Empty', this.clickB0, this, null, null, null, null);
	buttonB0.scale.setTo(2, 2);
	buttonB1 = this.add.button(910, 520, 'Empty', this.clickB1, this, null, null, null, null);
	buttonB1.scale.setTo(2, 2);
	buttonB2 = this.add.button(910, 720, 'Empty', this.clickB2, this, null, null, null, null);
	buttonB2.scale.setTo(2, 2);
	buttonB3 = this.add.button(910, 910, 'Empty', this.clickB3, this, null, null, null, null);
	buttonB3.scale.setTo(2, 2);

	// Buttons behind frist stones
	buttonC0 = this.add.button(1520, 310, 'Empty', this.clickC0, this, null, null, null, null);
	buttonC0.scale.setTo(2, 2);
	buttonC1 = this.add.button(1520, 520, 'Empty', this.clickC1, this, null, null, null, null);
	buttonC1.scale.setTo(2, 2);
	buttonC2 = this.add.button(1520, 720, 'Empty', this.clickC2, this, null, null, null, null);
	buttonC2.scale.setTo(2, 2);
	buttonC3 = this.add.button(1520, 910, 'Empty', this.clickC3, this, null, null, null, null);
	buttonC3.scale.setTo(2, 2);


	// Add Score value
	scoreText = this.add.text(1645, 30, "Score: "+score, smallStyle);
	
	// Add Time value
	timeText = this.add.text(980, 30, "Time: "+time, smallStyle);
	
	// Add Lives box
	livesBox = this.add.sprite(0, 0, 'Lives', 0);
	
	// Time
	timeLeft = time;
	timer = this.time.create(false);
	timer.loop(Phaser.Timer.SECOND, this.updateTime, this);
	timer.start();


	// Set starting values
	currentColoumn = 0;
	score = 0;
	this.updateScore();
	livesLeft = startingLives;


	// Fill words to start game
	this.spawnWords();
};



// display current time to screen (with --)
PlayScreen.prototype.updateTime = function ()
{	
	// If no time remaining, game finished
	if(timeLeft <= 0){
		this.endGame();
	}
	
	timeText.setText("Time: "+(--timeLeft), true);	
};


// display current score to screen
PlayScreen.prototype.updateScore = function ()
{	
	scoreText.setText("Score: "+score, true);
};



// show/hide coloumn headings (used during background loop animation)
PlayScreen.prototype.showWords = function (show)
{	
	// Heading boxes
	titleA.visible = show;
	titleB.visible = show;
	titleC.visible = show;

	// Heading text
	titleTextA.visible = show;
	titleTextB.visible = show;
	titleTextC.visible = show;

	// First coloumn
	wordA0.visible = show;
	wordA1.visible = show;
	wordA2.visible = show;
	wordA3.visible = show;

	// Second coloumn
	wordB0.visible = show;
	wordB1.visible = show;
	wordB2.visible = show;
	wordB3.visible = show;

	// Third coloumn
	wordC0.visible = show;
	wordC1.visible = show;
	wordC2.visible = show;
	wordC3.visible = show;
};



// Move giraffe to new position
PlayScreen.prototype.moveGiraffe = function (posX, posY)
{	
	giraffe.x = posX;
	giraffe.y = posY;
};

// select the correct giraffeWalk animation
PlayScreen.prototype.leaveStone = function ()
{	
	if(currentColoumn == 0)
	{
		giraffeWalk0.start();
	}
	else if(currentColoumn == 1)
	{
		giraffeWalk1.start();
	}
	else if(currentColoumn == 2)
	{
		giraffeWalk2.start();
	}
};



// Generate incorrect words from word bank to fill other stones
PlayScreen.prototype.genIncorrect = function ()
{	
	// Get random indexs
	var index1 = Math.floor((Math.random() * randomWords.length) + 0);
	var index2 = Math.floor((Math.random() * randomWords.length) + 0);
	var index3 = Math.floor((Math.random() * randomWords.length) + 0);

	// Make sure 2 isn't the same as 1
	while(index2 == index1)
	{
		index2 = Math.floor((Math.random() * randomWords.length) + 0);
	}

	// Make sure 3 isn't the same as 2 or 1
	while(index3 == index2 || index3 == index1)
	{
		index3 = Math.floor((Math.random() * randomWords.length) + 0);
	}

	// Store incorrect
	var incorrectWords = [0,0,0];
	incorrectWords[0] = randomWords[index1];
	incorrectWords[1] = randomWords[index2];
	incorrectWords[2] = randomWords[index3];


	// Return
	return incorrectWords;
};



// Spawn words
PlayScreen.prototype.spawnWords = function ()
{	
	// Generate 3 different word pairs for each coloumn
	var wordPairA = Math.floor((Math.random() * matchingWords.length) + 0);
	var wordPairB = Math.floor((Math.random() * matchingWords.length) + 0);
	var wordPairC = Math.floor((Math.random() * matchingWords.length) + 0);

	// Make sure B isn't the same as A
	while(wordPairB == wordPairA)
	{
		wordPairB = Math.floor((Math.random() * matchingWords.length) + 0);
	}

	// Make sure C isn't the same as B or A
	while(wordPairC == wordPairB || wordPairC == wordPairA)
	{
		wordPairC = Math.floor((Math.random() * matchingWords.length) + 0);
	}



	//-------------------------------------
	//---------- First Stones -------------
	//-------------------------------------

	// Get pair of words from
	var pair = matchingWords[wordPairA];

	// Set coloumn header
	titleTextA.setText(pair[0]);

	// Get incorrect words to fill other stones
	var incorrectWords = this.genIncorrect();

	// Generate and set at random position
	var randomPosition = Math.floor((Math.random() * 4) + 0);
	switch(randomPosition){
		case 0: randomPosition == 0;
			wordA0.setText(pair[1]);
			wordA1.setText(incorrectWords[0]);
			wordA2.setText(incorrectWords[1]);
			wordA3.setText(incorrectWords[2]);
			correctLane[0] = 0;
			break;

		case 1: randomPosition == 1;
			wordA0.setText(incorrectWords[0]);
			wordA1.setText(pair[1]);
			wordA2.setText(incorrectWords[1]);
			wordA3.setText(incorrectWords[2]);
			correctLane[0] = 1;
			break;

		case 2: randomPosition == 2;
			wordA0.setText(incorrectWords[0]);
			wordA1.setText(incorrectWords[1]);
			wordA2.setText(pair[1]);
			wordA3.setText(incorrectWords[2]);
			correctLane[0] = 2;
			break;

		case 3: randomPosition == 3;
			wordA0.setText(incorrectWords[0]);
			wordA1.setText(incorrectWords[1]);
			wordA2.setText(incorrectWords[2]);
			wordA3.setText(pair[1]);
			correctLane[0] = 3;
			break;
	}



	//--------------------------------------
	//---------- Second Stones -------------
	//--------------------------------------

	// Get pair of words from
	pair = matchingWords[wordPairB];

	// Set coloumn header
	titleTextB.setText(pair[0]);

	// Get incorrect words to fill other stones
	incorrectWords = this.genIncorrect();

	// Generate and set at random position
	randomPosition = Math.floor((Math.random() * 4) + 0);
	switch(randomPosition){
		case 0: randomPosition == 0;
			wordB0.setText(pair[1]);
			wordB1.setText(incorrectWords[0]);
			wordB2.setText(incorrectWords[1]);
			wordB3.setText(incorrectWords[2]);
			correctLane[1] = 0;
			break;

		case 1: randomPosition == 1;
			wordB0.setText(incorrectWords[0]);
			wordB1.setText(pair[1]);
			wordB2.setText(incorrectWords[1]);
			wordB3.setText(incorrectWords[2]);
			correctLane[1] = 1;
			break;

		case 2: randomPosition == 2;
			wordB0.setText(incorrectWords[0]);
			wordB1.setText(incorrectWords[1]);
			wordB2.setText(pair[1]);
			wordB3.setText(incorrectWords[2]);
			correctLane[1] = 2;
			break;

		case 3: randomPosition == 3;
			wordB0.setText(incorrectWords[0]);
			wordB1.setText(incorrectWords[1]);
			wordB2.setText(incorrectWords[2]);
			wordB3.setText(pair[1]);
			correctLane[1] = 3;
			break;
	}



	//-------------------------------------
	//---------- Third Stones -------------
	//-------------------------------------

	// Get pair of words from
	pair = matchingWords[wordPairC];

	// Set coloumn header
	titleTextC.setText(pair[0]);

	// Get incorrect words to fill other stones
	incorrectWords = this.genIncorrect();

	// Generate and set at random position
	randomPosition = Math.floor((Math.random() * 4) + 0);
	switch(randomPosition){
		case 0: randomPosition == 0;
			wordC0.setText(pair[1]);
			wordC1.setText(incorrectWords[0]);
			wordC2.setText(incorrectWords[1]);
			wordC3.setText(incorrectWords[2]);
			correctLane[2] = 0;
			break;

		case 1: randomPosition == 1;
			wordC0.setText(incorrectWords[0]);
			wordC1.setText(pair[1]);
			wordC2.setText(incorrectWords[1]);
			wordC3.setText(incorrectWords[2]);
			correctLane[2] = 1;
			break;

		case 2: randomPosition == 2;
			wordC0.setText(incorrectWords[0]);
			wordC1.setText(incorrectWords[1]);
			wordC2.setText(pair[1]);
			wordC3.setText(incorrectWords[2]);
			correctLane[2] = 2;
			break;

		case 3: randomPosition == 3;
			wordC0.setText(incorrectWords[0]);
			wordC1.setText(incorrectWords[1]);
			wordC2.setText(incorrectWords[2]);
			wordC3.setText(pair[1]);
			correctLane[2] = 3;
			break;
	}
}



// reset board after player has completed current words
PlayScreen.prototype.reset = function ()
{	
	// Hide all words
	this.showWords(false);

	// Move background


	// Move giraffe (tween with background)
	this.moveGiraffe(playerLanePositionsX[0], playerLanePositionsY[currentLane]);

	// Spawn new words
	this.spawnWords();

	// Show words
	this.showWords(true);

	// Reset current coloumn, to allow player to click stones
	currentColoumn = 0;
};



// onClick functions for First Stones
PlayScreen.prototype.clickA0 = function ()
{	
	this.validate(0, 0);
};
PlayScreen.prototype.clickA1 = function ()
{	
	this.validate(1, 0);
};
PlayScreen.prototype.clickA2 = function ()
{	
	this.validate(2, 0);
};
PlayScreen.prototype.clickA3 = function ()
{	
	this.validate(3, 0);
};

// onClick functions for Second Stones
PlayScreen.prototype.clickB0 = function ()
{	
	this.validate(0, 2);
};
PlayScreen.prototype.clickB1 = function ()
{	
	this.validate(1, 2);
};
PlayScreen.prototype.clickB2 = function ()
{	
	this.validate(2, 2);
};
PlayScreen.prototype.clickB3 = function ()
{	
	this.validate(3, 2);
};

// onClick functions for Third Stones
PlayScreen.prototype.clickC0 = function ()
{
	this.validate(0, 4);
};
PlayScreen.prototype.clickC1 = function ()
{	
	this.validate(1, 4);
};
PlayScreen.prototype.clickC2 = function ()
{	
	this.validate(2, 4);
};
PlayScreen.prototype.clickC3 = function ()
{	
	this.validate(3, 4);
};



// onClick any stones
PlayScreen.prototype.validate = function (lane, coloumn)
{	
	// record current lane
	currentLane = lane;

	// if not current lane, ignore
	if(currentColoumn != (coloumn / 2))
	{
		return;
	}

	if(correctLane[coloumn/2] == lane)
	{
		// update score
		score++
		this.updateScore();

		// move giraffe to current location
		this.moveGiraffe(playerLanePositionsX[coloumn+1], playerLanePositionsY[lane]);

		// walk forward animation
		this.leaveStone();
	}
	else
	{
		// update lives
		livesLeft--;
		this.checkLives();

		// move giraffe to current location
		this.moveGiraffe(playerLanePositionsX[coloumn+1], playerLanePositionsY[lane]);

		// drowning animations
		giraffeFall.play(10);
	}
};



// Check how many lives remaining, show correct frame
PlayScreen.prototype.checkLives = function() 
{
	if(livesLeft <= 0)
	{
		livesBox = this.add.sprite(0, 0, 'Lives', 3);
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


// Game has finished, move to finish state
PlayScreen.prototype.endGame = function() 
{
	this.state.start('finish');
};