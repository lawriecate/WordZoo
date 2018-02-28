//global variables
var octopus = octopus|| {};


// Global variables
var timeLeft;
var timer;
var counter;

var circle;
var circleBig;
var hand;
var handClick;


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
	// Load pack
	this.load.pack('Main', '/games/octopus/assets/pack.json');

	// Load assets
	for(var i = 0; i < testWords.length; i++)
	{
		this.load.image(testWords[i] ,'/games/octopus/assets/testAssets/'+testWords[i]+'.png');
	}


	assets = new Array();
	strikes = new Array();
	toppings = new Array();

	//Creates the asset array of blank objects
	for(var i = 0; i < testWords.length; i++)
	{
		assets[i] = new Object();
		assets[i].word = testWords[i];
	}


	/**
	 * Layout of Select Items
	 *  _______________
	 * | 0 | 1 | 2 | 3 |
	 * | 4 | 5 | 6 | 7 |
	 * | 8 | 9 |
	 *
	 */
};

RulesScreen.prototype.create = function ()
{
	var _background = this.add.sprite(960, 540, 'background');
	_background.anchor.setTo(0.5, 0.5);

	// Add faded tutorial overlay
	var _tutorialOverlay = this.add.sprite(0, 0, 'tutorialOverlay');
	_tutorialOverlay.alpha = 0.1;

	game = this;

	 _pizza = this.add.sprite(1530, 825, 'pizza');
	_pizza.anchor.setTo(0.5, 0.5);


	//Order
	var style = { font: "60px Arial", fill: "#000000", align: "left"};
    orderText = game.add.text(115, 200, "• item1 \n• item2 \n• item3 \n• item4 \n• item5\n", style);

    style = { font: "70px Arial", fill: "#FF0000", align: "left" , fontWeight: "bold"};
    game.add.text(190,120, "ORDER",style);

    //The Strike throughs
    //	var _selectItem = this.add.sprite(718, 262, 'selectItem');
    strikes[0] = game.add.sprite(-1100,215,'strikeThrough');
    strikes[1] = game.add.sprite(-1100,290,'strikeThrough');
    strikes[2] = game.add.sprite(-1100,365,'strikeThrough');
    strikes[3] = game.add.sprite(-1100,440,'strikeThrough');
    strikes[4] = game.add.sprite(-1100,515,'strikeThrough');


    //Spawn the Clock
	style = {font: "70px Arial", fill: '#FF9933', align: "left", fontWeight: 'bold'};
	clock = this.add.text(1100,80,"Time Remaining:  ",style);
	clock.anchor.setTo(0.5,0.5);
	//Spawn Score
	scoreText = this.add.text(1700,80,"Score: ",style);
	scoreText.anchor.setTo(0.5,0.5);



	//Decorative items
	//x, y, asset
	addFoodTutorial(822,304,assets[0].word);
	addFoodTutorial(900,310,assets[0].word); //+88
	addFoodTutorial(976,318,assets[0].word); //+154
	addFoodTutorial(786,380,assets[0].word); //-36
	addFoodTutorial(866,363,assets[0].word); //+44
	addFoodTutorial(956,378,assets[0].word); //+134
	addFoodTutorial(817,390,assets[0].word); //-5
	addFoodTutorial(900,390,assets[0].word); //+78

	addFoodTutorial(1140,304,assets[1].word);
	addFoodTutorial(1140+88,310,assets[1].word);
	addFoodTutorial(1140+154,318,assets[1].word);
	addFoodTutorial(1140-34,380,assets[1].word);
	addFoodTutorial(1140+44,363,assets[1].word);
	addFoodTutorial(1140+134,378,assets[1].word);
	addFoodTutorial(1140-5,390,assets[1].word);
	addFoodTutorial(1140+78,390,assets[1].word);

	addFoodTutorial(1480,304,assets[2].word);
	addFoodTutorial(1480+88,310,assets[2].word);
	addFoodTutorial(1480+154,318,assets[2].word);
	addFoodTutorial(1480-34,380,assets[2].word);
	addFoodTutorial(1480+44,363,assets[2].word);
	addFoodTutorial(1480+134,378,assets[2].word);
	addFoodTutorial(1480-5,390,assets[2].word);
	addFoodTutorial(1480+78,390,assets[2].word);

	addFoodTutorial(1810,304,assets[3].word);
	addFoodTutorial(1810+88,310,assets[3].word);
	addFoodTutorial(1810+154,318,assets[3].word);
	addFoodTutorial(1810-34,380,assets[3].word);
	addFoodTutorial(1810+44,363,assets[3].word);
	addFoodTutorial(1810+134,378,assets[3].word);
	addFoodTutorial(1810-5,390,assets[3].word);
	addFoodTutorial(1810+78,390,assets[3].word);

	//2nd Row
	addFoodTutorial(722,540,assets[4].word);
	addFoodTutorial(722+78,540+6,assets[4].word);
	addFoodTutorial(722+164,540+8,assets[4].word);
	addFoodTutorial(722+144,540+60,assets[4].word);
	addFoodTutorial(722-22,540+50,assets[4].word);
	addFoodTutorial(722+64,540+62,assets[4].word);
	addFoodTutorial(722+18,540+90,assets[4].word);
	addFoodTutorial(722+128,540+90,assets[4].word);

	addFoodTutorial(1070,540,assets[5].word);
	addFoodTutorial(1070+78,540+6,assets[5].word);
	addFoodTutorial(1070+164,540+8,assets[5].word);
	addFoodTutorial(1070+144,540+60,assets[5].word);
	addFoodTutorial(1070-22,540+50,assets[5].word);
	addFoodTutorial(1070+64,540+62,assets[5].word);
	addFoodTutorial(1070+18,540+90,assets[5].word);
	addFoodTutorial(1070+128,540+90,assets[5].word);

	addFoodTutorial(1400,540,assets[6].word);
	addFoodTutorial(1400+78,540+6,assets[6].word);
	addFoodTutorial(1400+164,540+8,assets[6].word);
	addFoodTutorial(1400+144,540+60,assets[6].word);
	addFoodTutorial(1400-22,540+50,assets[6].word);
	addFoodTutorial(1400+64,540+62,assets[6].word);
	addFoodTutorial(1400+18,540+90,assets[6].word);
	addFoodTutorial(1400+128,540+90,assets[6].word);

	addFoodTutorial(1720,540,assets[7].word);
	addFoodTutorial(1720+78,540+6,assets[7].word);
	addFoodTutorial(1720+164,540+8,assets[7].word);
	addFoodTutorial(1720+144,540+60,assets[7].word);
	addFoodTutorial(1720-22,540+50,assets[7].word);
	addFoodTutorial(1720+64,540+62,assets[7].word);
	addFoodTutorial(1720+18,540+90,assets[7].word);
	addFoodTutorial(1720+128,540+90,assets[7].word);

	//3rd Row
	addFoodTutorial(650,745,assets[8].word);
	addFoodTutorial(650+78,745+6,assets[8].word);
	addFoodTutorial(650+164,745+8,assets[8].word);
	addFoodTutorial(650+144,745+60,assets[8].word);
	addFoodTutorial(650-22,745+50,assets[8].word);
	addFoodTutorial(650+64,745+62,assets[8].word);
	addFoodTutorial(650+18,745+90,assets[8].word);
	addFoodTutorial(650+128,745+90,assets[8].word);

	addFoodTutorial(975,745,assets[9].word);
	addFoodTutorial(975+78,745+6,assets[9].word);
	addFoodTutorial(975+164,745+8,assets[9].word);
	addFoodTutorial(975+144,745+60,assets[9].word);
	addFoodTutorial(975-22,745+50,assets[9].word);
	addFoodTutorial(975+64,745+62,assets[9].word);
	addFoodTutorial(975+18,745+90,assets[9].word);
	addFoodTutorial(975+128,745+90,assets[9].word);

	// Scale assets
	for(var i=0; i<10; i++)
	{
		assets[i].scale.setTo(1,1);
	}


	// Time
	timeLeft = 60;
	timer = this.time.create(false);
	timer.loop(Phaser.Timer.SECOND, this.updateTime, this);

	// Add Circle
	circle = this.add.sprite(1150, 40, 'highlightCircle');
	circle.scale.setTo(1.5, 1);
	circle.visible = false;
	// Add Big Circle
	circleBig = this.add.sprite(1150, 40, 'highlightCircle');
	circleBig.scale.setTo(3, 2);
	circleBig.visible = false;

	// Add Hand
	hand = this.add.sprite(2000, 500, 'Red', 0);
	hand.scale.setTo(0.5, 0.5);
	hand.visible = false;

	// Add Hand Click Animation
	handClick = hand.animations.add('Red', [0,1,2,3,4,5]);

	// Add OK button
	var _okButton = this.add.button(840, 935, 'ok', this.onClickOK, this, null, null, null, null);
	_okButton.scale.setTo(1.5, 1.5);


	// Start
	//generateOrder();
	//spawnClock();
	scoreText.text = "Score: " + score;
	clock.text = "Time Remaining: " + timeLeft;
	counter = 0;

	orderText.text = "• "+assets[0].word+" \n• "+assets[6].word;

	timer.start();
};



