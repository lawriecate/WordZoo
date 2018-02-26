//global variables
var octopus = octopus|| {};


var startingLives = 3;
var livesLeft;
var livesBox;


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

Level.prototype.init = function ()
{
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.scale.pageAlignHorizontally = true;
	this.scale.pageAlignVertically = true;
	this.stage.backgroundColor = '#ffffff';
};


Level.prototype.preload = function ()
{
	// Load pack
	this.load.pack('Main', '/games/octopus/assets/pack.json');
	this.load.spritesheet('Lives' ,'/games/octopus/assets/Lives.png', 275, 80);

	// Load assets
	for(var i = 0; i < words.length; i++)
	{
		this.load.image(words[i] ,'/images/words/'+words[i]+'.png');
	}


	assets = new Array();
	strikes = new Array();
	toppings = new Array();

	//Creates the asset array of blank objects
	for(var i = 0; i < words.length; i++)
	{
		assets[i] = new Object();
		assets[i].word = words[i];
	}


	/**
	 * Layout of Select Items
	 *  _______________
	 * | 0 | 1 | 2 | 3 |
	 * | 4 | 5 | 6 | 7 |
	 * | 8 | 9 |
	 *
	 */


	 // Clear + expand words list
	wordHistory = new Array ();
	clickHistory = new Array ();
	for(var i = 0; i < words.length; i++)
	{
		wordHistory[i] = new Array ();
	}
};



