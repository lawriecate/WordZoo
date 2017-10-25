// Global variables
var lion = lion || {};
var timeLeft;
var livesLeft = 3;



/**
 * PlayScreen.
 */
function PlayScreen() {
	
	Phaser.State.call(this);
	
}

/** @type Phaser.State */
var PlayScreen_proto = Object.create(Phaser.State.prototype);
PlayScreen.prototype = PlayScreen_proto;
PlayScreen.prototype.constructor = PlayScreen;

PlayScreen.prototype.init = function () {
	
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.scale.pageAlignHorizontally = true;
	this.scale.pageAlignVertically = true;
	this.stage.backgroundColor = '#ffffff';
	
};

PlayScreen.prototype.preload = function () {
	
	this.load.pack('PlayScreen', 'assets/pack.json');
	
};

PlayScreen.prototype.create = function () {
	
	// Add background
	var background = this.add.sprite(0, 0, 'Background');
	background.scale.setTo(1.51, 1.51);
	
	
	// Add normal (no-diving) goal keeper
	GK_Mid = this.add.sprite(790, 320, 'goalkeeper_center');
	GK_Mid.scale.setTo(1.5, 1.5);

	// Add TopLeft diving goal keeper + hide
	GK_TL = this.game.add.sprite(390,180,'top_left_dive', 0);
 	GK_TL.scale.setTo(1.5, 1.5);
 	GK_TL.visible = false;
	 
	// Add TopRight diving goal keeper + hide
 	GK_TR = this.game.add.sprite(840,180,'top_right_dive', 0);
 	GK_TR.scale.setTo(1.5, 1.5);
 	GK_TR.visible = false;
	 
	// Add BottomLeft diving goal keeper + hide
 	GK_BL = this.game.add.sprite(390,290,'bottom_left_dive', 2);
 	GK_BL.scale.setTo(1.5, 1.5);
 	GK_BL.visible = false;
	 
	// Add BottonRight diving goal keeper + hide
 	GK_BR = this.game.add.sprite(840,290,'bottom_right_dive', 0);
 	GK_BR.scale.setTo(1.5, 1.5);
 	GK_BR.visible = false;
	 
	 
	// TopLeft diving animation
 	GK_TL_Dive = GK_TL.animations.add('top_left_dive', [0,1,2]);
 	GK_TL.animations.currentAnim.onComplete.add(function () { GK_TL.animations.frame = 0; }, this);

	// TopRight diving animation
 	GK_TR_Dive = GK_TR.animations.add('top_right_dive',[0,1,2]);
 	GK_TR.animations.currentAnim.onComplete.add(function () { GK_TR.animations.frame = 0; }, this);

	// BottomLeft diving animation
 	GK_BL_Dive = GK_BL.animations.add('bottom_left_dive',[2,1,0]);
 	GK_BL.animations.currentAnim.onComplete.add(function () { GK_BL.animations.frame = 0; }, this);

	// BottomRight diving animation
 	GK_BR_Dive = GK_BR.animations.add('bottom_right_dive',[0,1,2]);
	GK_BR.animations.currentAnim.onComplete.add(function () { GK_BR.animations.frame = 0; }, this);
	 
	 
	 
	
	// Add TopLeft word box
	topLeft = this.add.button(544, 128, 'ScoreBackground', this.clickTL, this, null, null, null, null);
	topLeft.scale.setTo(1.5, 1.5);
	
	// Add TopRight word box
	topRight = this.add.button(1184, 128, 'ScoreBackground', this.clickTR, this, null, null, null, null);
	topRight.scale.setTo(1.5, 1.5);
	
	// Add BottomLeft word box
	bottomLeft = this.add.button(544, 576, 'ScoreBackground', this.clickBL, this, null, null, null, null);
	bottomLeft.scale.setTo(1.5, 1.5);
	
	// Add BottomRight word box
	bottomRight = this.add.button(1184, 576, 'ScoreBackground', this.clickBR, this, null, null, null, null);
	bottomRight.scale.setTo(1.5, 1.5);
	
	// Add Football + animation
	football = this.add.sprite(150, 870, 'soccer_ball', 0);
	football.scale.setTo(1.5, 1.5);
	footballRollIn = football.animations.add('spin');
	footballRollIn.play(5,true);
	

	
	
	
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
		

	
	
	// TL text
	TLtext = this.add.text(620, 170, "", style);
	// TR text
	TRtext = this.add.text(1260, 170, "", style);
	// BL text
	BLtext = this.add.text(620, 620, "", style);
	// BR text
	BRtext = this.add.text(1260, 620, "", style);
	
	
	
	// Make all buttons visible
	topLeft.visible = true;
	topRight.visible = true;
	bottomLeft.visible = true;
	bottomRight.visible = true;
	
	
	
	// Time
	timeLeft = time;
	timer = this.time.create(false);
	timer.loop(Phaser.Timer.SECOND, this.updateTime, this);
	timer.start();
	
	

	
	// Set words
	this.setWords();
};

