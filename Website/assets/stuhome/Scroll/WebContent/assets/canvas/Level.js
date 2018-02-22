// Game display images
var gameObjects;


// Display order
// "Elepahnt", "Giraffe", "Zebra", "Lion", "Sheep", "Owl", "Octopus"
var displayOrder = [0, 1, 2, 3, 4, 5, 6];

// Display positions
var displayPositions = [80,380,680,1080,1380,1680,1980];

// Text style
var style = {font: "bold 40px Arial", fill: "#FFCE07", boundsAlignH: "center", boundsAlignV: "middle" };



/**
 * Level.
 */
function Level()
{

	Phaser.State.call(this);

}

/** @type Phaser.State */
var Level_proto = Object.create(Phaser.State.prototype);
Level.prototype = Level_proto;
Level.prototype.constructor = Level;

Level.prototype.init = function()
{
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.scale.pageAlignHorizontally = true;
	this.scale.pageAlignVertically = true;
	this.stage.backgroundColor = '#ffffff';

	// Prep objects
	gameObjects = new Array();
};

Level.prototype.preload = function()
{
	this.load.pack('main', '/stuhome/Scroll/WebContent/assets/pack.json');
};

Level.prototype.create = function()
{
	// Background
	this.add.sprite(0, 0, 'carBackground');

	// Arrows
	var right = this.add.sprite(1032, 61, 'upDown');
	var left = this.add.sprite(19, 279, 'upDown');
	right.angle = 90.0;
	left.angle = 270.0;

	// Arrow controls
	right.inputEnabled = true;
	right.events.onInputDown.add(moveItemsRight);
	left.inputEnabled = true;
	left.events.onInputDown.add(moveItemsLeft);


	// Title
	var titleText = this.add.text(520,40,"Games",style);
	titleText.anchor.set(0.5,0.5);
	titleText.stroke = '#FF9933';
	titleText.strokeThickness = 15;


	// Create gameObjects
	gameObjects[0] = this.add.sprite(displayPositions[0], 74, 'Elephant');
	gameObjects[0].inputEnabled = true;
	gameObjects[0].events.onInputDown.add(this.onClickElephant);

	gameObjects[1] = this.add.sprite(displayPositions[1], 74, 'Giraffe');
	gameObjects[1].inputEnabled = true;
	gameObjects[1].events.onInputDown.add(this.onClickGiraffe);

	gameObjects[2] = this.add.sprite(displayPositions[2], 74, 'Lion');
	gameObjects[2].inputEnabled = true;
	gameObjects[2].events.onInputDown.add(this.onClickLion);

	gameObjects[3] = this.add.sprite(displayPositions[3], 74, 'Octopus');
	gameObjects[3].inputEnabled = true;
	gameObjects[3].events.onInputDown.add(this.onClickOctopus);

	gameObjects[4] = this.add.sprite(displayPositions[4], 74, 'Owl');
	gameObjects[4].inputEnabled = true;
	gameObjects[4].events.onInputDown.add(this.onClickOwl);

	gameObjects[5] = this.add.sprite(displayPositions[5], 74, 'Sheep');
	gameObjects[5].inputEnabled = true;
	gameObjects[5].events.onInputDown.add(this.onClickSheep);

	gameObjects[6] = this.add.sprite(displayPositions[6], 74, 'Zebra');
	gameObjects[6].inputEnabled = true;
	gameObjects[6].events.onInputDown.add(this.onClickZebra);
};



// Scroll games to the right
function moveItemsRight()
{
	// Change Display order
	for(var i=0; i<gameObjects.length; i++)
	{
		// Move each object to the right
		gameObjects[i].x -= 300;

		// If 4th object, move a little more to be off the screen
		if(gameObjects[i].x == 780)
		{
			gameObjects[i].x -= 100;
		}
		// If last object, circle around to the front
		else if(gameObjects[i].x == -220)
		{
			gameObjects[i].x += 2200;
		}
	}

	console.log('scroll right');
};

// Scroll games to the right
function moveItemsLeft()
{
	// Change Display order
	for(var i=0; i<gameObjects.length; i++)
	{
		// Move each object to the right
		gameObjects[i].x += 300;

		// If 4th object, move a little more to be off the screen
		if(gameObjects[i].x == 980)
		{
			gameObjects[i].x += 100;
		}
		// If last object, circle around to the front
		else if(gameObjects[i].x == 2280)
		{
			gameObjects[i].x -= 2200;
		}
	}

	console.log('scroll left');
};



// onClickElephant
Level.prototype.onClickElephant = function()
{
	console.log('Elephant');
};

// onClickGiraffe
Level.prototype.onClickGiraffe = function()
{
	console.log('Giraffe');
};

// onClickLion
Level.prototype.onClickLion = function()
{
	console.log('Lion');
};

// onClickOctopus
Level.prototype.onClickOctopus = function()
{
	console.log('Octopus');
};

// onClickOwl
Level.prototype.onClickOwl = function()
{
	console.log('Owl');
};

// onClickSheep
Level.prototype.onClickSheep = function()
{
	console.log('Sheep');
};

// onClickZebra
Level.prototype.onClickZebra = function()
{
	console.log('Zebra');
};
