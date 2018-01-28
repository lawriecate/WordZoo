
/**
 * LoadingScreen.
 */
function LoadingScreen() 
{	
	Phaser.State.call(this);
}

/** @type Phaser.State */
var LoadingScreen_proto = Object.create(Phaser.State.prototype);
LoadingScreen.prototype = LoadingScreen_proto;
LoadingScreen.prototype.constructor = LoadingScreen;

LoadingScreen.prototype.init = function () 
{	
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.scale.pageAlignHorizontally = true;
	this.scale.pageAlignVertically = true;
	this.stage.backgroundColor = '#ffffff';
};

LoadingScreen.prototype.preload = function () 
{	
	this.load.pack('startScreen', 'assets/pack.json');	
};

LoadingScreen.prototype.create = function () 
{
	var _background = this.add.sprite(0, 0, 'background');
	_background.scale.setTo(1.5, 1.5);
	
	var _preloader = this.add.sprite(704, 864, 'preloader');
	_preloader.scale.setTo(2.5, 2.5);
};