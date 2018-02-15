//global variables
var photo = photo|| {};  


	// *Second*		Giraffe		Owl			Octopus		Zebra		Panda		Sheep		Lion 		Elephant 		*First*
var sizeTable = [	[[177,0],	[257,0],	[265,0],	[255,85],	[220,-12],	[295,0],	[308,64],	[302,33]],	// 	Giraffe 
					[[257,0],	[257,0],	[347,0],	[315,0],	[250,0],	[320,0],	[335,40],	[350,32]],	//	Owl
					
					[[305,0],	[335,0],	[427,16],	[315,-71],	[330,-28],	[387,-48],	[365,-104],	[340,-100]],// 	Octopus
					[[220,-32],	[225,-36],	[327,-28],	[234,-28],	[247,-48],	[310,-89],	[263,-72],	[272,-56]],	// 	Zebra

					[[240,20],	[250,12],	[320,8],	[386,18],	[280,0],	[345,0],	[315,0],	[330,0]],	// 	Panda
					[[240,20],	[266,20],	[360,22],	[265,-40],	[295,0],	[240,0],	[270,45],	[323,51]],	// 	Sheep

					[[207,-32],	[225,-36],	[330,4],	[222,-48],	[260,-56],	[302,-52],	[325,0],	[245,-76]],	// 	Lion
					[[247,-4],	[267,8],	[363,-20],	[311,-104],	[275,0],	[346,0],	[373,28],	[337,0]]	// 	Elephant
				];


// Starting Y values for rows
var startingYValues = [	[400],
						[300, 500],
						[200, 400, 600],
						[150, 300, 450, 600]
				];




// Class data (array of character settings)
var inputData;
var inputDataIndex;
var classData;





// Data
var data =  [0,0,2,0,2,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,2,2,0,0,0,2,0,0,0,0,0,0,0,0, "123456789"];
var data2 = [0,0,2,0,2,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,2,2,0,0,0,0,2,0,0,0,0,0,0,0, "123456789"];
var data3 = [0,0,2,0,2,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,2,0,0,0,0,0,0, "123456789"];
var data4 = [0,0,2,0,2,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,2,0,0,0,0,0, "123456789"];
var data5 = [0,0,2,0,2,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,2,0,0,0, "123456789"];
var data6 = [0,0,2,0,2,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,2,0,0, "123456789"];
var data7 = [0,0,2,0,2,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,2,0, "123456789"];
var data8 = [0,0,2,0,2,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,2, "123456789"];

//Cheats:
//var data = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
//Big Cheats:
//var data = [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2];






// text fonts
var smallStyle = {font: "bold 50px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
var bigStyle = {font: "bold 120px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };


	
window.onload = function()
{
	// Create game
	var game = new Phaser.Game(1920, 1080, Phaser.AUTO);

			// Add states
			game.state.add('loading', LoadingScreen);
			game.state.add('play', PlayScreen);

			// Show loading screen
			game.state.start('loading');																// ******* CHANGED FOR TESTING *******
/*
	$.get('http://localhost:1337/student/testdata', function(data)
	{
		//console.log("GET" + data);
		groupWords = data;

			// Multiple inputs
		// playerName = data;


	}).fail(function() {
		console.log('i failed');
	});

	$.post('http://localhost:1337/student/savedata',{gamename:'Quiz'}, function(data)
	{
		// Log returned data
		//console.log("POST" + data);

		// Start game
		game.state.start('play');
	});*/
};