// Global variables
var giraffe = giraffe|| {};
var giraffeFalling;



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
	this.load.pack('PlayScreen', '/games/giraffe/assets/pack.json');

	// Clear + expand words list
	clickHistory = new Array ();
	wordHistory = new Array ();
	for(var i = 0; i < matchingWords.length; i++)
	{
		wordHistory[i] = new Array ();
	}
};

PlayScreen.prototype.create = function ()
{
console.log("PlayScreen create");

	// Add background
	background = this.add.tileSprite(0, 0, 1920, 1080, 'Background');
	background.scale.setTo(1.51, 1.51);

    // Add word headings
    titleA = this.add.sprite(260, 110, 'wordDisplay');
    titleA.scale.setTo(1.5, 1.5);
    titleTextA = this.add.text(460, 180, "", bigStyle);
    titleTextA.anchor.setTo(0.5);
    titleTextA.addColor('#FF9933', 0);

    titleB = this.add.sprite(860, 110, 'wordDisplay');
    titleB.scale.setTo(1.5, 1.5);
    titleTextB = this.add.text(1060, 180, "", bigStyle);
    titleTextB.anchor.setTo(0.5);
    titleTextB.addColor('#FF9933', 0);

    titleC = this.add.sprite(1480, 110, 'wordDisplay');
    titleC.scale.setTo(1.5, 1.5);
    titleTextC = this.add.text(1680, 180, "", bigStyle);
    titleTextC.anchor.setTo(0.5);
	titleTextC.addColor('#FF9933', 0);

    // First stones word text
    wordA0 = this.add.text(460, 370, "", medStyle);
    wordA0.anchor.setTo(0.5);
	wordA1 = this.add.text(460, 570, "", medStyle);
    wordA1.anchor.setTo(0.5);
	wordA2 = this.add.text(460, 770, "", medStyle);
    wordA2.anchor.setTo(0.5);
	wordA3 = this.add.text(460, 960, "", medStyle);
    wordA3.anchor.setTo(0.5);

    // Second stones word text
    wordB0 = this.add.text(1060, 370, "", medStyle);
    wordB0.anchor.setTo(0.5);
	wordB1 = this.add.text(1060, 580, "", medStyle);
    wordB1.anchor.setTo(0.5);
	wordB2 = this.add.text(1060, 780, "", medStyle);
    wordB2.anchor.setTo(0.5);
	wordB3 = this.add.text(1060, 980, "", medStyle);
    wordB3.anchor.setTo(0.5);

    // Third stones word text
    wordC0 = this.add.text(1680, 370, "", medStyle);
    wordC0.anchor.setTo(0.5);
    wordC1 = this.add.text(1680, 580, "", medStyle);
    wordC1.anchor.setTo(0.5);
    wordC2 = this.add.text(1680, 780, "", medStyle);
    wordC2.anchor.setTo(0.5);
    wordC3 = this.add.text(1680, 980, "", medStyle);
    wordC3.anchor.setTo(0.5);


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



	// Add giraffe walking sprites
	giraffeWalk = this.game.add.sprite(0, playerLanePositionsY[0], 'giraffeWalking', 1);
	giraffeWalk.scale.setTo(0.785, 0.785);

	// Add giraffe walking sprite
	giraffe = this.game.add.sprite(playerLanePositionsX[0] - 144, playerLanePositionsY[0], 'giraffeFalling', 0);
	giraffe.scale.setTo(1.5, 1.5);
	giraffe.visible = false;

	// giraffe fall animation
    giraffeFalling = giraffe.animations.add('fall', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 10);

    // giraffe walking animation + hide
    giraffeWalking = giraffeWalk.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10);
    giraffeWalk.visible = true;


    // giraffe tween off stone 0
	giraffeMove0 = this.game.add.tween(giraffeWalk).to({x: '+290'}, 800, Phaser.Easing.Linear.None, false);
	giraffeMove0.onComplete.add(function (){console.log('off 0');
		this.moveGiraffe(playerLanePositionsX[2], playerLanePositionsY[currentLane]);
		giraffeWalking.stop(); giraffeWalk.visible = true; giraffe.visible = false; inputLock = false;
	}, this);

    // giraffe tween off stone 1
	giraffeMove1 = this.game.add.tween(giraffeWalk).to({x: '+290'}, 800, Phaser.Easing.Linear.None, false);
	giraffeMove1.onComplete.add(function (){console.log('off 1');
		this.moveGiraffe(playerLanePositionsX[4], playerLanePositionsY[currentLane]);
		giraffeWalking.stop(); giraffeWalk.visible = true; giraffe.visible = false; inputLock = false;
	}, this);

	    // giraffe tween off stone 2
	giraffeMove2 = this.game.add.tween(giraffeWalk).to({x: '+290'}, 800, Phaser.Easing.Linear.None, false);
	giraffeMove2.onComplete.add(function (){ console.log('off 2');
		this.moveGiraffe(playerLanePositionsX[6], playerLanePositionsY[currentLane]);
		giraffeWalking.stop(); giraffeWalk.visible = true; giraffe.visible = false; this.reset();
	}, this);


	// Keyboard controls
	this.game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(this.giraffeUp, this);
  	this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(this.giraffeDown, this);
  	this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(this.giraffeRight, this);


    // Record screen clicks
    this.game.input.onDown.add(function(touchStart) {
    		this.recordScreenPress(touchStart.clientX, touchStart.clientY);
    	}, this);


	// Add Lives box
	livesBox = this.add.sprite(0, 0, 'Lives', 0);

	// Add Time value
	timeText = this.add.text(1040, 40, "Time: "+(timeCounter / backgroundScrollSpeed), smallStyle);
	timeText.anchor.setTo(0.5);

	// Add Score value
	scoreText = this.add.text(1700, 40, "Score: "+score, smallStyle);
	scoreText.anchor.setTo(0.5);


	// Time
	timeLeft = 3000;
	timer = this.time.create(false);
	timer.loop(Phaser.Timer.SECOND/backgroundScrollSpeed, this.updateTime, this);
	timer.start();


    // Record Game Start Time
    var time = new Date();
    gameStartTime = time.toUTCString();

	// Set starting values
	backgroundScroll = false;
	backgroundDistance = 0;
	currentColoumn = 0;
	currentLane = 0;
	score = 0;
	inputLock = true;
	this.updateScore();
	livesLeft = startingLives;

