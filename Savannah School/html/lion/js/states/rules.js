var lion = lion || {};

lion.RulesState = function() {};


lion.RulesState.prototype = {
  preload: function() {

  },
  create: function() {
    this.background = this.game.add.sprite(0,0, 'rulesMenu');
    this.play = this.game.add.button(528,600, 'okButton', this.okClick, this);
  },
  okClick: function(){
    //difficulty button click handler
    //start button;
    this.game.state.start('menu');
  },
  update: function() {
  }
};
