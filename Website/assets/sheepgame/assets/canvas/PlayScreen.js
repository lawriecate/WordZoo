// Global variables
var sheep = sheep|| {};


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
	this.load.pack('PlayScreen', 'http://localhost:1337/sheepgame/assets/pack.json');

	// Set up pens array + fill with blanks
	pens = new Array();
	for(var i = 0; i < 4; i++){
		pens[i] = new Object();
	}
};


PlayScreen.prototype.create = function ()
{
	// Add background
	background = this.add.tileSprite(0, 0, 1920, 1080, 'Background');


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
	mainSheep.inputEnabled = true;
	mainSheep.events.onInputDown.add(this.dragSheep);


    //If user closes window, record data
    window.onbeforeunload = function()
    {
        this.recordData();
    };

    // Record screen clicks
    this.game.input.onDown.add(function(touchStart) {
    		this.recordScreenPress(touchStart.clientX, touchStart.clientY);
    	}, this);

    // Record Game Start Time
    var time = new Date();
    gameStartTime = time.toUTCString();


	// Time
	timer = this.time.create(false);
	timer.loop(Phaser.Timer.SECOND, this.updateTime, this);
	timer.start();

	// starting values
	timeLeft = startingTime;
	livesLeft = startingLives;
	score = 0;


	// Start game
	this.spawnItems();
};



// display current time to screen (with --)
PlayScreen.prototype.updateTime = function ()
{
	// update game
	this.update();

	// If no time remaining, game finished
	if(timeLeft <= 0){
		this.recordData();
		//this.endGame();
	}

	timeText.setText("Time: "+(--timeLeft), true);
};

// display current score to screen
PlayScreen.prototype.updateScore = function ()
{
	scoreText.setText("Score: "+score, true);
};



// on dragSheet, switch sprites to wobble
PlayScreen.prototype.dragSheep = function ()
{
	dragging = true;
	sheepWobble.visible = true;
	mainSheep.visible = false;
}

// on dropSheep, switch back back to static
PlayScreen.prototype.dropSheep = function ()
{
	sheepWobble.position.setTo(948,560);
	dragging = false;
	sheepWobble.visible = false;
	mainSheep.visible = true;


	//Check where we dropped it, if it's correct, add a sheep
	if(this.checkOverlap(sheepWobble,pens[0].sheep))
	{
		if(correctPen == 0)
		{
			this.addSheepToPen(0);

			// record word answers
			var finishTime = Math.floor(Date.now());
			wordHistory[numWordHistory++] = [correctWordB, null, true, finishTime - startTime];

			// Increase score
			score++;
			this.updateScore();

			// reset
			this.spawnItems();
		}
		else
		{
			// record word answers
			var finishTime = Math.floor(Date.now());
			wordHistory[numWordHistory++] = [correctWordB, TLraw, false, finishTime - startTime];

			// Lose a life
			livesLeft--;
			this.checkLives();

			// reset
			this.spawnItems();
		}
		return;
	}

	if(this.checkOverlap(sheepWobble,pens[1].sheep))
	{
		if(correctPen == 1)
		{
			// record word answers
			var finishTime = Math.floor(Date.now());
			wordHistory[numWordHistory++] = [correctWordB, null, true, finishTime - startTime];

			this.addSheepToPen(1);

			// Increase score
			score++;
			this.updateScore();

			// reset
			this.spawnItems();
		}
		else
		{
			// record word answers
			var finishTime = Math.floor(Date.now());
			wordHistory[numWordHistory++] = [correctWordB, TRraw, false, finishTime - startTime];

			// Lose a life
			livesLeft--;
			this.checkLives();

			// reset
			this.spawnItems();
		}
		return;
	}

	if(this.checkOverlap(sheepWobble,pens[2].sheep))
	{
		if(correctPen == 2)
		{
			// record word answers
			var finishTime = Math.floor(Date.now());
			wordHistory[numWordHistory++] = [correctWordB, null, true, finishTime - startTime];

			this.addSheepToPen(2);

			// Increase score
			score++;
			this.updateScore();

			// reset
			this.spawnItems();
		}
		else
		{
			// record word answers
			var finishTime = Math.floor(Date.now());
			wordHistory[numWordHistory++] = [correctWordB, BLraw, false, finishTime - startTime];

			// Lose a life
			livesLeft--;
			this.checkLives();

			// reset
			this.spawnItems();
		}
		return;
	}

	if(this.checkOverlap(sheepWobble,pens[3].sheep))
	{
		if(correctPen == 3)
		{
			// record word answers
			var finishTime = Math.floor(Date.now());
			wordHistory[numWordHistory++] = [correctWordB, null, true, finishTime - startTime];

			this.addSheepToPen(3);

			// Increase score
			score++;
			this.updateScore();

			// reset
			this.spawnItems();
		}
		else
		{
			// record word answers
			var finishTime = Math.floor(Date.now());
			wordHistory[numWordHistory++] = [correctWordB, BRraw, false, finishTime - startTime];

			// Lose a life
			livesLeft--;
			this.checkLives();

			// reset
			this.spawnItems();
		}
		return;
	}
}



