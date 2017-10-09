//global variables
var lion = lion|| {}; 


// if next word is true = spawn new word, else don't
var nextWord = true;

var incorrect = false;
var resultTextTweenCompleted;
var ballTweenCompleted;

//word bank
var wordBank = new Array();
var incorrectWords = new Array();

//availble letters to add
var letterBank = ['p','e','o','i','a','u'];

//correct word
var correct_button;
var correct_word;
var chosenWords;
var failedWords;

//score text
var scoreText;

//score
var score = 0;

var resultText1;
var resultText2;

//We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
var button_text_0;
var button_text_1;
var button_text_2;
var button_text_3;

var top_left_button;
var top_right_button;
var bottom_left_button;
var bottom_right_button;

//soccer ball
var soccer_ball;

//style for the score text
var style_score_text;

//boolean for has the ball completed rolling
var ball_rolled_complete = false;

//ball spin speed
var ball_spin_speed = 7;

//kick ball speed
var kick_ball_speed = 500;

//roll ball speed
var roll_ball_speed = 2000;

//goalkeeper sprite
var goalkeeper;

//goalkeeper to dive top left sprite
var goalkeeper_top_left;

//goalkeeper to dive top right sprite
var goalkeeper_top_right;

//goalkeeper to dive bottom left
var goalkeeper_bottom_left;

//goalkeeper to dive bottom right
var goalkeeper_bottom_right;

//goalkeeper animations
var goalkeeper_dive;

//goalkeeper dive speed
var goalkeeper_dive_speed = 5;

//Time & word variables
var numResponses;
var responseTimes = new Array();
var averageResponseTime;
var spawnTime; 
var initialTime;
var chosenWords;
var failedWords;
var timeRemaining;
var timeAllowed = 60;


lion.game = new Phaser.Game(1280, 720, Phaser.CANVAS, 'LionGame');
 //Add Game States
  lion.game.state.add("boot", lion.BootState);
  lion.game.state.add("difficulty", lion.DifficultyState);
  lion.game.state.add("gameover", lion.GameoverState);
  lion.game.state.add('menu', lion.MenuState);
  lion.game.state.add('play', lion.PlayState);
  lion.game.state.add("preload", lion.PreloadState);
  lion.game.state.add('rules', lion.RulesState);
  //Start Boot state
  
  

  lion.game.state.start('boot');