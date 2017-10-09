
/**
@author G52GRP - GAIL - #326704
@license 
@overview rules state explains the rules of the game for the users 
**/

//define variable for giraffe
var giraffe = giraffe || {};

//Define Rules State as a function
giraffe.RulesState = function() {};

//Allow main.js to inherit properties from methods in prototype
giraffe.RulesState.prototype = {
  create: function() {
    this.background = this.game.add.sprite(0,0, 'rulesBackground');
    this.play = this.game.add.button(528,600, 'okButton', this.okClick, this);
  },

  //Okclick function handles event if OK button is clicked and starts Menu state;
  okClick: function(){

    //start menu state;
    this.game.state.start('menu');
  },
};