Level.prototype.create = function ()
{
	var _background = this.add.sprite(960, 540, 'background');
	_background.anchor.setTo(0.5, 0.5);

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
	clock = this.add.text(900,80,"Time:  ",style);
	clock.anchor.setTo(0.5,0.5);

	//Spawn Score
	scoreText = this.add.text(1300,80,"Score: ",style);
	scoreText.anchor.setTo(0.5,0.5);

	// Add Lives box
	livesBox = this.add.sprite(1500, 20, 'Lives', 0);
	livesBox.scale.setTo(1.5,1.5);


	//Decorative items
	//x, y, asset
	addFood(822,304,assets[0].word);
	addFood(900,310,assets[0].word); //+88
	addFood(976,318,assets[0].word); //+154
	addFood(786,380,assets[0].word); //-36
	addFood(866,363,assets[0].word); //+44
	addFood(956,378,assets[0].word); //+134
	addFood(817,390,assets[0].word); //-5
	addFood(900,390,assets[0].word); //+78

	addFood(1140,304,assets[1].word);
	addFood(1140+88,310,assets[1].word);
	addFood(1140+154,318,assets[1].word);
	addFood(1140-34,380,assets[1].word);
	addFood(1140+44,363,assets[1].word);
	addFood(1140+134,378,assets[1].word);
	addFood(1140-5,390,assets[1].word);
	addFood(1140+78,390,assets[1].word);

	addFood(1480,304,assets[2].word);
	addFood(1480+88,310,assets[2].word);
	addFood(1480+154,318,assets[2].word);
	addFood(1480-34,380,assets[2].word);
	addFood(1480+44,363,assets[2].word);
	addFood(1480+134,378,assets[2].word);
	addFood(1480-5,390,assets[2].word);
	addFood(1480+78,390,assets[2].word);

	addFood(1810,304,assets[3].word);
	addFood(1810+88,310,assets[3].word);
	addFood(1810+154,318,assets[3].word);
	addFood(1810-34,380,assets[3].word);
	addFood(1810+44,363,assets[3].word);
	addFood(1810+134,378,assets[3].word);
	addFood(1810-5,390,assets[3].word);
	addFood(1810+78,390,assets[3].word);

	//2nd Row
	addFood(722,540,assets[4].word);
	addFood(722+78,540+6,assets[4].word);
	addFood(722+164,540+8,assets[4].word);
	addFood(722+144,540+60,assets[4].word);
	addFood(722-22,540+50,assets[4].word);
	addFood(722+64,540+62,assets[4].word);
	addFood(722+18,540+90,assets[4].word);
	addFood(722+128,540+90,assets[4].word);

	addFood(1070,540,assets[5].word);
	addFood(1070+78,540+6,assets[5].word);
	addFood(1070+164,540+8,assets[5].word);
	addFood(1070+144,540+60,assets[5].word);
	addFood(1070-22,540+50,assets[5].word);
	addFood(1070+64,540+62,assets[5].word);
	addFood(1070+18,540+90,assets[5].word);
	addFood(1070+128,540+90,assets[5].word);

	addFood(1400,540,assets[6].word);
	addFood(1400+78,540+6,assets[6].word);
	addFood(1400+164,540+8,assets[6].word);
	addFood(1400+144,540+60,assets[6].word);
	addFood(1400-22,540+50,assets[6].word);
	addFood(1400+64,540+62,assets[6].word);
	addFood(1400+18,540+90,assets[6].word);
	addFood(1400+128,540+90,assets[6].word);

	addFood(1720,540,assets[7].word);
	addFood(1720+78,540+6,assets[7].word);
	addFood(1720+164,540+8,assets[7].word);
	addFood(1720+144,540+60,assets[7].word);
	addFood(1720-22,540+50,assets[7].word);
	addFood(1720+64,540+62,assets[7].word);
	addFood(1720+18,540+90,assets[7].word);
	addFood(1720+128,540+90,assets[7].word);

	//3rd Row
	addFood(650,745,assets[8].word);
	addFood(650+78,745+6,assets[8].word);
	addFood(650+164,745+8,assets[8].word);
	addFood(650+144,745+60,assets[8].word);
	addFood(650-22,745+50,assets[8].word);
	addFood(650+64,745+62,assets[8].word);
	addFood(650+18,745+90,assets[8].word);
	addFood(650+128,745+90,assets[8].word);

	addFood(975,745,assets[9].word);
	addFood(975+78,745+6,assets[9].word);
	addFood(975+164,745+8,assets[9].word);
	addFood(975+144,745+60,assets[9].word);
	addFood(975-22,745+50,assets[9].word);
	addFood(975+64,745+62,assets[9].word);
	addFood(975+18,745+90,assets[9].word);
	addFood(975+128,745+90,assets[9].word);

	/**
	 * 	addFood(900-100,540+6,assets[4].word); //+6
	addFood(976-100,540+8,assets[4].word); //+8
	addFood(786-100,540+62,assets[4].word); //+62
	addFood(866-100,540-17,assets[4].word); //-17
	addFood(956-100,540+15,assets[4].word); //+15
	addFood(817-100,540+12,assets[4].word); //+12
	addFood(900-100,540,assets[4].word); //0
	 */



	//Select Items
	var _selectItem = this.add.sprite(718, 262, 'selectItem');
	_selectItem.alpha = 0.0;
	_selectItem.inputEnabled = true;
	_selectItem.events.onInputDown.add(spawnDraggableItem,{selectedItem: 0});

	var _selectItem1 = this.add.sprite(1050, 263, 'selectItem');
	_selectItem1.alpha = 0.0;
	_selectItem1.inputEnabled = true;
	_selectItem1.events.onInputDown.add(spawnDraggableItem,{selectedItem: 1});

	var _selectItem2 = this.add.sprite(1380, 265, 'selectItem');
	_selectItem2.alpha = 0.0;
	_selectItem2.inputEnabled = true;
	_selectItem2.events.onInputDown.add(spawnDraggableItem,{selectedItem: 2});

	var _selectItem3 = this.add.sprite(1708, 261, 'selectItem');
	_selectItem3.alpha = 0.0;
	_selectItem3.inputEnabled = true;
	_selectItem3.events.onInputDown.add(spawnDraggableItem,{selectedItem: 3});

	var _selectItem4 = this.add.sprite(637, 491, 'selectItem');
	_selectItem4.alpha = 0.0;
	_selectItem4.inputEnabled = true;
	_selectItem4.events.onInputDown.add(spawnDraggableItem,{selectedItem: 4});

	var _selectItem5 = this.add.sprite(969, 491, 'selectItem');
	_selectItem5.alpha = 0.0;
	_selectItem5.inputEnabled = true;
	_selectItem5.events.onInputDown.add(spawnDraggableItem,{selectedItem: 5});

	var _selectItem6 = this.add.sprite(1298, 491, 'selectItem');
	_selectItem6.alpha = 0.0;
	_selectItem6.inputEnabled = true;
	_selectItem6.events.onInputDown.add(spawnDraggableItem,{selectedItem: 6});

	var _selectItem7 = this.add.sprite(1630, 491, 'selectItem');
	_selectItem7.alpha = 0.0;
	_selectItem7.inputEnabled = true;
	_selectItem7.events.onInputDown.add(spawnDraggableItem,{selectedItem: 7});

	var _selectItem8 = this.add.sprite(558, 718, 'selectItem');
	_selectItem8.alpha = 0.0;
	_selectItem8.inputEnabled = true;
	_selectItem8.events.onInputDown.add(spawnDraggableItem,{selectedItem: 8});

	var _selectItem9 = this.add.sprite(887, 718, 'selectItem');
	_selectItem9.alpha = 0.0;
	_selectItem9.inputEnabled = true;
	_selectItem9.events.onInputDown.add(spawnDraggableItem,{selectedItem: 9});


    //If user closes window, record data
    //window.onbeforeunload = function()
    //{
    //    this.recordData();
    //};

    // Record screen clicks
    this.game.input.onDown.add(function(touchStart) {
    		this.recordScreenPress(touchStart.clientX, touchStart.clientY);
    	}, this);

    // Record Game Start Time
    var time = new Date();
    gameStartTime = time.toUTCString();


	//Generate the first order
	score = 0;
	generateOrder();
	spawnClock();
	scoreText.text = "Score: " + score;
};



