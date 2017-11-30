// Global variables
var timeLeft;
var timer;
var counter;

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


var keyboard; //Keyboard Group
var targetWord;
var input; //The Inputted Word
var text;
var numberInputted = 0;
var lengthOfWord;
//Global reference of this
var game;
var clock;
var initialTime = 25;
var timeAllowed = 25;

//Spawn the Clock and Keyboard
var keyBoardSpawned = false;

//Microstates - Mini states of animations
var microStateUserInput = true; //Asking the User to Enter a word
var microStateSpellAnimation = false; //The result, Either firing that object or the failed animation
var microStateopponentsTurn = false;  //Opponents go and then their subsequent animation

var _goodOwlArm;
var _badOwlArm;
var _goodOwlBody;
var _badOwlBody;

//Words, Sprites and enabled
var assets;
var selectedSpell;
var previousPlayerSpell;
var previousOpponentSpell;
var highLightCircle;

//Player Health
var playerHealth = 5;
var opponentHealth = 5;
var playerHealthText;
var opponentHealthText;


RulesScreen.prototype.init = function () 
{	
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.scale.pageAlignHorizontally = true;
	this.scale.pageAlignVertically = true;
	this.stage.backgroundColor = '#ffffff';	
};

RulesScreen.prototype.preload = function () 
{	
	this.load.pack('PlayState', 'assets/pack.json');

	assets = new Array();
	//Creates the asset array of blank objects
	for(var i = 0; i < 10; i++)
	{
		assets[i] = new Object();
	}
	
	//Load the Assets
	this.load.image('Apple','assets/testAssets/Apple.png');
	this.load.image('Bear' ,'assets/testAssets/Bear.png');
	this.load.image('Bird' ,'assets/testAssets/Bird.png' );
	this.load.image('Boat' ,'assets/testAssets/Boat.png');
	this.load.image('Book' ,'assets/testAssets/Book.png');
	this.load.image('Car' ,'assets/testAssets/Car.png');
	this.load.image('Cheese' ,'assets/testAssets/Cheese.png');
	this.load.image('Cone' ,'assets/testAssets/Cone.png');
	this.load.image('Dog' ,'assets/testAssets/Dog.png');
	this.load.image('Hat' ,'assets/testAssets/Hat.png')
	this.load.image('highLightCircle','assets/highlightCircle.png');
    this.load.spritesheet('explosion', 'assets/explosionFull.png', 256, 256, 32);
    //Frame Width, Frame Height, Frame Max, margin,spacing
    this.load.spritesheet('deathExplosion','assets/deathExplosion.png',148.1,187,27);	
};

