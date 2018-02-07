	//global variables
	var zebra = zebra|| {}; 


	//word bank
	var words = 	["Bench","Brain","Bread","Broccoli","Cage","Cannon",
	            	"Castle","Chair","Clock","Crayon","Desk","Donkey",
	            	"Feather","Fireman","Flag","Football","Grape","Guitar",
	         		"Heart","Island","Jumper","Mouse","Notebook","Owl",
	         		"Pear","Police","Rabbit","Rake","Soap","Squirrel"];
	
	// Record word answers
		// [(string) targetWord, (string/null) incorrectSelectedWord, (bool) pickedCorrectly, (int - ms) timeTaken]
	var wordHistory = [];
	var numWordHistory;
	var startTime;

	// Record text values
	var TOPraw;
	var MIDraw;
	var BOTraw;

	// Record click history
		// [(int) x, (int) y, (UTCString) timeStamp]
	var clickHistory = [];
	var numClickHistory;
	var startTime;
	var gameStartTime;


	//zebra walking
	var background;
	var zebraWalk;

	//touchscreen controls
	var startPoint;

	//define items
	var item0, item1, item2;

	//Define lane variables 
	var itemLanePositions = [525, 675, 825];
	var playerLanePositions = [412, 562, 712];
	var currentLane = 0;

	//Define winner variables
	var correctLane;
	var correctName;
	var correctItemText;

	//Define difficulty variables
	var speed = 5;
	var normalSpeed;
	var currentSpeed;
	
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
	var medStyle = {font: "bold 38px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
	var bigStyle = {font: "bold 45px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
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

	$.post('http://localhost:1337/student/savedata',{gamename:'The Zebra Game'}, function(data)
	{
		// Log returned data
		//console.log("POST" + data);

		// Start game
		game.state.start('start');
	});*/
};