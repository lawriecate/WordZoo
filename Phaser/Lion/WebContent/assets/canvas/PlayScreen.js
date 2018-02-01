// Global variables
var lion = lion || {};
var timeLeft;
var livesLeft = 3;


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
	var background = this.add.sprite(0, 0, 'Background');
	
	// Add normal (no-diving) goal keeper
	GK_Mid = this.add.sprite(790, 320, 'goalkeeper_center');
	GK_Mid.scale.setTo(1.5, 1.5);
	
	
	// Add TopLeft word box
	topLeft = this.add.button(660, 190, 'ScoreBackground', this.expandTL, this, null, null, null, null);
	topLeft.scale.setTo(1.5, 1.5);
	topLeft.anchor.setTo(0.5, 0.5);
	topLeft.visible = false;

	// Add TopRight word box
	topRight = this.add.button(1300, 190, 'ScoreBackground', this.expandTR, this, null, null, null, null);
	topRight.scale.setTo(1.5, 1.5);
	topRight.anchor.setTo(0.5, 0.5);
	topRight.visible = false;
	
	// Add BottomLeft word box
	bottomLeft = this.add.button(660, 640, 'ScoreBackground', this.expandBL, this, null, null, null, null);
	bottomLeft.scale.setTo(1.5, 1.5);
	bottomLeft.anchor.setTo(0.5, 0.5);
	bottomLeft.visible = false;
	
	// Add BottomRight word box
	bottomRight = this.add.button(1300, 640, 'ScoreBackground', this.expandBR, this, null, null, null, null);
	bottomRight.scale.setTo(1.5, 1.5);
	bottomRight.anchor.setTo(0.5, 0.5);
	bottomRight.visible = false;
	
	// TL text
	TLtext = this.add.text(660, 190, "", style);
	TLtext.anchor.setTo(0.5);
	TLtext.addColor('#FF9933', 0);	
	// TR text
	TRtext = this.add.text(1300, 190, "", style);
	TRtext.anchor.setTo(0.5);
	TRtext.addColor('#FF9933', 0);	
	// BL text
	BLtext = this.add.text(660, 640, "", style);
	BLtext.anchor.setTo(0.5);
	BLtext.addColor('#FF9933', 0);	
	// BR text
	BRtext = this.add.text(1300, 640, "", style);
	BRtext.anchor.setTo(0.5);
	BRtext.addColor('#FF9933', 0);	
	

	// Add TopLeft diving goal keeper + hide
	GK_TL = this.game.add.sprite(390,180,'top_left_dive', 0);
 	GK_TL.scale.setTo(1.5, 1.5);
 	GK_TL.visible = false;
	 
	// Add TopRight diving goal keeper + hide
 	GK_TR = this.game.add.sprite(840,180,'top_right_dive', 0);
 	GK_TR.scale.setTo(1.5, 1.5);
 	GK_TR.visible = false;
	 
	// Add BottomLeft diving goal keeper + hide
 	GK_BL = this.game.add.sprite(390,290,'bottom_left_dive', 2);
 	GK_BL.scale.setTo(1.5, 1.5);
 	GK_BL.visible = false;
	 
	// Add BottonRight diving goal keeper + hide
 	GK_BR = this.game.add.sprite(840,290,'bottom_right_dive', 0);
 	GK_BR.scale.setTo(1.5, 1.5);
 	GK_BR.visible = false;
	 
	 
	// TopLeft diving animation
 	GK_TL_Dive = GK_TL.animations.add('top_left_dive', [0,1,2]);
 	GK_TL.animations.currentAnim.onComplete.add(function () { GK_TL.animations.frame = 0; }, this);

	// TopRight diving animation
 	GK_TR_Dive = GK_TR.animations.add('top_right_dive',[0,1,2]);
 	GK_TR.animations.currentAnim.onComplete.add(function () { GK_TR.animations.frame = 0; }, this);

	// BottomLeft diving animation
 	GK_BL_Dive = GK_BL.animations.add('bottom_left_dive',[2,1,0]);
 	GK_BL.animations.currentAnim.onComplete.add(function () { GK_BL.animations.frame = 0; }, this);

	// BottomRight diving animation
 	GK_BR_Dive = GK_BR.animations.add('bottom_right_dive',[0,1,2]);
	GK_BR.animations.currentAnim.onComplete.add(function () { GK_BR.animations.frame = 0; }, this);
	 
	
	// Add Football + spin
	football = this.add.sprite(-100, 870, 'soccer_ball', 0);
	football.scale.setTo(1.5, 1.5);
	footballSpin = football.animations.add('spin');
	
	// Football RollIn tween
	footballRollIn = this.game.add.tween(football).to({x: '+1050'}, 1000, Phaser.Easing.Linear.None, false);
	footballRollIn.onComplete.add(function (){footballSpin.stop(0); this.setWords();} , this);
	
	// Football TL tween
	footballTL1 = this.game.add.tween(football).to({x: '-380', y:'-700'}, 300, Phaser.Easing.Linear.None, false);
	footballTL2 = this.game.add.tween(football).to({y: '+300'}, 200, Phaser.Easing.Linear.None, false);
	footballTL1.onComplete.add(function (){footballTL2.start();}, this);
	footballTL2.onComplete.add(function (){footballSpin.stop(0); this.reset();} , this);

	// Football TR tween
	footballTR1 = this.game.add.tween(football).to({x: '+360', y:'-700'}, 300, Phaser.Easing.Linear.None, false);
	footballTR2 = this.game.add.tween(football).to({y: '+300'}, 200, Phaser.Easing.Linear.None, false);
	footballTR1.onComplete.add(function (){footballTR2.start();}, this);
	footballTR2.onComplete.add(function (){footballSpin.stop(0); this.reset();} , this);
	
	// Football BL tween
	footballBL1 = this.game.add.tween(football).to({x: '-380', y:'-400'}, 200, Phaser.Easing.Linear.None, false);
	footballBL2 = this.game.add.tween(football).to({y: '+50'}, 100, Phaser.Easing.Linear.None, false);
	footballBL1.onComplete.add(function (){footballBL2.start();}, this);
	footballBL2.onComplete.add(function (){footballSpin.stop(0); this.reset();} , this);

	// Football BR tween
	footballBR1 = this.game.add.tween(football).to({x: '+360', y:'-400'}, 200, Phaser.Easing.Linear.None, false);
	footballBR2 = this.game.add.tween(football).to({y: '+50'}, 100, Phaser.Easing.Linear.None, false);
	footballBR1.onComplete.add(function (){footballBR2.start();}, this);
	footballBR2.onComplete.add(function (){footballSpin.stop(0); this.reset();} , this);

	
	// Add score value
	score = 0;
	scoreText = this.add.text(1720, 30, "Score: "+score, style);
	scoreText.anchor.setTo(0.5);
	
	// Add time value
	timeText = this.add.text(960, 30, "Time: "+startingTime, style);
	timeText.anchor.setTo(0.5);
	
	// Add Lives box
	livesBox = this.add.sprite(0, 0, 'Lives', 0);
		

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

	
	// Time
	timeLeft = startingTime;
	timer = this.time.create(false);
	timer.loop(Phaser.Timer.SECOND, this.updateTime, this);
	timer.start();
	


	this.recordData();

	// Football roll in -> Start
	this.ballRollIn();
};


