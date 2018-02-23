//global variables
var octopus = octopus|| {};


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
	this.load.pack('FinishScreen', '/games/octopus/assets/pack.json');
};

FinishScreen.prototype.create = function ()
{
	// Add background
	var _FinishBackground = this.add.sprite(0, 0, 'FinishBackground');
	_FinishBackground.scale.setTo(1.5, 1.50);

	// Add gameOver overlay
	var _GameOver = this.add.sprite(296, 58, 'GameOver');

	// Add score
	scoreText = this.add.text(800, 520, score, biggerStyle);
	scoreText.anchor.setTo(0.5, 0.5);
	scoreText.addColor('#FF9933', 0);

	// Play again button
	var _PlayAgain = this.add.button(335, 839, 'PlayAgain', this.playAgain, this, null, null, null, null);

	// Other games button
	var _MoreGames = this.add.button(1019, 839, 'MoreGames', this.moreGames, this, null, null, null, null);
};


//on click playAgain, proceed to loading screen
FinishScreen.prototype.playAgain = function()
{
	this.state.start('loading');
};

//on click moreGames, proceed to game selection page
FinishScreen.prototype.moreGames = function()
{
	console.log("Go to game selection page");
};