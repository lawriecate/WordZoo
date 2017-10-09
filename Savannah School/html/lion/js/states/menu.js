var lion = lion || {};

lion.MenuState = function () {};

lion.MenuState.prototype = {
 preload: function() {
  },
  create: function() {
    this.background = this.game.add.sprite(0,0, 'mainMenu');
    this.rules = this.game.add.button(200,325, 'rulesButton', this.rulesClick, this);
    this.difficulty = this.game.add.button(200,175, 'playButton', this.difficultyClick, this);
  },

  rulesClick: function(){
    //rules button click handler 
    //start the 'rules' state
  this.game.state.start('rules');
     },
  difficultyClick: function(){
  this.game.add.text(300,300,'difficulty is clicked');
    //difficulty button click handler
  //start button;
  this.game.state.start('difficulty');
  },
  update: function() {
  }
};