// Global variables
var zebra = zebra|| {}; 

var pause;
var counter;

var circle;
var circleBig;
var hand;
var handClick;

var _okButton;




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
	this.load.pack('RulesScreen', '/games/zebra/WebContent/assets/pack.json');

	// Load items
	this.load.image(bench ,'/images/words/bench.png');
	this.load.image(brain ,'/images/words/brain.png');
	this.load.image(cannon ,'/images/words/cannon.png');
	this.load.image(cannon ,'/images/words/desk.png');
	this.load.image(cannon ,'/images/words/flag.png');
	this.load.image(mouse ,'/images/words/mouse.png');	
};

RulesScreen.prototype.create = function () 
{
	// Add background
	background = this.add.tileSprite(0, 0, 1920, 1080, 'Background');
	background.scale.setTo(1.51, 1.51);
	
	// Add faded tutorial overlay
	var _tutorialOverlay = this.add.sprite(0, 0, 'tutorialOverlay');
	_tutorialOverlay.alpha = 0.1;
	
	// Add zebra + walking animation
	zebra = this.game.add.sprite(50, playerLanePositions[0], 'Zebra');
	zebra.scale.setTo(1.5, 1.5);
    zebraWalk = zebra.animations.add('right', [0, 1, 2, 3], 10, true);
    zebraWalk.play(10,true);
	

    //	Correct item text box
	var correctBox = this.add.sprite(740, 100, 'score_background');
	correctBox.scale.setTo(3, 1.5);
	
	// Correct item text
	correctItemText = this.game.add.text(960, 160, "", bigStyle);
    correctItemText.anchor.setTo(0.5);
	correctItemText.addColor('#FF9933', 0);


	// Add Score box + score value
	var scoreBox = this.add.sprite(1664, 182, 'score_background');
	scoreBox.scale.setTo(1.5, 1.5);
	scoreText = this.add.text(1700, 225, "Score: "+score, smallStyle);
	scoreText.addColor('#FF9933', 0);

	// Add Time box + time value
	var timeBox = this.add.sprite(1664, 32, 'score_background');
	timeBox.scale.setTo(1.5, 1.5);
	timeText = this.add.text(1700, 75, "Time: "+startingTime, smallStyle);
    timeText.addColor('#FF9933', 0);
	
	// Add Lives box
	livesBox = this.add.sprite(0, 0, 'Lives', 0);
	
	// Time
	timer = this.time.create(false);
	timer.loop(Phaser.Timer.SECOND, this.updateTime, this);


	// Add OK button
	_okButton = this.add.button(800, 865, 'okButton', this.onClickOK, this, null, null, null, null);
	_okButton.scale.setTo(1.75, 1.75);


	// Add Circle
	circle = this.add.sprite(1150, 40, 'highlightCircle');
	circle.scale.setTo(1.2, 1.2);
	circle.visible = false;
	// Add Big Circle
	circleBig = this.add.sprite(1150, 40, 'highlightCircle');
	circleBig.scale.setTo(4, 2);
	circleBig.visible = false;

	// Add Hand
	hand = this.add.sprite(500, 1200, 'Hand', 0);
	hand.scale.setTo(0.5, 0.5);
	hand.visible = false;

	// Add Hand Click Animation
	handClick = hand.animations.add('Hand', [0,1,2,3,4,5]);


	// Reset starting values for each playthrough
	normalSpeed = speed;
	currentSpeed = normalSpeed;
	score = 0;
	timeLeft = startingTime;
	livesLeft = startingLives;
	pause = false;

	
	// Start game
	counter = 0;
	this.updateScore();
	this.setCorrect();
	timer.start();
};


