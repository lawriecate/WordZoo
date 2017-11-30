/** General Head Stuff here **/

function Level() 
{
	Phaser.State.call(this);
}

/** @type Phaser.State */
var Level_proto = Object.create(Phaser.State.prototype);
Level.prototype = Level_proto;
Level.prototype.constructor = Level;

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

Level.prototype.init = function () 
{
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.scale.pageAlignHorizontally = true;
	this.scale.pageAlignVertically = true;
	this.stage.backgroundColor = '#ffffff';	
};

Level.prototype.preload = function () 
{
	//Load JSON Images
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

Level.prototype.create = function () 
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
	
	highLightCircle = this.add.sprite(-500,-500,'highLightCircle');
	highLightCircle.scale.setTo(1.2,1.2);
	highLightCircle.anchor.set(0.5,0.5);
	
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
	
	//Enabled Inputs
	_A.inputEnabled = true;
	_B.inputEnabled = true;
	_C.inputEnabled = true;
	_D.inputEnabled = true;
	_E.inputEnabled = true;
	_F.inputEnabled = true;
	_G.inputEnabled = true;
	_H.inputEnabled = true;
	_I.inputEnabled = true;
	_J.inputEnabled = true;
	_K.inputEnabled = true;
	_L.inputEnabled = true;
	_M.inputEnabled = true;
	_N.inputEnabled = true;
	_O.inputEnabled = true;
	_P.inputEnabled = true;
	_Q.inputEnabled = true;
	_R.inputEnabled = true;
	_S.inputEnabled = true;
	_T.inputEnabled = true;
	_U.inputEnabled = true;
	_V.inputEnabled = true;
	_W.inputEnabled = true;
	_X.inputEnabled = true;
	_Y.inputEnabled = true;
	_Z.inputEnabled = true;
	_Delete1.inputEnabled = true;
	_Delete2.inputEnabled = true;
	_Enter1.inputEnabled = true;
	_Enter2.inputEnabled = true;
	_Space.inputEnabled = true;
	
	//Initialise the Text Field with formatting
	var style = {font: "90px Arial", fill: '#FF9933', align: "center", fontWeight: 'bold'};
	text = this.add.text(this.game.world.centerX,170,"",style);
	text.anchor.x = 0.5;
	text.anchor.y = 0.5;
	
	//Clock Spawning
	style = {font: "50px Arial", fill: '#FFFFFF', align: "center", fontWeight: 'bold'};
	clock = this.add.text(this.game.world.centerX,40,"Timer: ",style);
	clock.anchor.x = 0.5;
	clock.anchor.y = 0.5;
	
	
	//Add Triggers for the keyboard
    _A.events.onInputDown.add(addLetter,{keyPressed : 'A', button: _A});
	_B.events.onInputDown.add(addLetter,{keyPressed : 'B', button: _B});
	_C.events.onInputDown.add(addLetter,{keyPressed : 'C', button: _C});
	_D.events.onInputDown.add(addLetter,{keyPressed : 'D', button: _D});
	_E.events.onInputDown.add(addLetter,{keyPressed : 'E', button: _E});
	_F.events.onInputDown.add(addLetter,{keyPressed : 'F', button: _F});
	_G.events.onInputDown.add(addLetter,{keyPressed : 'G', button: _G});
	_H.events.onInputDown.add(addLetter,{keyPressed : 'H', button: _H});
	_I.events.onInputDown.add(addLetter,{keyPressed : 'I', button: _I});
	_J.events.onInputDown.add(addLetter,{keyPressed : 'J', button: _J});
	_K.events.onInputDown.add(addLetter,{keyPressed : 'K', button: _K});
	_L.events.onInputDown.add(addLetter,{keyPressed : 'L', button: _L});
	_M.events.onInputDown.add(addLetter,{keyPressed : 'M', button: _M});
	_N.events.onInputDown.add(addLetter,{keyPressed : 'N', button: _N});
	_O.events.onInputDown.add(addLetter,{keyPressed : 'O', button: _O});
	_P.events.onInputDown.add(addLetter,{keyPressed : 'P', button: _P});
	_Q.events.onInputDown.add(addLetter,{keyPressed : 'Q', button: _Q});
	_R.events.onInputDown.add(addLetter,{keyPressed : 'R', button: _R});
	_S.events.onInputDown.add(addLetter,{keyPressed : 'S', button: _S});
	_T.events.onInputDown.add(addLetter,{keyPressed : 'T', button: _T});
	_U.events.onInputDown.add(addLetter,{keyPressed : 'U', button: _U});
	_V.events.onInputDown.add(addLetter,{keyPressed : 'V', button: _V});
	_W.events.onInputDown.add(addLetter,{keyPressed : 'W', button: _W});
	_X.events.onInputDown.add(addLetter,{keyPressed : 'X', button: _X});
	_Y.events.onInputDown.add(addLetter,{keyPressed : 'Y', button: _Y});
	_Z.events.onInputDown.add(addLetter,{keyPressed : 'Z', button: _Z});
	_Space.events.onInputDown.add(addLetter,{keyPressed : ' ', button: _Space});
	_Delete1.events.onInputDown.add(clearLetters,{button: _Delete1, button2: _Delete2});
	_Delete2.events.onInputDown.add(clearLetters,{button: _Delete1, button2: _Delete2});
	_Enter1.events.onInputDown.add(enterAnswer,{button: _Enter1 , button2: _Enter2});
	_Enter2.events.onInputDown.add(enterAnswer,{button: _Enter1 , button2: _Enter2});
	
	//Load the Assets and Words
	//TODO - These will be pulled from a server eventually, but for now are local and hardcoded
	//Player
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
	//game.load.image('Apple','assets/testAssets/Apple.png');
	//this.add.sprite(500,500,'Apple');
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
		
	//Enabled Inputs
	for(var i = 0; i < 10; i++)
	{
		assets[i].sprite.inputEnabled = true;
		assets[i].sprite.events.onInputDown.add(selectSpell,{button: assets[i].sprite, selected: i});
		assets[i].sprite.scale.setTo(2,2);
	}

	//Intialise Array
	input = new Array();
	//Set it as a blank word
	selectInitialSpell(assets[0].sprite,0);
	clearLetters();
	spawnClock();
	
	//Small Delay at the start to show the scene, and then add the keyboard
	setTimeout(moveKeyBoardUp,500);
	
	previousPlayerSpell = assets[0].sprite;
	previousOpponentSpell = assets[0].sprite;	
};

