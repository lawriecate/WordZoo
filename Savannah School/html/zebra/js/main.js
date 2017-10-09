
/**
@author G52GRP - GAIL - #326704
@license 
@overview mainState is where all states are added to the Zebra game.  
All variables are also defined here and behave as global variables and 
can be called from any state.
**/
var zebra = zebra || {};

//Define Variables

//Define variables for score 
var scoreText;
var score;
var updateText;

//define items
var item0, item1, item2
var itemNames = new Array();
var filePath = new Array();

//Define lane variables 
var itemLanePositions = [350, 450, 550];
var takenItems;
var itemWinnerLane;
var playerLanePositions = [275, 375, 475];
var currentLane = 1;
var chosenWords = ['', '', ''];
var failedWords = ['', '', ''];
var raceTrack;
var player;

//Define winner variables
var winnerName;
var winnerItemText;
var incorrectItemName1;
var incorrectItemName2;

//Define difficulty variables
var difficulty;
var diffcultyString;
var speed = 5;

//Used for swipe features
var startPoint, endPoint;

zebra.game = new Phaser.Game(1280, 720, Phaser.CANVAS, 'Zebragame');

//Add Game States
zebra.game.state.add("boot", zebra.BootState);
zebra.game.state.add("difficulty", zebra.DifficultyState);
zebra.game.state.add("gameover", zebra.GameoverState);
zebra.game.state.add('menu', zebra.MenuState);
zebra.game.state.add('play', zebra.PlayState);
zebra.game.state.add("preload", zebra.PreloadState);
zebra.game.state.add('rules', zebra.RulesState);

//Start Boot state
zebra.game.state.start('boot');