//global variables
var photo = photo|| {};   


// SpriteSheets
var spriteSheets = new Array();

// Animal / Item / Text records -> for deletion
var charcterRecords = new Array();
var textRecords = new Array();

// Dynamic background
var backgroundIndex;
var backgrounds = new Array();
var backgroundNames = ["steppingStones", "artClassroom", "brickWall", "footballBalls", "footballEmpty", "grassHill", 
		"pinkClassroom", "riverStones", "runningPath", "cookingRoom"];

// Buttons + text
var nameButton;
var nameButtonText
var changeButton;
var changeButtonText;
var shuffleButton;
var shuffleButtonText;
var photoButton;
var photoButtonText;
var wordZooImage;


// Are names currently visible
var isVisible;



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
	this.stage.backgroundColor = '#fff';	
};

PlayScreen.prototype.preload = function () 
{	
	this.load.pack('main', 'assets/pack.json');

	inputData = new Array();
	classData = new Array();


	// ** FOR TESTING **
	inputData[0] = data;
	inputData[1] = data2;
	inputData[2] = data3;
	inputData[3] = data4;
	inputData[4] = data5;
	inputData[5] = data6;
	inputData[6] = data7;
	inputData[7] = data8;
	inputData[8] = data11;
	inputData[9] = data12;
	inputData[10] = data13;
	inputData[11] = data14;
	inputData[12] = data15;
	inputData[13] = data16;
	inputData[14] = data17;
	inputData[15] = data18;
	inputData[16] = data21;
	inputData[17] = data22;
	inputData[18] = data23;
	inputData[19] = data24;
	inputData[20] = data25;
	inputData[21] = data26;
	inputData[22] = data27;
	inputData[23] = data28;
	inputData[24] = data31;
	inputData[25] = data32;
	inputData[26] = data33;
	inputData[27] = data34;
	inputData[28] = data35;
	inputData[29] = data36;
	inputData[30] = data37;
	inputData[31] = data38;
	inputData[32] = data41;
	inputData[33] = data42;
	inputData[34] = data43;
	inputData[35] = data44;
	inputData[36] = data45;
	inputData[37] = data46;
	inputData[38] = data47;
	inputData[39] = data48;
};



PlayScreen.prototype.create = function () 
{	
	// load background -> make all invisible
	for(var i=0; i<backgroundNames.length; i++)
	{
		backgrounds[i] = this.add.sprite(0, 0, backgroundNames[i]);
		if(backgrounds[i].width < 1920)
		{
			backgrounds[i].scale.setTo(1.5, 1.5);
		}

		backgrounds[i].visible = false;
	}

	// make first background visible
	backgroundIndex = 0;
	backgrounds[0].visible = true;


	// Title text
	var titleText = this.add.text(960, 80, className, bigStyle);
	titleText.stroke = '#FF9933';
	titleText.strokeThickness = 15;	
	titleText.anchor.setTo(0.5, 0.5);
	titleText.addColor('#FFCE07', 0);	


	// Show names button
	nameButton = this.add.button(0, 925, 'score', this.onClickNames, this, null, null, null, null);
	nameButton.scale.setTo(1.3, 2);

		// Back button text
		nameButtonText = this.add.text(240, 1005, "  Show \n Names", smallStyle);
		nameButtonText.anchor.setTo(0.5, 0.5);
		nameButtonText.addColor('#FF9933', 0);	


	// Add Change Background button
	changeButton = this.add.button(480, 925, 'score', this.onClickChangeBack, this, null, null, null, null);
	changeButton.scale.setTo(1.3, 2);

		// Change Background button text
		changeButtonText = this.add.text(720, 1005, "    Change \n Background", smallStyle);
		changeButtonText.anchor.setTo(0.5, 0.5);
		changeButtonText.addColor('#FF9933', 0);	


	// Add Shuffle button
	shuffleButton = this.add.button(965, 925, 'score', this.onClickShuffle, this, null, null, null, null);
	shuffleButton.scale.setTo(1.3, 2);

		// Shuffle Characters button text
		shuffleButtonText = this.add.text(1190, 1005, "    Shuffle \n Characters", smallStyle);
		shuffleButtonText.anchor.setTo(0.5, 0.5);
		shuffleButtonText.addColor('#FF9933', 0);

	// Add Photo button
	photoButton = this.add.sprite(1445, 925, 'score');
	photoButton.scale.setTo(1.3, 2);

		// Take Photo button text
		photoButtonText = this.add.text(1680, 1005, "   To Take a Photo \n Right Click -> Save", smallStyle);
		photoButtonText.anchor.setTo(0.5, 0.5);
		photoButtonText.addColor('#FF9933', 0);


	// Add Photo button
	wordZooImage = this.add.sprite(920, 950, 'wordZoo');
	wordZooImage.anchor.setTo(0.5, 0.5);
	wordZooImage.visible = false;


	// On Right Click -> hide buttons
    this.game.input.activePointer.rightButton.onDown.add(function(touchStart) { 
    	this.toggleButtons(false);
    }, this);
    // On Left Click -> show buttons
    this.game.input.activePointer.leftButton.onDown.add(function(touchStart) { 
    	this.toggleButtons(true);
    }, this);

	
    // if no characters in class, show text + return;
    if(inputData.length <= 0)
    {
    	var text = this.game.add.text(960, 180, "No characters to display", bigStyle);  
    	text.anchor.setTo(0.5, 0.5);
    	text.addColor('#FF9933', 0); 
    }

    // Names are hidden to start
    isVisible = false;

	// Start
	this.generateOrder();
};