RulesScreen.prototype.create = function () 
{
	//Create global reference of this
	game = this;
	
	//Load Assets
	this.add.sprite(0, 0, 'background');
	
	_goodOwlBody = this.add.sprite(413, 390, 'goodOwlBody');
	_badOwlBody = this.add.sprite(1295, 391, 'badOwlBody');
	
	_goodOwlArm = this.add.sprite(496, 668, 'goodOwlArm');
	_goodOwlArm.angle = -90;
	_goodOwlArm.anchor.set(0.6,0.1);
	
	_badOwlArm = this.add.sprite(1440, 668, 'badOwlArm');
	_badOwlArm.angle = 90;
	_badOwlArm.anchor.set(0.3,0.1);
	

	this.add.sprite(635, 69, 'chosenWord');
	
	this.add.sprite(1050, 870, 'OpponentHealth');
	
	this.add.sprite(388, 870, 'YouHealth');
	
	this.add.sprite(1546, 1, 'scroll2');
	
	this.add.sprite(2, 1, 'scroll');
	
	
	//Health
	style = {font: "90px Arial", fill: '#FFFFFF', align: "center", fontWeight: 'bold'};
	playerHealthText = this.add.text(650,1020,playerHealth,style);
	playerHealthText.anchor.setTo(0.5,0.5);
	opponentHealthText = this.add.text(1300,1020,opponentHealth,style);
	opponentHealthText.anchor.setTo(0.5,0.5);
		
	//Keyboard
	keyboard = this.add.group();
	keyboard.position.setTo(350, 0);
	this.add.sprite(61, 1776, 'KeyBoardBackground', null, keyboard);
	
	var _A = this.add.sprite(151, 1875, 'KeyBoard', 'a', keyboard);
	_A.anchor.setTo(0.5, 0.5);
	
	var _B = this.add.sprite(301, 1875, 'KeyBoard', 'B', keyboard);
	_B.anchor.setTo(0.5, 0.5);
	
	var _C = this.add.sprite(451, 1875, 'KeyBoard', 'C', keyboard);
	_C.anchor.setTo(0.5, 0.5);
	
	var _D = this.add.sprite(601, 1875, 'KeyBoard', 'D', keyboard);
	_D.anchor.setTo(0.5, 0.5);
	
	var _E = this.add.sprite(751, 1875, 'KeyBoard', 'E', keyboard);
	_E.anchor.setTo(0.5, 0.5);
	
	var _F = this.add.sprite(901, 1875, 'KeyBoard', 'F', keyboard);
	_F.anchor.setTo(0.5, 0.5);
	
	var _G = this.add.sprite(1051, 1875, 'KeyBoard', 'G', keyboard);
	_G.anchor.setTo(0.5, 0.5);
	
	var _H = this.add.sprite(151, 2025, 'KeyBoard', 'H', keyboard);
	_H.anchor.setTo(0.5, 0.5);
	
	var _I = this.add.sprite(301, 2025, 'KeyBoard', 'I', keyboard);
	_I.anchor.setTo(0.5, 0.5);
	
	var _J = this.add.sprite(451, 2025, 'KeyBoard', 'J', keyboard);
	_J.anchor.setTo(0.5, 0.5);
	
	var _K = this.add.sprite(601, 2025, 'KeyBoard', 'K', keyboard);
	_K.anchor.setTo(0.5, 0.5);
	
	var _L = this.add.sprite(751, 2025, 'KeyBoard', 'L', keyboard);
	_L.anchor.setTo(0.5, 0.5);
	
	var _M = this.add.sprite(901, 2025, 'KeyBoard', 'M', keyboard);
	_M.anchor.setTo(0.5, 0.5);
	
	var _N = this.add.sprite(1051, 2025, 'KeyBoard', 'N', keyboard);
	_N.anchor.setTo(0.5, 0.5);
	
	var _O = this.add.sprite(151, 2175, 'KeyBoard', 'O', keyboard);
	_O.anchor.setTo(0.5, 0.5);
	
	var _P = this.add.sprite(301, 2175, 'KeyBoard', 'P', keyboard);
	_P.anchor.setTo(0.5, 0.5);
	
	var _Q = this.add.sprite(451, 2175, 'KeyBoard', 'Q', keyboard);
	_Q.anchor.setTo(0.5, 0.5);
	
	var _R = this.add.sprite(601, 2175, 'KeyBoard', 'R', keyboard);
	_R.anchor.setTo(0.5, 0.5);
	
	var _S = this.add.sprite(751, 2175, 'KeyBoard', 'S', keyboard);
	_S.anchor.setTo(0.5, 0.5);
	
	var _T = this.add.sprite(901, 2175, 'KeyBoard', 't', keyboard);
	_T.anchor.setTo(0.5, 0.5);
	
	var _U = this.add.sprite(1051, 2175, 'KeyBoard', 'U', keyboard);
	_U.anchor.setTo(0.5, 0.5);
	
	var _V = this.add.sprite(301, 2325, 'KeyBoard', 'V', keyboard);
	_V.anchor.setTo(0.5, 0.5);
	
	var _W = this.add.sprite(451, 2325, 'KeyBoard', 'W', keyboard);
	_W.anchor.setTo(0.5, 0.5);
	
	var _X = this.add.sprite(601, 2325, 'KeyBoard', 'X', keyboard);
	_X.anchor.setTo(0.5, 0.5);
	
	var _Y = this.add.sprite(751, 2325, 'KeyBoard', 'Y', keyboard);
	_Y.anchor.setTo(0.5, 0.5);
	
	var _Z = this.add.sprite(901, 2325, 'KeyBoard', 'Z', keyboard);
	_Z.anchor.setTo(0.5, 0.5);
	
	var _Space = this.add.sprite(601, 2475, 'KeyBoard', 'Space', keyboard);
	_Space.anchor.setTo(0.5, 0.5);
	
	var _Enter1 = this.add.sprite(1051, 2325+75, 'KeyBoard', 'Enter1',keyboard);
	_Enter1.anchor.setTo(0.5, 0.5);
	
	var _Enter2 = this.add.sprite(916, 2325+147, 'KeyBoard', 'Enter2',keyboard);
	_Enter2.anchor.setTo(0.5, 0.5);
	
	var _Delete1 = this.add.sprite(151, 2325+75, 'KeyBoard', 'Delete1',keyboard);
	_Delete1.anchor.setTo(0.5, 0.5);
	
	var _Delete2 = this.add.sprite(301-16, 2325+147, 'KeyBoard', 'Delete2',keyboard);
	_Delete2.anchor.setTo(0.5, 0.5);

	
	//Initialise the Text Field with formatting
	var style = {font: "90px Arial", fill: '#FF9933', align: "center", fontWeight: 'bold'};
	text = this.add.text(this.game.world.centerX,170,"",style);
	text.anchor.x = 0.5;
	text.anchor.y = 0.5;
	
	
	//Load the Assets and Words
	assets[0].word = "Apple";
	assets[1].word = "Bear";
	assets[2].word = "Car";
	assets[3].word = "Boat";
	assets[4].word = "Cheese";
	assets[5].word = "Bird";
	assets[6].word = "Book";
	assets[7].word = "Cone";
	assets[8].word = "Dog";
	assets[9].word = "Hat";

	//Load Images
	assets[0].sprite = this.add.sprite(180,246,'Apple');
	assets[0].sprite.anchor.setTo(0.5,0.5);
	assets[1].sprite = this.add.sprite(180,196+160+50,'Bear');
	assets[1].sprite.anchor.setTo(0.5,0.5);
	assets[2].sprite = this.add.sprite(180,196+160+160+50,'Car');
	assets[2].sprite.anchor.setTo(0.5,0.5);
	assets[3].sprite = this.add.sprite(180,196+160+160+160+50,'Boat');
	assets[3].sprite.anchor.setTo(0.5,0.5);
	assets[4].sprite = this.add.sprite(180,196+160+160+160+160+50,'Cheese');
	assets[4].sprite.anchor.setTo(0.5,0.5);
	assets[5].sprite = this.add.sprite(1730,196+50,'Bird');
	assets[5].sprite.anchor.setTo(0.5,0.5);
	assets[6].sprite = this.add.sprite(1730,196+160+50,'Book');
	assets[6].sprite.anchor.setTo(0.5,0.5);
	assets[7].sprite = this.add.sprite(1730,196+160+160+50,'Cone');
	assets[7].sprite.anchor.setTo(0.5,0.5);
	assets[8].sprite = this.add.sprite(1730,196+160+160+160+50,'Dog');
	assets[8].sprite.anchor.setTo(0.5,0.5);
	assets[9].sprite = this.add.sprite(1730,196+160+160+160+160+50,'Hat');
	assets[9].sprite.anchor.setTo(0.5,0.5);	
	
	// Scale pictures
	for(var i = 0; i < 10; i++)
	{
		assets[i].sprite.scale.setTo(2,2);
	}


	// Add OK button
	var _okButton = this.add.button(1600, 20, 'okButton', this.onClickOK, this, null, null, null, null);
	_okButton.scale.setTo(1.25, 1.25);

	// Add Circle
	highLightCircle = this.add.sprite(90, 160, 'highLightCircle');
	highLightCircle.scale.setTo(1.2, 1.2);
	highLightCircle.visible = false;

	// Add Big Circle
	circleBig = this.add.sprite(1150, 950, 'highLightCircle');
	circleBig.scale.setTo(2, 1);
	circleBig.visible = false;

	// Add Hand
	hand = this.add.sprite(800, 1200, 'Red', 0);
	hand.scale.setTo(0.5, 0.5);

	// Add Hand Click Animation
	handClick = hand.animations.add('Red', [0,1,2,3,4,5]);


	// Time
	timeLeft = 60;
	timer = this.time.create(false);
	timer.loop(Phaser.Timer.SECOND, this.updateTime, this);


	// Start
	counter = 0;
	timer.start();
};


