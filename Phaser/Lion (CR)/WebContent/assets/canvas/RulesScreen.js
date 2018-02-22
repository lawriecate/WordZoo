var counter;
var timeLeft;
var score;

var GK_Mid;
var GK_TL;
var GK_BR;

var imageExample;

var GK_TL_Dive;
var GK_BR_Dive;

var TLtext;
var TRtext;
var BLtext;
var BRtext;

var topLeft;
var topRight;
var bottomLeft;
var bottomRight;

var football;
var footballRollIn;

var footballTL1;
var footballTL2;

var scoreText;
var timeText;
var livesBox;

var circle;
var hand;
var handTween;
var handClick;

var timer;





function RulesScreen() 
{	
	Phaser.State.call(this);	
}

/** @type Phaser.State */
var RulesScreen_proto = Object.create(Phaser.State.prototype);
RulesScreen.prototype = RulesScreen_proto;
RulesScreen.prototype.constructor = RulesScreen;

RulesScreen.prototype.init = function () 
{	
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.scale.pageAlignHorizontally = true;
	this.scale.pageAlignVertically = true;
	this.stage.backgroundColor = '#ffffff';	
};

RulesScreen.prototype.preload = function () 
{	
	this.load.pack('RulesScreen', 'assets/pack.json');	

	// Load images
	this.load.image("cat",'assets/Images/cat.png');
	this.load.image("puzzle",'assets/Images/puzzle.png');
};