/**
 * Updates the Text field to add the letter that is pressed
 */
function addLetter()
{	
	//Makes Key expand, When completes, reset's to the original Size
	var tween1 = game.add.tween(this.button.scale).to({x:2 , y:2},70,"Linear",true);
	tween1.onComplete.add(resetObjectSize,{button: this.button});
	
	//Set the inputted letter to that selection, making sure not to input more than the length of the word
	if(numberInputted != lengthOfWord)
	{
		input[numberInputted] = this.keyPressed;
		numberInputted++;	
	}

	//Create a string, and because it's an array, remove the commas and replace it with spaces
	var temp = "" + input;
	text.text = temp.replace(/\,/g," ");
}

/**
 * Whatever object is passed here, will return to it's normal size
 */
function resetObjectSize()
{
	game.add.tween(this.button.scale).to({x:1 , y:1},70,"Linear",true);
}

/**
 * Reset the button to it's original size
 */
function resetButtonSize()
{
	game.add.tween(this.button.scale).to({x:2 , y:2},70,"Linear",true);
}


/**
 * Selects the spell to initially start the game
 */
function selectInitialSpell(button,selected)
{
	var tween1 = game.add.tween(button.scale).to({x:4 , y:4},70,"Linear",true);
	tween1.onComplete.add(resetButtonSize,{button: button});
	//Change the word to this
	selectedSpell = assets[selected];
	highLightSpell(button);
	targetWord = "" + assets[selected].word;
	lengthOfWord = targetWord.length;
	clearLetters();
}

