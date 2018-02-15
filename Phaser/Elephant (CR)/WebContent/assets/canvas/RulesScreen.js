//global variables
var elephant = elephant|| {}; 

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
	this.load.pack('RulesScreen', 'assets/pack.json');	
	this.load.pack('PlayScreen', 'assets/pack.json');	

	// Load items
	for(var i = 0; i < matchingWords.length; i++)
	{
		var temp = matchingWords[i];
		this.load.image(temp[0],'assets/Items/'+temp[0]+'.png');
	}	
};

RulesScreen.prototype.create = function () 
{
	// load background
    background = this.game.add.tileSprite(0, 0, 1920, 1080, 'Background');
    background.scale.setTo(1.51, 1.51);

	// Add faded tutorial overlay
	var _tutorialOverlay = this.add.sprite(0, 0, 'tutorialOverlay');
	_tutorialOverlay.alpha = 0.1;


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


	// Add OK button
	var _okButton = this.add.button(1400, 930, 'okButton', this.onClickOK, this, null, null, null, null);
	_okButton.scale.setTo(1.5, 1.5);
	
	// Add Circle
	circle = this.add.sprite(1338, 200, 'highlightCircle');
	circle.scale.setTo(3.5, 1.6);
	circle.visible = false;

	// Add Big Circle
	circleBig = this.add.sprite(85, 210, 'highlightCircle');
	circleBig.scale.setTo(2, 2);
	circleBig.visible = false;


	// Add Hand
	hand = this.add.sprite(1800, 500, 'Red', 0);
	hand.scale.setTo(0.5, 0.5);
	hand.visible = false;

	// Add Hand Click Animation
	handClick = hand.animations.add('Red', [0,1,2,3,4,5]);



    // Start game
    livesLeft = startingLives;
    score = 0;
    counter = 0;
    this.setFirst();
	timer.start();
};






// display current time to screen (with --)
RulesScreen.prototype.updateTime = function ()
{	
	// Increase counter
	counter++;


	// 1 circle target
	if(counter == 1)
	{
		circle.visible = true;
	}
	// 2 circle correct
	else if(counter == 2)
	{
		circleBig.visible = true;
	}
	// 3 hide both circles + move hand to corret
	else if(counter == 3)
	{
		circle.visible = false;
		circleBig.visible = false;

		hand.visible = true;
		this.world.bringToTop(hand);
		handTween = this.game.add.tween(hand).to({x: '-1630', y: '-150'}, 800, Phaser.Easing.Linear.None, false);
		handTween.start();
	}
	// 4 -> click hand
	else if(counter == 4)
	{
		hand.animations.currentAnim.onComplete.add(function () { hand.animations.frame = 0; }, this);
		handClick.play(10);
	}
	// 5 -> move hand away
	else if(counter == 5)
	{
		handTween = this.game.add.tween(hand).to({x: '+220', y: '+300'}, 400, Phaser.Easing.Linear.None, false);
		handTween.start();
	}
	// 6 -> circle score
	else if(counter == 6)
	{
		circle.x = 770;
		circle.y = 880;
		circle.visible = true;
	}
	// 7 -> increase score
	else if(counter == 7)
	{
		scoreText.setText("Score: 1");
	} 
	// 8 -> hide circle
	else if(counter == 8)
	{
		circle.visible = false;
	}
	// 9 -> reset
	else if(counter == 9)
	{
		this.setSecond();
	}
	// 10 -> circle target
	else if(counter == 10)
	{
		circle.x = 1338;
		circle.y = 200;
		circle.visible = true;
	}
	// 11 -> circle correct
	else if(counter == 11)
	{
		circleBig.x = 960;
		circleBig.visible = true;
	}
	// 12 -> hide circles + move hand
	else if(counter == 12)
	{
		circle.visible = false;
		circleBig.visible = false;

		this.world.bringToTop(hand);
		handTween = this.game.add.tween(hand).to({x: '+220', y: '-300'}, 400, Phaser.Easing.Linear.None, false);
		handTween.start();
	}
	// 13 -> click hand
	else if(counter == 13)
	{
		hand.animations.currentAnim.onComplete.add(function () { hand.animations.frame = 0; }, this);
		handClick.play(10);
	}
	// 14 -> move hand away
	else if(counter == 14)
	{
		handTween = this.game.add.tween(hand).to({x: '+220', y: '+300'}, 400, Phaser.Easing.Linear.None, false);
		handTween.start();
	}
	// 15 -> circle lives
	else if(counter == 15)
	{
		this.world.bringToTop(circle);

		circle.x = -120;
		circle.y = -40;
		circle.scale.setTo(3, 1);
		circle.visible = true;
	}
	// 16 -> increase score
	else if(counter == 16)
	{
		livesBox = this.add.sprite(0, 0, 'Lives', 1);
		this.world.bringToTop(circle);
	} 
	// 17 -> hide circle
	else if(counter == 17)
	{
		circle.visible = false;
	}

	// 18 -> exit
	else if(counter == 18)
	{
		this.onClickOK();
	}


	// If no time remaining, game finished
	if(timeLeft <= 0){
		this.onClickOK();
	}
	
	// show current time
	timeText.setText("Time Remaining: "+ --timeLeft, true);	
};



// set first text/picture values
RulesScreen.prototype.setFirst = function ()
{	
	// Get a matching pair
    var matchingPair = matchingWords[0];
    var incorrect1 = matchingWords[1];
    var incorrect2 = matchingWords[2];
    winnerItemText.setText(matchingPair[0]);

    // Set correct picture
	item0 = this.game.add.sprite(120, 250, matchingPair[1]);

	// Set incorrect pictures
	item1 = this.game.add.sprite(555, 250, incorrect1[0]);
	item2 = this.game.add.sprite(998, 250, incorrect2[0]);

	// Scale items
    item0.scale.setTo(3, 3);
    item1.scale.setTo(3, 3);
    item2.scale.setTo(3, 3);
};

// set second text/picture values
RulesScreen.prototype.setSecond = function ()
{	
	// Kill old items
	item0.kill();
	item1.kill();
	item2.kill();

	// Get a matching pair
    var matchingPair = matchingWords[1];
    var incorrect1 = matchingWords[0];
    var incorrect2 = matchingWords[2];
    winnerItemText.setText(matchingPair[0]);

    // Set correct picture
	item2 = this.game.add.sprite(998, 250, matchingPair[1]);

	// Set incorrect pictures
	item0 = this.game.add.sprite(120, 250, incorrect1[0]);
	item1 = this.game.add.sprite(555, 250, incorrect2[0]);

	// Scale items
    item0.scale.setTo(3, 3);
    item1.scale.setTo(3, 3);
    item2.scale.setTo(3, 3);
};



// On click OK button, return to start screen
RulesScreen.prototype.onClickOK = function() 
{
	this.state.start('start');
};