// display current time to screen (with --)
PlayScreen.prototype.updateTime = function ()
{		
	// If no time remaining, game finished
	if(timeLeft <= 0)
	{
		this.recordData();
		this.endGame();
	}
	
	timeText.setText("Time: "+(--timeLeft), true);	
};


// display current score to screen
PlayScreen.prototype.updateScore = function ()
{	
	scoreText.setText("Score: "+score, true);	
};


// Ball roll in
PlayScreen.prototype.ballRollIn = function ()
{	
	// Reset position
	football.reset(-150, 870);
	
	// Start spin
	footballSpin.play(10,true);

	// Start movement
	footballRollIn.start();
	// onComplete, stop roll + setWords
};


//Ball TopLeft kick (boolean)
PlayScreen.prototype.ballTL = function (scored)
{		
	// Start spin
	footballSpin.play(5,true);

	// Start movement
	footballTL1.start();
};
//Ball TopRight kick (boolean)
PlayScreen.prototype.ballTR = function (scored)
{		
	// Start spin
	footballSpin.play(5,true);

	// Start movement
	footballTR1.start();
};
//Ball BottomLeft kick (boolean)
PlayScreen.prototype.ballBL = function (scored)
{		
	// Start spin
	footballSpin.play(5,true);

	// Start movement
	footballBL1.start();
};
//Ball BottomRight kick (boolean)
PlayScreen.prototype.ballBR = function (scored)
{		
	// Start spin
	footballSpin.play(5,true);

	// Start movement
	footballBR1.start();
};


