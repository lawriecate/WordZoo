var lion = lion || {};

lion.BootState = function() {};

lion.BootState.prototype = {
	preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
  	//this.game.add.text(300,300,"Boot state working");
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};