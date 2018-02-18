// Global variables
var owl = owl || {};


// Game words
var words = ["Apple", "Bear", "Bird", "Boat", "Book", "Car", "Cheese", "Cone", "Dog", "Hat"];

// Record word answers
	// for each word -> [(string/null) incorrectSelectedWord, (bool) pickedCorrectly, (int - ms) timeTaken]
var wordHistory = [];
var gameStartTime;
var startTime;
	
// Record click history
	// [(int) x, (int) y, (UTCString) timeStamp]
var clickHistory = [];
var gameStartTime;

// Correct word index
var correctWordIndex;


// Health
var startingHealth = 5;
var playerHealth;
var opponentHealth;


// Text style
var biggerStyle = {font: "bold 120px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };



window.onload = function()
{
	// Create game
	var game = new Phaser.Game(1920, 1080, Phaser.AUTO);

			// Add states
			game.state.add('loading', LoadingScreen);
			game.state.add('start', StartScreen);
			game.state.add('rules', RulesScreen);
			game.state.add('play', Level);
			game.state.add('finish', FinishScreen);

			// Show loading screen
			game.state.start('start');
/*
	$.get('http://localhost:1337/student/testdata', function(data)
	{
		//console.log("GET" + data);
		words = data;

			// Multiple inputs
		// groupWords = data[0];
		// startingCoins = data[1];


	}).fail(function() {
		console.log('i failed');
	});

	$.post('http://localhost:1337/student/savedata',{gamename:'The Owl Game'}, function(data)
	{
		// Log returned data
		//console.log("POST" + data);

		// Start game
		game.state.start('start');
	});*/
};