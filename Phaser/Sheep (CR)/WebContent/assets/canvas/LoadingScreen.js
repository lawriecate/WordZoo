// Global variables
var timeCounter;
var timeoutPoint = 15;

var _timeoutMessage;
var _preloader;


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
	this.load.pack('startScreen', 'http://localhost:1337/sheepgame/assets/pack.json');
};

LoadingScreen.prototype.create = function ()
{
	var _background = this.add.sprite(0, 0, 'background');
	_background.scale.setTo(1.5, 1.5);

	_preloader = this.add.sprite(704, 864, 'preloader');
	_preloader.scale.setTo(2.5, 2.5);

	_timeoutMessage = this.add.sprite(500, 500, 'timeoutMessage');
	_timeoutMessage.visible = false;


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
		// Hide loader + show timeout message
		_preloader.visible = false;
		_timeoutMessage.visible = true;
	}
	// If have shown message for 2 seconds
	else if(timeCounter > (timeoutPoint + 2))
	{
		// Exit
	}


	// increase time
	timeCounter++;

	// log counter
	console.log('Timeout in '+(timeoutPoint - timeCounter));
};