// updateTime + demo
RulesScreen.prototype.updateTime = function ()
{	
	console.log(++counter);


	// 1 circle Apple
	if(counter == 1)
	{
		text.text = "_ _ _ _ _";
		highLightCircle.visible = true;
	}
	// 2 hand to Car + move circle
	else if(counter == 2)
	{
		var handTween = this.game.add.tween(hand).to({x: '-670', y: '-650'}, 800, Phaser.Easing.Linear.None, false);
		handTween.start();
	}
	// 3 click + move away
	else if(counter == 3)
	{
		hand.animations.currentAnim.onComplete.add(function () { 
			hand.animations.frame = 0; highLightCircle.y = 480; text.text = "_ _ _"; assets[2].sprite.alpha = 0.2;
		}, this);
		handClick.play(10);
	}
	// 4 keyboard up
	else if(counter == 4)
	{
		this.moveKeyBoardUpRules();
	}
	// 5 move to C + click + add letter
	else if(counter == 5)
	{
		var handTween = this.game.add.tween(hand).to({x: '+620', y: '-170'}, 400, Phaser.Easing.Linear.None, false);
		handTween.onComplete.add(function () { 
			hand.animations.currentAnim.onComplete.add(function () { hand.animations.frame = 0; text.text = "C _ _"; 
				
				// ***** Enlarge Button *****

			}, this);
			handClick.play(10);
		}, this);
		handTween.start();
	}
	// 6 move to A + click + add letter
	else if(counter == 6)
	{
		var handTween = this.game.add.tween(hand).to({x: '-300'}, 400, Phaser.Easing.Linear.None, false);
		handTween.onComplete.add(function () { 
			hand.animations.currentAnim.onComplete.add(function () { hand.animations.frame = 0; text.text = "C A _"; 

				// ***** Enlarge Button *****

			}, this);
			handClick.play(10);
		}, this);
		handTween.start();
	}
	// 7 move to R + click + add letter
	else if(counter == 7)
	{
		var handTween = this.game.add.tween(hand).to({x: '+450', y: '+300'}, 400, Phaser.Easing.Linear.None, false);
		handTween.onComplete.add(function () { 
			hand.animations.currentAnim.onComplete.add(function () { hand.animations.frame = 0; text.text = "C A R"; 

				// ***** Enlarge Button *****

			}, this);
			handClick.play(10);
		}, this);
		handTween.start();
	}
	// 8 hand to enter + click
	else if(counter == 8)
	{
		var handTween = this.game.add.tween(hand).to({x: '+450', y: '+200'}, 400, Phaser.Easing.Linear.None, false);
		handTween.onComplete.add(function () { 
			hand.animations.currentAnim.onComplete.add(function () { hand.animations.frame = 0; 

    	    	// Set colour of text (Green)
				for(var i = 0; i < 3; i++)
				{
					text.addColor('#21AA1E',i);
				}; 
			}, this);
			handClick.play(10);
		}, this);
		handTween.start();
	}
	// 9 lower keyboard
	else if(counter == 9)
	{
		var handTween = this.game.add.tween(hand).to({x: '+450', y: '+200'}, 400, Phaser.Easing.Linear.None, false);
		handTween.onComplete.add(function () { this.moveKeyBoardDownRules(); }, this);
		handTween.start();
	}
	// 10 attack spell
	else if(counter == 10)
	{
		selectedSpell = "Car";
		this.playerGoodSpellRules();
	}
	// 15 circle enemy health
	else if(counter == 15)
	{
		circleBig.visible = true;
	}
	// 16 lower health
	else if(counter == 16)
	{
		opponentHealthText.text = --opponentHealth;
	}
	// 17 hide circle
	else if(counter == 17)
	{
		circleBig.visible = false;
	}


	// 18 Reset
	else if(counter == 18)
	{
		text.text = "";
		highLightCircle.y = 160;
		text.text = "_ _ _ _ _";

		// Set colour of text (Yellow)
		for(var i = 0; i < 5; i++)
		{
			text.addColor('#FF9933',i);
		};
	}
	// 19 Circle Bear
	else if(counter == 19)
	{
		highLightCircle.y = 320;
		text.text = "_ _ _ _";
		assets[1].sprite.alpha = 0.2;
	}
	// 20 keyboard up
	else if(counter == 20)
	{
		this.moveKeyBoardUpRules();
	}
	// 21 B input
	else if(counter == 21)
	{
		// ***** Enlarge Button *****
		text.text = "B _ _ _";
	}
	// 22 A input
	else if(counter == 22)
	{
		// ***** Enlarge Button *****
		text.text = "B A _ _";
	}
	// 23 R input
	else if(counter == 23)
	{
		// ***** Enlarge Button *****
		text.text = "B A R _";
	}
	// 24 E input
	else if(counter == 24)
	{
		// ***** Enlarge Button *****
		text.text = "B A R E";
	}
	// 25 all letters to green
	else if(counter == 25)
	{
		// Set colours
		text.addColor('#21AA1E',0);
		text.addColor('#AA0000',2);
		text.addColor('#AA0000',4);
		text.addColor('#AA0000',6);
	}
	// 26 keyboard down
	else if(counter == 26)
	{
		this.moveKeyBoardDownRules();
	}
	// 27 attack spell (fail)
	else if(counter == 27)
	{
		this.opponentBadSpellRules();
	}
	// 32 Exit
	else if(counter == 32)
	{
		this.onClickOK();
	}


	// If no time remaining, game finished
	if(timeLeft <= 0){
		this.onClickOK();
	}
};



