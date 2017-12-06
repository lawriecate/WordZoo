	//global variables
	var giraffe = giraffe|| {}; 

	// --------------------------------------------
	// *** To be pulled from server not static ***
	// --------------------------------------------
	//word bank
	var matchingWords =  [["A1","A2"],["B1","B2"],["C1","C2"],["D1","D2"]];

	var randomWords = 	["Bench","Brain","Bread","Broccoli","Cage","Cannon",
	            		"Castle","Chair","Clock","Crayon","Desk","Donkey",
	            		"Feather","Fireman","Flag","Football","Grape","Guitar",
	         			"Heart","Island","Jumper","Mouse","Notebook","Owl",
	         			"Pear","Police","Rabbit","Rake","Soap","Squirrel"];

	
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
	
	
	// background scroll
	var backgroundScroll;
	var backgroundDistance;
	var backgroundScrollSpeed = 50;

	//giraffe walking
	var background;
	var giraffe;
	//var giraffeFalling;
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
	var playerLanePositionsX = [-150,180,475,790,1100,1410,1725];
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