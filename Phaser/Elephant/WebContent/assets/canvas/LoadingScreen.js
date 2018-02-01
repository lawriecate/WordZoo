
/**
 * LoadingScreen.
 */
function LoadingScreen() {
	
	Phaser.State.call(this);
	
}

/** @type Phaser.State */
var LoadingScreen_proto = Object.create(Phaser.State.prototype);
LoadingScreen.prototype = LoadingScreen_proto;
LoadingScreen.prototype.constructor = LoadingScreen;

LoadingScreen.prototype.init = function () {
	
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.scale.pageAlignHorizontally = true;
	this.scale.pageAlignVertically = true;
	this.stage.backgroundColor = '#ffffff';
	
};

LoadingScreen.prototype.preload = function () {
	
	this.load.pack('loadingScreen', 'assets/pack.json');
	
};

LoadingScreen.prototype.create = function () {
	var _background = this.add.sprite(0, 0, 'background');
	_background.scale.setTo(1.5, 1.5);
	
	var _preloader = this.add.sprite(704, 864, 'preloader');
	_preloader.scale.setTo(2.5, 2.5);
};



//request words/data from server
LoadingScreen.prototype.requestData = function() 
{
	console.log('request data');

	// request data
		// on return -> this.saveData();
};

// when data returned from server -> save it
LoadingScreen.prototype.saveData = function() 
{
	console.log('save data');

	// record data

	this.moveToMenu();
};

// move to menu screen after data is saved
LoadingScreen.prototype.moveToMenu = function() 
{
	console.log('move menu');

//	this.state.start('start');
};