// enlarge pen on drag-over
PlayScreen.prototype.expandPen = function (pen)
{
	pens[pen].back.scale.setTo(1.5,1.5);
	pens[pen].front.scale.setTo(1.5,1.5);
}

// reset pen to normal size
PlayScreen.prototype.resetPens = function (pen)
{
	for(var i = 0; i < 4; i++)
	{
		pens[i].back.scale.setTo(1,1);
		pens[i].front.scale.setTo(1,1);
	}
}



// check if spriteA is overlapping spriteB
PlayScreen.prototype.checkOverlap = function (spriteA, spriteB)
{
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();
    return Phaser.Rectangle.intersects(boundsA, boundsB);
}

// increase number of sheep in pen
PlayScreen.prototype.addSheepToPen = function (pen)
{
	var temp = pens[pen].sheep.frame;

	temp--;
	//Stop us going past the first frame
	if(temp < 0){
		temp = 0;
	}

	pens[pen].sheep.frame = temp;
}



// on action, check to see if valid move
PlayScreen.prototype.update = function(){

	//Reset All Pens
	this.resetPens();

	//Check if over any of the pens
	if(dragging){
		sheepWobble.position = this.input.position;

		if(this.checkOverlap(sheepWobble,pens[0].sheep))
		{
			this.expandPen(0);
		}
		else if(this.checkOverlap(sheepWobble,pens[1].sheep))
		{
			this.expandPen(1);
		}
		else if(this.checkOverlap(sheepWobble,pens[2].sheep))
		{
			this.expandPen(2);
		}
		else if(this.checkOverlap(sheepWobble,pens[3].sheep))
		{
			this.expandPen(3);
		}
	}

	// Check if drag sheep has ended
	if(this.input.activePointer.isUp)
	{
		if(dragging)
		{
			this.dropSheep();
		}
	}
};




