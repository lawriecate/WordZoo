//global variables
var photo = photo|| {};   


// SpriteSheets
var spriteSheets = new Array();



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
	this.load.pack('main', 'assets/pack.json');

	inputData = new Array();
	classData = new Array();

	inputData[0] = data;
	inputData[1] = data2;
	inputData[2] = data3;
	inputData[3] = data4;
	inputData[4] = data5;
	inputData[5] = data6;
	inputData[6] = data7;
	inputData[7] = data8;
	inputData[8] = data;
	inputData[9] = data2;
	inputData[10] = data3;
	inputData[11] = data4;
	inputData[12] = data5;
	inputData[13] = data6;
	inputData[14] = data7;
	inputData[15] = data8;
	inputData[16] = data;
	inputData[17] = data2;
	inputData[18] = data3;
	inputData[19] = data4;
	inputData[20] = data5;
	inputData[21] = data6;
	inputData[22] = data7;
	inputData[23] = data8;
	inputData[24] = data;
	inputData[25] = data2;
	inputData[26] = data3;
	inputData[27] = data4;
	inputData[28] = data5;
	inputData[29] = data6;
	inputData[30] = data7;
	inputData[31] = data8;
	inputData[32] = data;
	inputData[33] = data2;
	inputData[34] = data3;
	inputData[35] = data3;
	inputData[36] = data4;
	inputData[37] = data5;
	inputData[38] = data6;
	inputData[39] = data7;
	inputData[40] = data8;
};