RulesScreen.prototype.create = function () 
{
	// Add background
	var background = this.add.sprite(0, 0, 'Background');
	
	// Add faded tutorial overlay
	var _tutorialOverlay = this.add.sprite(0, 0, 'tutorialOverlay');
	_tutorialOverlay.alpha = 0.1;

	// Add normal (no-diving) goal keeper
	GK_Mid = this.add.sprite(790, 320, 'goalkeeper_center');
	GK_Mid.scale.setTo(1.5, 1.5);

	

	// Add TopLeft word box
	topLeft = this.add.button(544, 128, 'ScoreBackground', null, null, null, null, null, null);
	topLeft.scale.setTo(1.5, 1.5);
	topLeft.visible = false;

	// Add TopRight word box
	topRight = this.add.button(1184, 128, 'ScoreBackground', null, null, null, null, null, null);
	topRight.scale.setTo(1.5, 1.5);
	topRight.visible = false;
	
	// Add BottomLeft word box
	bottomLeft = this.add.button(544, 576, 'ScoreBackground', null, null, null, null, null, null);
	bottomLeft.scale.setTo(1.5, 1.5);
	bottomLeft.visible = false;
	
	// Add BottomRight word box
	bottomRight = this.add.button(1184, 576, 'ScoreBackground', null, null, null, null, null, null);
	bottomRight.scale.setTo(1.5, 1.5);
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
	 
	// Add BottonRight diving goal keeper + hide
 	GK_BR = this.game.add.sprite(840,290,'bottom_right_dive', 0);
 	GK_BR.scale.setTo(1.5, 1.5);
 	GK_BR.visible = false;
	 
	 
	// TopLeft diving animation
 	GK_TL_Dive = GK_TL.animations.add('top_left_dive', [0,1,2]);
 	GK_TL.animations.currentAnim.onComplete.add(function () { GK_TL.animations.frame = 0; }, this);

	// BottomRight diving animation
 	GK_BR_Dive = GK_BR.animations.add('bottom_right_dive',[0,1,2]);
	GK_BR.animations.currentAnim.onComplete.add(function () { GK_BR.animations.frame = 0; }, this);
	
	
	// Add Football + spin
	football = this.add.sprite(-100, 870, 'soccer_ball', 3);
	football.scale.setTo(1.5, 1.5);
	footballSpin = football.animations.add('spin');
	
	// Football RollIn tween
	footballRollIn = this.game.add.tween(football).to({x: '+1050'}, 1000, Phaser.Easing.Linear.None, false);
	footballRollIn.onComplete.add(function (){footballSpin.stop(0); this.showButtons(true);} , this);
	
	// Football TL tween
	footballTL1 = this.game.add.tween(football).to({x: '-380', y:'-700'}, 300, Phaser.Easing.Linear.None, false);
	footballTL2 = this.game.add.tween(football).to({x: '+100', y: '+350'}, 200, Phaser.Easing.Linear.None, false);
	footballTL1.onComplete.add(function (){footballTL2.start();}, this);
	footballTL2.onComplete.add(function (){footballSpin.stop(0);} , this);

	// Football BR tween
	footballBR1 = this.game.add.tween(football).to({x: '+360', y:'-400'}, 200, Phaser.Easing.Linear.None, false);
	footballBR2 = this.game.add.tween(football).to({y: '+50'}, 100, Phaser.Easing.Linear.None, false);
	footballBR1.onComplete.add(function (){footballBR2.start();}, this);
	footballBR2.onComplete.add(function (){footballSpin.stop(0);} , this);

	
	// Add score value
	scoreText = this.add.text(1720, 30, "Score: "+score, style);
	scoreText.anchor.setTo(0.5);
	
	// Add time value
	timeText = this.add.text(960, 30, "Time: "+startingTime, style);
	timeText.anchor.setTo(0.5);
	
	// Add Lives box
	livesBox = this.add.sprite(0, 0, 'Lives', 0);
			
	
	// Add OK button
	var _okButton = this.add.button(1500, 830, 'okButton', this.onClickOK, this, null, null, null, null);
	_okButton.scale.setTo(1.75, 1.75);

	// Add Circle
	circle = this.add.sprite(1150, 40, 'highlightCircle');
	circle.scale.setTo(2, 2);
	circle.visible = false;


	// Add Hand
	hand = this.add.sprite(2000, 500, 'Hand', 0);
	hand.scale.setTo(0.5, 0.5);
	hand.visible = false;

	// Add Hand Click Animation
	handClick = hand.animations.add('Hand', [0,1,2,3,4,5]);



	// Time
	timeLeft = startingTime;
	timer = this.time.create(false);
	timer.loop(Phaser.Timer.SECOND, this.updateTime, this);
	timer.start();


	// Set starting values
	counter = 4;
	timeLeft = 60;
	score = 0;




	// *** Start Demo ***
	this.updateScore();
	this.showButtons(false);

	this.setTextCorrect();
	this.ballRollIn();
};

// display current time to screen (with --)
RulesScreen.prototype.setTextCorrect = function ()
{	
	imageExample = this.add.sprite(980, 190, "cat");
	imageExample.anchor.setTo(0.5,0.5);
	imageExample.scale.setTo(0.75,0.75);

	TLtext.setText("Czt");
	TRtext.setText("Cat");
	BLtext.setText("Qat");
	BRtext.setText("Cah");
};

// display current time to screen (with --)
RulesScreen.prototype.setTextIncorrect = function ()
{	
	imageExample = this.add.sprite(980, 190, "puzzle");
	imageExample.anchor.setTo(0.5,0.5);
	imageExample.scale.setTo(0.75,0.75);

	TLtext.setText("Puzzle");
	TRtext.setText("Puze");
	BLtext.setText("Pussle");
	BRtext.setText("Puzzel");
};



// hide/display word selection buttons (boolean)
RulesScreen.prototype.showButtons = function (isVisible)
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