// hide/display word selection buttons (boolean)
PlayScreen.prototype.showButtons = function (isVisible)
{	
	TLtext.visible = isVisible;
	TRtext.visible = isVisible;
	BRtext.visible = isVisible;
	BLtext.visible = isVisible;
	
	topLeft.visible = isVisible;
	topRight.visible = isVisible;
	bottomLeft.visible = isVisible;
	bottomRight.visible = isVisible;
};


//setWords
PlayScreen.prototype.setWords = function ()
{		
	// show selection buttons
	this.showButtons(true);
	
	// get word from word bank at random position
	correctWord = words[Math.floor(Math.random() * words.length)];

	// Random number between 0 and 3 for position of correct
	// Set correct word in that position, generate incorrect for others
	var random = Math.floor((Math.random() * 4) + 0);
	switch(random){
		case 0: correctLocation = "TL";
				var incorrect0 = this.genIncorrect(0);
				var incorrect1 = this.genIncorrect(1);
				var incorrect2 = this.genIncorrect(2);

				TLtext.setText(correctWord);
				TRtext.setText(incorrect0);
				BLtext.setText(incorrect1);
				BRtext.setText(incorrect2);

				TLraw = correctWord;
				TRraw = incorrect0;
				BLraw = incorrect1;
				BRraw = incorrect2;
				break;
				
		case 1: correctLocation = "TR";
				var incorrect0 = this.genIncorrect(0);
				var incorrect1 = this.genIncorrect(1);
				var incorrect2 = this.genIncorrect(2);

				TLtext.setText(incorrect0);
				TRtext.setText(correctWord);
				BLtext.setText(incorrect1);
				BRtext.setText(incorrect2);

				TLraw = incorrect0;
				TRraw = correctWord;
				BLraw = incorrect1;
				BRraw = incorrect2;
				break;
		
		case 2: correctLocation = "BL";
				var incorrect0 = this.genIncorrect(0);
				var incorrect1 = this.genIncorrect(1);
				var incorrect2 = this.genIncorrect(2);

				TLtext.setText(incorrect0);
				TRtext.setText(incorrect1);
				BLtext.setText(correctWord);
				BRtext.setText(incorrect2);

				TLraw = incorrect0;
				TRraw = incorrect1;
				BLraw = correctWord;
				BRraw = incorrect2;
				break;
				
		case 3: correctLocation = "BR";
				var incorrect0 = this.genIncorrect(0);
				var incorrect1 = this.genIncorrect(1);
				var incorrect2 = this.genIncorrect(2);

				TLtext.setText(incorrect0);
				TRtext.setText(incorrect1);
				BLtext.setText(incorrect2);
				BRtext.setText(correctWord);

				TLraw = incorrect0;
				TRraw = incorrect1;
				BLraw = incorrect2;
				BRraw = correctWord;
				break;
	}

	// Set timer for time taken to answer
    startTime = Math.floor(Date.now());
};