// updateTime + demo
RulesScreen.prototype.updateTime = function ()
{	
	// Bring OK button to top
	this.world.bringToTop(_okButton);


	// 1 -> pause + circle Title / Correct
	if(counter == 1)
	{
		// Stop scrolling + walking
		pause = true;
		zebraWalk.stop();
	}
	// 2 -> Circle Title
	else if(counter == 2)
	{		
		// Circle Title
		circleBig.x = 680;
		circleBig.y = 20;
		circleBig.visible = true;
		this.world.bringToTop(circleBig);
	}
	// 3 -> Circle Correct
	else if(counter == 3)
	{		
		// Circle Correct
		circle.x = 1290;
		circle.y = 630;
		circle.visible = true;
		this.world.bringToTop(circle);
	}
	// 4 -> Hide Circles + show hand
	else if(counter == 4)
	{		
		// Hide circles
		circle.visible = false;
		circleBig.visible = false;
		
		// Show Hand
		var handTween = this.game.add.tween(hand).to({y: '-750'}, 700, Phaser.Easing.Linear.None, false);
		hand.visible = true;
		this.world.bringToTop(hand);
		handTween.start();
	}
	// 5 -> Click hand
	else if(counter == 5)
	{		
		// Click hand
		hand.animations.currentAnim.onComplete.add(function () { hand.animations.frame = 5; }, this);
		handClick.play(10);
	}
	// 6 -> Drag down
	else if(counter == 6)
	{		
		// Drag down
		var handTween = this.game.add.tween(hand).to({y: '+200'}, 400, Phaser.Easing.Linear.None, false);
		handTween.onComplete.add(function () { hand.animations.frame = 0; this.moveDown(); }, this);
		handTween.start();
	}
	// 7 -> Move away
	else if(counter == 7)
	{		
		// Drag away
		var handTween = this.game.add.tween(hand).to({x: '-200', y: '+600'}, 500, Phaser.Easing.Linear.None, false);
		handTween.start();
	}
	// 8 -> Unpause
	else if(counter == 8)
	{	
		pause = false;
		zebraWalk.play(10,true);
	}


	// 13 -> Pause
	else if(counter == 13)
	{	
		pause = true;
		zebraWalk.stop();
	}
	// 14 -> Highlight score
	else if(counter == 14)
	{	
		// Circle score
		circle.scale.setTo(2, 1.2);
		circle.x = 1630;
		circle.y = 160;
		circle.visible = true;
	}
	// 15 -> Increase score
	else if(counter == 15)
	{	
		score++;
		this.updateScore();
	}
	// 16 -> Remove circle, setIncorrect, unpause
	else if(counter == 16)
	{	
		circle.visible = false;
		circle.scale.setTo(1.2, 1.2);

		this.setIncorrect();
		pause = false;
		zebraWalk.play(10,true);
	}
	// 18 -> pause
	else if(counter == 18)
	{	
		pause = true;
		zebraWalk.stop();
	}
	// 19 -> Circle Title
	else if(counter == 19)
	{		
		// Circle Title
		circleBig.x = 670;
		circleBig.y = 20;
		circleBig.visible = true;
	}
	// 20 -> Circle Correct
	else if(counter == 20)
	{		
		// Circle Correct
		circle.x = 1280;
		circle.y = 780;
		circle.visible = true;
	}
	// 21 -> Hide circle
	else if(counter == 21)
	{		
		circle.visible = false;
		circleBig.visible = false;
	
		// Show Hand
		hand.x = 500;
		var handTween = this.game.add.tween(hand).to({y: '-600'}, 600, Phaser.Easing.Linear.None, false);
		hand.visible = true;
		handTween.start();
	}
	// 22 -> Click hand
	else if(counter == 22)
	{		
		// Click hand
		hand.animations.currentAnim.onComplete.add(function () { hand.animations.frame = 5; }, this);
		handClick.play(10);
	}
	// 23 -> Drag up
	else if(counter == 23)
	{		
		// Drag up
		var handTween = this.game.add.tween(hand).to({y: '-200'}, 400, Phaser.Easing.Linear.None, false);
		handTween.onComplete.add(function () { hand.animations.frame = 0; this.moveUp(); }, this);
		handTween.start();
	}
	// 24 -> Move away
	else if(counter == 24)
	{		
		// Drag away
		var handTween = this.game.add.tween(hand).to({x: '-120', y: '+800'}, 800, Phaser.Easing.Linear.None, false);
		handTween.start();
	}
	// 25 -> Unpause
	else if(counter == 25)
	{	
		pause = false;
		zebraWalk.play(10,true);
	}

	// 30 -> Pause
	else if(counter == 30)
	{	
		pause = true;
		zebraWalk.stop();
	}

	// 31 -> Highlight lives
	else if(counter == 31)
	{
		// Circle lives
		circle.scale.setTo(2, 1.2);
		circle.x = 0;
		circle.y = -60;
		circle.visible = true;
	}
	// 32 -> Decrease lives
	else if(counter == 32)
	{	
		livesBox = this.add.sprite(0, 0, 'Lives', 1);
		this.world.bringToTop(circle);
	}
	// 33 -> Remove circle
	else if(counter == 33)
	{	
		circle.visible = false;
		this.setMixed();
		pause = false;
		zebraWalk.play(10,true);
	}
	// 34 -> pause
	else if(counter == 34)
	{	
		pause = true;
		zebraWalk.stop();
	}

	
	// 35 -> Circle Title
	else if(counter == 35)
	{		
		// Circle Title
		circleBig.x = 670;
		circleBig.y = 20;
		circleBig.visible = true;
	}
	// 36 -> Circle Correct
	else if(counter == 36)
	{		
		// Circle Correct
		circle.x = 1520;
		circle.y = 480;
		circle.visible = true;
	}
	// 37 -> Hide circle
	else if(counter == 37)
	{		
		circle.visible = false;
		circleBig.visible = false;
	
		// Show Hand
		hand.x = 500;
		var handTween = this.game.add.tween(hand).to({y: '-600'}, 600, Phaser.Easing.Linear.None, false);
		hand.visible = true;
		handTween.start();
	}
	// 38 -> Click hand
	else if(counter == 38)
	{		
		// Click hand
		hand.animations.currentAnim.onComplete.add(function () { hand.animations.frame = 5; }, this);
		handClick.play(10);
	}
	// 39 -> Drag up
	else if(counter == 39)
	{		
		// Drag up
		var handTween = this.game.add.tween(hand).to({x: '+400'}, 400, Phaser.Easing.Linear.None, false);
		handTween.onComplete.add(function () { hand.animations.frame = 0; this.moveUp(); }, this);
		handTween.start();
	}
	// 40 -> Move away
	else if(counter == 40)
	{		
		// Drag away
		var handTween = this.game.add.tween(hand).to({x: '-300', y: '+800'}, 800, Phaser.Easing.Linear.None, false);
		handTween.start();
	}
	// 41 -> Unpause
	else if(counter == 41)
	{	
		pause = false;
		zebraWalk.play(10,true);
		this.moveRight();
	}
	// 43 -> Pause
	else if(counter == 43)
	{	
		pause = true;
		zebraWalk.stop();

	}
	
	// 44 -> Highlight score
	else if(counter == 44)
	{	
		// Circle score
		circle.scale.setTo(2, 1.2);
		circle.x = 1630;
		circle.y = 160;
		circle.visible = true;
	}
	// 45 -> Update score
	else if(counter == 45)
	{
		score++;
		this.updateScore();
	}
	// 46 -> Hide circle
	else if(counter == 46)
	{
		circle.visible = false;
	}


	// 47 -> Exit
	else if(counter == 47)
	{	
		this.onClickOK();
	}




	// update game
	counter++;
	this.update();


	// If no time remaining, game finished
	if(timeLeft <= 0){
		this.onClickOK();
	}
	
	timeText.setText("Time: "+ --timeLeft , true);	
	console.log(counter);
};




