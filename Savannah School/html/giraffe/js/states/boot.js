
/**
@author G52GRP - GAIL - #326704
@license 
@overview bootState is where assets used in the preload state are added in, system settings are set.
**/

//define Giraffe 
var giraffe = giraffe || {};

//Define BootState as a function
giraffe.BootState = function() {};

//Allow main.js to inherit properties from methods in prototype
giraffe.BootState.prototype = {
	/**
    Function loads in images used in preload State
    **/
	preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },

    /**
	Function loads in images used in preload State
	**/
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};