// expand topLeft button
PlayScreen.prototype.expandTL = function ()
{			
	// Add tweens
	var tween1 = this.game.add.tween(topLeft.scale).to({x:2.5, y:2.5}, 70, Phaser.Easing.Linear.None, false);
	var tween2 = this.game.add.tween(topLeft.scale).to({x:1.5, y:1.5}, 70, Phaser.Easing.Linear.None, false);

	// Add linking
	tween1.onComplete.add(function (){tween2.start();}, this);
	tween2.onComplete.add(function (){this.clickTL();}, this);

	// Start
	tween1.start();
};
// expand topRight button
PlayScreen.prototype.expandTR = function ()
{			
	// Add tweens
	var tween1 = this.game.add.tween(topRight.scale).to({x:2.5, y:2.5}, 70, Phaser.Easing.Linear.None, false);
	var tween2 = this.game.add.tween(topRight.scale).to({x:1.5, y:1.5}, 70, Phaser.Easing.Linear.None, false);

	// Add linking
	tween1.onComplete.add(function (){tween2.start();}, this);
	tween2.onComplete.add(function (){this.clickTR();}, this);

	// Start
	tween1.start();
};
// expand bottomLeft button
PlayScreen.prototype.expandBL = function ()
{			
	// Add tweens
	var tween1 = this.game.add.tween(bottomLeft.scale).to({x:2.5, y:2.5}, 70, Phaser.Easing.Linear.None, false);
	var tween2 = this.game.add.tween(bottomLeft.scale).to({x:1.5, y:1.5}, 70, Phaser.Easing.Linear.None, false);

	// Add linking
	tween1.onComplete.add(function (){tween2.start();}, this);
	tween2.onComplete.add(function (){this.clickBL();}, this);

	// Start
	tween1.start();
};
// expand bottomRight button
PlayScreen.prototype.expandBR = function ()
{			
	// Add tweens
	var tween1 = this.game.add.tween(bottomRight.scale).to({x:2.5, y:2.5}, 70, Phaser.Easing.Linear.None, false);
	var tween2 = this.game.add.tween(bottomRight.scale).to({x:1.5, y:1.5}, 70, Phaser.Easing.Linear.None, false);

	// Add linking
	tween1.onComplete.add(function (){tween2.start();}, this);
	tween2.onComplete.add(function (){this.clickBR();}, this);

	// Start
	tween1.start();
};



