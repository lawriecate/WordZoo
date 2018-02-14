function StartScreen() 
{	
	Phaser.State.call(this);	
}

/** @type Phaser.State */
var StartScreen_proto = Object.create(Phaser.State.prototype);
StartScreen.prototype = StartScreen_proto;
StartScreen.prototype.constructor = StartScreen;

StartScreen.prototype.init = function () 
{	
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.scale.pageAlignHorizontally = true;
	this.scale.pageAlignVertically = true;
	this.stage.backgroundColor = '#ffffff';	
};

StartScreen.prototype.preload = function () 
{	
	this.load.pack('startScreen', 'assets/pack.json');	
};

StartScreen.prototype.create = function () 
{
	// Add background
	var _background = this.add.sprite(0, 0, 'background', null);
    _background.scale.setTo(1.5, 1.5);

    // title text + background
    titleBox = this.game.add.tileSprite(960, 220, 366, 80, 'score');
    titleBox.scale.setTo(2, 3);
    titleBox.anchor.setTo(0.5, 0.5);

	// Add quiz title text
    _titleText = this.game.add.text(960, 220, "Quiz", biggerStyle); 
    _titleText.anchor.setTo(0.5);
    _titleText.addColor('#FF9933', 0);  

	// Add back button
	//var _buttonBackground = this.add.sprite(0, 733, 'ButtonBackground', null);

	// Add back button
	//var _backButton = this.add.button(22, 912, 'BackButton', this.onClickBack, this, null, null, null, null);

	// Add play button
	//var _playButton = this.add.button(616, 780, 'PlayButton', this.onClickPlay, this, null, null, null, null);
	
	// Add rules button
	//var _homeButton = this.add.button(1332, 912, 'HomeButton', this.onClickHome, this, null, null, null, null);
};


// on click back button, 
StartScreen.prototype.onClickPlay = function() 
{
	// go back
}

// on click play button, proceed to play screen
StartScreen.prototype.onClickPlay = function() 
{
	this.state.start('play');
};

//on click home button, proceed to home screen
StartScreen.prototype.onClickHome = function() 
{
	// go home
};