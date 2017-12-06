	//global variables
	var elephant = elephant|| {}; 

	// --------------------------------------------
	// *** To be pulled from server not static ***
	// --------------------------------------------
	//word bank
	var matchingWords = [['Hat','Hat'],['Boat','Boat'],['Cheese','Cheese']];
	var randomWords = ["Apple","Bear","Bird","Book","Car","Cone","Dog"];

	// define items
	var easel1, easel2, easel3;

	// correct word vales
	var winningLane;
	var winnerItemText;
	var winnerText;
	var item0Text;
	var item1Text;
	var item2Text;

	// Record word answers
		// [(string) targetWord, (string/null) incorrectSelectedWord, (bool) pickedCorrectly, (int - ms) timeTaken]
	var wordHistory = [];
	var numWordHistory;
	var startTime;
	
	// Record click history
		// [(int) x, (int) y, (UTCString) timeStamp]
	var clickHistory = [];
	var numClickHistory;
	var gameStartTime;
	
	// score
	var score;
	var scoreText = "";
	
	// lives
	var startingLives = 3;
	var livesLeft;
	var livesBox;
	
	// time
	var startingTime = 60;
	var timeLeft;
	var timeText = "";

	// timer
	var timer;
	
	// Text styles
	var smallStyle = {font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
	var medStyle = {font: "bold 50px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
	var bigStyle = {font: "bold 60px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
	
	
window.onload = function() 
{	
	// Create game
	var game = new Phaser.Game(1920, 1080, Phaser.AUTO);
	
	// Add states
	game.state.add('start', StartScreen);
	game.state.add('rules', RulesScreen);
	game.state.add('play', PlayScreen);
	game.state.add('finish', FinishScreen);
	
	// Start game
	game.state.start('start');
};