//onClick top left button
PlayScreen.prototype.clickTL = function ()
{			
	// hide all buttons
	this.showButtons(false);
	
	// hide middle goal keeper
	GK_Mid.visible = false;
	
	// check if answer is correct
	if(correctLocation == "TL")
	{		
		// record word answers
		var finishTime = Math.floor(Date.now());
		wordHistory[numWordHistory] = [TLraw, null, true, finishTime - startTime];	
		numWordHistory++;


		// correct answer, increase score
		score++;
		
		// show BR keeper + play animation
		GK_BR.visible = true;
		GK_BR_Dive.play(5);
		
		// Move football to TL, score
		this.ballTL(true);
	}
	else
	{	
		// record word answers
		var finishTime = Math.floor(Date.now());
		wordHistory[numWordHistory] = [correctWord, TLraw, false, finishTime - startTime];		
		numWordHistory++;

		// incorrect answer, loose a life
		livesLeft--;
		
		// show TR keeper + play animation
		GK_TL.visible = true;
		GK_TL_Dive.play(5);

		// Move football to TL, save
		this.ballTL(false);
	}
};
//onClick top right button
PlayScreen.prototype.clickTR = function ()
{			
	// hide all buttons
	this.showButtons(false);
	
	// hide middle goal keeper
	GK_Mid.visible = false;
	
	// check if answer is correct
	if(correctLocation == "TR")
	{	
		// record word answers
		var finishTime = Math.floor(Date.now());
		wordHistory[numWordHistory] = [TRraw, null, true, finishTime - startTime];		
		numWordHistory++;

		// correct answer, increase score
		score++;
		
		// show BL keeper + play animation
		GK_BL.visible = true;
		GK_BL_Dive.play(5);

		// Move football to TR, score
		this.ballTR(true);
	}
	else
	{
		// record word answers
		var finishTime = Math.floor(Date.now());
		wordHistory[numWordHistory] = [correctWord, TRraw, true, finishTime - startTime];		
		numWordHistory++;

		// incorrect answer, loose a life
		livesLeft--;
		
		// show TR keeper + play animation
		GK_TR.visible = true;
		GK_TR_Dive.play(5);

		// Move football to TR, save
		this.ballTR(false);
	}
};
//onClick bottom left button
PlayScreen.prototype.clickBL = function ()
{			
	// hide all buttons
	this.showButtons(false);
	
	// hide middle goal keeper
	GK_Mid.visible = false;
	
	// check if answer is correct
	if(correctLocation == "BL")
	{
		// record word answers
		var finishTime = Math.floor(Date.now());
		wordHistory[numWordHistory] = [BLraw, null, true, finishTime - startTime];		
		numWordHistory++;

		// correct answer, increase score
		score++;
		
		// show TR keeper + play animation
		GK_TR.visible = true;
		GK_TR_Dive.play(5);
		
		// Move football to BL, score
		this.ballBL(true);
	}
	else
	{
		// record word answers
		var finishTime = Math.floor(Date.now());
		wordHistory[numWordHistory] = [correctWord, BLraw, true, finishTime - startTime];		
		numWordHistory++;

		// incorrect answer, loose a life
		livesLeft--;
		
		// show BL keeper + play animation
		GK_BL.visible = true;
		GK_BL_Dive.play(5);

		// Move football to BL, save
		this.ballBL(false);
	}
};
//onClick bottom right button
PlayScreen.prototype.clickBR = function ()
{			
	// record word answers
	var finishTime = Math.floor(Date.now());
	wordHistory[numWordHistory] = [BRraw, null, true, finishTime - startTime];		
	numWordHistory++;

	// hide all selection buttons
	this.showButtons(false);
	
	// hide middle goal keeper
	GK_Mid.visible = false;
	
	// check if answer is correct
	if(correctLocation == "BR")
	{	
		// correct answer, increase score
		score++;
		
		// show TL keeper + play animation
		GK_TL.visible = true;
		GK_TL_Dive.play(5);
		
		// Move football to BR, score
		this.ballBR(true);
	}
	else
	{
		// record word answers
		var finishTime = Math.floor(Date.now());
		wordHistory[numWordHistory] = [correctWord, BRraw, true, finishTime - startTime];		
		numWordHistory++;

		// incorrect answer, loose a life
		livesLeft--;
		
		// show TR keeper + play animation
		GK_BR.visible = true;
		GK_BR_Dive.play(5);

		// Move football to BR, save
		this.ballBR(false);
	}
};


//Reset screen after word selection
PlayScreen.prototype.reset = function ()
{		
	// update score
	this.updateScore();
	
	// check lives
	this.checkLives();
	
	// Wipe previous data from buttons
	TLtext.setText("");
	TRtext.setText("");
	BLtext.setText("");
	TRtext.setText("");
	
	// hide all animations
	GK_TL.visible = false;
	GK_TR.visible = false;
	GK_BL.visible = false;
	GK_BR.visible = false;
	
	// show middle goal keeper
	GK_Mid.visible = true;
	
	// Football rollIn (on complete -> setWords)
	this.ballRollIn();
};


