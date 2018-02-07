	//global variables
	var elephant = elephant|| {}; 

	// --------------------------------------------
	// *** To be pulled from server not static ***
	// --------------------------------------------
	//word bank
	var matchingWords = [['Apple','Apple'],['Bear','Bear'],['Bird','Bird'],['Boat','Boat'],['Book','Book'],
						['Car','Car'],['Cheese','Cheese'],['Cone','Cone'],['Dog','Dog'],['Hat','Hat']];

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
	var gameStartTime;
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
			game.state.start('start');																// ******* CHANGED FOR TESTING *******
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

	$.post('http://localhost:1337/student/savedata',{gamename:'The Elephant Game'}, function(data)
	{
		// Log returned data
		//console.log("POST" + data);

		// Start game
		game.state.start('start');
	});*/
};