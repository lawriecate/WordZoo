
//'use strict';
lion.PreloadState = function(){

  this.asset = null;
  this.ready = false;
}

lion.PreloadState.prototype = {

preload: function() {
    //Allows game to scale when window is resized
        //Allows game to scale when window is resized (currently broken)
    //this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    // 

    
    /*this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    this.game.scale.updateLayout();*/

    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignVertically = true;
    this.scale.pageAlignHorizontally = true;
    this.scale.updateLayout(true);

    //Load in assets
    this.load.image('mainMenu', 'assets/MainMenu.png');

    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5,0.5);
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);

    this.load.image('difficultyBackground', 'assets/difficultyBackground.png');
    this.load.image('rulesMenu', 'assets/rulesMenu.png');
    this.load.image('playButton', 'assets/play.png');
    this.load.image('rulesButton', 'assets/rules.png');
    this.load.image('playAgainButton', 'assets/playAgain.png');
    this.load.image('moreGamesButton', 'assets/moreGames.png');
    this.load.image('mediumButton', 'assets/medium.png');
    this.load.image('hardButton', 'assets/hard.png');
    this.load.image('veryHardButton', 'assets/veryHard.png');
    this.load.image('playButton', 'assets/play.png');
    this.load.image('menuButton', 'assets/mainMenu.png');
    this.load.image('okButton', 'assets/ok.png');
    this.load.image('scoreDisplay', 'assets/score.png');
    this.load.image('wordDisplay', 'assets/score.png');
    this.load.image('selectDifficulty', 'assets/selectDifficulty.png');
    this.load.image('unlucky', 'assets/Unlucky.png');



  //loading background image
  this.game.load.image('background', 'assets/background/football_Background.png');

  //loading button image
  this.game.load.spritesheet('button', 'assets/button/button.png', 200, 75);

  //loading soccer ball image
  this.game.load.spritesheet('soccer_ball', 'assets/soccer_ball.png', 110, 100,4);

  //loading goalkeeper image
  this.game.load.image('goalkeeper', 'assets/goalkeeper_center.png');

  //loading goalkeeper top left dive image
  this.game.load.spritesheet('goalkeeper_top_left', 'assets/top_left.png',480, 300,4);

  //loading goalkeeper top right dive image
 this.game.load.spritesheet('goalkeeper_top_right', 'assets/top_right.png', 480, 300, 4);

  //loading goalkeeper bottom right dive image
  this.game.load.spritesheet('goalkeeper_bottom_right', 'assets/bottom_right.png', 480, 300, 4);

  //loading goalkeeper bottom left dive image
  this.game.load.spritesheet('goalkeeper_bottom_left', 'assets/bottom_left_dive.png', 480, 300, 4);

  this.game.load.image('score_background', 'assets/score_background.png');
  },
  
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  } 

};



