//global variables
var sheep = sheep|| {};

var circle;
var circleBig;
var hand;
var handClick;
var handTween;
var sheepTween;
var counter;


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
	//this.load.pack('RulesScreen', 'http://localhost:1337/sheepgame/assets/pack.json');	
	this.load.pack('RulesScreen', 'assets/pack.json');

	// Set up pens array + fill with blanks
	pens = new Array();
	for(var i = 0; i < 4; i++){
		pens[i] = new Object();
	}
};

RulesScreen.prototype.create = function ()
{
	// Add background
	background = this.add.tileSprite(0, 0, 1920, 1080, 'Background');

	// Add faded tutorial overlay
	var _tutorialOverlay = this.add.sprite(0, 0, 'tutorialOverlay');
	_tutorialOverlay.alpha = 0.1;

	// Add back to pens
	pens[0].back =  this.add.sprite(374, 387, 'penBack');
	pens[0].back.anchor.setTo(0.5, 0.5);

	pens[1].back = this.add.sprite(1581, 381, 'penBack');
	pens[1].back.anchor.setTo(0.5, 0.5);

	pens[2].back = this.add.sprite(383, 871, 'penBack');
	pens[2].back.anchor.setTo(0.5, 0.5);

	pens[3].back = this.add.sprite(1592, 868, 'penBack');
	pens[3].back.anchor.setTo(0.5, 0.5);


	// Add sheep to pens
	pens[0].sheep = this.add.sprite(68, 210, 'sheepPen', 12);
	pens[0].front = this.add.sprite(374, 387, 'penFront');
	pens[0].front.anchor.setTo(0.5, 0.5);

	pens[1].sheep = this.add.sprite(1273, 198, 'sheepPen', 12);
	pens[1].front = this.add.sprite(1581, 381, 'penFront');
	pens[1].front.anchor.setTo(0.5, 0.5);

	pens[2].sheep = this.add.sprite(75, 697, 'sheepPen', 12);
	pens[2].front = this.add.sprite(383, 871, 'penFront');
	pens[2].front.anchor.setTo(0.5, 0.5);

	pens[3].sheep = this.add.sprite(1266, 709, 'sheepPen', 12);
	pens[3].front = this.add.sprite(1592, 868, 'penFront');
	pens[3].front.anchor.setTo(0.5, 0.5);


	// Add GUI
	this.add.sprite(0, 0, 'gui');


	// Text over GUI
	mainText = this.add.text(960, 90, "", bigStyle);
	mainText.anchor.setTo(0.5, 0.5);
	mainText.addColor('#FF9933', 0);

	TRtext = this.add.text(1640, 150, "", medStyle);
	TRtext.anchor.setTo(0.5, 0.5);
	TRtext.addColor('#FF9933', 0);

	TLtext = this.add.text(420, 165, "", medStyle);
	TLtext.anchor.setTo(0.5, 0.5);
	TLtext.addColor('#FF9933', 0);

	BRtext = this.add.text(1660, 650, "", medStyle);
	BRtext.anchor.setTo(0.5, 0.5);
	BRtext.addColor('#FF9933', 0);

	BLtext = this.add.text(440, 650, "", medStyle);
	BLtext.anchor.setTo(0.5, 0.5);
	BLtext.addColor('#FF9933', 0);


	// Add score value
	scoreText = this.add.text(1650, 40, "Score: "+score, smallStyle);
	scoreText.anchor.setTo(0.5, 0.5);

	// Add time value
	timeText = this.add.text(520, 40, "Time: "+startingTime, smallStyle);
	timeText.anchor.setTo(0.5, 0.5);

	// Add Lives box
	livesBox = this.add.sprite(0, 0, 'Lives', 0);


	// Add sheep wobble animation
	sheepWobble = this.add.sprite(948, 560, 'sheepWobble', 0);
	sheepWobble.visible = false;
	sheepWobble.anchor.setTo(0.5, 0.5);
	sheepWobble.animations.add('wobble');
	sheepWobble.scale.setTo(0.4,0.4);
	sheepWobble.animations.play('wobble',30,true);

	// Add main sheep
	mainSheep = this.add.sprite(943, 527, 'mainSheep');
	mainSheep.anchor.setTo(0.5, 0.5);


	// Add OK button
	var _okButton = this.add.button(740, 865, 'okButton', this.onClickOK, this, null, null, null, null);
	_okButton.scale.setTo(1.75, 1.75);

	// Add Circle
	circle = this.add.sprite(1480, 560, 'highlightCircle');
	circle.scale.setTo(2.5, 1.2);
	circle.visible = false;

	// Add Big Circle
	circleBig = this.add.sprite(640, -60, 'highlightCircle');
	circleBig.scale.setTo(4.5, 2);
	circleBig.visible = false;

	// Add Hand
	hand = this.add.sprite(2000, 700, 'Red', 0);
	hand.scale.setTo(0.5, 0.5);
	hand.visible = false;

	// Add Hand Click Animation
	handClick = hand.animations.add('Red', [0,1,2,3,4,5]);


	// Time
	timer = this.time.create(false);
	timer.loop(Phaser.Timer.SECOND, this.updateTime, this);

	// starting values
	timeLeft = startingTime;
	livesLeft = startingLives;
	score = 0;
	counter = 0;



	// Set text
	mainText.setText("Soap");
	TLtext.setText("Hat");
	TRtext.setText("House");
	BLtext.setText("Car");
	BRtext.setText("Rope");

	// Start
	timer.start();
};



