// Global variables
var timeCounter;
var timeoutPoint = 15;


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
	this.load.pack('main', '/classphoto/assets/pack.json');
};

LoadingScreen.prototype.create = function ()
{
	var _background = this.add.sprite(0, 0, 'steppingStones');
	_background.scale.setTo(1.5, 1.5);

	// Title text
	var titleText = this.add.text(960, 80, "Class Photo", bigStyle);
	titleText.stroke = '#FF9933';
	titleText.strokeThickness = 15;	
	titleText.anchor.setTo(0.5, 0.5);
	titleText.addColor('#FFCE07', 0);	

	// preloader + animation
	var _preloader = this.add.sprite(960,800,'animals',0);
	_preloader.anchor.setTo(0.5, 0.5);

	// preloader animation
 	var _preloaderAni = _preloader.animations.add('preloader',
 		[0,1,2,3,4,5,6,7],2,true);
	_preloaderAni.play();

	// Time (record timeout)
	var timer = this.time.create(false);
	timer.loop(Phaser.Timer.SECOND, this.updateTime, this);
	timeCounter = 0;
	timer.start();
};



// record time on this menu, if too big -> show timeout message + exit
LoadingScreen.prototype.updateTime = function ()
{
	// If reached timeout point, show error
	if(timeCounter > timeoutPoint)
	{
		// Exit
		console.log('Exit');
	}

	// increase time
	timeCounter++;

	// log counter
	console.log('Timeout in '+(timeoutPoint - timeCounter));
};