//global variables
var sheep = sheep|| {};


//word groups
var groupWords = 	[["A1","A2","A3","A4","A5","A6","A7","A8"],
					["B1","B2","B3","B4","B5","B6","B7","B8"],
					["C1","C2","C3","C4","C5","C6","C7","C8"],
					["D1","D2","D3","D4","D5","D6","D7","D8"],
					["E1","E2","E3","E4","E5","E6","E7","E8"],
					["F1","F2","F3","F4","F5","F6","F7","F8"],
					["G1","G2","G3","G4","G5","G6","G7","G8"],
					["H1","H2","H3","H4","H5","H6","H7","H8"]];


// Record word answers
	// for each word -> [(string/null) incorrectSelectedWord, (bool) pickedCorrectly, (int - ms) timeTaken]
var wordHistory = [];
var gameStartTime;
var startTime;
	
// Record click history
	// [(int) x, (int) y, (UTCString) timeStamp]
var clickHistory = [];
var gameStartTime;

// Player coins
var startingCoins;
var earnedCoins;
var totalCoins;


// Correct word vales
var TLraw;
var TRraw;
var BLraw;
var BRraw;

// sheep + onDrag animation
var mainSheep;
var sheepWobble;
var dragging = false;

// sheep pens
var pens;


// Correct values
var correctWordIndex;
var correctPen;
var correctWordA;
var correctWordB;
var correctRow;

// Incorrect values
var incorrectWord1;
var incorrectWord2;
var incorrectWord3;

// screen text
var mainText;
var TRtext;
var TLtext;
var BRtext;
var BLtext;


// score
var score = 0;
var scoreText = "";

// lives
var startingLives = 3;
var livesLeft;
var livesBox;

// time
var timeLeft;
var startingTime = 30;
var timeText = "";

// timer
var timer;

// Text styles
var smallStyle = {font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
var medStyle = {font: "bold 45px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
var bigStyle = {font: "bold 100px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
var biggerStyle = {font: "bold 120px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };



window.onload = function()
{
	// Create game
	var game = new Phaser.Game(1920, 1080, Phaser.AUTO);

			// Add states
			game.state.add('loading', LoadingScreen);
			game.state.add('start', StartScreen);
			game.state.add('rules', RulesScreen);
			game.state.add('play', PlayScreen);
			game.state.add('finish', FinishScreen);

			// Show loading screen
			game.state.start('start');
/*
	$.get('http://localhost:1337/student/testdata', function(data)
	{
		//console.log("GET" + data);
		groupWords = data;

			// Multiple inputs
		// groupWords = data[0];
		// startingCoins = data[1];


	}).fail(function() {
		console.log('i failed');
	});

	$.post('http://localhost:1337/student/savedata',{gamename:'The Sheep Game'}, function(data)
	{
		// Log returned data
		//console.log("POST" + data);

		// Start game
		game.state.start('start');
	});*/
};