// Spawn items
PlayScreen.prototype.spawnItems = function ()
{
	// random index for correct pen
	correctPen = Math.floor(Math.random() * 4);

	// random indexs for words
	correctRow = groupWords[Math.floor(Math.random() * groupWords.length)];


	// Get random words to fill incorrect text boxes
	incorrectWord1 = randomWords[Math.floor(Math.random() * randomWords.length)];
	incorrectWord2 = randomWords[Math.floor(Math.random() * randomWords.length)];
	incorrectWord3 = randomWords[Math.floor(Math.random() * randomWords.length)];

	// While 2 are the same, reset util you get unique
	while(incorrectWord1 == incorrectWord2 || incorrectWord1 == incorrectWord3 || incorrectWord2 == incorrectWord3)
	{
		incorrectWord1 = randomWords[Math.floor(Math.random() * randomWords.length)];
		incorrectWord2 = randomWords[Math.floor(Math.random() * randomWords.length)];
		incorrectWord3 = randomWords[Math.floor(Math.random() * randomWords.length)];
	}


	// Get a pair of matching values
	correctWordA = correctRow[Math.floor(Math.random() * correctRow.length)];
	correctWordB = correctRow[Math.floor(Math.random() * correctRow.length)];

	// Make sure correctWordA isn't the same as correctWordB
	while(correctWordA == correctWordB)
	{
		correctWordA = correctRow[Math.floor(Math.random() * correctRow.length)];
		correctWordB = correctRow[Math.floor(Math.random() * correctRow.length)];
	}

	// Set one correct word to mainText
	mainText.setText(correctWordA);


	// Set words to screen
	switch(correctPen){
		case 0: correctPen = 0;
				TLtext.setText(correctWordB);
				TRtext.setText(incorrectWord1);
				BLtext.setText(incorrectWord2);
				BRtext.setText(incorrectWord3);

				TLraw = correctWordB;
				TRraw = incorrectWord1;
				BLraw = incorrectWord2;
				BRraw = incorrectWord3;
				break;

		case 1: correctLocation = 1;
				TLtext.setText(incorrectWord1);
				TRtext.setText(correctWordB);
				BLtext.setText(incorrectWord2);
				BRtext.setText(incorrectWord3);

				TLraw = incorrectWord1;
				TRraw = correctWordB;
				BLraw = incorrectWord2;
				BRraw = incorrectWord3;
				break;

		case 2: correctLocation = 2;
				TLtext.setText(incorrectWord1);
				TRtext.setText(incorrectWord2);
				BLtext.setText(correctWordB);
				BRtext.setText(incorrectWord3);

				TLraw = incorrectWord1;
				TRraw = correctWordB;
				BLraw = incorrectWord2;
				BRraw = incorrectWord3;
				break;

		case 3: correctLocation = 3;
				TLtext.setText(incorrectWord1);
				TRtext.setText(incorrectWord2);
				BLtext.setText(incorrectWord3);
				BRtext.setText(correctWordB);

				TLraw = incorrectWord1;
				TRraw = incorrectWord2;
				BLraw = incorrectWord3;
				BRraw = correctWordB;
				break;
	}

	// Set timer for time taken to answer
    startTime = Math.floor(Date.now());
}




// Check how many lives remaining, show correct frame
PlayScreen.prototype.checkLives = function()
{
	if(livesLeft <= 0)
	{
		livesBox = this.add.sprite(0, 0, 'Lives', 3);
		this.recordData();
		this.endGame();
	}
	else if(livesLeft == 1)
	{
		livesBox = this.add.sprite(0, 0, 'Lives', 2);
	}
	else if(livesLeft == 2)
	{
		livesBox = this.add.sprite(0, 0, 'Lives', 1);
	}
};


// Record screen clicks
PlayScreen.prototype.recordScreenPress = function(x, y)
{
	// Get current time
	var timeStamp = new Date();
	timeStamp.toUTCString();

	// Add to records
	clickHistory[numClickHistory++] = [x, y, timeStamp];
};

// Record statistical data from game
PlayScreen.prototype.recordData = function()
{
	console.log("Pre");

	// Calculate game duration
    var time = new Date();
    var gameEndTime = time.toUTCString();
	var duration = gameStartTime - gameEndTime;



	// Prep + load data
	//var formData = new FormData();
	//formData.append("gameName", "Lion");
	//formData.append("score", score);
	//formData.append("duration", duration);
	//formData.append("screenPresses", clickHistory);
	//formData.append("wordResults", wordHistory);

	var data = {
        'gameName': "Sheep",
        'score': score,
        'duration': duration,
        'screenPresses': clickHistory,
        'wordResults': wordHistory
	};




	// GET
$.ajax(
{
  type: "GET",
  url: "http://localhost:1982/server.asp",
  data: data,
  success: function(resp)
  {
  	console.log("Woo ");//+resp);

  	//this.printReturn(resp);
    return resp;
  },
  error: function()
  {
	console.log("Boo");
  }
});

console.log("Post2");
};


// Game has finished, move to finish state
PlayScreen.prototype.printReturn = function(data)
{
	console.log(data);
};

3



// Game has finished, move to finish state
PlayScreen.prototype.endGame = function()
{
	console.log('Finish');
	this.state.start('Finish');
};
