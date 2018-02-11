//global variables
var quiz = quiz|| {};  


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
	// load background
    var background = this.game.add.tileSprite(0, 0, 1920, 1080, 'background');
    background.scale.setTo(1.5, 1.5);

    // title text + background
    titleBox = this.game.add.tileSprite(960, 220, 366, 80, 'score');
    titleBox.scale.setTo(4.5, 3);
    titleBox.anchor.setTo(0.5, 0.5);

    titleText = this.game.add.text(960, 220, "Title", bigStyle);
    titleText.anchor.setTo(0.5, 0.5);
    titleText.addColor('#FF9933', 0);	


    // buttons
	TRBox = this.add.button(480, 548, 'score', this.clickTR, this, null, null, null, null);
	TRBox.anchor.setTo(0.5, 0.5);
	TRBox.scale.setTo(2, 3);
	TLBox = this.add.button(1440, 548, 'score', this.clickTL, this, null, null, null, null);
    TLBox.anchor.setTo(0.5, 0.5);
    TLBox.scale.setTo(2, 3);
	BRBox = this.add.button(480, 852, 'score', this.clickBR, this, null, null, null, null);
    BRBox.anchor.setTo(0.5, 0.5);
    BRBox.scale.setTo(2, 3);
	BLBox = this.add.button(1440, 852, 'score', this.clickBL, this, null, null, null, null);
    BLBox.anchor.setTo(0.5, 0.5);
    BLBox.scale.setTo(2, 3);
    
    // text
    TRText = this.game.add.text(480, 548, "TR", medStyle);
    TRText.anchor.setTo(0.5, 0.5);
    TRText.addColor('#FF9933', 0);	
    TLText = this.game.add.text(1440, 548, "TL", medStyle);
    TLText.anchor.setTo(0.5, 0.5);
    TLText.addColor('#FF9933', 0);	
    BRText = this.game.add.text(480, 852, "BR", medStyle);
    BRText.anchor.setTo(0.5, 0.5);
    BRText.addColor('#FF9933', 0);	
    BLText = this.game.add.text(1440, 852, "BL", medStyle);
    BLText.anchor.setTo(0.5, 0.5);
    BLText.addColor('#FF9933', 0);	


	pictureBox = this.game.add.sprite(1600, 220, 'background');
	pictureBox.visible = false;

    // Start Game
   	questionIndex = 0;
	this.setQuestion();
};


// set next question to screen
PlayScreen.prototype.setQuestion = function() 
{
	// if end of questions
	console.log(questionIndex +" vs "+numOfQuestions);
	if(questionIndex >= numOfQuestions)
	{
		this.endGame();
		return;
	}
	// Else if now asking for correct spelling, move title text and add picture box
	else if(questionIndex >= pictureSpellingIndex)
	{
		// Reposition box
		titleBox.scale.setTo(3.5, 3);
		titleBox.x = 750;
		titleText.x = 750;

		// Add image
		var temp = answers[questionIndex];
		pictureBox.kill();
		pictureBox = this.game.add.sprite(1600, 220, temp[correctAnswers[questionIndex]]);
		pictureBox.visible = true;
		pictureBox.anchor.setTo(0.5, 0.5);
	}


	// Set question
	titleText.setText(questions[questionIndex]);

	// Get answers
	var temp = answers[questionIndex];
		
	// Set answers		
	TRText.setText(temp[0]);
	TLText.setText(temp[1]);
	BRText.setText(temp[2]);
	BLText.setText(temp[3]);
};


// onClickTR
PlayScreen.prototype.clickTR = function() 
{
	// Record if answer is correct
	if(correctAnswers[questionIndex] == 0)
	{
		wordHistory[questionIndex] = true;
	}
	else 
	{
		wordHistory[questionIndex] = false;
	}

	// set next question
	questionIndex++;
	this.setQuestion();
};
// onClickTL
PlayScreen.prototype.clickTL = function() 
{
	// Record if answer is correct
	if(correctAnswers[questionIndex] == 1)
	{
		wordHistory[questionIndex] = true;
	}
	else 
	{
		wordHistory[questionIndex] = false;
	}

	// set next question
	questionIndex++;
	this.setQuestion();
};
// onClickBR
PlayScreen.prototype.clickBR = function() 
{
	// Record if answer is correct
	if(correctAnswers[questionIndex] == 2)
	{
		wordHistory[questionIndex] = true;
	}
	else 
	{
		wordHistory[questionIndex] = false;
	}

	// set next question
	questionIndex++;
	this.setQuestion();
};
// onClickBL
PlayScreen.prototype.clickBL = function() 
{
	// Record if answer is correct
	if(correctAnswers[questionIndex] == 3)
	{
		wordHistory[questionIndex] = true;
	}
	else 
	{
		wordHistory[questionIndex] = false;
	}

	// set next question
	questionIndex++;
	this.setQuestion();
};


// Game has finished, record data + move to finish state
PlayScreen.prototype.endGame = function() 
{
	// Send wordHistory somewhere
	// Redirect to home page

	console.log(wordHistory);
};