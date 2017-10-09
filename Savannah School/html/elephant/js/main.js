
/**
@author G52GRP - GAIL - #326704
@license 
@overview mainState is where all states are added to the Elephant game.  
All variables are also defined here and behave as global variables and 
can be called from any state.
**/
//
var elephant = elephant || {}

//Define variables

//Define variables for score
var scoreText;
var timeText;
var score;

//Define items 
var item0, item1, item2;
var easel1, easel2, easel3;
var itemNames = new Array();
var filePath = new Array();

//Define lane variables 
var itemPositions = [80, 370, 665];
var takenItems;
var takenPositions;
var laneLayout = new Array();
var itemWinnerPosition;

//Define winner variables 
var rhymingWord;
var winnerItemName;
var winnerItemText;
var chosenItems;
var failedItems;
var clickedEasel;

//Used for time
var timer;
var timeAllowed;
var responseTimes;
var numResponses;
var spawnTime;
var averageResponseTime;

elephant.game = new Phaser.Game(1280, 720, Phaser.CANVAS, 'ElephantGame');

//Add Game States
elephant.game.state.add("boot", elephant.BootState);
elephant.game.state.add("difficulty", elephant.DifficultyState);
elephant.game.state.add("gameover", elephant.GameoverState);
elephant.game.state.add('menu', elephant.MenuState);
elephant.game.state.add('play', elephant.PlayState);
elephant.game.state.add("preload", elephant.PreloadState);
elephant.game.state.add('rules', elephant.RulesState);
elephant.game.state.add('restart', elephant.RestartState);

//Start Boot state 
elephant.game.state.start('boot');