// Generate an incorrect word
PlayScreen.prototype.genIncorrect = function (preSetNum)
{
	// Random value for which branch of common spelling mistakes to follow
	var tree = Math.floor((Math.random() * 4) + 0);

	// Define variables
	var regex;
	var finished = false;
	var newWord = "";

	
	while(!finished)
	{
		// Split into 4 different trees

		// Tree 0
		if(tree == 0)
		{
			// nse	->	nce		@ End of Line
			regex = /nse+$/g;
			if(regex.exec(correctWord))
			{
				newWord = correctWord.replace(regex, 'nce');
				finished = true;
			}

			// sy	->	cy 		@ End of Line
			regex = /sy+$/g;
			if(regex.exec(correctWord))
			{
				newWord = correctWord.replace(regex, 'cy');
				finished = true;
			}


// Not sure how to replace _ character

			// i_e	->	i_
//			regex = /i.e/g;
//			if(regex.exec(correctWord))
//			{
//				newWord = correctWord.replace(regex, 'i.');
//				finished = true;
//			}			


			// oe	->	e 
			regex = /oe/g;
			if(regex.exec(correctWord))
			{
				newWord = correctWord.replace(regex, 'e');
				finished = true;
			}

			// qu 	->	kw
			regex = /qu/g;
			if(regex.exec(correctWord))
			{
				newWord = correctWord.replace(regex, 'kw');
				finished = true;
			}

			// gue	->	g
			regex = /gue/g;
			if(regex.exec(correctWord))
			{
				newWord = correctWord.replace(regex, 'g');
				finished = true;
			}

			// ie 	-> ei
			regex = /ie/g;
			if(regex.exec(correctWord))
			{
				newWord = correctWord.replace(regex, 'ei');
				finished = true;
			}
		
			// ei 	-> ie
			regex = /ei/g;
			if(regex.exec(correctWord))
			{
				newWord = correctWord.replace(regex, 'ie');
				finished = true;
			}

			// re	->	er
			regex = /re/g;
			if(regex.exec(correctWord))
			{
				newWord = correctWord.replace(regex, 'er');
				finished = true;
			}
		}


		// Tree 1
		if(tree == 1)
		{
			// xs	->	ies		@ End of Line
			regex = /xs+$/g;
			if(regex.exec(correctWord))
			{
				newWord = correctWord.replace(regex, 'ies');
				finished = true;
			}

			// ae	->	e
			regex = /ae/g;
			if(regex.exec(correctWord))
			{
				newWord = correctWord.replace(regex, 'e');
				finished = true;
			}

			// eur	->	er
			regex = /eur/g;
			if(regex.exec(correctWord))
			{
				newWord = correctWord.replace(regex, 'er');
				finished = true;
			}

			// et	->	it
			regex = /et/g;
			if(regex.exec(correctWord))
			{
				newWord = correctWord.replace(regex, 'it');
				finished = true;
			}

			// ck	->	k
			regex = /ck/g;
			if(regex.exec(correctWord))
			{
				newWord = correctWord.replace(regex, 'k');
				finished = true;
			}

			// qu 	->	q
			regex = /qu/g;
			if(regex.exec(correctWord))
			{
				newWord = correctWord.replace(regex, 'q');
				finished = true;
			}

			// ent	-> ant
			regex = /ent/g;
			if(regex.exec(correctWord))
			{
				newWord = correctWord.replace(regex, 'ant');
				finished = true;
			}

			// ant	-> ent
			regex = /ant/g;
			if(regex.exec(correctWord))
			{
				newWord = correctWord.replace(regex, 'ent');
				finished = true;
			}

			// er	->	re
			regex = /er/g;
			if(regex.exec(correctWord))
			{
				newWord = correctWord.replace(regex, 're');
				finished = true;
			}
		}


		// Tree 2
		if(tree == 2)
		{
			// xs	->	es		@ End of Line
			regex = /xs+$/g;
			if(regex.exec(correctWord))
			{
				newWord = correctWord.replace(regex, 'es');
				finished = true;
			}

			// a_i	->	ai_
// ?

			// ou	-> 	o
			regex = /ou/g;
			if(regex.exec(correctWord))
			{
				newWord = correctWord.replace(regex, 'o');
				finished = true;
			}

			// os	-> oes
			regex = /os/g;
			if(regex.exec(correctWord))
			{
				newWord = correctWord.replace(regex, 'oes');
				finished = true;
			}

			// oes	-> os
			regex = /oes/g;
			if(regex.exec(correctWord))
			{
				newWord = correctWord.replace(regex, 'os');
				finished = true;
			}

			// sc 	-> 	c
			regex = /sc/g;
			if(regex.exec(correctWord))
			{
				newWord = correctWord.replace(regex, 'c');
				finished = true;
			}

			// i 	->	y
			regex = /i/g;
			if(regex.exec(correctWord))
			{
				newWord = correctWord.replace(regex, 'y');
				finished = true;
			}

			// c	->	s
			regex = /c/g;
			if(regex.exec(correctWord))
			{
				newWord = correctWord.replace(regex, 's');
				finished = true;
			}

			// s 	->	c
			regex = /s/g;
			if(regex.exec(correctWord))
			{
				newWord = correctWord.replace(regex, 'c');
				finished = true;
			}
		}


		// Tree 3
		if(tree == 3)
		{
			// x	->	ks		@ End of Line
			regex = /x+$/g;
			if(regex.exec(correctWord))
			{
				newWord = correctWord.replace(regex, 'ks');
				finished = true;
			}

			// s 	->	z
			regex = /s/g;
			if(regex.exec(correctWord))
			{
				newWord = correctWord.replace(regex, 'z');
				finished = true;
			}

			// ite	->	ate
			regex = /ite/g;
			if(regex.exec(correctWord))
			{
				newWord = correctWord.replace(regex, 'ate');
				finished = true;
			}

			// ch	->	sh
			regex = /ch/g;
			if(regex.exec(correctWord))
			{
				newWord = correctWord.replace(regex, 'sh');
				finished = true;
			}

			// sh	->	ch
			regex = /sh/g;
			if(regex.exec(correctWord))
			{
				newWord = correctWord.replace(regex, 'ch');
				finished = true;
			}

			// ie 	-> ei
			regex = /ie/g;
			if(regex.exec(correctWord))
			{
				newWord = correctWord.replace(regex, 'ei');
				finished = true;
			}

			// ei 	-> ie
			regex = /ei/g;
			if(regex.exec(correctWord))
			{
				newWord = correctWord.replace(regex, 'ie');
				finished = true;
			}

			// j 	-> g
			regex = /j/g;
			if(regex.exec(correctWord))
			{
				newWord = correctWord.replace(regex, 'g');
				finished = true;
			}

			// g 	->	j
			regex = /g/g;
			if(regex.exec(correctWord))
			{
				newWord = correctWord.replace(regex, 'j');
				finished = true;
			}
		}



		// ***************************************************************
		// Not subject to the above common mistakes - Change Random Letter
		// ***************************************************************
		if(!finished)
		{
			// Random index to add incorrect letter
			var positionIndex = Math.floor((Math.random() * correctWord.length) + 0);
		
			// Random index of letters array
			var letterIndex = Math.floor(Math.random() * letters.length);

			// if too high, try again
			if(positionIndex > (correctWord.length - 2))
			{
				return this.genIncorrect(preSetNum);
			}

			// Return word with random letter and random position
			newWord = correctWord.substr(0,positionIndex + 1)
				+ letters[letterIndex]
				+ correctWord.substr((positionIndex + 2), (correctWord.length));
		}

		console.log(newWord);
		finished = true;
	}



	// Make sure this incorrect word is not the same as the correct word, or previous incorrect words -> return
	if(preSetNum == 0 && newWord != correctWord)
	{
		preSet1 = newWord;
		return newWord;
	}
	else if(preSetNum == 1 && newWord != correctWord && newWord != preSet1)
	{
		preSet2 = newWord;
		return newWord;
	}
	else if(preSetNum == 2 && newWord != correctWord && newWord != preSet1 && newWord != preSet2)
	{
		preSet1 = "";
		preSet2 = "";
		return newWord;
	}
	
	// If not returned above, newWord isn't unique -> try again
	return this.genIncorrect(preSetNum);
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


// Check how many lives remaining, show correct frame
PlayScreen.prototype.checkLives = function() 
{
	if(livesLeft <= 0)
	{
		livesBox = this.add.sprite(0, 0, 'Lives', 3);
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

// Game has finished, move to finish state
PlayScreen.prototype.endGame = function() 
{
	this.state.start('finish');
};