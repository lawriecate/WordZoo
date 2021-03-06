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
	this.load.pack('startScreen', 'http://localhost:1337/sheepgame/assets/pack.json');	
};

StartScreen.prototype.create = function ()
{
	// Add background
	var _background = this.add.tileSprite(0, 0, 1920, 1080, 'background', null);

	// Add play button
	var _playButton = this.add.button(160, 480, 'PlayButton', this.onClickPlay, this, null, null, null, null);
	_playButton.scale.setTo(1.5, 1.5);

	// Add rules button
	var _rulesButton = this.add.button(160, 672, 'RulesButton', this.onClickRules, this, null, null, null, null);
	_rulesButton.scale.setTo(1.5, 1.5);
};


// on click play button, proceed to play screen
StartScreen.prototype.onClickPlay = function()
{
	this.state.start('play');
};

//on click rules button, proceed to rules screen
StartScreen.prototype.onClickRules = function()
{
	this.state.start('rules');
};