function addFoodTutorial(x,y,asset)
{
	var temp = game.add.sprite(x,y,asset);

	temp.anchor.setTo(0.5,0.5);
	//temp.scale.set(0.5,0.5);
}


// updateTime + demo
RulesScreen.prototype.updateTime = function ()
{
	console.log(counter);


	// *********** Correct ***********
	// 1 -> circle order
	if(counter == 1)
	{
		circle.x = 130;
		circle.y = 160;
		circle.visible = true;
	}
	// 2 -> circle correct
	else if(counter == 2)
	{
		circleBig.x = 660;
		circleBig.y = 190;
		circleBig.visible = true;
	}
	// 3 -> hide circles + tween hand to correct
	else if(counter == 3)
	{
		circle.visible = false;
		circleBig.visible = false;
		hand.visible = true;

		var handTween = this.game.add.tween(hand).to({x: '-1180', y: '-180'}, 800, Phaser.Easing.Linear.None, false);
		handTween.start();
	}
	// 4 -> hide click
	else if(counter == 4)
	{
		dragItem = game.add.sprite(hand.x+10, hand.y+10, assets[0].word);
		//dragItem.anchor.setTo(0.5,0.5);

		this.world.bringToTop(hand);

		hand.animations.currentAnim.onComplete.add(function () { hand.animations.frame = 5; }, this);
		handClick.play(10);
	}
	// 5 -> move to pizza
	else if(counter == 5)
	{
		var handTween = this.game.add.tween(hand).to({x: '+650', y: '+450'}, 800, Phaser.Easing.Linear.None, false);
		var dragTween = this.game.add.tween(dragItem).to({x: '+650', y: '+450'}, 800, Phaser.Easing.Linear.None, false);

		handTween.onComplete.add(function () { hand.animations.frame = 0; dragItem.visible = false;
			addFoodTutorial(dragItem.x, dragItem.y, assets[0].word); }, this);

		dragTween.start();
		handTween.start();
	}
	// 6 -> move hand away
	else if(counter == 6)
	{
		var handTween = this.game.add.tween(hand).to({x: '+250', y: '+50'}, 300, Phaser.Easing.Linear.None, false);
		handTween.start();
	}
	// 7 -> circle order
	else if(counter == 7)
	{
		circle.visible = true;
	}
	// 8 -> strike order
	else if(counter == 8)
	{
		strikes[0].position.x = 100;
	}
	// 9 -> hide circle
	else if(counter == 9)
	{
		circle.visible = false;
	}




	// *********** Incorrect ***********
	// 10 -> circle order
	else if(counter == 10)
	{
		circle.x = 130;
		circle.y = 240;
		circle.visible = true;
	}
	// 11 -> circle correct
	else if(counter == 11)
	{
		circleBig.x = 1260;
		circleBig.y = 440;
		circleBig.visible = true;
	}
	// 12 -> hide circles + tween hand to correct
	else if(counter == 12)
	{
		circle.visible = false;
		circleBig.visible = false;

		var handTween = this.game.add.tween(hand).to({x: '-250', y: '-550'}, 500, Phaser.Easing.Linear.None, false);
		handTween.start();
	}
	// 13 -> and click
	else if(counter == 13)
	{
		dragItem = game.add.sprite(hand.x+10, hand.y+10, assets[2].word);

		this.world.bringToTop(hand);

		hand.animations.currentAnim.onComplete.add(function () { hand.animations.frame = 5; }, this);
		handClick.play(10);
	}
	// 14 -> move to pizza
	else if(counter == 14)
	{
		var handTween = this.game.add.tween(hand).to({x: '+50', y: '+550'}, 600, Phaser.Easing.Linear.None, false);
		var dragTween = this.game.add.tween(dragItem).to({x: '+50', y: '+550'}, 600, Phaser.Easing.Linear.None, false);

		handTween.onComplete.add(function () { hand.animations.frame = 0; dragItem.visible = false; }, this);

		dragTween.start();
		handTween.start();
	}
	// 15 -> move hand away
	else if(counter == 15)
	{
		var handTween = this.game.add.tween(hand).to({x: '+180', y: '-50'}, 300, Phaser.Easing.Linear.None, false);
		handTween.start();
	}
	// 16 -> circle score
	else if(counter == 16)
	{
		circleBig.x = 1500;
		circleBig.y = -80;
		circleBig.visible = true;
	}
	// 17 -> lower score
	else if(counter == 17)
	{
		scoreText.text = "Score: -5";
	}
	// 18 -> hide circle
	else if(counter == 18)
	{
		circleBig.visible = false;
	}




	// *********** Correct ***********
	// 19 -> circle order
	else if(counter == 19)
	{
		circle.visible = true;
	}
	// 20 -> circle correct
	else if(counter == 20)
	{
		circleBig.x = 1260;
		circleBig.y = 440;
		circleBig.visible = true;
	}
	// 21 -> hide circles + tween hand to correct
	else if(counter == 21)
	{
		circle.visible = false;
		circleBig.visible = false;

		var handTween = this.game.add.tween(hand).to({x: '-250', y: '-250'}, 500, Phaser.Easing.Linear.None, false);
		handTween.start();
	}
	// 22 -> hand click
	else if(counter == 22)
	{
		dragItem = game.add.sprite(hand.x+10, hand.y+10, assets[6].word);

		this.world.bringToTop(hand);
		hand.animations.currentAnim.onComplete.add(function () { hand.animations.frame = 5; }, this);
		handClick.play(10);
	}
	// 23 -> move to pizza
	else if(counter == 23)
	{
		var handTween = this.game.add.tween(hand).to({x: '+80', y: '+280'}, 500, Phaser.Easing.Linear.None, false);
		var dragTween = this.game.add.tween(dragItem).to({x: '+80', y: '+280'}, 500, Phaser.Easing.Linear.None, false);

		handTween.onComplete.add(function () { hand.animations.frame = 0; dragItem.visible = false;
			addFoodTutorial(dragItem.x, dragItem.y, assets[6].word); }, this);

		dragTween.start();
		handTween.start();
	}
	// 24 -> move hand away
	else if(counter == 24)
	{
		var handTween = this.game.add.tween(hand).to({x: '+480', y: '-50'}, 400, Phaser.Easing.Linear.None, false);
		handTween.start();
	}
	// 25 -> circle order
	else if(counter == 25)
	{
		circle.visible = true;
	}
	// 26 -> strike order
	else if(counter == 26)
	{
		strikes[1].position.x = 100;
	}
	// 27 -> hide circle
	else if(counter == 27)
	{
		circle.visible = false;
	}
	// 28 -> circle score
	else if(counter == 28)
	{
		circleBig.x = 1500;
		circleBig.y = -80;
		circleBig.visible = true;
	}
	// 29 -> increase score
	else if(counter == 29)
	{
		scoreText.text = "Score: 4";
	}
	// 30 -> hide circle
	else if(counter == 30)
	{
		circleBig.visible = false;
	}

	// 31 -> send off pizza
	//

	// 32 -> Exit
	else if(counter == 32)
	{
		this.onClickOK();
	}


	// update game
	counter++;

	// If no time remaining, game finished
	if(timeLeft <= 0){
		this.onClickOK();
	}

	clock.text = "Time Remaining: " + --timeLeft;
};


// On click OK button, return to start screen
RulesScreen.prototype.onClickOK = function()
{
	this.state.start('start');
};