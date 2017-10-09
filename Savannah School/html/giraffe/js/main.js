/**
@author G52GRP - GAIL - #326704
@license 
@overview mainState is where all states are added to the Giraffe game.  
All variables are also defined here and behave as global variables and 
can be called from any state.
**/
var giraffe = giraffe|| {}

//Define Variables

//Define variables for background
var background;
var backgroundMoving = false;
var backgroundMoved = 0;

// Define variables for player 
var playerLanePositionsY = [90,225,360,495];
var playerLanePositionsX = [49,244,449,644,849,1044];
var player;
var playerDeath;

//Define variabels for lane 
var currentLaneY = 1;
var currentLaneX = 0;
var lanes;
var riverLanes = new Array(6);
var wordWinnerPosition = new Array();

//Define score variables
var scoreText;
var score;
var styleScoreText;

//Define words variables
var words = new Array();
var numWords = 0;
var synonymWord;
var currentSynonyms = new Array();
var wordPositionsY = [252,382,517,647];
var numAnswers = 0; 

//Define stone variables
var stoneSetIndexes = [0,4,8,12];
var winningStone = new Array(4);
var styleStoneText;

//Define winner variables
var wordWinnerText;
var chosenWord;
var failedWord;
var wordList = new Array();

//Define time variables
var initialTime;
var spawnTime;
var responseTimes = new Array();
var numResponses = 0;
var averageResponseTime;

giraffe.game = new Phaser.Game(1280, 720, Phaser.CANVAS, 'Giraffegame');

 //Add Game States
  giraffe.game.state.add("boot", giraffe.BootState);
  giraffe.game.state.add("difficulty", giraffe.DifficultyState);
  giraffe.game.state.add("gameover", giraffe.GameoverState);
  giraffe.game.state.add('menu', giraffe.MenuState);
  giraffe.game.state.add('play', giraffe.PlayState);
  giraffe.game.state.add("preload", giraffe.PreloadState);
  giraffe.game.state.add('rules', giraffe.RulesState);
  
  //Start Boot state
  giraffe.game.state.start('boot');