// First items
RulesScreen.prototype.setCorrect = function ()
{	
	// Correct land
	correctLane = 1;

	// random indexs for words
	correctName = 'cannon';
	var incorrectItem1 = 'brain';
	var incorrectItem2 = 'bench';

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
	

    //This ensures the player never goes behind the objects once they are spawned
    this.world.bringToTop(zebra);
};

// Second items
RulesScreen.prototype.setIncorrect = function ()
{	
	// Correct land
	correctLane = 2;

	// random indexs for words
	correctName = 'mouse';
	var incorrectItem1 = 'flag';
	var incorrectItem2 = 'desk';

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
	

    //This ensures the player never goes behind the objects once they are spawned
    this.world.bringToTop(zebra);
};

// Third items
RulesScreen.prototype.setMixed = function ()
{	
	// Correct land
	correctLane = 0;

	// random indexs for words
	correctName = 'brain';
	var incorrectItem1 = 'mouse';
	var incorrectItem2 = 'flag';

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
	

    //This ensures the player never goes behind the objects once they are spawned
    this.world.bringToTop(zebra);
};




// display current score to screen
RulesScreen.prototype.updateScore = function ()
{	
	scoreText.setText("Score: "+score, true);
};



// Move Zebra up a row
RulesScreen.prototype.moveUp = function ()
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
RulesScreen.prototype.moveDown = function ()
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
RulesScreen.prototype.moveRight = function ()
{	
	// move screen at 20 speed or double playspeed, which ever is higher
	if(normalSpeed < 10)
	{
		currentSpeed = 20;
	}
	else
	{
		currentSpeed = normalSpeed * 2;
	}
};


// Update
RulesScreen.prototype.update = function ()
{	
	// if scolling is paused
	if(pause)
	{
		return;
	}


    if (item0.x <= 120) 
    {
    	// if correct
    	if(correctLane == currentLane)
    	{
    		// update current speed
    		currentSpeed = normalSpeed;

    		// reset items
    		item0.kill();
        	item1.kill();
        	item2.kill();
    	}
    	// if incorrect
    	else
    	{
    		// update current speed
    		currentSpeed = normalSpeed;

    		// reset items
    		item0.kill();
        	item1.kill();
        	item2.kill();
    	}
    }

    //Kills items when they move off the screen.
    if (item0.x <= 0 || item1.x <= 0 || item2.x <= 0) 
    {
        item0.kill();
        item1.kill();
        item2.kill();
    }

    //Moves item across screen at currentSpeed
    background.tilePosition.x -= (currentSpeed*2)/3;
    item0.x -= currentSpeed;
    item1.x -= currentSpeed;
    item2.x -= currentSpeed;
}


// On click OK button, return to start screen
RulesScreen.prototype.onClickOK = function() 
{
	this.state.start('start');
};