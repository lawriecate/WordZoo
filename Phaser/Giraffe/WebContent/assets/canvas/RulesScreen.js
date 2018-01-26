// Global variables
var giraffe = giraffe|| {}; 
var giraffeFalling;

var counter;
var circle;
var circleBig;
var hand;
var handClick;
var handTween;



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
	this.load.pack('PlayScreen', 'assets/pack.json');	
	this.load.pack('RulesScreen', 'assets/pack.json');	
};

RulesScreen.prototype.create = function () 
{
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
   

	
	// Add giraffe walking sprites
	giraffeWalk = this.game.add.sprite(0, playerLanePositionsY[0], 'giraffeWalking', 1);
	giraffeWalk.scale.setTo(0.5, 0.5);

	// Add giraffe walking sprite
	giraffe = this.game.add.sprite(playerLanePositionsX[0] - 144, playerLanePositionsY[0], 'giraffeFalling', 0);
	giraffe.scale.setTo(1.5, 1.5);


	// giraffe fall animation
    giraffeFalling = giraffe.animations.add('fall', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 10);

    // giraffe walking animation + hide
    giraffeWalking = giraffeWalk.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10);
    giraffe.visible = false;


    // giraffe tween off stone 0
	giraffeMove0 = this.game.add.tween(giraffeWalk).to({x: '+150'}, 600, Phaser.Easing.Linear.None, false);
	giraffeMove0.onComplete.add(function (){
		currentColoumn++; this.moveGiraffe(playerLanePositionsX[(currentColoumn * 2)], playerLanePositionsY[currentLane]);
		giraffeWalking.stop();
	}, this);

    // giraffe tween off stone 1
	giraffeMove1 = this.game.add.tween(giraffeWalk).to({x: '+150'}, 600, Phaser.Easing.Linear.None, false);
	giraffeMove1.onComplete.add(function (){
		currentColoumn++; this.moveGiraffe(playerLanePositionsX[(currentColoumn * 2)], playerLanePositionsY[currentLane]);
		giraffeWalking.stop(); 
	}, this);
	
	// giraffe tween off stone 2
	giraffeMove2 = this.game.add.tween(giraffeWalk).to({x: '+150'}, 600, Phaser.Easing.Linear.None, false);
	giraffeMove2.onComplete.add(function (){
		giraffeWalking.stop(); this.moveGiraffe(playerLanePositionsX[6], playerLanePositionsY[currentLane]);
	}, this);


	
	// Add Lives box
	livesBox = this.add.sprite(0, 0, 'Lives', 0);
	
	// Add Time value
	timeText = this.add.text(1040, 40, "Time: "+(timeCounter / backgroundScrollSpeed), smallStyle);
	timeText.anchor.setTo(0.5);

	// Add Score value
	scoreText = this.add.text(1700, 40, "Score: 0", smallStyle);
	scoreText.anchor.setTo(0.5);


	// Add OK button
	var _okButton = this.add.button(1200, 900, 'okButton', this.onClickOK, this, null, null, null, null);
	_okButton.scale.setTo(1.5, 1.5);
	
	// Add Circle
	circle = this.add.sprite(1150, 40, 'circle');
	circle.scale.setTo(1.5, 1.25);
	circle.visible = false;

	// Add Big Circle
	circleBig = this.add.sprite(1150, 40, 'circle');
	circleBig.scale.setTo(3, 1.5);
	circleBig.visible = false;


	// Add Hand
	hand = this.add.sprite(800, 1500, 'Red', 0);
	hand.scale.setTo(0.5, 0.5);
	hand.visible = false;

	// Add Hand Click Animation
	handClick = hand.animations.add('Red', [0,1,2,3,4,5]);


	// Time
	timeLeft = timeCounter;
	timer = this.time.create(false);
	timer.loop(Phaser.Timer.SECOND/backgroundScrollSpeed, this.updateTime, this);

	// Set starting values
	backgroundScroll = false;
	backgroundDistance = 0;
	currentColoumn = 0;
	currentLane = 0;
	score = 0;
	counter = 0;
	livesLeft = startingLives;


	// Start game
	timer.start();
	this.setStones();
};


// Set words onto the stones
RulesScreen.prototype.setStones = function() 
{
	titleTextA.setText("A");
	wordA0.setText("0");
	wordA1.setText("1");
	wordA2.setText("2");
	wordA3.setText("3");

	titleTextB.setText("B");
	wordB0.setText("0");
	wordB1.setText("1");
	wordB2.setText("2");
	wordB3.setText("3");

	titleTextC.setText("B");
	wordC0.setText("0");
	wordC1.setText("1");
	wordC2.setText("2");
	wordC3.setText("3");
};