/* --- end generated code --- */



// display current time to screen (with --)
PlayScreen.prototype.updateTime = function ()
{	
	// If no time remaining, game finished
	if(timeLeft <= 0){
		this.endGame();
	}
	
	// Show time remaining
	timeText.setText("Time: "+(--timeLeft), true);	
};


// display current score to screen
PlayScreen.prototype.updateScore = function ()
{	
	// Show current score
	scoreText.setText("Score: "+score, true);	
};





// hide/display word display buttons (boolean)
PlayScreen.prototype.showButtons = function (isVisible)
{	
	TLtext.visible = isVisible;
	TRtext.visible = isVisible;
	BRtext.visible = isVisible;
	BLtext.visible = isVisible;
	
	topLeft.visible = isVisible;
	topRight.visible = isVisible;
	bottomLeft.visible = isVisible;
	bottomRight.visible = isVisible;
};








//onClick top left button
PlayScreen.prototype.clickTL = function ()
{			
	// hide all buttons
	this.showButtons(false);
	
	// hide middle goal keeper
	GK_Mid.visible = false;
	
	// check if answer is correct
	if(correctLocation == "TL"){
		
		// correct answer, increase score
		score++;
		
		// show BR keeper + play animation
		GK_BR.visible = true;
		GK_BR_Dive.play(5);
		
		// onComplete
		GK_BR.animations.currentAnim.onComplete.add(function () {this.reset();}, this);

		// Move football to TL, score
	}else{
		
		// incorrect answer, loose a life
		livesLeft--;
		
		// show TR keeper + play animation
		GK_TL.visible = true;
		GK_TL_Dive.play(5);

		// Move football to TL, save
		
		// onComplete
		GK_TL.animations.currentAnim.onComplete.add(function () {this.reset();}, this);
	}
};
//onClick top right button
PlayScreen.prototype.clickTR = function ()
{			
	// hide all buttons
	this.showButtons(false);
	
	// hide middle goal keeper
	GK_Mid.visible = false;
	
	// check if answer is correct
	if(correctLocation == "TR"){
		
		// correct answer, increase score
		score++;
		
		// show BL keeper + play animation
		GK_BL.visible = true;
		GK_BL_Dive.play(5);
		
		// onComplete
		GK_BL.animations.currentAnim.onComplete.add(function () {this.reset();}, this);

		// Move football to TR, score
	}else{
		
		// incorrect answer, loose a life
		livesLeft--;
		
		// show TR keeper + play animation
		GK_TR.visible = true;
		GK_TR_Dive.play(5);

		// Move football to TR, save
		
		// onComplete
		GK_TR.animations.currentAnim.onComplete.add(function () {this.reset();}, this);
	}
};
//onClick bottom left button
PlayScreen.prototype.clickBL = function ()
{			
	// hide all buttons
	this.showButtons(false);
	
	// hide middle goal keeper
	GK_Mid.visible = false;
	
	// check if answer is correct
	if(correctLocation == "BL"){
		
		// correct answer, increase score
		score++;
		
		// show TR keeper + play animation
		GK_TR.visible = true;
		GK_TR_Dive.play(5);
		
		// onComplete
		GK_TR.animations.currentAnim.onComplete.add(function () {this.reset();}, this);

		// Move football to BL, score
	}else{
		
		// incorrect answer, loose a life
		livesLeft--;
		
		// show BL keeper + play animation
		GK_BL.visible = true;
		GK_BL_Dive.play(5);

		// Move football to BL, save
		
		// onComplete
		GK_BL.animations.currentAnim.onComplete.add(function () {this.reset();}, this);
	}
};
//onClick bottom right button
PlayScreen.prototype.clickBR = function ()
{			
	// hide all buttons
	this.showButtons(false);
	
	// hide middle goal keeper
	GK_Mid.visible = false;
	
	// check if answer is correct
	if(correctLocation == "BR"){
		
		// correct answer, increase score
		score++;
		
		// show TL keeper + play animation
		GK_TL.visible = true;
		GK_TL_Dive.play(5);
		
		// onComplete
		GK_TL.animations.currentAnim.onComplete.add(function () {this.reset();}, this);

		// Move football to BR, score
	}else{
		console.log("-");
		
		// incorrect answer, loose a life
		livesLeft--;
		
		// show TR keeper + play animation
		GK_BR.visible = true;
		GK_BR_Dive.play(5);

		// Move football to BR, save
		
		// onComplete
		GK_BR.animations.currentAnim.onComplete.add(function () {	this.reset();}, this);
	}
};










