// Global variables
var owl = owl || {};


// Game words
var words = ["Apple", "Bear", "Bird", "Boat", "Book", "Car", "Cheese", "Cone", "Dog", "Hat"];

// Record word answers
	// [(string) targetWord, (string/null) incorrectSelectedWord, (bool) pickedCorrectly, (int - ms) timeTaken]
var wordHistory = [];
var numWordHistory;

// Record click history
	// [(int) x, (int) y, (UTCString) timeStamp]
var clickHistory = [];
var numClickHistory;
var startTime;
var gameStartTime;










window.onload = function() {
	var game = new Phaser.Game(1920, 1080, Phaser.AUTO);

	// Add the States your game has.
	game.state.add("start", StartScreen);
	game.state.add("rules", RulesScreen);
	game.state.add("level", Level);
	game.state.add("finish", FinishScreen);

	game.state.start("start");
};
