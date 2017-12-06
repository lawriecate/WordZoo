// Global variables
var sheep = sheep|| {}; 


function FinishScreen() 
{	
	Phaser.State.call(this);	
}

/** @type Phaser.State */
var FinishScreen_proto = Object.create(Phaser.State.prototype);
FinishScreen.prototype = FinishScreen_proto;
FinishScreen.prototype.constructor = FinishScreen;

FinishScreen.prototype.init = function () 
{
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.scale.pageAlignHorizontally = true;
	this.scale.pageAlignVertically = true;
	this.stage.backgroundColor = '#ffffff';
};

FinishScreen.prototype.preload = function () 
{	
	this.load.pack('FinishScreen', 'assets/pack.json');	
};

FinishScreen.prototype.create = function () 
{
	// Add background
	var _FinishBackgroun = this.add.sprite(-1, -1, 'FinishBackgroun');
	_FinishBackgroun.scale.setTo(1.51, 1.51);

	// *** Change text? ***
	// Add 'unlucky text'
	var _Unlucky = this.add.sprite(576, 96, 'Unlucky');
	_Unlucky.scale.setTo(1.5, 1.5);
	
	
	// Add score + score text
	scoreText = this.add.text(90, 50, "Score: "+score, medStyle);
	
	
	// Play again button
	var _PlayAgain = this.add.button(672, 384, 'PlayAgain', this.playAgain, this, null, null, null, null);
	_PlayAgain.scale.setTo(1.5, 1.5);
	
	// Other games button
	var _MoreGames = this.add.button(672, 576, 'MoreGames', this.moreGames, this, null, null, null, null);
	_MoreGames.scale.setTo(1.5, 1.5);
};


//on click playAgain, proceed to play screen
FinishScreen.prototype.playAgain = function() 
{
	this.state.start('start');
};

//on click moreGames, proceed to game selection page
FinishScreen.prototype.moreGames = function() 
{
	console.log("Go to game selection page");
};