//global variables
var sheep = sheep|| {};


//word groups
var groupWords;


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
var startingTime = 40;
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
};