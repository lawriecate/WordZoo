// Global variables
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
	var counter = 0;
	var context = this;
	var cword;

	// Get main words
	$.get('/student/getWords', function(data)
	{
		words = data;
		console.log(words);


			// *** 1st ***
			matchingWords[0][0] = words[0];
			cword = words[0];

			// Get matching pair
			$.get('/student/getMatchingPair', function(cword,data)
			{
				// Record matching pair
				matchingWords[0][1] = data


				// *** 2nd ***
				matchingWords[1][0] = words[1];
				cword = words[1];

				// Get matching pair
				$.get('/student/getMatchingPair', function(cword,data)
				{
					// Record matching pair
					matchingWords[1][1] = data


					// *** 3rd ***
					matchingWords[2][0] = words[2];
					cword = words[2];

					// Get matching pair
					$.get('/student/getMatchingPair', function(cword,data)
					{
						// Record matching pair
						matchingWords[2][1] = data


						// *** 4th ***
						matchingWords[3][0] = words[3];
						cword = words[3];

						// Get matching pair
						$.get('/student/getMatchingPair', function(cword,data)
						{
							// Record matching pair
							matchingWords[3][1] = data


							// *** 5th ***
							matchingWords[4][0] = words[4];
							cword = words[4];

							// Get matching pair
							$.get('/student/getMatchingPair', function(cword,data)
							{
								// Record matching pair
								matchingWords[4][1] = data


								// *** 6th ***
								matchingWords[5][0] = words[5];
								cword = words[5];

								// Get matching pair
								$.get('/student/getMatchingPair', function(cword,data)
								{
									// Record matching pair
									matchingWords[5][1] = data


									// *** 7th ***
									matchingWords[6][0] = words[6];
									cword = words[6];

									// Get matching pair
									$.get('/student/getMatchingPair', function(cword,data)
									{
										// Record matching pair
										matchingWords[6][1] = data


										// *** 8th ***
										matchingWords[7][0] = words[7];
										cword = words[7];

										// Get matching pair
										$.get('/student/getMatchingPair', function(cword,data)
										{
											// Record matching pair
											matchingWords[7][1] = data


											// *** 9th ***
											matchingWords[8][0] = words[8];
											cword = words[8];

											// Get matching pair
											$.get('/student/getMatchingPair', function(cword,data)
											{
												// Record matching pair
												matchingWords[8][1] = data


												// *** 10th ***
												matchingWords[9][0] = words[9];
												cword = words[9];

												// Get matching pair
												$.get('/student/getMatchingPair', function(cword,data)
												{
													// Record matching pair
													matchingWords[9][1] = data


													console.log("matchingWords");
													console.log(matchingWords);


													// All complete move to play state
													context.state.start('play');

												}
													).fail(function()
												{
													console.log('i failed @ 10');
												});
											}
												).fail(function()
											{
												console.log('i failed @ 9');
											});
										}
											).fail(function()
										{
											console.log('i failed @ 8');
										});
									}
										).fail(function()
									{
										console.log('i failed @ 7');
									});
								}
									).fail(function()
								{
									console.log('i failed @ 6');
								});
							}
								).fail(function()
							{
								console.log('i failed @ 5');
							});
						}
							).fail(function()
						{
							console.log('i failed @ 4');
						});
					}
						).fail(function()
					{
						console.log('i failed @ 3');
					});
				}
					).fail(function()
				{
					console.log('i failed @ 2');
				});
			}
				).fail(function()
			{
				console.log('i failed @ 1');
			});
		}
	}
		).fail(function()
	{
		console.log('i failed @ main');
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