RulesScreen.prototype.moveKeyBoardUpRules = function ()
{
	//Move Keyboard onto Screen
	for(var i = 0 ; i < keyboard.countLiving() ; i++)
	{
		//keyboard.getAt(i).position.y -= 1500;
		game.add.tween(keyboard.getAt(i)).to({y: (keyboard.getAt(i).y - 1500)},1000, "Linear", true);
	}
	keyBoardSpawned = true;
}
RulesScreen.prototype.moveKeyBoardDownRules = function ()
{
	//Move Keyboard onto Screen
	for(var i = 0 ; i < keyboard.countLiving() ; i++)
	{
		game.add.tween(keyboard.getAt(i)).to({y: (keyboard.getAt(i).y + 1500)},1500, "Linear", true);
	}
	keyBoardSpawned = false;
}



RulesScreen.prototype.opponentBadSpellRules = function ()
{
	var tween = game.add.tween(_badOwlArm).to( { angle: 80 }, 800, Phaser.Easing.Linear.None, true);
    tween.onComplete.add(function()
    {
        tween = game.add.tween(_badOwlArm).to( { angle: 230 }, 800, Phaser.Easing.Linear.None, true);
   	    tween.onComplete.add(function()
   	    {
       	    tween = game.add.tween(_badOwlArm).to( { angle: -260 }, 600, Phaser.Easing.Linear.None, true);
       	    tween.onComplete.add(function()
       	    {
				var explosion = game.add.sprite(1063, 550, 'explosion', 0);
				explosion.anchor.setTo(0.5,0.5);
				var animation = explosion.animations.add('explode');
				explosion.animations.play('explode',30,false);
			    game.camera.shake(0.01, 200);
				animation.onComplete.add(function()
				{
					explosion.destroy();
				});	
       	    });
    	 });
    });
}