Level.prototype.update = function()
{

	//Countdown Clock
	var timeRemaining = Math.floor((timeAllowed - ((this.game.time.time / 1000) - initialTime)));

	//If Clock is less than 0, then go to failed animation
	if(timeRemaining <= 0)
	{
		//Gameover
		this.recordData();
	}
	else
	{
		clock.text = "Time: " + timeRemaining;
	}

	//Check order has not been completed
	if(remainingItems <= 0)
	{
		resetOrder();
	}

	//If an object is being dragged, move the object to that position
	if(game.input.activePointer.isDown)
	{
		if(dragging)
		{
			dragItem.position.setTo(game.input.position.x,game.input.position.y);
			// *** MAYBE NEEDED ***
			// RESCALE ITEM ADDED TO PIZZA HERE
		}
	}

	//If the object is placed somewhere, check if it's on the pizza
	if(game.input.activePointer.isUp)
	{
		if(dragging)
		{
			//dragItem.destroy();
			if(checkOverlap(dragItem,_pizza))
			{
				//Check if it's on the pizza
				//If it is, then add it to the ingridient list and check if it's correct
				checkAnswer();
			}
			else
			{
				//It's floating somewhere random, just delete it
				dragItem.destroy();
			}
			dragging = false;
		}
	}
};



/**
 * Moves the Strikes Back
 * Moves the pizza and item's away
 * Generates new order
 */
function resetOrder()
{

	//Increase Score
	increaseScore();

	//Move Strikes back
	for(var i = 0; i < 5; i++)
	{
		strikes[i].position.x = -1000;
	}

	//Remove Pizza/Items on Pizza - 1530
	//Move the toppings
	for(var i = 0; i < toppings.length; i++)
	{
		game.add.tween(toppings[i]).to({x:2500},1000,"Linear",true);
	}

	var tween = game.add.tween(_pizza).to({x:2500},1000,"Linear",true);
	tween.onComplete.add(resetPizza);

	//Generate new Order
	generateOrder();
}



function increaseScore()
{
	score += toppings.length;
	scoreText.text = "Score: " + score;
	//TODO +X animation
}

function decreaseScore()
{
	score -= 5;

	// Lower limit on score
	if(score < 0)
	{
		score = 0;
	}

	scoreText.text = "Score: " + score;
	//TODO -5 animation
}



/*
 * Resets the pizza in position
 * Deletes the toppings
 */
function resetPizza()
{
	//Reset Pizza
	_pizza.position.x = 1530;

	//Delete toppings
	for(var i = 0; i < toppings.length ;i++)
	{
		toppings[i].destroy();
	}

	//Reset Array
	toppings = new Array();

	// Set timer for time taken to answer
    startTime = Math.floor(Date.now());
}


function checkAnswer()
{
	var selectedAnswer = dragItem.key;

	//Go through the order, and see if this word is there
	for(var i = 0; i < order.length; i++)
	{
		if(order[i] == selectedAnswer)
		{
			// record word answers
			var finishTime = Math.floor(Date.now());
			wordHistory[correctWordIndex][wordHistory[correctWordIndex].length] = [null, true, finishTime - startTime];

			//Strike through
			strikes[i].position.x = 100;

			//Decrement the amount of remaining items
			remainingItems--;

			//Remove from the order
			order[i] = 'undefined';

			//Add to toppings
			toppings.push(dragItem);

			return;
		}
	}

	// record answer
	var finishTime = Math.floor(Date.now());
	wordHistory[correctWordIndex][wordHistory[correctWordIndex].length] = [selectedAnswer, false, finishTime - startTime];

	// Lose a life
	livesLeft--;
	checkLives();
	dragItem.destroy();
}



