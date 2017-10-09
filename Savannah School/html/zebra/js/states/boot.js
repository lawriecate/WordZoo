
/**
@author G52GRP - GAIL - #326704
@license 
@overview bootState is where assets used in the preload state are added in, system settings are set.
**/
//define zebra
var zebra = zebra || {};

//Define Bootstate as a function
zebra.BootState = function() {};

//Allow main.js to inherit properties from methods in prototype
zebra.BootState.prototype = {
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