// setWords
PlayScreen.prototype.setWords = function ()
{		
	// show all buttons
	this.showButtons(true);
	
	// get the next word from word bank
	correctWord = words[index++ % words.length];

	// Random number between 1 and 4 for position of correct
	// Set correct word in that position, generate incorrect for others
	var random = Math.floor((Math.random() * 4) + 0);
	switch(random){
		case 0: correctLocation = "TL";
				TLtext.setText(correctWord);
				TRtext.setText(this.genIncorrect());
				BLtext.setText(this.genIncorrect());
				BRtext.setText(this.genIncorrect());
				break;
				
		case 1: correctLocation = "TR";
				TLtext.setText(this.genIncorrect());
				TRtext.setText(correctWord);
				BLtext.setText(this.genIncorrect());
				BRtext.setText(this.genIncorrect());
				break;
		
		case 2: correctLocation = "BL";
				TLtext.setText(this.genIncorrect());
				TRtext.setText(this.genIncorrect());
				BLtext.setText(correctWord);
				BRtext.setText(this.genIncorrect());
				break;
				
		case 3: correctLocation = "BR";
				TLtext.setText(this.genIncorrect());
				TRtext.setText(this.genIncorrect());
				BLtext.setText(this.genIncorrect());
				BRtext.setText(correctWord);
				break;
	}
};




//Reset after word selection
PlayScreen.prototype.reset = function ()
{		
	// update score
	this.updateScore();
	
	// check lives
	this.checkLives();
	
	// Wipe previous data from buttons
	TLtext.setText("");
	TRtext.setText("");
	BLtext.setText("");
	TRtext.setText("");
	
	// hide all animations
	GK_TL.visible = false;
	GK_TR.visible = false;
	GK_BL.visible = false;
	GK_BR.visible = false;

	// Hide footballs
	
	// show middle goal keeper
	GK_Mid.visible = true;
	
	// ball roll in (on complete, setWords)
	
	// setWord
	this.setWords();
};





// set wrong words to other buttons
// First letter cannot be incorrect
// *** Not unique ***
PlayScreen.prototype.genIncorrect = function ()
{	
	// Random positions to add incorrect letter into correct word
	var positionIndex = Math.floor(Math.random() * correctWord.length - 1);
	
	// Random positions to add incorrect letter into correct word
	var letterIndex = Math.floor(Math.random() * letters.length);

	// Return word with incorrect letter replacing 
	var newWord = correctWord.substr(0,positionIndex + 1)
		+ letters[letterIndex]
		+ correctWord.substr((positionIndex + 2), (correctWord.length - 1));

	
	// If changes haven't changed spelling or same wrong spelling -> retry, else return
	if(newWord == correctWord){
		return this.genIncorrect();
	}else if(newWord == TLtext || newWord == TRtext || newWord == BLtext || newWord == BRtext){
		return this.genIncorrect();
	}
	
	// Return unique incorrect word
	return newWord;
};


// Check how many lives are left, show correct frame
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





// HelloWorld for *Testing*
PlayScreen.prototype.addHelloWorldText = function() 
{
	this.add.text(100, 100, "hello world!");
};