// display current time to screen (with --)
RulesScreen.prototype.updateTime = function ()
{	
	// Demo
	if((timeLeft % backgroundScrollSpeed) == 0)
	{
		console.log(counter);


		// 1 -> Highlight title
		if(counter == 1)
		{
			circleBig.x = 250;
			circleBig.y = 75;
			circleBig.visible = true;
		}

		// 2 -> correct stone
		else if(counter == 2)
		{
			circle.x = 350;
			circle.y = 480;
			circle.visible = true;
		}

		// 3 -> Hide + tween hand to correct
		else if(counter == 3)
		{
			circle.visible = false;
			circleBig.visible = false;

			hand.visible = true;
			handTween = this.game.add.tween(hand).to({x: '-390', y: '-940'}, 800, Phaser.Easing.Linear.None, false);
			handTween.start();
		}

		// 4 -> click hand
		else if(counter == 4)
		{
			hand.animations.currentAnim.onComplete.add(function () { hand.animations.frame = 0; }, this);
			handClick.play(10);
		}

		// 5 -> tween hand away
		else if(counter == 5)
		{
			handTween = this.game.add.tween(hand).to({x: '+390', y: '+940'}, 800, Phaser.Easing.Linear.None, false);
			handTween.start();
		}

		// 6 -> move giraffe
		else if(counter == 6)
		{	
			this.moveGiraffe(playerLanePositionsX[1], playerLanePositionsY[1]);
			currentLane = 1;

			giraffeWalking.play(10, true);
			giraffeMove0.start();
		}

		// 7 -> highlight score
		else if(counter == 7)
		{
		   // giraffe.visible = false;
			//giraffeWalk.visible = true;

			circle.x = 1590;
			circle.y = -50;
			circle.visible = true;
		}

		// 8 -> increase score
		else if(counter == 8)
		{
			scoreText.setText("Score: 1");
		}
		
		// 9 -> hide circle
		else if(counter == 9)
		{
			circle.visible = false;
		}
		
		// 10 -> highlight title
		if(counter == 10)
		{
			circleBig.x = 850;
			circleBig.y = 75;
			circleBig.visible = true;
		}

		// 11 -> correct stone
		else if(counter == 11)
		{
			circle.x = 950;
			circle.y = 690;
			circle.visible = true;
		}

		// 12 -> Hide + tween hand to correct
		else if(counter == 12)
		{
			circle.visible = false;
			circleBig.visible = false;

			hand.visible = true;
			handTween = this.game.add.tween(hand).to({x: '+210', y: '-1120'}, 900, Phaser.Easing.Linear.None, false);
			handTween.start();
		}
		
		// 13 -> click hand
		else if(counter == 13)
		{
			hand.animations.currentAnim.onComplete.add(function () { hand.animations.frame = 0; }, this);
			handClick.play(10);
		}

		// 14 -> tween hand away
		else if(counter == 14)
		{
			handTween = this.game.add.tween(hand).to({x: '-100', y: '+1120'}, 800, Phaser.Easing.Linear.None, false);
			handTween.start();
		}
		
		// 15 -> move giraffe
		else if(counter == 15)
		{			
			this.moveGiraffe(playerLanePositionsX[3], playerLanePositionsY[0]);
			currentLane = 0;
		}

		// 16 -> fall in
		else if(counter == 16)
		{
			giraffe.visible = true;
			giraffeWalk.visible = false;

		    giraffeFalling.onComplete.add(function () 
		    {
		    	giraffeWalking.play(10, true);
				giraffeMove1.start();
		    }, this);

			giraffeFalling.play(10, false);
		}

		// 17 -> highlight lives
		else if(counter == 17)
		{
		    giraffe.visible = false;
			giraffeWalk.visible = true;

			circleBig.x = -80;
			circleBig.y = -80;
			circleBig.visible = true;
		}

		// 18 -> decrease lives
		else if(counter == 18)
		{
			livesBox = this.add.sprite(0, 0, 'Lives', 1);
			this.world.bringToTop(circleBig);
		}

		// 19 -> hide cicrle
		else if(counter == 19)
		{
			circleBig.visible = false;
		}
		
		// 20 -> Exit
		else if(counter == 20)
		{
			this.onClickOK();
		}



		// Increase counter
		counter++;
	}


	// If no time remaining, game finished
	if(timeLeft <= 0){
		this.onClickOK();
	}
	
	// show current time
	timeText.setText("Time: "+(Math.floor(timeLeft/backgroundScrollSpeed)), true);	

	// decrease time remaining
	--timeLeft;
};



// Move giraffe to new position
RulesScreen.prototype.moveGiraffe = function (posX, posY)
{	
	giraffe.x = posX - 144;
	giraffe.y = posY;

	giraffeWalk.x = posX;
	giraffeWalk.y = posY;
};



// On click OK button, return to start screen
RulesScreen.prototype.onClickOK = function() 
{
	this.state.start('start');
};