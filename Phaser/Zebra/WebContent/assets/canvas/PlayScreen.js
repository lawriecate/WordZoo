// Global variables
var zebra = zebra|| {}; 
var timeLeft;
var livesLeft = 3;


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
	this.load.pack('PlayScreen', 'assets/pack.json');	
};

PlayScreen.prototype.create = function () 
{	
	// Add background
	background = this.add.tileSprite(0, 0, 1920, 1080, 'Background');
	background.scale.setTo(1.51, 1.51);
	
	// Background scroll
	
	// Add zebra + walking animation
	zebra = this.game.add.sprite(50, playerLanePositions[0], 'zebra');
	zebra.scale.setTo(1.5, 1.5);
    zebraWalk = zebra.animations.add('right', [0, 1, 2, 3], 10, true);
    zebraWalk.play(10,true);
	

	


	
	// Correct item text
	correctItemText = this.game.add.text(960, 125, "", style);
    correctItemText.anchor.setTo(0.5);
	 

	// Add Score box + score value
	var scoreBox = this.add.sprite(1664, 182, 'ScoreBackground');
	scoreBox.scale.setTo(1.5, 1.5);
	scoreText = this.add.text(1720, 225, "Score: "+score, style);
	
	// Add Time box + time value
	var timeBox = this.add.sprite(1664, 32, 'ScoreBackground');
	timeBox.scale.setTo(1.5, 1.5);
	timeText = this.add.text(1720, 75, "Time: "+time, style);
	
	// Add Lives box
	livesBox = this.add.sprite(0, 0, 'Lives', 0);
	livesBox.scale.setTo(1.5, 1.5);
	
	// Time
	timeLeft = time;
	timer = this.time.create(false);
	timer.loop(Phaser.Timer.SECOND, this.updateTime, this);
	timer.start();
	

	// Add arrow controls
	upArrow = this.add.button(1650, 750, 'ScoreBackground', this.moveUp, this, null, null, null, null);
	upArrow.scale.setTo(0.8, 1.5);
	upArrow = this.add.text(1690, 790, "Up", style);

	downArrow = this.add.button(1650, 900, 'ScoreBackground', this.moveDown, this, null, null, null, null);
	downArrow.scale.setTo(0.8, 1.5);
	downArrow = this.add.text(1670, 940, "Down", style);
	
	rightArrow = this.add.button(1790, 825, 'ScoreBackground', this.moveRight, this, null, null, null, null);
	rightArrow.scale.setTo(0.8, 1.5);
	rightArrow = this.add.text(1820, 865, "Right", style);




	// Set starting values
	speed = 5;
	score = 0;
	livesLeft = 3;
	
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
		this.endGame();
	}
	
	timeText.setText("Time: "+(--timeLeft), true);	
};


// display current score to screen
PlayScreen.prototype.updateScore = function ()
{	
	scoreText.setText("Score: "+score, true);
};





// Move Zebra up a row
PlayScreen.prototype.moveUp = function ()
{	
	// if in top lane, can't move higher -> return
	if(currentLane == 0)
	{
		return;
	}

	// else, more Zebra to row above;
	currentLane--;
	zebra.y = playerLanePositions[currentLane];
};


// Move Zebra down a row
PlayScreen.prototype.moveDown = function ()
{	
	// if in top lane, can't move higher -> return
	if(currentLane == 2)
	{
		return;
	}

	// else, more Zebra to row below;
	currentLane++;
	zebra.y = playerLanePositions[currentLane];
};


// Move Zebra right
PlayScreen.prototype.moveRight = function ()
{	
	// Skip Zebra to object
	return;
};







// Spawn items
PlayScreen.prototype.spawnItems = function ()
{	
	// random index for correct item position
	correctLane = Math.floor(Math.random() * 3);

	// random indexs for words
	correctName = words[Math.floor(Math.random() * words.length)];
	incorrectItem1 = words[Math.floor(Math.random() * words.length)];
	incorrectItem2 = words[Math.floor(Math.random() * words.length)];

	// While 2 are the same, reset util you get unique
	while(correctName == incorrectItem1 || correctName == incorrectItem2 || incorrectItem1 == incorrectItem2)
	{
		incorrectItem1 = words[Math.floor(Math.random() * words.length)];
		incorrectItem2 = words[Math.floor(Math.random() * words.length)];
	}


	// Set item0 (correctItem)
    correctItemText.text = correctName;
    item0 = this.game.add.sprite(1920, itemLanePositions[correctLane], correctName);
	item0.scale.setTo(1.5, 1.5);

    // Set item1 (incorrectItem1)
    item1 = this.add.sprite(1920, itemLanePositions[(correctLane+1) % 3], incorrectItem1);
	item1.scale.setTo(1.5, 1.5);

    // Set item2 (incorrectItem2)
    item2 = this.add.sprite(1920, itemLanePositions[(correctLane+2) % 3], incorrectItem2);
	item2.scale.setTo(1.5, 1.5);

	// Put arrows on top of items
	upArrow.bringToTop();
	downArrow.bringToTop();
	rightArrow.bringToTop();

    //This ensures the player never goes behind the objects once they are spawned
    this.world.bringToTop(zebra);
}



// Update
PlayScreen.prototype.update = function ()
{	
    if (item0.x <= 120) 
    {
    	// if correct
    	if(correctLane == currentLane)
    	{
    		// increase score + speed
    		score++;
    		speed++;

    		// reset items
    		item0.kill();
        	item1.kill();
        	item2.kill();
    		this.spawnItems();
    	}
    	// if incorrect
    	else
    	{
    		// lose a life
    		livesLeft--;
    		this.checkLives();

    		// reset items
    		item0.kill();
        	item1.kill();
        	item2.kill();
    		this.spawnItems();
    	}
    }

    //Kills items when they move off the screen.
    if (item0.x <= 0 || item1.x <= 0 || item2.x <= 0) 
    {
        item0.kill();
        item1.kill();
        item2.kill();
        this.spawnItems();
    }
    
    //Moves item across screen at given speed
    background.tilePosition.x -= (2*speed)/3;
    item0.x -= speed;
    item1.x -= speed;
    item2.x -= speed;

    //check score
    this.updateScore();
}












// Check how many lives remaining, show correct frame
PlayScreen.prototype.checkLives = function() 
{
	if(livesLeft <= 0)
	{
		livesBox = this.add.sprite(0, 0, 'Lives', 3);
		livesBox.scale.setTo(1.5, 1.5);
		this.endGame();
	}
	else if(livesLeft == 1)
	{
		livesBox = this.add.sprite(0, 0, 'Lives', 2);
		livesBox.scale.setTo(1.5, 1.5);
	}
	else if(livesLeft == 2)
	{
		livesBox = this.add.sprite(0, 0, 'Lives', 1);
		livesBox.scale.setTo(1.5, 1.5);
	}
};


// Game has finished, move to finish state
PlayScreen.prototype.endGame = function() 
{
	this.state.start('finish');
};