console.log("PlayScreen create end");


	// Fill words -> Start game
	this.spawnWords();
};



// display current time to screen (with --)
PlayScreen.prototype.updateTime = function ()
{
	// if scrolling background, move background + giraffe
	if(backgroundScroll == true)
	{
		background.tilePosition.x -= 10 * 2;
		giraffe.x -= 14.7 * 2;
		giraffeWalk.x -= 14.7 * 2;
		backgroundDistance += 10 * 2;
	}

	// check if scrolled enough
	if(backgroundDistance >= 1280)
	{
		backgroundScroll = false;
		backgroundDistance = 0;

		// Spawn new words
		this.spawnWords();

		// Show words
		this.showWords(true);


		// Reset current coloumn, to allow player to click stones
		currentColoumn = 0;
	}


	// If no time remaining, game finished
	if(timeLeft <= 0)
	{
		console.log("Out of time");
		this.recordData();
	}

	// show current time
	timeText.setText("Time: "+(Math.floor(timeLeft/backgroundScrollSpeed)), true);

	// recrease time remaining
	timeLeft--;


	// check lives remaining
	this.checkLives();
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
	giraffe.x = posX - 144;
	giraffe.y = posY;

	giraffeWalk.x = posX;
	giraffeWalk.y = posY;

	//console.log("XY -> "+giraffe.x+" "+giraffe.y)
};

// Move giraffe up one lane
PlayScreen.prototype.giraffeUp = function ()
{
	// If input is locked (move in progress), ignore
	if(inputLock == true)
	{
		return;
	}

	// if scrolling background, reject inputs
	if(backgroundScroll)
	{
		return;
	}

	// if already in top lane, return
	if(currentLane == 0)
	{
		return;
	}

	// move giraffe
	this.moveGiraffe(playerLanePositionsX[currentColoumn * 2], playerLanePositionsY[currentLane - 1]);

	// record lane change
	currentLane -= 1;
};

// Move giraffe down one lane
PlayScreen.prototype.giraffeDown = function ()
{
	// If input is locked (move in progress), ignore
	if(inputLock == true)
	{
		return;
	}

	// if scrolling background, reject inputs
	if(backgroundScroll)
	{
		return;
	}

	// if already in top lane, return
	if(currentLane == 3)
	{
		return;
	}

	// move giraffe
	this.moveGiraffe(playerLanePositionsX[currentColoumn * 2], playerLanePositionsY[currentLane + 1]);

	// record lane change
	currentLane += 1;
};

