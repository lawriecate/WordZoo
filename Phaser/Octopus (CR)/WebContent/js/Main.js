//global variables
var octopus = octopus|| {}; 


// Words
var words = ["Apple", "Bear", "Bird", "Boat", "Book", "Car", "Cheese", "Cone", "Dog", "Hat"];



//Game assets
var game;
var assets;
var dragItem;
var dragging;
var _pizza;

//current order
var order;
var orderText;
var strikes;
var toppings;

//Clock params
var clock;
var initialTime;
var timeAllowed = 60;

//Score
var score = 0;
var scoreText;

var remainingItems;



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
			game.state.start('loading');

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

	$.post('http://localhost:1337/student/savedata',{gamename:'The Octopus Game'}, function(data)
	{
		// Log returned data
		//console.log("POST" + data);

		// Start game
		game.state.start('start');
	});
};