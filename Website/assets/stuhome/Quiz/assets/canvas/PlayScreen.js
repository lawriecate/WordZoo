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
	this.load.pack('PlayScreen', '/stuhome/Quiz/assets/pack.json');
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
	TLBox = this.add.button(480, 548, 'score', this.clickTL, this, null, null, null, null);
	TLBox.anchor.setTo(0.5, 0.5);
	TLBox.scale.setTo(2, 3);
	TRBox = this.add.button(1440, 548, 'score', this.clickTR, this, null, null, null, null);
    TRBox.anchor.setTo(0.5, 0.5);
    TRBox.scale.setTo(2, 3);
	BLBox = this.add.button(480, 852, 'score', this.clickBL, this, null, null, null, null);
    BLBox.anchor.setTo(0.5, 0.5);
    BLBox.scale.setTo(2, 3);
	BRBox = this.add.button(1440, 852, 'score', this.clickBR, this, null, null, null, null);
    BRBox.anchor.setTo(0.5, 0.5);
    BRBox.scale.setTo(2, 3);
    
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

    // picture for spellings
	pictureBox = this.game.add.sprite(1600, 220, 'background');
	pictureBox.visible = false;


	// animal selection images
	giraffe = this.add.button(50, 250, 'animals', this.selectGiraffe, this, 0, 0, 0, 0);
	owl = this.add.button(500, 250, 'animals', this.selectOwl, this, 1, 1, 1, 1);
	octopus = this.add.button(950, 250, 'animals', this.selectOctopus, this, 2, 2, 2, 2);
	zebra = this.add.button(1400, 250, 'animals', this.selectZebra, this, 3, 3, 3, 3);
	
	panda = this.add.button(50, 600, 'animals', this.selectPanda, this, 4, 4, 4, 4);
	sheep = this.add.button(500, 550, 'animals', this.selectSheep, this, 5, 5, 5, 5);
	elephant = this.add.button(950, 650, 'animals', this.selectElephant, this, 6, 6, 6, 6);
	lion = this.add.button(1400, 600, 'animals', this.selectLion, this, 7, 7, 7, 7);

	// hide animal sprites
	giraffe.visible = false;
	owl.visible = false;
	octopus.visible = false;
	zebra.visible = false;
	panda.visible = false;
	sheep.visible = false;
	elephant.visible = false;
	lion.visible = false;


    // Start Game
   	questionIndex = 0;
	this.setQuestion();
};


// set next question to screen
PlayScreen.prototype.setQuestion = function() 
{
	// if now asking for animal selection, move title text and add picture box
	if(questionIndex >= animalSeclectIndex)
	{
		// Set question
		titleText.setText("Select starting animal.");

		// Reposition box
   		titleBox.scale.setTo(4.5, 3);
		titleBox.x = 960;
		titleText.x = 960;

		// hide picture box
		pictureBox.visible = false;

		// hide buttons
		TRBox.visible = false;
		TLBox.visible = false;
		BRBox.visible = false;
		BLBox.visible = false;

		// hide text
		TRText.visible = false;
		TLText.visible = false;
		BRText.visible = false;
		BLText.visible = false;

		// show animal sprites
		giraffe.visible = true;
		owl.visible = true;
		octopus.visible = true;
		zebra.visible = true;
		panda.visible = true;
		sheep.visible = true;
		elephant.visible = true;
		lion.visible = true;
	}
	// Else if now asking for correct spelling, move title text and add picture box
	else if(questionIndex >= pictureSpellingIndex)
	{
		// Set question
		titleText.setText("Choose the correct spelling.");

		// Get answers
		var temp = answers[questionIndex];
			
		// Set answers		
		TRText.setText(temp[0]);
		TLText.setText(temp[1]);
		BRText.setText(temp[2]);
		BLText.setText(temp[3]);


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
	// else set question & answers
	else
	{
		// Set question
		titleText.setText(questions[questionIndex]);

		// Get answers
		var temp = answers[questionIndex];
			
		// Set answers		
		TRText.setText(temp[0]);
		TLText.setText(temp[1]);
		BRText.setText(temp[2]);
		BLText.setText(temp[3]);
	}


	// Reset timer (prevent double clicking)
	timeQuestionShown = new Date();
};


// onClickTR
PlayScreen.prototype.clickTR = function() 
{
	// if answered too quickly, ignore
	var timeNow = new Date();
	var timeElapsed = (Math.floor(timeNow) - Math.floor(timeQuestionShown));
	if(timeElapsed < inputDelay)
	{
		return;
	}

	// Record answer
	wordHistory[questionIndex] = 0;

	// set next question
	questionIndex++;
	this.setQuestion();
};
// onClickTL
PlayScreen.prototype.clickTL = function() 
{
	// if answered too quickly, ignore
	var timeNow = new Date();
	var timeElapsed = (Math.floor(timeNow) - Math.floor(timeQuestionShown));
	if(timeElapsed < inputDelay)
	{
		return;
	}

	// Record answer
	wordHistory[questionIndex] = 1;

	// set next question
	questionIndex++;
	this.setQuestion();
};
// onClickBR
PlayScreen.prototype.clickBR = function() 
{
	// if answered too quickly, ignore
	var timeNow = new Date();
	var timeElapsed = (Math.floor(timeNow) - Math.floor(timeQuestionShown));
	if(timeElapsed < inputDelay)
	{
		return;
	}

	// Record answer
	wordHistory[questionIndex] = 2;

	// set next question
	questionIndex++;
	this.setQuestion();
};
// onClickBL
PlayScreen.prototype.clickBL = function() 
{
	// if answered too quickly, ignore
	var timeNow = new Date();
	var timeElapsed = (Math.floor(timeNow) - Math.floor(timeQuestionShown));
	if(timeElapsed < inputDelay)
	{
		return;
	}

	// Record answer
	wordHistory[questionIndex] = 3;

	// set next question
	questionIndex++;
	this.setQuestion();
};



// Animal selection
PlayScreen.prototype.selectGiraffe = function() 
{
	selectedAnimal = 0;
	this.endGame();
};
PlayScreen.prototype.selectOwl = function() 
{
	selectedAnimal = 1;
	this.endGame();
};
PlayScreen.prototype.selectOctopus = function() 
{
	selectedAnimal = 2;
	this.endGame();
};
PlayScreen.prototype.selectZebra = function() 
{
	selectedAnimal = 3;
	this.endGame();
};
PlayScreen.prototype.selectPanda = function() 
{
	selectedAnimal = 4;
	this.endGame();
};
PlayScreen.prototype.selectSheep = function() 
{
	selectedAnimal = 5;
	this.endGame();
};
PlayScreen.prototype.selectElephant = function() 
{
	selectedAnimal = 6;
	this.endGame();
};
PlayScreen.prototype.selectLion = function() 
{
	selectedAnimal = 7;
	this.endGame();
};



// Game has finished, record data + move to finish state
PlayScreen.prototype.endGame = function() 
{
	console.log("History "+wordHistory);
	console.log("Animal "+selectedAnimal);

	$.post('/student/welcome',{quiz_result:wordHistory,animal:selectedAnimal},function(data) {
		console.log("Quiz end");
		window.document.location = "/student";
	});
	// Send wordHistory somewhere
	// Redirect to home page
};





// on answer
//	hide boxes + text
//	set next title + text
//	after 1 second -> show boxes + text