// Put characters into order
PlayScreen.prototype.generateOrder = function() 
{
    // Allocate arrays to hold values for screen print
	classData = new Array();
	var length = inputData.length;
	if(length == 0)
	{
		return;
	}
	else if(length <= 2)
	{
		// Create one row
		classData[0] = new Array();
	}
	else if(length <= 8)
	{
		// Create two rows
		classData[0] = new Array();
		classData[1] = new Array();
	}
	else if(length <= 17)
	{
		// Create three rows
		classData[0] = new Array();
		classData[1] = new Array();
		classData[2] = new Array();			
	}
	else
	{
		// Create four rows
		classData[0] = new Array();
		classData[1] = new Array();
		classData[2] = new Array();	
		classData[3] = new Array();		
	}


	// Size / Scale modifier for less populated samples
	var modifier = 1;
	switch(length){
		case 1: 
		case 2:
			modifier = 3;
				break;
		case 3:
		case 4:
		case 5:
		case 6:
		case 7: 
			modifier = 2;
				break;
		case 8:
		case 9:
		case 10: 
			modifier = 1.5;
				break;
	}


    // Random start position in array
    var random = (Math.floor(Math.random() * (inputData.length-1))) + 1;
	var newList = new Array();
	for(var i=random; i<inputData.length; i++)
	{
		newList.push(inputData[i]);
	}
	for(var i=0; i<random; i++)
	{
		newList.push(inputData[i]);
	}
	inputData = newList;



	// Get Y values for rows
	var yValues = startingYValues[classData.length - 1];


	// Add first characters into rows
	for(var i=0; i<classData.length; i++)
	{
		// Record next character
		var temp = new Array();
		temp[0] = inputData[i];													// Data
		temp[1] = 0;															// X
		temp[2] = yValues[i];													// Y
		temp[3] = this.getCharacterIndex(i);									// Character Index
			
		// Add next to shortest array with offset included
		classData[i].push(temp);
	}


	// Distribute rest of characters
	var shortestArrayIndex;
	var shortestX = 10000;
	for(var i=classData.length+1; i<=inputData.length; i++)
	{
		// Get shortest array
		for(var j=0; j<classData.length; j++)
		{
			// if shorter than shortest found -> record
			if(classData[j][classData[j].length - 1][1] < shortestX)
			{
				shortestX = classData[j][classData[j].length - 1][1];
				shortestArrayIndex = j;
			}
		}

		// Get next and previous animal types
		var nextAnimalIndex =  this.getCharacterIndex(i % inputData.length);
		var prevAnimalIndex = classData[shortestArrayIndex][classData[shortestArrayIndex].length - 1][3];

		// Get offset of the animals
		var offset = sizeTable[prevAnimalIndex][nextAnimalIndex];


		// Record next character
		var temp = new Array();
		temp[0] = inputData[i-1 % inputData.length];
		temp[1] = classData[shortestArrayIndex][classData[shortestArrayIndex].length - 1][1] += (offset[0] / 2) * modifier;
		temp[2] = classData[shortestArrayIndex][classData[shortestArrayIndex].length - 1][2];
		temp[3] = nextAnimalIndex;

		
		// Add next to shortest array with offset included
		classData[shortestArrayIndex].push(temp);

		// Move to next character
		shortestX = 10000;
	}



	// For each row
	for(var i=0; i<classData.length; i++)
	{
		// Get max distance of this row
		var maxDistance = classData[i][classData[i].length-1][1];
		maxDistance += (440 * modifier / 2) / 2;

		// Calculate how far 'off' middle screen
		var addition = 1920 - maxDistance;

		// Add player name
		var tempText;


		// For each value within that row
		for(var j=0; j<classData[i].length; j++)
		{
			// Get character details + print
			temp = classData[i][j];

			// Move last value to first
			if(j == classData[i].length-1)
			{
				temp[1] = 0;
			}

			this.setSingleCharacter(temp[1] + (addition / 2), temp[2], null, temp[0], modifier);

			// Add player name
			tempText = this.add.text(temp[1] + (addition / 2), temp[2]-80, temp[0][temp[0].length-1]);
			tempText.stroke = '#fff';
			tempText.strokeThickness = 5;			
			tempText.anchor.setTo(0.5, 0.5);
			tempText.addColor('#000', 0);	
			tempText.visible = isVisible;

			// Add text to records
			textRecords.push(tempText);
		}
	}
};



