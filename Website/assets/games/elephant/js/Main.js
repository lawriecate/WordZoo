//global variables
var elephant = elephant|| {};


//word bank
var testWords = 	[["ant","ant"],["bear","bear"],["bird","bird"],["boat","boat"],["book","book"],
					["car","car"],["chess","chess"],["cone","cone"],["dog","dog"],["hat","hat"]];
var matchingWords = [["ant","ant"],["bear","bear"],["bird","bird"],["boat","boat"],["book","book"],
					["car","car"],["chess","chess"],["cone","cone"],["dog","dog"],["hat","hat"]];



// define items
var easel1, easel2, easel3;

// correct word vales
var matchingRandom; // Correct word index
var winningLane;
var winnerItemText;
var winnerText;
var item0Text;
var item1Text;
var item2Text;

// Record word answers
	// for each word -> [(string/null) incorrectSelectedWord, (bool) pickedCorrectly, (int - ms) timeTaken]
var wordHistory = [];
var gameStartTime;
var startTime;

// Record click history
	// [(int) x, (int) y, (UTCString) timeStamp]
var clickHistory = [];
var gameStartTime;

// score
var score;
var scoreText = "";

// item positioning
var first = [220,350];
var second = [665,350];
var third = [1110,350];

// lives
var startingLives = 3;
var livesLeft;
var livesBox;

// time
var startingTime = 30;//60;
var timeLeft;
var timeText = "";

// timer
var timer;

// Text styles
var medStyle = {font: "bold 50px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
var bigStyle = {font: "bold 80px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
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
};