/**
 * Select the Spell 
 */
function selectSpell()
{
	//Animation for selecting button
	var tween1 = game.add.tween(this.button.scale).to({x:4 , y:4},70,"Linear",true);
	tween1.onComplete.add(resetButtonSize,{button: this.button});
	//Change the word to this
	selectedSpell = assets[this.selected];
	highLightSpell(this.button);
	targetWord = "" + assets[this.selected].word;
	lengthOfWord = targetWord.length;
	clearLetters();
}

/**
 * Draws the circle around the selected spell and saves the variable
 * 
 */
function highLightSpell(button)
{
	var x = button.position.x;
	var y = button.position.y;
	highLightCircle.position.set(x,y);
}


/**
 * Updates the text field to blank dashes
 */
function clearLetters()
{
	//Create blank Strings
	input = new Array();
	for(var i = 0; i < lengthOfWord; i++)
	{
		//Reset the Colour
		text.addColor('#FF9933',i);	
		input[i] = "_"; 
	}
	
	//Create a string, and because it's an array, remove the commas and replace it with spaces
	var temp = "" + input;
	text.text = temp.replace(/\,/g," ");	
	
	numberInputted = 0;
}

/**
 * Checks if the answer is correct
 * Then goes to the appropiate state
 */
function enterAnswer()
{
	moveKeyBoardDown();
		
	//Disable all inputs
	disableAssetInputs();
	
	//Remove Commas and spaces
	var answer = "" + text.text.replace(/\,/g,"");
	answer = "" + answer.replace(/\s/g, "");
	//Make the Input and target all caps too
	var target = targetWord.toUpperCase();
	//If the Answer equals target
	
	highLightCircle.position.setTo(-1000,-1000);
	
	if(answer == target)
	{
		//Blur out the bottoms
		previousPlayerSpell = selectedSpell.sprite;
		previousPlayerSpell.alpha = 0.2;
		playerGoodSpell();
		text.addColor('#21AA1E',0);
	} 
	else 
	{
		//Create the sting with the spaces for comparison
		var temp = "";
		for(var i = 0; i < target.length ; i++)
		{
			temp = temp + target[i] + " ";
		}
		
		//Highlight the incorrect letters
		for(var i = 0; i < text.length; i++)
		{
			if(text[i] == temp[i])
			{
				//If the Letters are correct, turn it to green
				text.addColor('#21AA1E',i);
				text.addColor('FF9933',i+1);
			} 
			else 
			{
				//Else, turn it to red
				text.addColor('#AA0000',i);	
				text.addColor('FF9933',i+1);
			}
		}
		
		//Call the Animation 
		playerBadSpell();
	}
}

/**
 * Disables all Asset inputs
 */
function disableAssetInputs()
{
	for(var i = 0; i < 10; i++)
	{
		assets[i].sprite.inputEnabled = false;
	}
}

/**
 * Enables all Asset Inputs
 */
function enableAssetInputs()
{
	for(var i = 0; i < 10; i++)
	{
		if(assets[i].sprite.alpha != 0.2){
			assets[i].sprite.inputEnabled = true;
		}
	}
}


/**
 * Moves the Keyboard onto screen
 */
function moveKeyBoardUp()
{
	//Move Keyboard onto Screen
	for(var i = 0 ; i < keyboard.countLiving() ; i++)
	{
		//keyboard.getAt(i).position.y -= 1500;
		game.add.tween(keyboard.getAt(i)).to({y: (keyboard.getAt(i).y - 1500)},1000, "Linear", true);
	}
	keyBoardSpawned = true;
}

/**
 * Moves the Keyboard off the Screen
 */
