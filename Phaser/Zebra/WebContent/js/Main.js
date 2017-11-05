	//global variables
	var zebra = zebra|| {}; 

	// --------------------------------------------
	// *** To be pulled from server not static ***
	// --------------------------------------------
	//word bank
	var words = 	["Bench","Brain","Bread","Broccoli","Cage","Cannon",
	            	"Castle","Chair","Clock","Crayon","Desk","Donkey",
	            	"Feather","Fireman","Flag","Football","Grape","Guitar",
	         		"Heart","Island","Jumper","Mouse","Notebook","Owl",
	         		"Pear","Police","Rabbit","Rake","Soap","Squirrel"];
	
	//zebra walking
	var background;
	var zebraWalk;

	
	//define items
	var item0, item1, item2;

	//Define lane variables 
	var itemLanePositions = [525, 675, 825];
	//var takenItems;
	//var itemWinnerLane;
	var playerLanePositions = [412, 562, 712];
	var currentLane = 0;
	var chosenWords = ['', '', ''];
	var failedWords = ['', '', ''];
	
	
	//Define arrow buttons
	var upArrow;
	var downArrow;
	var rightArrow;


	//Define winner variables
	var correctLane;
	var correctName;
	var correctItemText;
	var incorrectItem1;
	var incorrectItem2;

	//Define difficulty variables
	var speed;
	
	// score
	var score;
	var scoreText = "";
	
	// lives
	var livesLeft;
	var livesBox;
	
	// time
	var time = 60;
	var timeText = "";

	// timer
	var timer;
	
	// Text styles
	 var style = {font: "bold 28px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

	
	
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