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
	var game = new Phaser.Game(1920, 1080, Phaser.AUTO);

	// Add the States your game has.
	game.state.add("Start", StartScreen);
	game.state.add("Rules", RulesScreen);
	game.state.add("Level", Level);
	game.state.add("Finish", FinishScreen);

	game.state.start("Start");
};