// Move giraffe right
PlayScreen.prototype.giraffeRight = function ()
{
	// If input is locked (move in progress), ignore
	if(inputLock == true)
	{
		return;
	}

	// if scrolling background, reject inputs
	if(backgroundScroll)
	{
		return;
	}

	// first stones
	if(currentColoumn == 0)
	{
		if(currentLane == 0)
		{
			this.clickA0();
		}
		else if(currentLane == 1)
		{
			this.clickA1();
		}
		else if(currentLane == 2)
		{
			this.clickA2();
		}
		else if(currentLane == 3)
		{
			this.clickA3();
		}
	}

	// second stones
	else if(currentColoumn == 1)
	{
		if(currentLane == 0)
		{
			this.clickB0();
		}
		else if(currentLane == 1)
		{
			this.clickB1();
		}
		else if(currentLane == 2)
		{
			this.clickB2();
		}
		else if(currentLane == 3)
		{
			this.clickB3();
		}
	}

	// third stones
	else if(currentColoumn == 2)
	{
		if(currentLane == 0)
		{
			this.clickC0();
		}
		else if(currentLane == 1)
		{
			this.clickC1();
		}
		else if(currentLane == 2)
		{
			this.clickC2();
		}
		else if(currentLane == 3)
		{
			this.clickC3();
		}
	}
};



// select the correct giraffeWalk animation
PlayScreen.prototype.leaveStone = function (isCorrect)
{
console.log("leaveStone");

	// If a correct answer, simple move off stone
	if(isCorrect)
	{
console.log("IF");

		// swap sprites
		giraffe.visible = false;
		giraffeWalk.visible = true;

		// find which stone to move off
		if(currentColoumn == 0)
		{
			// increase coloumn
			currentColoumn = 1;

			giraffeWalking.play(10, true);
			giraffeMove0.start();
		}
		else if(currentColoumn == 1)
		{
			// decrease coloumn
			currentColoumn = 2;

			giraffeWalking.play(10, true);
			giraffeMove1.start();
		}
		else if(currentColoumn == 2)
		{
			// increase coloumn
			currentColoumn = 3;

			giraffeWalking.play(10, true);
			giraffeMove2.start();
		}
	}

	// Else if inccorect, fall then move off
	else
	{
console.log("ELSE");

		// swap sprites
		giraffe.visible = true;
		giraffeWalk.visible = false;

		// find which stone to move off, then play fall animation
		if(currentColoumn == 0)
		{
console.log("0");

		    giraffeFalling.onComplete.add(function () {
		    	giraffe.visible = false; giraffeWalk.visible = true; giraffeWalking.play(10, true); giraffeMove0.start();
		    	currentColoumn = 1;
		    }, this);

			giraffeFalling.play(10, false);
		}
		else if(currentColoumn == 1)
		{
console.log("1");

		    giraffeFalling.onComplete.add(function () {
		    	giraffe.visible = false; giraffeWalk.visible = true; giraffeWalking.play(10, true); giraffeMove1.start();
				currentColoumn = 2;
		    }, this);

			giraffeFalling.play(10, false);
		}
		else if(currentColoumn == 2)
		{
console.log("2");

		    giraffeFalling.onComplete.add(function () {
		    	giraffe.visible = false; giraffeWalk.visible = true; giraffeWalking.play(10, true); giraffeMove2.start();
		    	currentColoumn = 3;
		    }, this);

			giraffeFalling.play(10, false);
		}
	}
};