// display current time to screen (with --)
RulesScreen.prototype.updateTime = function ()
{
	counter++;
	console.log(counter);

	// At 6 seconds, show circle
	if(counter == 6)
	{
		circle.visible = true;
	}
	// At 8 seconds, show hand
	else if(counter == 8)
	{
		circle.visible = false;
		hand.visible = true
		handTween = this.game.add.tween(hand).to({x: '-750', y: '-320'}, 800, Phaser.Easing.Linear.None, false);
		handTween.start();
	}
	// At 9 seconds, hand click
	else if(counter == 9)
	{
		hand.animations.currentAnim.onComplete.add(function () { hand.animations.frame = 0; }, this);
		handClick.play(10);
	}
	// At 10 seconds, tween away
	else if(counter == 10)
	{
		handTween = this.game.add.tween(hand).to({x: '+750', y: '+320'}, 800, Phaser.Easing.Linear.None, false);
		handTween.start();
	}
	// At 11 seconds, kick ball / score
	else if(counter == 11)
	{
		imageExample.kill();

		GK_Mid.visible = false;
		GK_TL.visible = true;
		GK_TL_Dive.play(5);

		this.showButtons(false);
		this.ballTL();
	}
	// At 12 seconds, reset kick animations
	else if(counter == 12)
	{
		GK_Mid.visible = true;
		GK_TL.visible = false;
		football.visible = false;

		circle.x = 1580;
		circle.y = -120;
		circle.visible = true;
	}
	// At 13 seconds, increase score
	else if(counter == 13)
	{
		score++;
		this.updateScore();
	}
	// At 14 seconds, set incorrectText
	else if(counter == 14)
	{
		circle.visible = false;

		this.setTextIncorrect();
		this.ballRollIn();
	}
	// At 16 seconds, move circle to TL
	else if(counter == 16)
	{
		circle.x = 510;
		circle.y = 40;
		circle.visible = true;
	}
	// At 17 seconds, show hand
	else if(counter == 17)
	{
		circle.visible = false;

		hand.visible = true
		handTween = this.game.add.tween(hand).to({x: '-750', y: '+130'}, 800, Phaser.Easing.Linear.None, false);
		handTween.start();
	}	
	// At 18 seconds, hand click
	else if(counter == 18)
	{
		handClick.play(10);
	}
	// At 19 seconds, tween away
	else if(counter == 19)
	{
		handTween = this.game.add.tween(hand).to({x: '+750', y: '-130'}, 800, Phaser.Easing.Linear.None, false);
		handTween.start();
	}
	// At 20 seconds, kick ball / save
	else if(counter == 20)
	{
		imageExample.kill();

		GK_Mid.visible = false;
		GK_BR.visible = true;
		GK_BR_Dive.play(5);

		this.showButtons(false);
		this.ballBR();
	}
	// At 21 seconds, reset kick animations
	else if(counter == 21)
	{
		GK_Mid.visible = true;
		GK_BR.visible = false;
		football.visible = false;

		circle.x = 0;
		circle.y = -120;
		circle.visible = true;
	}
	// At 22 seconds, lose a life
	else if(counter == 22)
	{
		livesBox = this.add.sprite(0, 0, 'Lives', 1);
	}
	// At 23 seconds, exit
	else if(counter == 23)
	{
		this.onClickOK();
	}


	timeText.setText("Time: "+(--timeLeft), true);	
};


// display current score to screen
RulesScreen.prototype.updateScore = function ()
{	
	scoreText.setText("Score: "+score, true);	
};

// Ball roll in
RulesScreen.prototype.ballRollIn = function ()
{	
	// Reset position
	football.reset(-150, 870);
	
	// Start spin
	footballSpin.play(10,true);

	// Start movement
	footballRollIn.start();
	// onComplete, stop roll + setWords
};

//Ball TopLeft kick
RulesScreen.prototype.ballTL = function()
{		
	// Start spin
	footballSpin.play(5,true);

	// Start movement
	footballTL1.start();
};
//Ball BottomRight kick
RulesScreen.prototype.ballBR = function()
{		
	// Start spin
	footballSpin.play(5,true);

	// Start movement
	footballBR1.start();
};


// On click OK button, return to start screen
RulesScreen.prototype.onClickOK = function() 
{
	this.state.start('start');
};