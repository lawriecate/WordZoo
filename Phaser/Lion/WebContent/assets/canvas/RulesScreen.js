
// -- user code here --

/* --- start generated code --- */

// Generated by Phaser Editor v1.4.2 (Phaser v2.6.2)


/**
 * RulesScreen.
 */
function RulesScreen() {
	
	Phaser.State.call(this);
	
}

/** @type Phaser.State */
var RulesScreen_proto = Object.create(Phaser.State.prototype);
RulesScreen.prototype = RulesScreen_proto;
RulesScreen.prototype.constructor = RulesScreen;

RulesScreen.prototype.init = function () {
	
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.scale.pageAlignHorizontally = true;
	this.scale.pageAlignVertically = true;
	this.stage.backgroundColor = '#ffffff';
	
};

RulesScreen.prototype.preload = function () {
	
	this.load.pack('RulesScreen', 'assets/pack.json');
	
};

RulesScreen.prototype.create = function () {
	var _rulesMenu = this.add.sprite(-1, -1, 'rulesMenu');
	_rulesMenu.scale.setTo(1.51, 1.51);
	
	var _okButton = this.add.button(800, 865, 'okButton', onClickOK, this, null, null, null, null);
	_okButton.scale.setTo(1.75, 1.75);
	
	
	// On click OK button, return to start screen
	function onClickOK () {
		this.state.start('start');
	}
	
};

/* --- end generated code --- */

// onClickStart
RulesScreen.prototype.onClickStart = function() 
{
	//game.state.start("Start");
};




// HelloWorld for *Testing*
RulesScreen.prototype.addHelloWorldText = function() 
{
	this.add.text(100, 100, "hello world!");
};