// Generate incorrect words from word bank to fill other stones
PlayScreen.prototype.genIncorrect = function (pair)
{
console.log("genIncorrect");

	// Get random indexs
	var first = Math.floor((Math.random() * matchingWords.length) + 0);
	var second = Math.floor((Math.random() * matchingWords.length) + 0);
	var third = Math.floor((Math.random() * matchingWords.length) + 0);


	// Make sure 1 isn't the correct word
	while(matchingWords[first] == pair)
	{
		first = Math.floor((Math.random() * matchingWords.length) + 0);
	}


	// Make sure 2 isn't the same as 1
	while(matchingWords[second] == matchingWords[first] || matchingWords[second] == pair)
	{
		second = Math.floor((Math.random() * matchingWords.length) + 0);
	}

	// Make sure 3 isn't the same as 2 or 1
	while(matchingWords[third] == matchingWords[second] || matchingWords[third] == matchingWords[first] || matchingWords[third] == pair)
	{
		third = Math.floor((Math.random() * matchingWords.length) + 0);
	}


	// Define incorrect
	var incorrectWords = [0,0,0];
	var temp;


	// Pic first incorrect
	if(Math.floor((Math.random() * matchingWords.length) + 0))
	{
		temp = matchingWords[first];
		incorrectWords[0] = temp[0];
	}
	else
	{
		temp = matchingWords[first];
		incorrectWords[0] = temp[1];
	}

	// Pic second incorrect
	if(Math.floor((Math.random() * matchingWords.length) + 0))
	{
		temp = matchingWords[second];
		incorrectWords[1] = temp[0];
	}
	else
	{
		temp = matchingWords[second];
		incorrectWords[1] = temp[1];
	}

	// Pic third incorrect
	if(Math.floor((Math.random() * matchingWords.length) + 0))
	{
		temp = matchingWords[third];
		incorrectWords[2] = temp[0];
	}
	else
	{
		temp = matchingWords[third];
		incorrectWords[2] = temp[1];
	}


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

	// Store correct word indexs
	correctLaneIndex[0] = wordPairA;
	correctLaneIndex[1] = wordPairB;
	correctLaneIndex[2] = wordPairC;


	//-------------------------------------
	//---------- First Stones -------------
	//-------------------------------------

	// Get pair of words from
	var pair = matchingWords[wordPairA];

	// Set coloumn header
	titleTextA.setText(pair[0]);

	// Get incorrect words to fill other stones
	var incorrectWords = this.genIncorrect(pair);

	// Set wordsOnStones
	var setWords = wordsOnStones[0];

	// Generate and set at random position
	var randomPosition = Math.floor((Math.random() * 4) + 0);
	switch(randomPosition){
		case 0: randomPosition == 0;
			wordA0.setText(pair[1]);
			wordA1.setText(incorrectWords[0]);
			wordA2.setText(incorrectWords[1]);
			wordA3.setText(incorrectWords[2]);

			setWords[0] = pair[1];
			setWords[1] = incorrectWords[0];
			setWords[2] = incorrectWords[1];
			setWords[3] = incorrectWords[2];

			correctLane[0] = 0;
			break;

		case 1: randomPosition == 1;
			wordA0.setText(incorrectWords[0]);
			wordA1.setText(pair[1]);
			wordA2.setText(incorrectWords[1]);
			wordA3.setText(incorrectWords[2]);

			setWords[0] = incorrectWords[0];
			setWords[1] = pair[1];
			setWords[2] = incorrectWords[1];
			setWords[3] = incorrectWords[2];

			correctLane[0] = 1;
			break;

		case 2: randomPosition == 2;
			wordA0.setText(incorrectWords[0]);
			wordA1.setText(incorrectWords[1]);
			wordA2.setText(pair[1]);
			wordA3.setText(incorrectWords[2]);

			setWords[0] = incorrectWords[0];
			setWords[1] = incorrectWords[1];
			setWords[2] = pair[1];
			setWords[3] = incorrectWords[2];

			correctLane[0] = 2;
			break;

		case 3: randomPosition == 3;
			wordA0.setText(incorrectWords[0]);
			wordA1.setText(incorrectWords[1]);
			wordA2.setText(incorrectWords[2]);
			wordA3.setText(pair[1]);

			setWords[0] = incorrectWords[0];
			setWords[1] = incorrectWords[1];
			setWords[2] = incorrectWords[2];
			setWords[3] = pair[1];

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
	incorrectWords = this.genIncorrect(pair);

	// Set wordsOnStones
	setWords = wordsOnStones[1];

	// Generate and set at random position
	randomPosition = Math.floor((Math.random() * 4) + 0);
	switch(randomPosition){
		case 0: randomPosition == 0;
			wordB0.setText(pair[1]);
			wordB1.setText(incorrectWords[0]);
			wordB2.setText(incorrectWords[1]);
			wordB3.setText(incorrectWords[2]);

			setWords[0] = pair[1];
			setWords[1] = incorrectWords[0];
			setWords[2] = incorrectWords[1];
			setWords[3] = incorrectWords[2];

			correctLane[1] = 0;
			break;

		case 1: randomPosition == 1;
			wordB0.setText(incorrectWords[0]);
			wordB1.setText(pair[1]);
			wordB2.setText(incorrectWords[1]);
			wordB3.setText(incorrectWords[2]);

			setWords[0] = incorrectWords[0];
			setWords[1] = pair[1];
			setWords[2] = incorrectWords[1];
			setWords[3] = incorrectWords[2];

			correctLane[1] = 1;
			break;

		case 2: randomPosition == 2;
			wordB0.setText(incorrectWords[0]);
			wordB1.setText(incorrectWords[1]);
			wordB2.setText(pair[1]);
			wordB3.setText(incorrectWords[2]);

			setWords[0] = incorrectWords[0];
			setWords[1] = incorrectWords[1];
			setWords[2] = pair[1];
			setWords[3] = incorrectWords[2];

			correctLane[1] = 2;
			break;

		case 3: randomPosition == 3;
			wordB0.setText(incorrectWords[0]);
			wordB1.setText(incorrectWords[1]);
			wordB2.setText(incorrectWords[2]);
			wordB3.setText(pair[1]);

			setWords[0] = incorrectWords[0];
			setWords[1] = incorrectWords[1];
			setWords[2] = incorrectWords[2];
			setWords[3] = pair[1];

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
	incorrectWords = this.genIncorrect(pair);

	// Set wordsOnStones
	setWords = wordsOnStones[2];

	// Generate and set at random position
	randomPosition = Math.floor((Math.random() * 4) + 0);
	switch(randomPosition){
		case 0: randomPosition == 0;
			wordC0.setText(pair[1]);
			wordC1.setText(incorrectWords[0]);
			wordC2.setText(incorrectWords[1]);
			wordC3.setText(incorrectWords[2]);

			setWords[0] = pair[1];
			setWords[1] = incorrectWords[0];
			setWords[2] = incorrectWords[1];
			setWords[3] = incorrectWords[2];

			correctLane[2] = 0;
			break;

		case 1: randomPosition == 1;
			wordC0.setText(incorrectWords[0]);
			wordC1.setText(pair[1]);
			wordC2.setText(incorrectWords[1]);
			wordC3.setText(incorrectWords[2]);

			setWords[0] = incorrectWords[0];
			setWords[1] = pair[1];
			setWords[2] = incorrectWords[1];
			setWords[3] = incorrectWords[2];

			correctLane[2] = 1;
			break;

		case 2: randomPosition == 2;
			wordC0.setText(incorrectWords[0]);
			wordC1.setText(incorrectWords[1]);
			wordC2.setText(pair[1]);
			wordC3.setText(incorrectWords[2]);

			setWords[0] = incorrectWords[0];
			setWords[1] = incorrectWords[1];
			setWords[2] = pair[1];
			setWords[3] = incorrectWords[2];

			correctLane[2] = 2;
			break;

		case 3: randomPosition == 3;
			wordC0.setText(incorrectWords[0]);
			wordC1.setText(incorrectWords[1]);
			wordC2.setText(incorrectWords[2]);
			wordC3.setText(pair[1]);

			setWords[0] = incorrectWords[0];
			setWords[1] = incorrectWords[1];
			setWords[2] = incorrectWords[2];
			setWords[3] = pair[1];

			correctLane[2] = 3;
			break;
	}

    // Set timer for time taken to answer
    startTime = Math.floor(Date.now());

    // Allow player input
    inputLock = false;
};



// reset board after player has completed current words
PlayScreen.prototype.reset = function ()
{
console.log("reset");

	// Hide all words
	this.showWords(false);

	// Move background
	backgroundScroll = true;
};



// onClick functions for First Stones
PlayScreen.prototype.clickA0 = function ()
{
	setWords = wordsOnStones[0];
	clickedWord = setWords[0];

	this.validate(0, 0);
};
PlayScreen.prototype.clickA1 = function ()
{
	setWords = wordsOnStones[0];
	clickedWord = setWords[1];

	this.validate(1, 0);
};
PlayScreen.prototype.clickA2 = function ()
{
	setWords = wordsOnStones[0];
	clickedWord = setWords[2];

	this.validate(2, 0);
};
PlayScreen.prototype.clickA3 = function ()
{
	setWords = wordsOnStones[0];
	clickedWord = setWords[3];

	this.validate(3, 0);
};

// onClick functions for Second Stones
PlayScreen.prototype.clickB0 = function ()
{
	setWords = wordsOnStones[1];
	clickedWord = setWords[0];

	this.validate(0, 2);
};
PlayScreen.prototype.clickB1 = function ()
{
	setWords = wordsOnStones[1];
	clickedWord = setWords[1];

	this.validate(1, 2);
};
PlayScreen.prototype.clickB2 = function ()
{
	setWords = wordsOnStones[1];
	clickedWord = setWords[2];

	this.validate(2, 2);
};
PlayScreen.prototype.clickB3 = function ()
{
	setWords = wordsOnStones[2];
	clickedWord = setWords[3];

	this.validate(3, 2);
};

// onClick functions for Third Stones
PlayScreen.prototype.clickC0 = function ()
{
	setWords = wordsOnStones[2];
	clickedWord = setWords[0];

	this.validate(0, 4);
};
PlayScreen.prototype.clickC1 = function ()
{
	setWords = wordsOnStones[2];
	clickedWord = setWords[1];

	this.validate(1, 4);
};
PlayScreen.prototype.clickC2 = function ()
{
	setWords = wordsOnStones[2];
	clickedWord = setWords[2];

	this.validate(2, 4);
};
PlayScreen.prototype.clickC3 = function ()
{
	setWords = wordsOnStones[2];
	clickedWord = setWords[3];

	this.validate(3, 4);
};



// onClick any stones
PlayScreen.prototype.validate = function (lane, coloumn)
{
console.log("validate");

	// If input is locked (move in progress), ignore
	if(inputLock == true)
	{
		return;
	}
	else
	{
		inputLock = true;
	}

	// if not current lane, ignore
	if(currentColoumn != (coloumn / 2))
	{
		console.log()
		return;
	}

	// record current lane
	currentLane = lane;

	// Swap giraffe sprites
	giraffe.visible = false;
	giraffeWalk.visible = true;


	// if valid choice, decide of true
	if(correctLane[coloumn / 2] == lane)
	{
		// record word answers
		var finishTime = Math.floor(Date.now());
		//console.log(correctLaneIndex[coloumn / 2]);

		wordHistory[correctLaneIndex[coloumn / 2]][wordHistory[correctLaneIndex[coloumn / 2]].length]
			= [null, true, finishTime - startTime];

		// update score
		score++;
		this.updateScore();

		// move giraffe to current location
		this.moveGiraffe(playerLanePositionsX[coloumn + 1], playerLanePositionsY[lane]);

		// walk forward animation
		this.leaveStone(true);
	}
	else
	{
		// record word answers
		var finishTime = Math.floor(Date.now());
		wordHistory[correctLaneIndex[coloumn / 2]][wordHistory[correctLaneIndex[coloumn / 2]].length]
			= [setWords[lane], false, finishTime - startTime];


		// If lost the last life, end game
		if(livesLeft == 1)
		{
			// Move
			this.moveGiraffe(playerLanePositionsX[coloumn + 1], playerLanePositionsY[lane]);

			// Swap sprites
			giraffe.visible = true;
			giraffeWalk.visible = false;

			// onFinish falling -> end
		    giraffeFalling.onComplete.add(function () {
		    	livesLeft--;
			});

		    // Start falling
			giraffeFalling.play(10, true);
		}
		else
		{
			// update lives
			livesLeft--;
		}

		// move giraffe to current location
		this.moveGiraffe(playerLanePositionsX[coloumn + 1], playerLanePositionsY[lane]);

		// leave stone
		this.leaveStone(false);
	}
};



// Check how many lives remaining, show correct frame
PlayScreen.prototype.checkLives = function()
{
	if(livesLeft <= 0)
	{
		livesBox = this.add.sprite(0, 0, 'Lives', 3);
		console.log("Out of lives");
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

//Record screen clicks
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


	// Send out
	$.post('end',{game:'giraffe', words:output, clicks:clickHistory, score:score}, function(data)
	{
  		// Log returned data
  		console.log("RETURNED" + data);
	});


	// End
	this.endGame();
};

// Game has finished, move to finish state
PlayScreen.prototype.endGame = function()
{
	this.state.start('finish');
};