	//global variables
	var lion = lion|| {}; 

	//word bank
	var index = 0;
	var words = 	["apple","bear","car","day","eye","fox",
	            	"golf","hotel","igloo","jam","kite","lolly",
	            	"moose","nose","octopus","pot","quest","rice",
	         	"seat","table","unicorn","violin","wax"];
	
	// letters to add
	var letters = ['a','e','i','o','u'];
	
	// correct word
	var correctWord;
	var correctLocation = "";
	
	// lives
	var lives = 3;
	
	// score
	var score = 0;
	var scoreText = "";
	
	// time
	var time = 60;
	var timeText = "";

	// timer
	var timer;
	
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
	
	
	
window.onload = function() {
	
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