// Show characters
PlayScreen.prototype.getCharacterIndex = function(index) 
{
	var temp = inputData[index];

	// Elephant
	if(temp[36] == 2)
		return 6;

	// Lion
	else if(temp[37] == 2)
		return 7;
	
	// Octopus
	else if(temp[38] == 2)
		return 2;
	
	// Owl
	else if(temp[39] == 2)
		return 1;
	
	// Panda	
	else if(temp[41] == 2)
		return 4;
	
	// Giraffe
	else if(temp[42] == 2)
		return 0;
	
	// Zebra
	else if(temp[43] == 2)
		return 3;

	// Sheep
	else if(temp[44] == 2)
		return 5;
};



// Show a single character at a certian position on the screen
PlayScreen.prototype.setSingleCharacter = function(x, y, _, data, modifier) 
{
//console.log(x+" "+y+" "+modifier);

	// Pre-set scale for animal size
	scale = 0.5 * modifier;


	// Elephant
	if(data[36] == 2)
		animalIndex = 6;

	// Lion
	else if(data[37] == 2)
		animalIndex = 7;
	
	// Octopus
	else if(data[38] == 2)
		animalIndex = 2;
	
	// Owl
	else if(data[39] == 2)
		animalIndex = 1;
	
	// Panda	
	else if(data[41] == 2)
		animalIndex = 4;
	
	// Giraffe
	else if(data[42] == 2)
		animalIndex = 0;
	
	// Zebra
	else if(data[43] == 2)
		animalIndex = 3;
	
	// Sheep
	else if(data[44] == 2)
		animalIndex = 5;
	


	// Main animal	
	_animals = this.add.sprite(x, y, 'animals', animalIndex);
	_animals.scale.setTo(scale, scale);
	_animals.anchor.setTo(0.5, 0.5);


	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~ Feet assets ~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	_feet = this.add.group();
	
	var _blackBoots = this.add.sprite(x, y, 'blackBoots', animalIndex, _feet);
	_blackBoots.scale.setTo(scale, scale);
	_blackBoots.alpha = 0.0;
	_blackBoots.anchor.setTo(0.5, 0.5);
	spriteSheets[18] = _blackBoots;
	
	var _blackShoes = this.add.sprite(x, y, 'blackShoes', animalIndex, _feet);
	_blackShoes.scale.setTo(scale, scale);
	_blackShoes.alpha = 0.0;
	_blackShoes.anchor.setTo(0.5, 0.5);
	spriteSheets[22] = _blackShoes;
	
	var _blueShoes = this.add.sprite(x, y, 'blueShoes', animalIndex, _feet);
	_blueShoes.scale.setTo(scale, scale);
	_blueShoes.alpha = 0.0;
	_blueShoes.anchor.setTo(0.5, 0.5);
	spriteSheets[25] = _blueShoes;
	
	var _brownBoots = this.add.sprite(x, y, 'brownBoots', animalIndex, _feet);
	_brownBoots.scale.setTo(scale, scale);
	_brownBoots.alpha = 0.0;
	_brownBoots.anchor.setTo(0.5, 0.5);
	spriteSheets[15] = _brownBoots;
	
	var _greenShoes = this.add.sprite(x, y, 'greenShoes', animalIndex, _feet);
	_greenShoes.scale.setTo(scale, scale);
	_greenShoes.alpha = 0.0;
	_greenShoes.anchor.setTo(0.5, 0.5);
	spriteSheets[20] = _greenShoes;

	var _highHeels = this.add.sprite(x, y, 'highHeels', animalIndex, _feet);
	_highHeels.scale.setTo(scale, scale);
	_highHeels.alpha = 0.0;
	_highHeels.anchor.setTo(0.5, 0.5);
	spriteSheets[11] = _highHeels;
	
	var _pinkBoots = this.add.sprite(x, y, 'pinkBoots', animalIndex, _feet);
	_pinkBoots.scale.setTo(scale, scale);
	_pinkBoots.alpha = 0.0;
	_pinkBoots.anchor.setTo(0.5, 0.5);
	spriteSheets[8] = _pinkBoots;
	
	var _pinkShoes = this.add.sprite(x, y, 'pinkShoes', animalIndex, _feet);
	_pinkShoes.scale.setTo(scale, scale);
	_pinkShoes.alpha = 0.0;
	_pinkShoes.anchor.setTo(0.5, 0.5);
	spriteSheets[27] = _pinkShoes;
	
	var _yellowBoots = this.add.sprite(x, y, 'yellowBoots', animalIndex, _feet);
	_yellowBoots.scale.setTo(scale, scale);
	_yellowBoots.alpha = 0.0;
	_yellowBoots.anchor.setTo(0.5, 0.5);
	spriteSheets[35] = _yellowBoots;
	


	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~ Body assets ~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	_body = this.add.group();
	
	var _blueShirt = this.add.sprite(x, y, 'blueShirt', animalIndex, _body);
	_blueShirt.scale.setTo(scale, scale);
	_blueShirt.alpha = 0.0;
	_blueShirt.anchor.setTo(0.5, 0.5);
	spriteSheets[24] = _blueShirt;
	
	var _greenShirt = this.add.sprite(x, y, 'greenShirt', animalIndex, _body);
	_greenShirt.scale.setTo(scale, scale);
	_greenShirt.alpha = 0.0;
	_greenShirt.anchor.setTo(0.5, 0.5);
	spriteSheets[17] = _greenShirt;
	
	var _orangeShirt = this.add.sprite(x, y, 'orangeShirt', animalIndex, _body);
	_orangeShirt.scale.setTo(scale, scale);
	_orangeShirt.alpha = 0.0;
	_orangeShirt.anchor.setTo(0.5, 0.5);
	spriteSheets[3] = _orangeShirt;
	
	var _pinkShirt = this.add.sprite(x, y, 'pinkShirt', animalIndex, _body);
	_pinkShirt.scale.setTo(scale, scale);
	_pinkShirt.alpha = 0.0;
	_pinkShirt.anchor.setTo(0.5, 0.5);
	spriteSheets[7] = _pinkShirt;
	
	var _purpleShirt = this.add.sprite(x, y, 'purpleShirt', animalIndex, _body);
	_purpleShirt.scale.setTo(scale, scale);
	_purpleShirt.alpha = 0.0;
	_purpleShirt.anchor.setTo(0.5, 0.5);
	spriteSheets[28] = _purpleShirt;
	
	var _redShirt = this.add.sprite(x, y, 'redShirt', animalIndex, _body);
	_redShirt.scale.setTo(scale, scale);
	_redShirt.alpha = 0.0;
	_redShirt.anchor.setTo(0.5, 0.5);
	spriteSheets[33] = _redShirt;
	
	var _whiteShirt = this.add.sprite(x, y, 'whiteShirt', animalIndex, _body);
	_whiteShirt.scale.setTo(scale, scale);
	_whiteShirt.alpha = 0.0;
	_whiteShirt.anchor.setTo(0.5, 0.5);
	spriteSheets[32] = _whiteShirt;
	
	var _yellowShirt = this.add.sprite(x, y, 'yellowShirt', animalIndex, _body);
	_yellowShirt.scale.setTo(scale, scale);
	_yellowShirt.alpha = 0.0;
	_yellowShirt.anchor.setTo(0.5, 0.5);
	spriteSheets[34] = _yellowShirt;
	


	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~ Neck assets ~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	_neck = this.add.group();
	
	var _blackTie = this.add.sprite(x, y, 'blackTie', animalIndex, _neck);
	_blackTie.scale.setTo(scale, scale);
	_blackTie.alpha = 0.0;
	_blackTie.anchor.setTo(0.5, 0.5);

	var _bowTie = this.add.sprite(x, y, 'bowTie', animalIndex, _neck);
	_bowTie.scale.setTo(scale, scale);
	_bowTie.alpha = 0.0;
	_bowTie.anchor.setTo(0.5, 0.5);
	spriteSheets[9] = _bowTie;
	
	var _gryTie = this.add.sprite(x, y, 'gryTie', animalIndex, _neck);
	_gryTie.scale.setTo(scale, scale);
	_gryTie.alpha = 0.0;
	_gryTie.anchor.setTo(0.5, 0.5);
	spriteSheets[21] = _gryTie;
	
	var _hufTie = this.add.sprite(x, y, 'hufTie', animalIndex, _neck);
	_hufTie.scale.setTo(scale, scale);
	_hufTie.alpha = 0.0;
	_hufTie.anchor.setTo(0.5, 0.5);
	spriteSheets[1] = _hufTie;
	
	var _necklace = this.add.sprite(x, y, 'necklace', animalIndex, _neck);
	_necklace.scale.setTo(scale, scale);
	_necklace.alpha = 0.0;
	_necklace.anchor.setTo(0.5, 0.5);
	spriteSheets[6] = _necklace;
	
	var _ravTie = this.add.sprite(x, y, 'ravTie', animalIndex, _neck);
	_ravTie.scale.setTo(scale, scale);
	_ravTie.alpha = 0.0;
	_ravTie.anchor.setTo(0.5, 0.5);
	spriteSheets[29] = _ravTie;
	
	var _slyTie = this.add.sprite(x, y, 'slyTie', animalIndex, _neck);
	_slyTie.scale.setTo(scale, scale);
	_slyTie.alpha = 0.0;
	_slyTie.anchor.setTo(0.5, 0.5);
	spriteSheets[13] = _slyTie;
	


	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~ Eye assets ~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	_eye = this.add.group();
	
	var _blueSunglasses = this.add.sprite(x, y, 'blueSunglasses', animalIndex, _eye);
	_blueSunglasses.scale.setTo(scale, scale);
	_blueSunglasses.alpha = 0.0;
	_blueSunglasses.anchor.setTo(0.5, 0.5);
	spriteSheets[23] = _blueSunglasses;
	
	var _monocole = this.add.sprite(x, y, 'monocole', animalIndex, _eye);
	_monocole.scale.setTo(scale, scale);
	_monocole.alpha = 0.0;
	_monocole.anchor.setTo(0.5, 0.5);
	spriteSheets[4] = _monocole;
	
	var _redGlasses = this.add.sprite(x, y, 'redGlasses', animalIndex, _eye);
	_redGlasses.scale.setTo(scale, scale);
	_redGlasses.alpha = 0.0;
	_redGlasses.anchor.setTo(0.5, 0.5);
	spriteSheets[30] = _redGlasses;
	
	var _blackSunglasses = this.add.sprite(x, y, 'blackSunglasses', animalIndex, _eye);
	_blackSunglasses.scale.setTo(scale, scale);
	_blackSunglasses.alpha = 0.0;
	_blackSunglasses.anchor.setTo(0.5, 0.5);
	spriteSheets[19] = _blackSunglasses;
	
	var _pinkGlasses = this.add.sprite(x, y, 'pinkGlasses', animalIndex, _eye);
	_pinkGlasses.scale.setTo(scale, scale);
	_pinkGlasses.alpha = 0.0;
	_pinkGlasses.anchor.setTo(0.5, 0.5);
	spriteSheets[5] = _pinkGlasses;
	
	var _hpGlasses = this.add.sprite(x, y, 'hpGlasses', animalIndex, _eye);
	_hpGlasses.scale.setTo(scale, scale);
	_hpGlasses.alpha = 0.0;
	_hpGlasses.anchor.setTo(0.5, 0.5);
	spriteSheets[14] = _hpGlasses;
	


	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~ Nose assets ~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	_nose = this.add.group();
	
	var _clownNose = this.add.sprite(x, y, 'clownNose', animalIndex, _nose);
	_clownNose.scale.setTo(scale, scale);
	_clownNose.alpha = 0.0;
	_clownNose.anchor.setTo(0.5, 0.5);
	spriteSheets[12] = _clownNose;
	
	var _moustache = this.add.sprite(x, y, 'moustache', animalIndex, _nose);
	_moustache.scale.setTo(scale, scale);
	_moustache.alpha = 0.0;
	_moustache.anchor.setTo(0.5, 0.5);
	spriteSheets[2] = _moustache;
	


	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~ Head assets ~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	_head = this.add.group();
	
	var _bowlerHat = this.add.sprite(x, y, 'bowlerHat', animalIndex, _head);
	_bowlerHat.scale.setTo(scale, scale);
	_bowlerHat.alpha = 0.0;
	_bowlerHat.anchor.setTo(0.5, 0.5);
	spriteSheets[26] = _bowlerHat;
	
	var _cowboyHat = this.add.sprite(x, y, 'cowboyHat', animalIndex, _head);
	_cowboyHat.scale.setTo(scale, scale);
	_cowboyHat.alpha = 0.0;
	_cowboyHat.anchor.setTo(0.5, 0.5);
	spriteSheets[10] = _cowboyHat;
	
	var _hardHat = this.add.sprite(x, y, 'hardHat', animalIndex, _head);
	_hardHat.scale.setTo(scale, scale);
	_hardHat.alpha = 0.0;
	_hardHat.anchor.setTo(0.5, 0.5);
	spriteSheets[0] = _hardHat;
	
	var _topHat = this.add.sprite(x, y, 'topHat', animalIndex, _head);
	_topHat.scale.setTo(scale, scale);
	_topHat.alpha = 0.0;
	_topHat.anchor.setTo(0.5, 0.5);
	spriteSheets[31] = _topHat;
	
	var _crown = this.add.sprite(x, y, 'crown', animalIndex, _head);
	_crown.scale.setTo(scale, scale);
	_crown.alpha = 0.0;
	_crown.anchor.setTo(0.5, 0.5);
	
	var _clownWig = this.add.sprite(x, y, 'clownWig', animalIndex, _head);
	_clownWig.scale.setTo(scale, scale);
	_clownWig.alpha = 0.0;
	_clownWig.anchor.setTo(0.5, 0.5);
	spriteSheets[16] = _clownWig;



	// record animal / items -> if need to delete in future;
	var temp = new Array();
	temp.push(_animals);

	temp.push(_blackBoots);
	temp.push(_blackShoes);
	temp.push(_blueShoes);
	temp.push(_brownBoots);
	temp.push(_blackBoots);
	temp.push(_greenShoes);
	temp.push(_highHeels);
	temp.push(_pinkBoots);
	temp.push(_pinkShoes);	
	temp.push(_yellowBoots);

	temp.push(_blueShirt);
	temp.push(_greenShirt);
	temp.push(_orangeShirt);		
	temp.push(_pinkShirt);
	temp.push(_purpleShirt);
	temp.push(_redShirt);
	temp.push(_whiteShirt);
	temp.push(_yellowShirt);

	temp.push(_blackTie);
	temp.push(_bowTie);
	temp.push(_gryTie);
	temp.push(_hufTie);
	temp.push(_necklace);
	temp.push(_ravTie);

	temp.push(_blueSunglasses);
	temp.push(_monocole);
	temp.push(_redGlasses);
	temp.push(_blackSunglasses);
	temp.push(_pinkGlasses);
	temp.push(_hpGlasses);

	temp.push(_clownNose);
	temp.push(_moustache);

	temp.push(_bowlerHat);
	temp.push(_cowboyHat);
	temp.push(_hardHat);
	temp.push(_topHat);
	temp.push(_crown);
	temp.push(_clownWig);

	// push to records
	charcterRecords.push(temp);



	// Show items that are equiped
	for(var i = 0; i < 36; i++)
	{
		// If equiped
		if(data[i] == 2)
		{
			spriteSheets[i].alpha = 1.0;
		}
	}
};



