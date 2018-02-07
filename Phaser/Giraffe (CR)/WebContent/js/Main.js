	//global variables
	var giraffe = giraffe|| {}; 


	//word bank
	var matchingWords =  	[["A1","A2"],["B1","B2"],["C1","C2"],["D1","D2"],
							["E1","E2"],["F1","F2"],["G1","G2"],["H1","H2"],
							["I1","I2"],["J1","J2"],["K1","K2"],["L1","L2"]];
							
	
	// Record word answers
		// [(string) targetWord, (string/null) incorrectSelectedWord, (bool) pickedCorrectly, (int - ms) timeTaken]
	var wordHistory = [];
	var numWordHistory;
	var startTime;

	// Record click history
		// [(int) x, (int) y, (UTCString) timeStamp]
	var clickHistory = [];
	var numClickHistory;
	var startTime;
	var gameStartTime;
	
	// input lock
	var inputLock;
	
	// background scroll
	var backgroundScroll;
	var backgroundDistance;
	var backgroundScrollSpeed = 50;

	//giraffe walking
	var background;
	var giraffe;
	var giraffeFalling;
	var giraffeWalking;
	var giraffeWalk0, giraffeWalk1, giraffeWalk2;

	//current coloumn of play
	var currentColoumn;

	
	//define words on stones
	var wordA0, wordA1, wordA2, wordA3,
		wordB0, wordB1, wordB2, wordB3,
		wordC0, wordC1, wordC2, wordC3;

	//define buttons on stones
	var buttonA0, buttonA1, buttonA2, buttonA3,
		buttonB0, buttonB1, buttonB2, buttonB3,
		buttonC0, buttonC1, buttonC2, buttonC3;


	//define coloumn headings + text
	var titleA, titleB, titleC;
	var titleTextA, titleTextB, titleTextC;


	//Define lane variables 
	var itemLanePositions = [378,573,775,970];
	var playerLanePositionsX = [0,330,625,940,1250,1560,1875];
	var playerLanePositionsY = [135,338,540,743];
	

	//Define winner variables
	var correctLane = [0, 0, 0];
	var currentLane;

	var wordsOnStones = [['0,0', '0,1', '0,2', '0,3'],['1,0', '1,1', '1,2', '1,3'],['2,0', '2,1', '2,2', '0,3']];
	var setwords;
	var clickedWord;
	
	// score
	var score;
	var scoreText = "";
	
	// lives
	var startingLives = 3;
	var livesLeft;
	var livesBox;
	
	// time
	var timeCounter = 3000; // 60 seconds * backgroundScrollSpeed
	var timeLeft;
	var timeText = "";

	// timer
	var timer;
	
	// Text styles
	var smallStyle = {font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
	var medStyle = {font: "bold 50px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
	var bigStyle = {font: "bold 60px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
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

	$.post('http://localhost:1337/student/savedata',{gamename:'The Giraffe Game'}, function(data)
	{
		// Log returned data
		//console.log("POST" + data);

		// Start game
		game.state.start('start');
	});*/
};