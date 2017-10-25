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
	
	// score
	var score = 0;
	var scoreText = "";
	
	// lives
	var livesBox;
	
	// time
	var time = 10;
	var timeText = "";

	// timer
	var timer;
	
	// Text styles
	 var style = {font: "bold 28px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
	
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

	// football + animation
	var football;
	var footballRollIn;
	
	
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