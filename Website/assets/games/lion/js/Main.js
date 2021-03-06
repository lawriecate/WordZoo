	//global variables
	var lion = lion|| {}; 

	//word bank
	var words = 	["Apple","Bear","Car","Day","Eye","Fox",
	            	"Golf","Hotel","Igloo","Jam","Kite","Lolly",
	            	"Moose","Nose","Octopus","Pot","Quest","Rice",
	         		"Seat","Table","Unicorn","Violin","Wax"];

	// Record word answers
		// for each word -> [(string/null) incorrectSelectedWord, (bool) pickedCorrectly, (int - ms) timeTaken]
	var wordHistory = [];
	var gameStartTime;
	var startTime;
	
	// Record click history
		// [(int) x, (int) y, (UTCString) timeStamp]
	var clickHistory = [];
	var gameStartTime;


	// image
	var imageExample;

	// raw text of each button
	var TLraw;
	var TRraw;
	var BLraw;
	var BRraw;
	
	// correct word
	var correctWordIndex; 
	var correctWord;
	var correctLocation = "";
	
	// score
	var score = 0;
	var scoreText = "";
	
	// lives
	var startingLives = 3;
	var livesLeft;
	var livesBox;
	
	// time
	var startingTime = 45;
	var timeLeft;
	var timeText = "";

	// timer
	var timer;
	
	// Text styles
	var style = {font: "bold 40px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
	var biggerStyle = {font: "bold 120px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };


	// buttons
	var topLeft;
	var topRight;
	var bottomLeft;
	var bottomRight;

	// buttons text
	var TLtext;
	var TRtext;
	var BLtext;
	var BRtext;
	
	// preSet
	var preSetNum = 0;
	var preSet1 = "";
	var preSet2 = "";
	
	// goal keepers
	var GK_Mid;
	var GK_TL;
	var GK_TR;
	var GK_BL;
	var GK_BR;
	
	// goal keeper dives
	var GK_TL_Dive;
	var GK_TR_Dive;
	var GK_BL_Dive;
	var GK_BR_Dive;

	// football + animations
	var football;
	var footballSpin;
	var footballRollIn;

	// football tween
	var footballTL1;
	var footballTL2;
	var footballTR1;
	var footballTR2;
	var footballBL1;
	var footballBL2;
	var footballBR1;
	var footballBR2;


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