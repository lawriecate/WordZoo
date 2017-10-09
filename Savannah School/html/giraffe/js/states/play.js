var giraffe = giraffe || {};

giraffe.PlayState = function() {};


giraffe.PlayState.prototype = {

  create: function() {
  //Setup keyboard actions.
  background = this.game.add.tileSprite(0,0,1280,720,'playBackground');
  scoreDisplay = this.game.add.sprite(5,0,'scoreDisplay');
  synonymBack1 = this.game.add.sprite(170, 0, 'wordDisplay');
  synonymBack2 = this.game.add.sprite(565, 0, 'wordDisplay');
  synonymBack3 = this.game.add.sprite(975, 0, 'wordDisplay');
  this.game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(this.moveUp, this);
  this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(this.moveDown, this);
  this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(this.moveRight, this);

  //Setup touchscreen controls
  this.game.input.onDown.add(function(touchStart) { startPoint = touchStart.clientY;}, this);
  this.game.input.onUp.add(function(touchEnd) { endPointY = touchEnd.clientY; endPointX = touchEnd.clientX;
    if((startPoint - endPointY) > 100) {
      this.moveUp();
    } else if((endPointY - startPoint) > 100) {
      this.moveDown();
    } else if((endPointX - startPoint) > 10) {
      this.moveRight();
    }
  }, this);

  //setting variables to default so game can be replayed
  currentLaneY = 1;
  currentLaneX = 0;
  score = 0;

  styleStoneText = {font: "bold 32px Arial", boundsAlignH: "center", boundsAlignV: "middle", fill: "#fff" };
  styleScoreText = {font: '60px Arial', fill: "#ff9933"};
  scoreText = this.game.add.text(85,50, score, styleScoreText);
  scoreText.anchor.setTo(0.5);

  this.wordSpawn(1, 310);
  this.wordSpawn(3, 705);
  this.wordSpawn(5, 1115);

  player = this.game.add.sprite(playerLanePositionsX[0], playerLanePositionsY[1], 'player', 0);
  playerDeath = this.game.add.sprite(0,0,'playerFailAnimation', 0);
  playerDeath.animations.add('anim', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 12, true);
  playerDeath.visible = false; 

  //If user closes window, score is still recorded
  window.onbeforeunload = function() {
    this.gameOver();
  }

  //Calls the death animation
  playerDeath.events.onAnimationComplete.add(this.gameOver, this);
  
  //Setup timer
  initialTime = Math.floor(this.game.time.time / 1000);
},

update: function(){
  this.game.world.bringToTop(scoreDisplay);
  this.game.world.bringToTop(scoreText);
  
  if(backgroundMoving){

    for(var i = 0; i<words.length; i++) {
      words[i].x -= 10;
    }

    background.tilePosition.x -= 10;
    backgroundMoved += 10;
    synonymBack1.x -= 10;
    synonymBack2.x -= 10;
    synonymBack3.x -= 10;

    if(backgroundMoved > 175 && backgroundMoved < 420){
      player.x += 2; 
    } else {
      player.x -= 10;
    }

    switch(backgroundMoved) {
      case 370:   synonymBack1.kill();
        synonymBack1 = this.game.add.sprite(1075, 0, 'wordDisplay');
        this.wordSpawn(1, 1210);
        break;
      case 770:   synonymBack2.kill();
        synonymBack2 = this.game.add.sprite(1075, 0, 'wordDisplay');
        this.wordSpawn(3, 1210);
        break;
      case 1180:  synonymBack3.kill();
        synonymBack3 = this.game.add.sprite(1075, 0, 'wordDisplay');
        this.wordSpawn(5, 1210);
        break;
      case 1280:  backgroundMoving = false;
        backgroundMoved = 0;
        this.game.world.bringToTop(player);
        break;
    }
  }
},

 resetVariable: function(varToReset){
  if(varToReset != 3){
    return (varToReset + 1);
  } else {
    return 0;
  }
},
//Handles key presses.
 moveUp: function(){
  if(currentLaneY != 0 && !(currentLaneX % 2) && !(backgroundMoving)) {
    currentLaneY--;
    player.y = playerLanePositionsY[currentLaneY];
  }
},

 moveDown: function(){
  if(currentLaneY != 3 && ! (currentLaneX % 2) && !(backgroundMoving)) {
    currentLaneY++;
    player.y = playerLanePositionsY[currentLaneY];
  }
},

 moveRight: function(){ 

  if(! backgroundMoving){
    
    currentLaneX++;
    if(currentLaneX == 6){
      currentLaneX = 0;
      backgroundMoving = true;
    } else {
      player.x = playerLanePositionsX[currentLaneX];
    }

    if(currentLaneX % 2){
      responseTimes[numResponses] = (this.game.time.time) / 1000 - spawnTime;
      numResponses++;
      if(currentLaneY == wordWinnerPosition[currentLaneX]){
        this.createCorrectText();
        this.createUpdateScoreText();
        score++;
        scoreText.text = score;
      }else{
        this.game.input.keyboard.removeKey(Phaser.Keyboard.RIGHT);
        playerDeath.x = player.x - 100;
        playerDeath.y = player.y;
        player.kill();
        playerDeath.visible = true;
        this.game.world.bringToTop(playerDeath);
        playerDeath.animations.play('anim', 10, false);
     }
    } else {
      spawnTime = this.game.time.time / 1000;
    }

}
},

 wordSpawn: function(laneIndex, x){
  lanes = [false,false,false,false];
  
  //Get winning item
  wordWinnerPosition[laneIndex] = Math.floor(Math.random() * 4);
  wordWinnerText = wordList[Math.floor(Math.random() * wordList.length)];
  lanes[wordWinnerPosition[laneIndex]] = wordWinnerText;
  words[numWords++] = this.game.add.text(x, wordPositionsY[wordWinnerPosition[laneIndex]], wordWinnerText, styleStoneText);

  //Get synonym
  do{
    this.getSynonym();
  } while(currentSynonyms[0] == synonymWord || currentSynonyms[1] == synonymWord || currentSynonyms[2] == synonymWord);
  currentSynonyms[laneIndex] = synonymWord;
  words[numWords++] = this.game.add.text(x, 50, synonymWord, styleScoreText);
  
  //Generate 3 wrong words
  for(i = 0; i < 3; i++){
    do {
      var incorrectWord = wordList[Math.floor(Math.random() * wordList.length)];
      var incorrectLane = Math.floor(Math.random() * 4);
    } while(lanes[0] == incorrectWord || lanes[1] == incorrectWord || lanes[2] == incorrectWord || lanes[3] == incorrectWord || lanes[incorrectLane] != false);
    lanes[incorrectLane] = incorrectWord;
    words[numWords++] = this.game.add.text(x, wordPositionsY[incorrectLane], incorrectWord, styleStoneText);
  }
  
  spawnTime = this.game.time.time / 1000;
  
  for(var i = 0; i < words.length; i++) {
    words[i].anchor.setTo(0.5);
  }
  riverLanes[laneIndex] = lanes;
},

getSynonym: function() {
    $.ajax({
       method: 'get',
       url: 'php/synonymWord.php',
       dataType: 'json',
       async: false,
     data: {
      'word': String(wordWinnerText),
       },
       success: function(data) {       
      for(var i = 0; i<data.length; i++) {
         synonymWord = data;
      }
       },
    });
 },

//Used to generate and animate the update text on item pickups
createCorrectText: function() {
  correctText = this.game.add.text(playerLanePositionsX[currentLaneX], wordPositionsY[currentLaneY], "", {font: "bold 32px Arial",fill: "#00ff00"});    
  correctText.alpha = 1;
  correctText.text = "Correct!";
  this.game.add.tween(correctText).to({x: '-100'}, 1500, Phaser.Easing.Linear.None, true);
  this.game.add.tween(correctText).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
},

createUpdateScoreText: function() {
  updateScoreText = this.game.add.text(85,125, "", {font: "bold 32px Arial", fill: "#00ff00"});
  updateScoreText.anchor.setTo(0.5);    
  updateScoreText.alpha = 1;
  updateScoreText.text = "+ 1";
  this.game.add.tween(updateScoreText).to({y: '+100'}, 1500, Phaser.Easing.Linear.None, true);
  this.game.add.tween(updateScoreText).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
},

gameOver: function() {
  failedWord = String(currentSynonyms[currentLaneX]);
  chosenWord = String(riverLanes[currentLaneX][currentLaneY]);

  var sum = 0;
  for(i = 0; i < responseTimes.length; i++) {
   sum += responseTimes[i];
  }
  averageResponseTime = sum/responseTimes.length;
  this.game.state.start('gameover');
}
}; 