// display current time to screen (with --)
RulesScreen.prototype.updateTime = function ()
{
	// Fixed Demo
	counter++;
	console.log(counter);

	// At 1 seconds, circle title
	if(counter == 1)
	{
		circleBig.visible = true;
	}
	// At 2 seconds, circle correct
	else if(counter == 2)
	{
		circle.visible = true;
	}
	// At 3 seconds, hide both + move hand to main sheep
	else if(counter == 3)
	{
		circleBig.visible = false;
		circle.visible = false;

		hand.visible = true;
		handTween = this.game.add.tween(hand).to({x: '-1100', y: '-180'}, 800, Phaser.Easing.Linear.None, false);
		handTween.start();
	}
	// At 4 seconds, click hand
	else if(counter == 4)
	{
		hand.animations.currentAnim.onComplete.add(function () { hand.animations.frame = 5; sheepWobble.visible = true;
			mainSheep.visible = false; }, this);
		handClick.play(10);
	}
	// At 5 seconds, move hand + wobble sheep to BR pen
	else if(counter == 5)
	{
		handTween = this.game.add.tween(hand).to({x: '+400', y: '+200'}, 400, Phaser.Easing.Linear.None, false);
		sheepTween = this.game.add.tween(sheepWobble).to({x: '+400', y: '+200'}, 400, Phaser.Easing.Linear.None, false);

		handTween.onComplete.add(function () { 	pens[3].back.scale.setTo(1.5,1.5); pens[3].front.scale.setTo(1.5,1.5);
			handTween = this.game.add.tween(hand).to({x: '+200', y: '+100'}, 200, Phaser.Easing.Linear.None, false);
			sheepTween = this.game.add.tween(sheepWobble).to({x: '+200', y: '+100'}, 200, Phaser.Easing.Linear.None, false);

			handTween.onComplete.add(function () { 	pens[3].back.scale.setTo(1,1); pens[3].front.scale.setTo(1,1);
				sheepWobble.visible = false; mainSheep.visible = true; hand.animations.frame = 0; pens[3].sheep.frame = 11;
			}, this);
			handTween.start();
			sheepTween.start();

		}, this);
		handTween.start();
		sheepTween.start();
	}
	// At 6 seconds, move hand away
	else if(counter == 6)
	{
		sheepWobble.x = 948;
		sheepWobble.y = 560;

		handTween = this.game.add.tween(hand).to({x: '+500', y: '+120'}, 400, Phaser.Easing.Linear.None, false);
		handTween.start();
	}
	// At 7 seconds, circle score
	else if(counter == 7)
	{
		circle.x = 1540;
		circle.y = -40;
		circle.scale.setTo(1.5,1);
		circle.visible = true;
	}
	// At 8 seconds, increase score
	else if(counter == 8)
	{
		scoreText.setText("Score: 1");
	}
	// At 9 seconds, hide score circle
	else if(counter == 9)
	{
		circle.visible = false;

		// Set next text
		mainText.setText("Flag");
		TLtext.setText("Bag");
		TRtext.setText("Tiger");
		BLtext.setText("Book");
		BRtext.setText("Lemon");
	}
	// At 10 seconds, circle title
	else if(counter == 10)
	{
		circleBig.visible = true;
	}
	// At 11 seconds, circle title
	else if(counter == 11)
	{
		circle.scale.setTo(2.5, 1.2);
		circle.x = 230;
		circle.y = 80;
		circle.visible = true;
	}
	// At 12 seconds, hide circles + move hand to sheep
	else if(counter == 12)
	{
		circle.visible = false;
		circleBig.visible = false;

		hand.visible = true;
		handTween = this.game.add.tween(hand).to({x: '-1100', y: '-400'}, 800, Phaser.Easing.Linear.None, false);
		handTween.start();
	}
	// At 13 seconds, click hand
	else if(counter == 13)
	{
		hand.animations.currentAnim.onComplete.add(function () { hand.animations.frame = 5; sheepWobble.visible = true;
			mainSheep.visible = false; }, this);
		handClick.play(10);
	}
	// At 14 seconds, move hand + wobble sheep to TR pen
	else if(counter == 14)
	{
		handTween = this.game.add.tween(hand).to({x: '+300', y: '-150'}, 300, Phaser.Easing.Linear.None, false);
		sheepTween = this.game.add.tween(sheepWobble).to({x: '+300', y: '-150'}, 300, Phaser.Easing.Linear.None, false);

		handTween.onComplete.add(function () { 	pens[1].back.scale.setTo(1.5,1.5); pens[1].front.scale.setTo(1.5,1.5);
			handTween = this.game.add.tween(hand).to({x: '+300', y: '-150'}, 300, Phaser.Easing.Linear.None, false);
			sheepTween = this.game.add.tween(sheepWobble).to({x: '+300', y: '-150'}, 300, Phaser.Easing.Linear.None, false);

			handTween.onComplete.add(function () { 	pens[1].back.scale.setTo(1,1); pens[1].front.scale.setTo(1,1);
				sheepWobble.visible = false; mainSheep.visible = true; hand.animations.frame = 0;
			}, this);
			handTween.start();
			sheepTween.start();

		}, this);
		handTween.start();
		sheepTween.start();
	}
	// At 15 seconds, move hand away
	else if(counter == 15)
	{
		handTween = this.game.add.tween(hand).to({x: '+500', y: '+120'}, 400, Phaser.Easing.Linear.None, false);
		handTween.start();
	}
	// At 16 seconds, circle lives
	else if(counter == 16)
	{
		circle.x = -40;
		circle.y = -40;
		circle.scale.setTo(2.5,1);
		circle.visible = true;
	}
	// At 17 seconds, decrease lives
	else if(counter == 17)
	{
		livesBox = this.add.sprite(0, 0, 'Lives', 1);
		this.world.bringToTop(circle);
	}
	// At 18 seconds, hide circle
	else if(counter == 18)
	{
		circle.visible = false;
	}
	// At 19 seconds, exit
	else if(counter == 19)
	{
		this.onClickOK();
	}







	// If no time remaining, game finished
	if(timeLeft <= 0){
		this.endGame();
	}

	timeText.setText("Time: "+(--timeLeft), true);
};





// On click OK button, return to start screen
RulesScreen.prototype.onClickOK = function()
{
	this.state.start('start');
};