function moveKeyBoardDown()
{
	//Move Keyboard onto Screen
	for(var i = 0 ; i < keyboard.countLiving() ; i++)
	{
		game.add.tween(keyboard.getAt(i)).to({y: (keyboard.getAt(i).y + 1500)},1500, "Linear", true);
	}
	keyBoardSpawned = false;
}

/**
 * Highlight the error
 * Play the animation
 * Signal It is the opponent's Turn
 */
function playerBadSpell()
{
	var tween = game.add.tween(_goodOwlArm).to( { angle: -80 }, 800, Phaser.Easing.Linear.None, true);
    tween.onComplete.add(function()
    {
        tween = game.add.tween(_goodOwlArm).to( { angle: -230 }, 800, Phaser.Easing.Linear.None, true);
   	    tween.onComplete.add(function()
   	    {
       	    tween = game.add.tween(_goodOwlArm).to( { angle: 260 }, 600, Phaser.Easing.Linear.None, true);
        	tween.onComplete.add(function()
        	{
				var explosion = game.add.sprite(877, 533, 'explosion', 0);
				explosion.anchor.setTo(0.5,0.5);
				var animation = explosion.animations.add('explode');
				explosion.animations.play('explode',30,false);
			    game.camera.shake(0.01, 200);
				animation.onComplete.add(function()
				{
					explosion.destroy();
        			//Call Opponents Response
   	    			opponentResponse();
				});	

				// Reset colour of text (Yellow)
				for(var i = 0; i < text.length; i++)
				{
					text.addColor('#FFFFFF',i);
				} 
        	});
    	});
    });
}

/**
 * Highlight the error
 * Play the animation
 * Signal It is the Player's Turn
 */
function opponentBadSpell()
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
        			//Call Opponents Response
    	    		playerResponse();
				});	

				// Reset colour of text (Yellow)
				for(var i = 0; i < text.length; i++)
				{
					text.addColor('#FFFFFF',i);
				} 
       	    });
    	 });
    });
}

/**
 * Play the Animation
 * Update Health
 * Signal it is the Opponent's Turn
 */
function playerGoodSpell()
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
    	   		var projectile0 = game.add.sprite(877,533,selectedSpell.word); 
    	   		projectile0.anchor.set(0.5,0.5);
    	   		projectile0.scale.set(0.0);
    	
    	   		var projectile1 = game.add.sprite(877,533,selectedSpell.word); 
        		projectile1.anchor.set(0.5,0.5);
   	    		projectile1.scale.set(0.0);
  
   	    		var projectile2 = game.add.sprite(877,533,selectedSpell.word); 
    	    	projectile2.anchor.set(0.5,0.5);
    	   		projectile2.scale.set(0.0);
    	  
    	   		var projectile3 = game.add.sprite(877,533,selectedSpell.word);
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
       	   				//Once Complete, then go to the next players turn
           				decreaseOpponentHealth();
    	    		});	
    	    	});	

    	    	// Reset colour of text (Yellow)
				for(var i = 0; i < text.length; i++)
				{
					text.addColor('#FFFFFF',i);
				} 
        	});
    	});
	});
}

function decreaseOpponentHealth()
{
	opponentHealth--;
	opponentHealthText.text = opponentHealth;
	if(opponentHealth <= 0)
	{
		//End Game
		var explosion = game.add.sprite(1300, 450, 'deathExplosion', 0);
		explosion.scale.setTo(8,8);
		explosion.anchor.setTo(0.5,0.5);
		var animation = explosion.animations.add('explode');
		explosion.animations.play('explode',24,false);
	    game.camera.shake(0.01, 200);
	    setTimeout(removeBadOwl,290);
		animation.onComplete.add(function()
		{
			explosion.destroy();
			
			//END GAME - You win
			console.log("You win")
			game.state.start('Finish');
		});	
	}
	else
	{
	//Call Opponents Response
		opponentResponse();
	}
}

function removeBadOwl()
{
	_badOwlArm.visible = false;
	_badOwlBody.visible = false;
}

