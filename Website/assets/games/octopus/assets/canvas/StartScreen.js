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
	this.load.pack('StartScreen', '/games/octopus/WebContent/assets/pack.json');
};

StartScreen.prototype.create = function ()
{
	// Add background
	var _background = this.add.sprite(0, 0, 'background', null);

	// Add back button
	var _buttonBackground = this.add.sprite(0, 733, 'ButtonBackground', null);

	// Add back button
	var _backButton = this.add.button(22, 912, 'BackButton', this.onClickBack, this, null, null, null, null);

	// Add play button
	var _playButton = this.add.button(616, 780, 'PlayButton', this.onClickPlay, this, null, null, null, null);

	// Add rules button
	var _rulesButton = this.add.button(1332, 912, 'RulesButton', this.onClickRules, this, null, null, null, null);
};


// on click back button
StartScreen.prototype.onClickBack = function()
{
	window.location.href = "/student";
}

// on click play button, proceed to play screen
StartScreen.prototype.onClickPlay = function()
{
	this.state.start('loading');
};

//on click rules button, proceed to rules screen
StartScreen.prototype.onClickRules = function()
{
	this.state.start('rules');
};