// onClick toggle show names
PlayScreen.prototype.onClickNames = function() 
{
	// Switch isVisible boolean
	isVisible = !isVisible;

	// For each text, toggle
	for(var i=0; i<textRecords.length; i++)
	{
		textRecords[i].visible = isVisible;
	}
};

// onClick Change Background Button
PlayScreen.prototype.onClickChangeBack = function() 
{
	// Change background 
	backgrounds[backgroundIndex % backgrounds.length].visible = false;
	backgrounds[(backgroundIndex+1) % backgrounds.length].visible = true;
	backgroundIndex++;
};

// onClick Shuffle Characters Button
PlayScreen.prototype.onClickShuffle = function() 
{
	// for all characters / items -> kill
	for(var i=0; i<charcterRecords.length; i++)
	{
		for(var j=0; j<charcterRecords[i].length; j++)
		{
			charcterRecords[i][j].kill();
		}
	}
	// for all character names -> kill
	for(var i=0; i<textRecords.length; i++)
	{
		textRecords[i].kill();
	}


	// Reset Arrays
	charcterRecords = new Array();
	textRecords = new Array();


	// Generate new characters
    if(inputData.length > 0)
    {
		// Start
		this.generateOrder();
    }
};

// toggleButtons/buttonText -> Bool if to be shown
PlayScreen.prototype.toggleButtons = function(toShow) 
{
	// Buttons / text
	nameButton.visible = toShow;
	nameButtonText.visible = toShow;
	changeButton.visible = toShow;
	changeButtonText.visible = toShow;
	shuffleButton.visible = toShow;
	shuffleButtonText.visible = toShow;
	photoButton.visible = toShow;
	photoButtonText.visible = toShow;

	// wordZoo logo
	wordZooImage.visible = !toShow;
};