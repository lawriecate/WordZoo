/**
@author G52GRP - GAIL - #326704
@license 
@overview MenuState is where all user is given option of reading rules or playing game
**/

//variable for giraffe
var giraffe = giraffe || {};

//defines MenuState as a function
giraffe.MenuState = function () {};

//Allow main.js to inherit properties from methods in prototype
giraffe.MenuState.prototype = {

  //Create function adds background and rules buttons to the menu page
  create: function() {
    this.background = this.game.add.sprite(0,0, 'menuBackground');
    this.rules = this.game.add.button(200,325, 'rulesButton', this.rulesClick, this);
    this.difficulty = this.game.add.button(200,175, 'playButton', this.difficultyClick, this);
  },
    //rulesClick function handles event if rules button is clicked
  rulesClick: function(){

    //start rules state
    this.game.state.start('rules');
  },
  
//diffcultyClick function handles event if difficulty button is clicked  
  difficultyClick: function(){

    //start difficulty state;
    this.game.state.start('difficulty');
  },
  
  update: function() {
  }
};