RulesScreen.prototype.playerGoodSpellRules = function ()
{
	//Wand Flick back animation
    var tween = game.add.tween(_goodOwlArm).to( { angle: -80 }, 800, Phaser.Easing.Linear.None, true);
    tween.onComplete.add(function()
    {
    	tween = game.add.tween(_goodOwlArm).to( { angle: -230 }, 800, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(function()
        {
       	    tween = game.add.tween(_goodOwlArm).to( { angle: 260 }, 600, Phaser.Easing.Linear.None, true);
       	    tween.onComplete.add(function()
       	    {
       	    	//Spawn Items
    	   		var projectile0 = game.add.sprite(877,533,selectedSpell); 
    	   		projectile0.anchor.set(0.5,0.5);
    	   		projectile0.scale.set(0.0);

    	   		var projectile1 = game.add.sprite(877,533,selectedSpell); 
        		projectile1.anchor.set(0.5,0.5);
   	    		projectile1.scale.set(0.0);
 
   	    		var projectile2 = game.add.sprite(877,533,selectedSpell); 
    	    	projectile2.anchor.set(0.5,0.5);
    	   		projectile2.scale.set(0.0);
    	  
    	   		var projectile3 = game.add.sprite(877,533,selectedSpell);
    	   		projectile3.anchor.set(0.5,0.5);
    	   		projectile3.scale.set(0.0);

    	    	//Manifest Larger
    	   		game.add.tween(projectile0.scale).to({x:1, y:1},70,"Linear",true);
    	   		game.add.tween(projectile1.scale).to({x:1, y:1},70,"Linear",true);
    	   		game.add.tween(projectile2.scale).to({x:1, y:1},70,"Linear",true);
    	   		game.add.tween(projectile3.scale).to({x:1, y:1},70,"Linear",true);

        		//Spin in the Air and throw at player
   	    		var project0 = game.add.tween(projectile0).to({angle: 340 ,x: 1360, y: 413},1400,"Linear",true);
   	    		var project1 = game.add.tween(projectile1).to({angle: 250 ,x: 1336, y: 470},1000,"Linear",true);
    	    	var project2 = game.add.tween(projectile2).to({angle: 390 ,x: 1315, y: 507},1200,"Linear",true);
    	   		var project3 = game.add.tween(projectile3).to({angle: 310 ,x: 1311, y: 540},800,"Linear",true);
 
    	    		
    	   		//Exposions on impact
    	   		//this.add.sprite(1516, 1140, 'explosion', 0);
    	   		project0.onComplete.add(function()
    	   		{
    	    		var explosion = game.add.sprite(projectile0.position.x, projectile0.position.y, 'explosion', 0);
    	   			explosion.anchor.setTo(0.5,0.5);
    	   			var animation = explosion.animations.add('explode');
    	   			explosion.animations.play('explode',30,false);
	   				projectile0.destroy();
	   			    game.camera.shake(0.01, 200);
   	    			animation.onComplete.add(function()
   	    			{
        	    		explosion.destroy();
    	    		});	
    	   		});	
    	    		
    	   		project1.onComplete.add(function()
    	   		{
    	   			var explosion = game.add.sprite(projectile1.position.x, projectile1.position.y, 'explosion', 0);
    	   			explosion.anchor.setTo(0.5,0.5);
        			var animation = explosion.animations.add('explode');
    	    		explosion.animations.play('explode',30,false);
	    			projectile1.destroy();
	   			    game.camera.shake(0.01, 200);
        			animation.onComplete.add(function()
        			{
        	    		explosion.destroy();
    	    		});	
    	   		});
 	    		
    	    	project2.onComplete.add(function()
    	    	{
    	    		var explosion = game.add.sprite(projectile2.position.x, projectile2.position.y, 'explosion', 0);
    	   			explosion.anchor.setTo(0.5,0.5);
    	   			var animation = explosion.animations.add('explode');
    	   			explosion.animations.play('explode',30,false);
	   				projectile2.destroy();
	   			    game.camera.shake(0.01, 200);
    	    		animation.onComplete.add(function()
    	    		{
            		explosion.destroy();
        			});	
   	    		});
   	    		
    	    	project3.onComplete.add(function()
    	    	{
    		   		var explosion = game.add.sprite(projectile3.position.x, projectile3.position.y, 'explosion', 0);
      				explosion.anchor.setTo(0.5,0.5);
   	  				var animation = explosion.animations.add('explode');
    		   		explosion.animations.play('explode',30,false);
	   				projectile3.destroy();
    				game.camera.shake(0.01, 200);
   	    			animation.onComplete.add(function()
   	    			{
       	    			explosion.destroy();
    	    		});	
    	    	});	
        	});
    	});
	});
}



RulesScreen.prototype.removeBadOwlRules = function ()
{
	_badOwlArm.visible = false;
	_badOwlBody.visible = false;
}
RulesScreen.prototype.removeGoodOwlRules = function ()
{
	_goodOwlArm.visible = false;
	_goodOwlBody.visible = false;
}



// On click OK button, return to start screen
RulesScreen.prototype.onClickOK = function() 
{
	this.state.start('Start');
};