PlayScreen.prototype.create = function () 
{	
	// load background
    var background = this.game.add.tileSprite(0, 0, 1920, 1080, 'background');
    background.scale.setTo(1.5, 1.5);


    // Read index
    // Random between 0 and inputData.length
	inputDataIndex = 0;



    // if no characters in class, show text + return;
    var length = inputData.length;
    if(length <= 0)
    {
    	var text = this.game.add.text(960, 180, "No characters to display", bigStyle);  
    	text.anchor.setTo(0.5, 0.5);
    	text.addColor('#FF9933', 0); 
    }
    // Else, allocate arrays to hold values for screen print
    else
    {
		classData = new Array();

		if(length <= 2)
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



		// Get Y values for rows
		var yValues = startingYValues[classData.length - 1];
		//var createdRows = 0;


		// Add first characters into rows
		for(var i=0; i<classData.length; i++)
		{
			// Record next character
			var temp = new Array();
			temp[0] = inputData[inputDataIndex % inputData.length];					// Data
			temp[1] = 0;															// X
			temp[2] = yValues[i];													// Y
			temp[3] = this.getCharacterIndex(inputDataIndex % inputData.length);	// Character Index
			
			// Add next to shortest array with offset included
			classData[i].push(temp);

console.log("I:"+i+" "+classData[i][0][1]);

			// Increment
			inputDataIndex++
		}



		// Distribute rest of characters
		var shortestArrayIndex;
		var shortestX = 10000;
		for(var i=inputDataIndex % inputData.length; i<inputData.length; i++)
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


//console.log("L:"+shortestArrayIndex+" "+classData[shortestArrayIndex][classData[shortestArrayIndex].length - 1][1]+" + "+offset[0]);


			// Record next character
			var temp = new Array();
			temp[0] = inputData[i-1 % inputData.length];
			temp[1] = classData[shortestArrayIndex][classData[shortestArrayIndex].length - 1][1] += offset[0];
			temp[2] = classData[shortestArrayIndex][classData[shortestArrayIndex].length - 1][2] += offset[1];
			temp[3] = nextAnimalIndex;


console.log("L:"+shortestArrayIndex+" "+classData[shortestArrayIndex][classData[shortestArrayIndex].length - 1][1]);			

			// Add next to shortest array with offset included
			classData[shortestArrayIndex].push(temp);


			// Move to next character
			shortestX = 10000;
		}


		// For each row
		for(var i=0; i<classData.length; i++)
		{
			// Print first
//			var temp = classData[i][0];
//			this.setSingleCharacter(0, temp[2], null, temp[0]);

//			temp = classData[i][1];
//			this.setSingleCharacter(150, temp[2], null, temp[0]);

//			temp = classData[i][2];
//			this.setSingleCharacter(250, temp[2], null, temp[0]);

//			temp = classData[i][3];
//			this.setSingleCharacter(temp[1], temp[2], null, temp[0]);

			// For each value within that row
			for(var j=0; j<classData[i].length; j++)
			{
console.log("J: "+j+" "+classData[i][j][1]);

				// Get character details
				temp = classData[i][j];


				// Hackz
				if(j == (classData[i].length-1))
				{
					// Print to screen
					console.log();
					console.log(temp[3]);
					this.setSingleCharacter(0, yValues[i], null, temp[0]);
				}
				else 
				{
					// Print to screen
					console.log();
					console.log(temp[3]);
					this.setSingleCharacter(temp[1], temp[2], null, temp[0]);
				}
			}
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
PlayScreen.prototype.setSingleCharacter = function(x, y, _, data) 
{
console.log(x+" "+y+" "+data);

	scale = 0.5;



	// Which base animal?
	var animalIndex = 0;

	// Elephant
	if(data[36] == 2)
	{
		animalIndex = 6;
		scale += 0.1;
		//x += 10;
		y -= 25;
	}
	// Lion
	else if(data[37] == 2)
	{
		animalIndex = 7;
		x += 25;
	}
	// Octopus
	else if(data[38] == 2)
	{
		animalIndex = 2;
		x += 25;
	}
	// Owl
	else if(data[39] == 2)
	{
		animalIndex = 1;
		scale -= 0.1;
		x += 40;
		y += 40;
	}
	// Panda	
	else if(data[41] == 2)
	{
		animalIndex = 4;
	}
	// Giraffe
	else if(data[42] == 2)
	{
		animalIndex = 0;
	}
	// Zebra
	else if(data[43] == 2)
	{
		//x += 50;
		animalIndex = 3;
	}
	// Sheep
	else if(data[44] == 2)
	{
		animalIndex = 5;
	}


	// Main animal	
	_animals = this.add.sprite(x, y, 'animals', animalIndex);
	_animals.scale.setTo(scale, scale);



	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~ Feet assets ~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	_feet = this.add.group();
	
	var _blackBoots = this.add.sprite(x, y, 'blackBoots', animalIndex, _feet);
	_blackBoots.scale.setTo(scale, scale);
	_blackBoots.alpha = 0.0;
	spriteSheets[18] = _blackBoots;
	
	var _blackShoes = this.add.sprite(x, y, 'blackShoes', animalIndex, _feet);
	_blackShoes.scale.setTo(scale, scale);
	_blackShoes.alpha = 0.0;
	spriteSheets[22] = _blackShoes;
	
	var _blueShoes = this.add.sprite(x, y, 'blueShoes', animalIndex, _feet);
	_blueShoes.scale.setTo(scale, scale);
	_blueShoes.alpha = 0.0;
	spriteSheets[25] = _blueShoes;
	
	var _brownBoots = this.add.sprite(x, y, 'brownBoots', animalIndex, _feet);
	_brownBoots.scale.setTo(scale, scale);
	_brownBoots.alpha = 0.0;
	spriteSheets[15] = _brownBoots;
	
	var _greenShoes = this.add.sprite(x, y, 'greenShoes', animalIndex, _feet);
	_greenShoes.scale.setTo(scale, scale);
	_greenShoes.alpha = 0.0;
	spriteSheets[20] = _greenShoes;

	var _highHeels = this.add.sprite(x, y, 'highHeels', animalIndex, _feet);
	_highHeels.scale.setTo(scale, scale);
	_highHeels.alpha = 0.0;
	spriteSheets[11] = _highHeels;
	
	var _pinkBoots = this.add.sprite(x, y, 'pinkBoots', animalIndex, _feet);
	_pinkBoots.scale.setTo(scale, scale);
	_pinkBoots.alpha = 0.0;
	spriteSheets[8] = _pinkBoots;
	
	var _pinkShoes = this.add.sprite(x, y, 'pinkShoes', animalIndex, _feet);
	_pinkShoes.scale.setTo(scale, scale);
	_pinkShoes.alpha = 0.0;
	spriteSheets[27] = _pinkShoes;
	
	var _yellowBoots = this.add.sprite(x, y, 'yellowBoots', animalIndex, _feet);
	_yellowBoots.scale.setTo(scale, scale);
	_yellowBoots.alpha = 0.0;
	spriteSheets[35] = _yellowBoots;
	


	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~ Body assets ~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	_body = this.add.group();
	
	var _blueShirt = this.add.sprite(x, y, 'blueShirt', animalIndex, _body);
	_blueShirt.scale.setTo(scale, scale);
	_blueShirt.alpha = 0.0;
	spriteSheets[24] = _blueShirt;
	
	var _greenShirt = this.add.sprite(x, y, 'greenShirt', animalIndex, _body);
	_greenShirt.scale.setTo(scale, scale);
	_greenShirt.alpha = 0.0;
	spriteSheets[17] = _greenShirt;
	
	var _orangeShirt = this.add.sprite(x, y, 'orangeShirt', animalIndex, _body);
	_orangeShirt.scale.setTo(scale, scale);
	_orangeShirt.alpha = 0.0;
	spriteSheets[3] = _orangeShirt;
	
	var _pinkShirt = this.add.sprite(x, y, 'pinkShirt', animalIndex, _body);
	_pinkShirt.scale.setTo(scale, scale);
	_pinkShirt.alpha = 0.0;
	spriteSheets[7] = _pinkShirt;
	
	var _purpleShirt = this.add.sprite(x, y, 'purpleShirt', animalIndex, _body);
	_purpleShirt.scale.setTo(scale, scale);
	_purpleShirt.alpha = 0.0;
	spriteSheets[28] = _purpleShirt;
	
	var _redShirt = this.add.sprite(x, y, 'redShirt', animalIndex, _body);
	_redShirt.scale.setTo(scale, scale);
	_redShirt.alpha = 0.0;
	spriteSheets[33] = _redShirt;
	
	var _whiteShirt = this.add.sprite(x, y, 'whiteShirt', animalIndex, _body);
	_whiteShirt.scale.setTo(scale, scale);
	_whiteShirt.alpha = 0.0;
	spriteSheets[32] = _whiteShirt;
	
	var _yellowShirt = this.add.sprite(x, y, 'yellowShirt', animalIndex, _body);
	_yellowShirt.scale.setTo(scale, scale);
	_yellowShirt.alpha = 0.0;
	spriteSheets[34] = _yellowShirt;
	


	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~ Neck assets ~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	_neck = this.add.group();
	
	var _blackTie = this.add.sprite(x, y, 'blackTie', animalIndex, _neck);
	_blackTie.scale.setTo(scale, scale);
	_blackTie.alpha = 0.0;
	
	var _bowTie = this.add.sprite(x, y, 'bowTie', animalIndex, _neck);
	_bowTie.scale.setTo(scale, scale);
	_bowTie.alpha = 0.0;
	spriteSheets[9] = _bowTie;
	
	var _gryTie = this.add.sprite(x, y, 'gryTie', animalIndex, _neck);
	_gryTie.scale.setTo(scale, scale);
	_gryTie.alpha = 0.0;
	spriteSheets[21] = _gryTie;
	
	var _hufTie = this.add.sprite(x, y, 'hufTie', animalIndex, _neck);
	_hufTie.scale.setTo(scale, scale);
	_hufTie.alpha = 0.0;
	spriteSheets[1] = _hufTie;
	
	var _necklace = this.add.sprite(x, y, 'necklace', animalIndex, _neck);
	_necklace.scale.setTo(scale, scale);
	_necklace.alpha = 0.0;
	spriteSheets[6] = _necklace;
	
	var _ravTie = this.add.sprite(x, y, 'ravTie', animalIndex, _neck);
	_ravTie.scale.setTo(scale, scale);
	_ravTie.alpha = 0.0;
	spriteSheets[29] = _ravTie;
	
	var _slyTie = this.add.sprite(x, y, 'slyTie', animalIndex, _neck);
	_slyTie.scale.setTo(scale, scale);
	_slyTie.alpha = 0.0;
	spriteSheets[13] = _slyTie;
	


	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~ Eye assets ~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	_eye = this.add.group();
	
	var _blueSunglasses = this.add.sprite(x, y, 'blueSunglasses', animalIndex, _eye);
	_blueSunglasses.scale.setTo(scale, scale);
	_blueSunglasses.alpha = 0.0;
	spriteSheets[23] = _blueSunglasses;
	
	var _monocole = this.add.sprite(x, y, 'monocole', animalIndex, _eye);
	_monocole.scale.setTo(scale, scale);
	_monocole.alpha = 0.0;
	spriteSheets[4] = _monocole;
	
	var _redGlasses = this.add.sprite(x, y, 'redGlasses', animalIndex, _eye);
	_redGlasses.scale.setTo(scale, scale);
	_redGlasses.alpha = 0.0;
	spriteSheets[30] = _redGlasses;
	
	var _blackSunglasses = this.add.sprite(x, y, 'blackSunglasses', animalIndex, _eye);
	_blackSunglasses.scale.setTo(scale, scale);
	_blackSunglasses.alpha = 0.0;
	spriteSheets[19] = _blackSunglasses;
	
	var _pinkGlasses = this.add.sprite(x, y, 'pinkGlasses', animalIndex, _eye);
	_pinkGlasses.scale.setTo(scale, scale);
	_pinkGlasses.alpha = 0.0;
	spriteSheets[5] = _pinkGlasses;
	
	var _hpGlasses = this.add.sprite(x, y, 'hpGlasses', animalIndex, _eye);
	_hpGlasses.scale.setTo(scale, scale);
	_hpGlasses.alpha = 0.0;
	spriteSheets[14] = _hpGlasses;
	


	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~ Nose assets ~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	_nose = this.add.group();
	
	var _clownNose = this.add.sprite(x, y, 'clownNose', animalIndex, _nose);
	_clownNose.scale.setTo(scale, scale);
	_clownNose.alpha = 0.0;
	spriteSheets[12] = _clownNose;
	
	var _moustache = this.add.sprite(x, y, 'moustache', animalIndex, _nose);
	_moustache.scale.setTo(scale, scale);
	_moustache.alpha = 0.0;
	spriteSheets[2] = _moustache;
	


	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~ Head assets ~~~~~~~~~~~~~~~~~~~~~~~~
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	_head = this.add.group();
	
	var _bowlerHat = this.add.sprite(x, y, 'bowlerHat', animalIndex, _head);
	_bowlerHat.scale.setTo(scale, scale);
	_bowlerHat.alpha = 0.0;
	spriteSheets[26] = _bowlerHat;
	
	var _cowboyHat = this.add.sprite(x, y, 'cowboyHat', animalIndex, _head);
	_cowboyHat.scale.setTo(scale, scale);
	_cowboyHat.alpha = 0.0;
	spriteSheets[10] = _cowboyHat;
	
	var _hardHat = this.add.sprite(x, y, 'hardHat', animalIndex, _head);
	_hardHat.scale.setTo(scale, scale);
	_hardHat.alpha = 0.0;
	spriteSheets[0] = _hardHat;
	
	var _topHat = this.add.sprite(x, y, 'topHat', animalIndex, _head);
	_topHat.scale.setTo(scale, scale);
	_topHat.alpha = 0.0;
	spriteSheets[31] = _topHat;
	
	var _crown = this.add.sprite(x, y, 'crown', animalIndex, _head);
	_crown.scale.setTo(scale, scale);
	_crown.alpha = 0.0;
	
	var _clownWig = this.add.sprite(x, y, 'clownWig', animalIndex, _head);
	_clownWig.scale.setTo(scale, scale);
	_clownWig.alpha = 0.0;
	spriteSheets[16] = _clownWig;



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


/*
// Show characters
PlayScreen.prototype.showCharacters = function() 
{
	if(classData.length == 1)
    { 
    	var temp = locations[0];
    	this.setSingleCharacter(temp[0], temp[1], temp[2], classData[0]); 
    }
    else
    { 
    	// Stuffle position
		var random = Math.floor(Math.random() * classData.length);

    	var postions = locations[classData.length -1];
		for(var i=0; i<classData.length; i++)
		{
			var temp = postions[i];
    		this.setSingleCharacter(temp[0], temp[1], temp[2], classData[(i+random) % classData.length]);
		}
    }

    console.log("length -> "+classData.length);
};
*/







// Shuffle characters
PlayScreen.prototype.shuffleCharacters = function() 
{
	
};

// Take photo
PlayScreen.prototype.takePhoto = function() 
{

};