//global variables
var character = character|| {};


// Boolean -> is level loaded
var levelLoaded = false;

$.get('/student/profile',function(profile) {
	username = profile.name;
	totalMoney = profile.points;
	data = profile.character;
});

// Username
var username = "Lalalalalalaal";

// Coins
var totalMoney = 250;

// Data
var data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//Cheats:
//var data = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
//Big Cheats:
//var data = [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2];




var style = {font: "bold 40px Arial", fill: "#ff9933", boundsAlignH: "center", boundsAlignV: "middle" };




window.onload = function()
{
	var game = new Phaser.Game(1050, 570, Phaser.CANVAS, 'character');

	// Add the States
	game.state.add("Loading", LoadingScreen);
	game.state.add("Level", Level);


	// Show loading screen
	// *** NOT LEVEL ***
	game.state.start("Level");
/*
	$.get('http://localhost:1337/student/testdata', function(info)
	{
		//console.log("GET" + info);

			// Multiple inputs
		// username = info[0];
		// totalMoney = info[1];
		// data = info[2]


	}).fail(function() {
		console.log('i failed');
	});

	$.post('http://localhost:1337/student/savedata',{gamename:'Character'}, function(info)
	{
		// Log info
		//console.log("POST" + info);





		// Wait until level is loaded
		while(1)
		{
			if(levelLoaded)
			{
				// Start Level
				game.state.start("Level");
			}
		}
	});*/
};
