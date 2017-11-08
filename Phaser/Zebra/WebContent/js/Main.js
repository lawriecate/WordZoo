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
	var playerLanePositions = [412, 562, 712];
	var currentLane = 0;
	
	//Define arrow buttons
	var upArrow;
	var downArrow;
	var rightArrow;
	var upArrowText;
	var downArrowText;
	var rightArrowText;

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
	var time = 60;
	var timeText = "";

	// timer
	var timer;
	
	// Text styles
	var smallStyle = {font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
	var medStyle = {font: "bold 38px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
	var bigStyle = {font: "bold 45px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
	
	
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