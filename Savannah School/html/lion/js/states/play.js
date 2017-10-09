/**
@author G52GRP - GAIL - #326704
@license 
@overview PlayState responsible for playing the game,
          this includes the importing of words depending on which difficulty is clicked and
          the creation of buttons and animations.`
**/


var lion = lion || {};

lion.PlayState = function() {};


lion.PlayState.prototype = {

/**
create is the initial load of the game for the PlayState which is responsible for:
  - adding buttons
  - hiding buttons on initial load
  - creating football sprite and its animations
  - creating dive sprite and animations
  - creating goalkeeper sprite
  - creating styles for in game text
  - creating initial score text
  - creating initial timer text
  - initialising variables that require to be reset when the game is replayed.

@method hideButtons, topLeftButtonPressed, topRightButtonPressed, bottomLeftButtonPressed, bottomRightButtonPressed, game.
**/
create: function() {
  //creating background sprites
 var background = this.game.add.tileSprite(0,0, 1280, 720,'background');

 //creating buttons // x = 230, 830, 230, 830, y = 100, 100, 385, 385
 top_left_button = this.game.add.button(350, 90, 'button', this.topLeftButtonPressed, this, 0,0,0);
 top_right_button = this.game.add.button(730, 90, 'button', this.topRightButtonPressed, this, 0,0,0);
 bottom_left_button = this.game.add.button(350, 395, 'button', this.bottomLeftButtonPressed, this, 0,0,0);
 bottom_right_button = this.game.add.button(730, 395, 'button', this.bottomRightButtonPressed, this, 0,0,0);
 this.hideButtons(false);

 //creating soccer ball sprite and animation
 soccer_ball = this.game.add.sprite(-100,575,'soccer_ball',0);
 var soccer_ball_roll = soccer_ball.animations.add('spin');

 //sets text styles
 var style = {font: "bold 28px Arial", boundsAlignH: "center", boundsAlignV: "middle" };
 var style_score_text = {font: "bold 28px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

 //creating goalkeeper sprite
 goalkeeper = this.game.add.sprite(500,220,'goalkeeper');

 //creating goalkeeper diving top left sprite
 goalkeeper_top_left = this.game.add.sprite(260,120,'goalkeeper_top_left',0);
 goalkeeper_top_left.visible = false;

 //creating goalkeeper diving top left sprite
 goalkeeper_top_right = this.game.add.sprite(560,120,'goalkeeper_top_right',0);
 goalkeeper_top_right.visible = false;

 //creating goalkeeper diving bottom left sprite
 goalkeeper_bottom_left = this.game.add.sprite(260,195,'goalkeeper_bottom_left',0);
 goalkeeper_bottom_left.visible = false;

 //creating goalkeeper diving bottom right sprite
 goalkeeper_bottom_right = this.game.add.sprite(560,195,'goalkeeper_bottom_right',0);
 goalkeeper_bottom_right.visible = false;

 //creating goalkeepr top left movement
 goalkeeper_dive_top_left = goalkeeper_top_left.animations.add('dive_top_left', [1,2,3]);
 goalkeeper_top_left.animations.currentAnim.onComplete.add(function () { goalkeeper_top_left.animations.frame = 0; }, this);

 //creating goalkeepr top right movement
 goalkeeper_dive_top_right = goalkeeper_top_right.animations.add('dive_top_right',[1,2,3]);
 goalkeeper_top_right.animations.currentAnim.onComplete.add(function () { goalkeeper_top_right.animations.frame = 0; }, this);

 //creating goalkeeper bottom left movement
 goalkeeper_dive_bottom_left = goalkeeper_bottom_left.animations.add('dive_bottom_left',[2,1,0]);
 goalkeeper_bottom_left.animations.currentAnim.onComplete.add(function () { goalkeeper_bottom_left.animations.frame = 0; }, this);

 //creating goalkeeper bottom right movement
 goalkeeper_dive_bottom_right = goalkeeper_bottom_right.animations.add('dive_bottom_right',[1,2,3]);
 goalkeeper_bottom_right.animations.currentAnim.onComplete.add(function () { goalkeeper_bottom_right.animations.frame = 0; }, this);

  //assign style and default values to buttons x = 250, 850, 250, 850. y = 120, 120, 405, 405
  button_text_0 = this.game.add.text(370,110,"",style);
  button_text_0.setTextBounds(0, 0, 160, 35);
  button_text_1 = this.game.add.text(750, 110,"",style);
  button_text_1.setTextBounds(0,0, 160, 35);
  button_text_2 = this.game.add.text(370,415,"",style);
  button_text_2.setTextBounds(0, 0, 160, 35);
  button_text_3 = this.game.add.text(750,415,"",style);
  button_text_3.setTextBounds(0, 0, 160, 35);

  //initial score text
  this.game.add.sprite(10,10,'score_background');
  scoreText = this.game.add.text(30,30, "Score: 0",style_score_text);
  scoreText.setTextBounds(0,0,110,40);

  this.game.add.sprite(1120,10,'score_background');
  initialTime = Math.floor(this.game.time.time / 1000);
  timer = this.game.add.text(1140,30, initialTime,style_score_text);
  timer.setTextBounds(0,0,110,40);

  score = 0;
  ball_rolled_complete = false;
  nextWord = true;
  correct_button;
  resultTextTweenCompleted = false;
  ballTweenCompleted = false;
  numResponses = 0;
  chosenWords = "";
  failedWords = "";
},

/**
update function updates the game regularly for the game to play that is responsible for:
  - resets the ball off the screen to play the initial ball roll
  - plays the initial ball roll tween 
  - checking if the game is in the state that requires a new set of words to be spawned
  - updates game timer
  - updates average response time of user

@method game, changeBallRolledCompleteToTrue, spawnWords, gameOver
**/
update: function() {
  
  //checks if a new word needs to be spawned in
  if(!ball_rolled_complete){
    resultTextTweenCompleted = false;
    ballTweenCompleted = false;
    ball_rolled_complete = "started_to_roll";
    soccer_ball.x = -100;
    soccer_ball.y = 575;
    soccer_ball.play('spin',ball_spin_speed,true);
    var roll = this.game.add.tween(soccer_ball).to( { x: '+690' }, roll_ball_speed, Phaser.Easing.Linear.None, true);
    roll.onComplete.add(this.changeBallRolledCompleteToTrue, this);
  }

  if(ball_rolled_complete == true){
    ball_rolled_complete = "ball_rolled_complete";
    this.spawnWords();
  }

  var timeRemaining = Math.floor((timeAllowed - ((this.game.time.time / 1000) - initialTime)));
  timer.text = "Time: " + timeRemaining;
  if(timeRemaining <= 0) {
      var sum = 0;
        for(i = 0; i < responseTimes.length; i++) {
      sum += responseTimes[i];
    }
    averageResponseTime = sum/responseTimes.length;
        this.gameOver();
   }

},

/**
stopDiveAnimations is responsible for stopping all four goalkeeper animations:

**/
stopDiveAnimations: function (){
  goalkeeper_top_left.animations.stop();
  goalkeeper_top_right.animations.stop();
  goalkeeper_bottom_left.animations.stop();
  goalkeeper_bottom_right.animations.stop(true);
},
  
/**
hideDives is responsible for making all four goalkeeper dive sprite invisible and makes the centre goalkeeper sprite visible:
**/
hideDives: function (){
  goalkeeper_top_left.visible = false;
  goalkeeper_top_right.visible = false;
  goalkeeper_bottom_left.visible = false;
  goalkeeper_bottom_right.visible = false;
  goalkeeper.visible = true;
},

/**
changeBallRolledCompleteToTrue is responsible for confirming that the ball has completed rolling from the left hand side of the screen and stops ball animation
**/
changeBallRolledCompleteToTrue: function (){
  ball_rolled_complete = true;
  soccer_ball.animations.stop(null,true);
  //this.stopDiveAnimations();
  //this.hideDives();
},

/**
penaltyResultTextTweenComplete is responsible for 
- confirming that the result text tween has completed
- calling the completePenalty function to see if the penalty can be completed

@method completePenalty 
**/
penaltyResultTextTweenComplete: function (){
  resultTextTweenCompleted = true;
  this.completePenalty();
},

/**
ballTweenComplete is responsible for 
- confirming that the ball tween has completed after a user has selected a word (button),
- if the above is true this function will stop ball animations 
- calls the completePenalty function to see if the penalty can be completed

@method completePenalty
**/
ballTweenComplete: function (){
  soccer_ball.animations.stop(null,true);
  ballTweenCompleted = true;
  this.completePenalty();
},

/**
completePenalty is responsible for:
  - confirming that a penalty has been completed by checking if the result text tween and the ball tween has completed
  - if the above line is true this function will reset the game for another penalty to be taken

@method stopDiveAnimations, resetButtonsText, hideDives
**/
completePenalty: function (){
  if(resultTextTweenCompleted && ballTweenCompleted){
    this.stopDiveAnimations();
    this.resetButtonsText();
    this.hideDives();
    ball_rolled_complete = false;
  }
},

/**
createPenaltyResultText is responsible for
- generating two penalty result text
- adding the tweens for both penaly result text

@method game, penaltyResulttextTweenComplete
**/
createPenaltyResultText: function(text) {
  resultText1 = this.game.add.text(40, 280, text, {font: "bold 70px Arial",fill: "#ffffff"});
  resultText2 = this.game.add.text(1000, 280, text, {font: "bold 70px Arial",fill: "#ffffff"});     
  
  var resultTextTween1 = this.game.add.tween(resultText1).to({y: '-200'}, 1500, Phaser.Easing.Linear.None, true);
  var resultTextTween2 = this.game.add.tween(resultText2).to({y: '-200'}, 1500, Phaser.Easing.Linear.None, true);
  this.game.add.tween(resultText1).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
  this.game.add.tween(resultText2).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
  resultText1.setTextBounds(0, 0, 240, 40);
  resultText2.setTextBounds(0, 0, 240, 40);
  resultTextTween1.onComplete.add(this.penaltyResultTextTweenComplete, this);
  resultTextTween2.onComplete.add(this.penaltyResultTextTweenComplete, this);

},

/**
ballTween is responsible for:
- creating the ball tweens
- playing ball animations

@method game and the function that is passed in the parameter complete.

@parameter xTween String Example format: '+100' Description: sets the x coordinate to tween to for the ball
@parameter yTween String Example format: '+100' Description: sets the y coordinate to tween to for the ball
@parameter complete String Example format: 'this.ballTweenComplete' Description: sets the function to call when the ball tween is completed
@parameter ballSpin Int Example format: '5' Description: sets the frame rate/speed of the ball animation.
**/
ballTween: function (xTween,yTween,complete,ballSpin){
  if(xTween != '0' && yTween != '0'){
    var tween = this.game.add.tween(soccer_ball).to( { x: xTween }, kick_ball_speed, Phaser.Easing.Linear.None, true);
    this.game.add.tween(soccer_ball).to( { y: yTween }, kick_ball_speed, Phaser.Easing.Linear.None, true);
    soccer_ball.play('spin',ballSpin, true);
    tween.onComplete.add(complete, this);
  } else if(yTween == '0'){
    var tween = this.game.add.tween(soccer_ball).to( { x: xTween }, kick_ball_speed, Phaser.Easing.Linear.None, true);
    soccer_ball.play('spin',ballSpin, true);
    tween.onComplete.add(complete, this);
  } else {
    var tween = this.game.add.tween(soccer_ball).to( { y: yTween }, kick_ball_speed, Phaser.Easing.Linear.None, true);
    soccer_ball.play('spin',ballSpin, true);
    tween.onComplete.add(complete, this);
  }
},

/**
bounceUpTween is responsible for:
- calling the ballTween function to make the ball bounce up when a goal is scored

@method this.ballTween
**/
bounceUpTween: function(){
  this.ballTween('0', '-40', this.bounceDownTween, 1);
},

/**
bounceDownTween is responsible for:
- calling the ballTween function to make the ball bounce down after the bounceUpTween

@method this.ballTween
**/
bounceDownTween: function(){
  this.ballTween('0', '+40', this.ballTweenComplete, 1);
},

/**
topLeftButtonPressed has the responsiblity for:
- checks if the ball has completed its roll is so
  - requesting a ball tween to the top left corner of the goal
  - recording response time
  - reporting which button was pressed

@method game, evaluateDecision, ballTween
**/
topLeftButtonPressed: function (){
  if(ball_rolled_complete == "ball_rolled_complete"){
    responseTimes[numResponses] = (this.game.time.time) / 1000 - spawnTime;
    numResponses++;
    this.evaluateDecision(0);

    //ball tweens from (x = 590, y = 575) to (x = 350, y = 150)
    this.ballTween('-240','-425',this.decisionTopLeftButton,ball_spin_speed);
  }
},

/**
decisionTopLeftButton is responsible for:
- checking if the player selected the correct button or not
- if incorrect this function will request a ball tween where the ball is pushed away for a save
- if correct this function will request a ball bounce down from the top left corner of the goal

@method ballTween
**/
decisionTopLeftButton: function (){
  if(incorrect){
    this.ballTween('-450','-150',this.ballTweenComplete,ball_spin_speed);
  } else {
    this.ballTween('0','+220',this.bounceUpTween,ball_spin_speed);
  }
},

/**
topRightButtonPressed has the responsiblity for:
- checks if the ball has completed its roll is so
  - requesting a ball tween to the top right corner of the goal
  - recording response time
  - reporting which button was pressed

@method game, evaluateDecision, ballTween
**/
topRightButtonPressed: function (){
  if(ball_rolled_complete == "ball_rolled_complete"){
    responseTimes[numResponses] = (this.game.time.time) / 1000 - spawnTime;
    numResponses++;
    this.evaluateDecision(1);

    //ball tweens from (x = 590, y = 575) to (x = 830, y = 150)
    this.ballTween('+240','-425',this.decisionTopRightButton,ball_spin_speed);
  }
},

/**
decisionTopRightButton is responsible for:
- checking if the player selected the correct button or not
- if incorrect this function will request a ball tween where the ball is pushed away for a save
- if correct this function will request a ball bounce down from the top right corner of the goal

@method ballTween
**/
decisionTopRightButton: function (){
  if(incorrect){
    this.ballTween('+450','-150',this.ballTweenComplete,ball_spin_speed);
  } else {
    this.ballTween('0','+220',this.bounceUpTween,ball_spin_speed);
  }
},

/**
bottomLeftButtonPressed has the responsiblity for:
- checks if the ball has completed its roll is so
  - requesting a ball tween to the top left corner of the goal
  - recording response time
  - reporting which button was pressed

@method game, evaluateDecision, ballTween
**/
bottomLeftButtonPressed: function (){
  if(ball_rolled_complete == "ball_rolled_complete"){
    responseTimes[numResponses] = (this.game.time.time) / 1000 - spawnTime;
    numResponses++;
    this.evaluateDecision(2);

    //ball tweens from (x = 590, y = 575) to (x = 350, y = 375)
    this.ballTween('-240','-200',this.decisionBottomLeftButton,ball_spin_speed);
  }
},

/**
decisionBottomLeftButton is responsible for:
- checking if the player selected the correct button or not
- if incorrect this function will request a ball tween where the ball is pushed away for a save
- if correct this function will call the ballTweenComplete function to confirm that all ball tweens have been completed.

@method ballTween, ballTweenComplete
**/
decisionBottomLeftButton: function (){
  if(incorrect){
    this.ballTween('-450','0',this.ballTweenComplete,ball_spin_speed);
  } else {
    this.ballTweenComplete();
  }
},

/**
bottomRightButtonPressed has the responsiblity for:
- checks if the ball has completed its roll is so
  - requesting a ball tween to the top left corner of the goal
  - recording response time
  - reporting which button was pressed

@method game, evaluateDecision, ballTween
**/
bottomRightButtonPressed: function (){
  if(ball_rolled_complete == "ball_rolled_complete"){
    responseTimes[numResponses] = (this.game.time.time) / 1000 - spawnTime;
    numResponses++;
    this.evaluateDecision(3);  

    //ball tweens from (x = 590, y = 575) to (x = 830, y = 375)
    this.ballTween('+240','-200',this.decisionBottomRightButton,ball_spin_speed);
  }
},

/**
decisionBottomLeftButton is responsible for:
- checking if the player selected the correct button or not
- if incorrect this function will request a ball tween where the ball is pushed away for a save
- if correct this function will call the ballTweenComplete function to confirm that all ball tweens have been completed.

@method ballTween, ballTweenComplete
**/
decisionBottomRightButton: function (){
  if(incorrect){
    this.ballTween('+450','0',this.ballTweenComplete,ball_spin_speed);
  } else {
    this.ballTweenComplete();
  }
},

/**
evaluateDecision is responsible for:
- receiving the button selected
- hides buttons
- resets text to blank
- hides goalkeeper
- ensure ball is the infront sprite
- seeing whether the button selected is the correct choice
- updates score text, adds goal text and adds a incorrect dive if button selected is correct
- updates failedWords and chosenWords, add save text and adds dive to save the ball if button selected is incorrect

@method game, hideButtons, reset_buttons, dive, createPenaltyResultText

@parameter buttonNumberSelected Int , Example format: 1 , Description: represents the button number that was selected  
**/
evaluateDecision: function(buttonNumberSelected){
  this.game.world.bringToTop(soccer_ball);
  goalkeeper.visible = false;
  this.hideButtons(false);
  this.resetButtonsText();
  ball_rolled_complete = "kicked";

  if(buttonNumberSelected == correct_button){
    incorrect = false;
    this.dive(this.incorrectDive(buttonNumberSelected));
    this.createPenaltyResultText("GOAL!");
    score++;
    scoreText.text = "Score: " + score;
  } else {
    incorrect = true;
    this.createPenaltyResultText("SAVE!");
    failedWords = failedWords.concat(correct_word + "@");
    chosenWords = chosenWords.concat(incorrectWords[buttonNumberSelected] + "@");
    this.dive(buttonNumberSelected);
  }
},

/**
dive is responsible for: 
- setting the requested goalkeeper sprite to visible
- playing the requested goalkeeper sprite animation.

@parameter buttonNumberSelected Int , Example format: 1 , Description: represents the button number that was selected 
**/
dive: function (buttonNumberSelected){
  switch(buttonNumberSelected){
    case(0):
      goalkeeper_top_left.visible = true;
      goalkeeper_top_left.play('dive_top_left',goalkeeper_dive_speed,false);
    break;
    case(1):
      goalkeeper_top_right.visible = true;
      goalkeeper_top_right.play('dive_top_right',goalkeeper_dive_speed,false);
    break;
    case(2):
      goalkeeper_bottom_left.visible = true;
      goalkeeper_bottom_left.play('dive_bottom_left', goalkeeper_dive_speed,false);
    break;
    case(3):
      goalkeeper_bottom_right.visible = true;
      goalkeeper_bottom_right.play('dive_bottom_right', goalkeeper_dive_speed,false);
    break;
  }
  return;
},

/**
incorrectDive is responsible for:
- selecting a dive animation that dives in the opposite direction of the selected button 

@parameter buttonNumberSelected Int , Example format: 1 , Description: represents the button number that was selected

@return Int , Example format: 3 , Description: represents the button number of the dive to select.
**/
incorrectDive: function (buttonNumberSelected){
  if(buttonNumberSelected == 0 || buttonNumberSelected == 2){
    return(3);
  } else {
    return(2);
  }
},

/**
resetButtonsText is responsible for:
- reseting each of the buttons text to ""

**/
resetButtonsText: function (){
  button_text_0.text = "";
  button_text_1.text = "";
  button_text_2.text = "";
  button_text_3.text = "";
},

/**
spawnWords is responsible for:
- importing a correct word
- creating 3 incorrect spelling of the correct word
- adding correct word and the 3 incorrect words on the the 4 button texts at random.
- requests that button are visible

@method selectCorrectWordPosition, generateRandomLetter, generateButtonNumber, game, hideButtons

**/
spawnWords: function (){
  //set next word to true as word will be spawned
  nextWord = false;

  //array of taken buttons
  takenButtons = [false, false, false, false];

  //array of used letters
  letters_taken = [false,false,false,false,false,false];

  //winner word
  var number = Math.floor((Math.random() * wordBank.length) + 0);
  correct_word = String(wordBank[number]);
  var lengthOfCorrectWord = correct_word.length;

  symbolPositionsUsed = new Array(lengthOfCorrectWord);

  incorrectWords = new Array(4);
  var symbolPosition1 = this.selectCorrectWordPosition(lengthOfCorrectWord);
  incorrectWords[this.generateButtonNumber()] = [correct_word.slice(0, symbolPosition1), letterBank[this.generateRandomLetter()], correct_word.slice(symbolPosition1)].join('');
  var symbolPosition2 = this.selectCorrectWordPosition(lengthOfCorrectWord);
  incorrectWords[this.generateButtonNumber()] = [correct_word.slice(0, symbolPosition2), letterBank[this.generateRandomLetter()], correct_word.slice(symbolPosition2)].join('');
  var symbolPosition3 = this.selectCorrectWordPosition(lengthOfCorrectWord);
  incorrectWords[this.generateButtonNumber()] = [correct_word.slice(0, symbolPosition3), letterBank[this.generateRandomLetter()], correct_word.slice(symbolPosition3)].join('');
  correct_button = this.generateButtonNumber();
  incorrectWords[correct_button] = correct_word;
  
  button_text_0.text = "" + incorrectWords[0];
  button_text_1.text = "" + incorrectWords[1];
  button_text_2.text = "" + incorrectWords[2];
  button_text_3.text = "" + incorrectWords[3];
  
  spawnTime = this.game.time.time / 1000;
  this.hideButtons(true);
},

/**
generateButtonNumber is responsible for:
- randomly selects a button number (for the words generated in the spawnWords function to be added to)
- ensures that there is no duplicates

@return selectedButton Int Example format: 2 Description: the button number for words generated in the spawnWords function to be added to
**/
generateButtonNumber: function (){
  var selectedButton = Math.floor((Math.random() * 4) + 0);
  while(takenButtons[selectedButton]){
    selectedButton = Math.floor((Math.random() * 4) + 0);
  }
  takenButtons[selectedButton] = true;
  return selectedButton;
},

/**
generateRandomLetter is responsible for:
- randomly selects a letter (to added into correct word to create an incorrect word performed in the spawnWords function )
- ensures that there is no duplicates

@return selectedLetter Int Example format: 2 Description: the letter index position in the letters_taken array for the letter to be located.
**/
generateRandomLetter: function(){
  var selectedLetter = Math.floor((Math.random() * 6) + 0);
  while(letters_taken[selectedLetter]){
    selectedLetter = Math.floor((Math.random() * 6) + 0);
  }
  letters_taken[selectedLetter] = true;
  return selectedLetter;
},

/**
selectCorrectWordPosition is responsible for:
- randomly selects a position in the correct word for the spawnWords function
- ensures that there is no duplicates

@paramter Limit Int Example format: 6 Explanation: the size of the correct word 

@return selectedPosition Int Example format: 2 Description: the index position in the correct word (not in this fucntion) for a letter to be added into.
**/
selectCorrectWordPosition: function(limit){
  var selectedPosition = Math.floor((Math.random() * limit) + 0);
  while(symbolPositionsUsed[selectedPosition]){
    selectedPosition = Math.floor((Math.random() * limit) + 0);
  }
  symbolPositionsUsed[selectedPosition] = true;
  return selectedPosition;
},

/**
hideButtons is responsible for:
- setting the visiblity of each button

@parameter visibility , bool , Example format: true , Explanation: sets the visibility of each button to either true or false.

**/
hideButtons: function(visibility){
  top_left_button.visible = visibility;
  top_right_button.visible = visibility;
  bottom_left_button.visible = visibility;
  bottom_right_button.visible = visibility;
},

//gameOver State goes to game over state and resets all variables to zero
gameOver: function(){
    this.game.state.start('gameover');
  }
};