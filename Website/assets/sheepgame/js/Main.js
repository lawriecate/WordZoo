//global variables
var sheep = sheep|| {};

// --------------------------------------------
// *** To be pulled from server not static ***
// --------------------------------------------



//word groups
var groupWords = 	[["A1","A2","A3","A4","A5","A6","A7","A8"],
					["B1","B2","B3","B4","B5","B6","B7","B8"],
					["C1","C2","C3","C4","C5","C6","C7","C8"],
					["Cat","Hat","Mat","Vat","Pat","Bat","Fat"]];

//word bank
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
var startingTime = 5;
var timeText = "";

// timer
var timer;

// Text styles
var smallStyle = {font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
var medStyle = {font: "bold 45px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
var bigStyle = {font: "bold 100px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };


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
			game.state.start('loading');

	$.get('http://localhost:1337/student/te2stdata', function(data)
	{
		console.log("GET" + data);
		groupWords = data;

			// Multiple inputs
		// groupWords = data[0];
		// startingCoins = data[1];


	});

	$.post('http://localhost:1337/student/s2avedata',{gamename:'The Sheep Game'}, function(data)
	{
		// Log returned data
		console.log("POST" + data);

		// Start game
		game.state.start('start');
	});
};
