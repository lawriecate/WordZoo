//global variables
var character = character|| {};


// Boolean -> is level loaded
var levelLoaded = false;



// Username
var username = "Lalalalalalaal";

// Coins
var totalMoney = 0;

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

	$.get('/student/profile',function(profile) {
		username = profile.name;
		totalMoney = profile.points;
		if(profile.character !== null) {
			//Remove the [ ] characters 
			//temp = profile.character;
			//temp.replace('[','');
			//temp.replace(']','');
			//console.log("Testing: Removed [] " + temp);
			//temp = profile.character.split(",")
			data = profile.character;
		} 
		console.log(data);
		
		//data = profile.character;
	
		game.state.start("Level");
	});

	// Show loading screen
	// *** NOT LEVEL ***
	game.state.start("Loading");
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