function removeGoodOwl()
{
	_goodOwlArm.visible = false;
	_goodOwlBody.visible = false;
}

function decreasePlayerHealth()
{
	playerHealth--;
	playerHealthText.text = playerHealth;
	if(playerHealth <= 0)
	{
		var explosion = game.add.sprite(450, 450, 'deathExplosion', 0);
		explosion.anchor.setTo(0.5,0.5);
		explosion.scale.setTo(8,8);
		var animation = explosion.animations.add('explode');
		explosion.animations.play('explode',24,false);
		//.29 Seconds 	
	    game.camera.shake(0.01, 200);
	    setTimeout(removeGoodOwl,290);
		animation.onComplete.add(function()
		{
			explosion.destroy();
			
			//END GAME - You lose
			console.log("You lose")
			game.state.start('Finish');
			});	
	} 
	else
	{
		playerResponse();	
	}
}

/**
 * Called once the player has done a spell.
 * Decides which word it want's to attempt. Check it's chance, and then fire's that spell.
 * Then Switches to the other Player
 */
function opponentResponse()
{
	//Disable Opponents Turn
	microStateUserInput = false;
	//Select a word that is not disabled
	//Selects a Number between 1 and 9
	var randomChoice = Math.floor((Math.random() * 9));
	//Select an object that is not greyed out as the previous user did it
	while(assets[randomChoice].sprite.alpha == 0.2)
	{
		randomChoice++;
		randomChoice = randomChoice % 10;
	}
	selectInitialSpell(assets[randomChoice].sprite,randomChoice);
	
	//50-50 Chance It will get the spell right
	var correct = Math.floor(Math.random() * 100);
	var answer;
	
	
	//Colour the Text
	//Make the Input and target all caps too
	var target = targetWord.toUpperCase();
	//If the Answer equals target
	
	if(correct <= 50)
	{
		//Enter the Text
		//Add Spaces
		var temp = "";
		for(var i = 0; i < target.length; i++ )
		{
			temp = temp + target[i] + " ";
		}
		text.text = temp;
		answer = target;
	} 
	else 
	{
		//Enter Incorrect Answer
		answer = "";
	}
	
	
	highLightCircle.position.setTo(-1000,-1000);
	console.log("opponentResponse");
	
	if(answer == target)
	{
		//Blur out the bottoms
		previousPlayerSpell = selectedSpell.sprite;
		previousPlayerSpell.alpha = 0.2;
		console.log("Correct");
		opponentGoodSpell();
		//text.addColor('#21AA1E',0);
	} 
	else 
	{
		//Create the sting with the spaces for comparison
		/*
		var temp = "";
		for(var i = 0; i < target.length ; i++){
			temp = temp + target[i] + " ";
		}
		
		//Highlight the incorrect letters
		for(var i = 0; i < text.text.length; i++){
			if(text.text[i] == temp[i]){
				//If the Letters are correct, turn it to green
				text.addColor('#21AA1E',i);
				text.addColor('FF9933',i+1);
			} else {
				//Else, turn it to red
				text.addColor('#AA0000',i);	
				text.addColor('FF9933',i+1);
			}
		}
		*/
		//Call the Animation 
		opponentBadSpell();
	}
}

/**
 * Switching the game to the player's options
 */
function playerResponse()
{
//If Correct, grey out this choice and disable it
	var randomChoice = Math.floor((Math.random() * 9));
	//Select an object that is not greyed out as the previous user did it
	while(assets[randomChoice].sprite.alpha == 0.2)
	{
		randomChoice++;
		randomChoice = randomChoice % 10;
	}

	selectInitialSpell(assets[randomChoice].sprite,randomChoice);
	highLightSpell(assets[randomChoice].sprite);
	
	//Clear the Text
	clearLetters();
	//Move Keyboard Up
	moveKeyBoardUp();
	//Enabled State UserInput
	microStateUserInput = true;
	//Reset clock
	spawnClock();
	//Enable Input
	enableAssetInputs();
	//Raise Keyboard
	
}



