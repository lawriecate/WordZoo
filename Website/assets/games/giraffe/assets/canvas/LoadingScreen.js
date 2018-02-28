// Global variables
var giraffe = giraffe|| {};

var timeCounter;
var timeoutPoint = 15;

var _timeoutMessage;
var _preloader;


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
	this.load.pack('startScreen', '/games/giraffe/assets/pack.json');
};

LoadingScreen.prototype.create = function ()
{
	var _background = this.add.sprite(0, 0, 'background');

	// preloader + animation
	var _preloader = this.game.add.sprite(965,880,'preloader',0);
	_preloader.anchor.setTo(0.5, 0.5);

	// preloader animation
 	var _preloaderAni = _preloader.animations.add('preloader',
 		[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],30,true);
	_preloaderAni.play();


	// Time (record timeout)
	var timer = this.time.create(false);
	timer.loop(Phaser.Timer.SECOND, this.updateTime, this);
	timeCounter = 0;
	timer.start();


	// Get random words
	var context = this;
	$.get('/student/getWords', function(data)
	{
		var baseWords = data;
		console.log("Base words: "+baseWords);
		var temp = baseWords[0];
		console.log("Temp "+temp);

		// Get matching pair
		$.post('/student/getMatchingPair', {wordsIn:temp},function(data)
		{
			// Record matching pair
			var returnWords = data;
			console.log("Return words: "+returnWords);


			// Assign to thingy
			//for(var i=0; i<10; i++)
			//{
			//	matchingWords[i][0] = baseWords[i];
			//	matchingWords[i][1] = returnWords[i];
			//}


			//console.log("matchingWords");
			//console.log(matchingWords);


			// Move to play state
			//context.state.start('play');
		}
			).fail(function()
		{
			console.log('i failed');
		});
	}
		).fail(function()
	{
		console.log('i failed');
	});
};



// record time on this menu, if too big -> show timeout message + exit
LoadingScreen.prototype.updateTime = function ()
{
	// If reached timeout point, show error
	if(timeCounter > timeoutPoint)
	{
		// Exit
		this.state.start('start');
	}


	// increase time
	timeCounter++;

	// log counter
	console.log('Timeout in '+(timeoutPoint - timeCounter));
};