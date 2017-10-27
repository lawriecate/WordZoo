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
	this.load.pack('RulesScreen', 'assets/pack.json');	
};

RulesScreen.prototype.create = function () 
{
	// Add background
	var _rulesMenu = this.add.sprite(-1, -1, 'rulesMenu');
	_rulesMenu.scale.setTo(1.51, 1.51);

	// Add OK button
	var _okButton = this.add.button(800, 865, 'okButton', this.onClickOK, this, null, null, null, null);
	_okButton.scale.setTo(1.75, 1.75);
};


// On click OK button, return to start screen
RulesScreen.prototype.onClickOK = function() 
{
	this.state.start('start');
};