/**
 * Play the Animation
 * Update Health
 * Signal it is the Player's Turn
 */
function opponentGoodSpell()
{
	//Wand Flick back animation
	var tween = game.add.tween(_badOwlArm).to( { angle: 80 }, 800, Phaser.Easing.Linear.None, true);
    tween.onComplete.add(function()
    {
        tween = game.add.tween(_badOwlArm).to( { angle: 230 }, 800, Phaser.Easing.Linear.None, true);
   	    tween.onComplete.add(function()
   	    {
       	    tween = game.add.tween(_badOwlArm).to( { angle: -260 }, 600, Phaser.Easing.Linear.None, true);
       	    tween.onComplete.add(function()
       	    {
       	    	//Spawn Items
    	   		var projectile0 = game.add.sprite(1063,550,selectedSpell.word); 
    	   		projectile0.anchor.set(0.5,0.5);
    	   		projectile0.scale.set(0.0);

    	   		var projectile1 = game.add.sprite(1063,550,selectedSpell.word); 
        		projectile1.anchor.set(0.5,0.5);
   	    		projectile1.scale.set(0.0);

   	    		var projectile2 = game.add.sprite(1063,550,selectedSpell.word); 
    	    	projectile2.anchor.set(0.5,0.5);
    	   		projectile2.scale.set(0.0);

    	   		var projectile3 = game.add.sprite(1063,550,selectedSpell.word);
    	   		projectile3.anchor.set(0.5,0.5);
    	   		projectile3.scale.set(0.0);
    	    		
    	    	//Manifest Larger
    	    	game.add.tween(projectile0.scale).to({x:1, y:1},70,"Linear",true);
    	   		game.add.tween(projectile1.scale).to({x:1, y:1},70,"Linear",true);
    	   		game.add.tween(projectile2.scale).to({x:1, y:1},70,"Linear",true);
    	   		game.add.tween(projectile3.scale).to({x:1, y:1},70,"Linear",true);
    	    		
    	   		//Spin in the Air and throw at player
        		var project0 = game.add.tween(projectile0).to({angle: 340 ,x: 580, y: 428},1400,"Linear",true);
   	    		var project1 = game.add.tween(projectile1).to({angle: 250 ,x: 585, y: 455},1000,"Linear",true);
   	    		var project2 = game.add.tween(projectile2).to({angle: 390 ,x: 598, y: 486},1200,"Linear",true);
   	    		var project3 = game.add.tween(projectile3).to({angle: 310 ,x: 605, y: 512},800,"Linear",true);
    	    		
    	    		
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
        	    		//Once Complete, then go to the next players turn
        	    		decreasePlayerHealth();
    	    		});	
    	   		}); 	

    	   		// Reset colour of text (Yellow)
				for(var i = 0; i < text.length; i++)
				{
					text.addColor('#FFFFFF',i);
				} 	
        	});
    	});
    });
}


//Spawns the Clock which forces the User to input spells
function spawnClock()
{
  initialTime = Math.floor(this.game.time.time / 1000);
}



/**
 * Update Function, Called Every Frame
 */
Level.prototype.update = function()
{	
	//User Input
		//If All elements are spawned Spawned, check time -> If <= 0 , then failed animation , else Spawn a new Clock
		//Make Sure Keyboard is Up
		//Enabled Buttons for the selection of words
	if(microStateUserInput)
	{
		// Clock
		var timeRemaining = Math.floor((timeAllowed - ((this.game.time.time / 1000) - initialTime)));
		
		//If Clock is less than 0, then go to failed animation
		if(timeRemaining <= 0)
		{
			clock.text = "";
			moveKeyBoardDown();
			//Disable all inputs
			disableAssetInputs();			
			highLightCircle.position.setTo(-1000,-1000);
			opponentResponse();
		} 
		else 
		{
			clock.text = "Time: " + timeRemaining;
		}
	}

	// Check lives
};