/**
 * Resets the clock
 */
function spawnClock()
{
	  initialTime = Math.floor(this.game.time.time / 1000);
}



/**
 *
 * @param x
 * @param y
 * @param asset
 *
 * Fills the tubs on the screen with the items
 */
function addFood(x,y,asset)
{
	var temp = game.add.sprite(x,y,asset);

	temp.anchor.setTo(0.5,0.5);
	temp.scale.set(0.5,0.5);
}



/**
 *
 * @param spriteA
 * @param spriteB
 * @returns true or false
 *
 * Checks if the items are hitting each other
 */
function checkOverlap(spriteA, spriteB)
{
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();
    return Phaser.Rectangle.intersects(boundsA, boundsB);
}



/**
 * When one of the "ingredients" is selected
 */
function spawnDraggableItem()
{
	//Stops us spawning multiple items
	if(!dragging)
	{
		//Adds so it can be dragged
		dragItem = game.add.sprite(game.input.x, game.input.y, assets[this.selectedItem].word);
		dragItem.anchor.setTo(0.5,0.5);
		dragItem.scale.set(0.5,0.5);
		dragging = true;
	}
}



/**
 * Generates a new Order, between 3 and 5 items, each present
 */
function generateOrder()
{
	//Clear the order
	order = new Array();

	//Random Length of Order, between 3 and 5
	var orderLength = Math.floor((Math.random() * 3) + 3);
	remainingItems = orderLength;

	for(var i = 0; i < orderLength; i++)
	{
		//Random Choice of Order, that's not already been chosen
		var randomChoice = Math.floor((Math.random() * 9));
		var chosen = assets[randomChoice].word;

		//Make sure we haven't already selected it
		while(order.includes(chosen))
		{
			randomChoice = (randomChoice + 1) % 10;
			chosen = assets[randomChoice].word;
		}

		//Add to the Order
		order[i] = chosen;

		// Record which is a correct option
		correctWordIndex = randomChoice
	}

	//Print out order
	var orderString = "";
	for(var i = 0; i < orderLength; i++)
	{
		//orderText = game.add.text(230, 370, "• item1 \n• item2 \n• item3 \n• item4 \n• item5\n", style);
		orderString = orderString + "• " + order[i] + "\n";
	}

	//Set text
	orderText.text = orderString;
}


// Record screen clicks
Level.prototype.recordScreenPress = function(x, y)
{
	// Get current time
	var timeStamp = new Date();
	timeStamp.toUTCString();

	// Add to records
	clickHistory[clickHistory.length] = [x, y, timeStamp];
};

// Check how many lives remaining, show correct frame
function checkLives()
{
console.log(livesLeft);

	if(livesLeft <= 0)
	{
		livesBox = game.add.sprite(1500, 20, 'Lives', 3);
		livesBox.scale.setTo(1.5, 1.5);

		// Exit
		recordData();
	}
	else if(livesLeft == 1)
	{
		livesBox = game.add.sprite(1500, 20, 'Lives', 2);
		livesBox.scale.setTo(1.5, 1.5);
	}
	else if(livesLeft == 2)
	{
		livesBox = game.add.sprite(1500, 20, 'Lives', 1);
		livesBox.scale.setTo(1.5, 1.5);
	}
};

// Record statistical data from game
Level.prototype.recordData = function()
{
	// Save gameStartTime
	// Save score
	// Save clickHistory



	// Prep array
	var output = new Array();

	// for each word tested
	for(var i=0; i<wordHistory.length; i++)
	{
		// if never tested, set to default
		if(wordHistory[i].length == 0)
		{
			output[i] = 0.5
		}
		else
		{
			var rightCounter = 0;
			var wrongCounter = 0;

			// for each answer of a word
			for(var j=0; j<wordHistory[i].length; j++)
			{
				// if correct, record correct
				if(wordHistory[i][j][1])
				{
					rightCounter++;
				}
				else
				{
					wrongCounter++;
				}
			}

			// Calculate output value
			var raw = rightCounter / (rightCounter+ wrongCounter);
			console.log("Raw "+raw);

			output[i] = Math.round(raw * 100) / 100;;//.toFixed(2);
		}
	}

/*
	// Send out
	console.log(output);
	$.post('end',{words:output, clicks:clickHistory}, function(data)
	{
  		// Log returned data
  		console.log("RETURNED" + data);
	});
*/

	// End
	this.endGame();
};

// Game has finished, move to finish state
Level.prototype.endGame = function()
{
	this.state.start('finish');
};
