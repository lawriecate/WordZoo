
/**
@author G52GRP - GAIL - #326704
@license 
@overview preloadState is where all images are loaded in.
There is also a gif that plays whilst loading in all variables 
After all images are loaded in, starts the menu state. 
**/
//Define Bootstate as a function
elephant.PreloadState = function() {

    //define local variabels used locally in this state
    this.asset = null;
    this.ready = false;
}

//Allow main.js to inherit properties from methods in prototype
elephant.PreloadState.prototype = {

    //Preload function loads in all images used in the Elephant game
    preload: function() {

        //Plays preloader gif
        this.asset = this.add.sprite(this.width / 2, this.height / 2, 'preloader');
        this.asset.anchor.setTo(0.5, 0.5);
        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.load.setPreloadSprite(this.asset);


        //Allows game to scale when window is resized
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.updateLayout();

        //Load backgrounds and menus
        this.load.image('menuBackground', 'assets/menuBackground.png');
        this.load.image('playBackground', 'assets/playBackground.png');
        this.load.image('difficultyBackground', 'assets/difficultyBackground.png');
        this.load.image('rulesBackground', 'assets/rulesBackground.png');

        //loads in easels
        this.load.image('easel', "assets/easel.png");

        //loads in buttons
        this.load.image('playButton', 'assets/playButton.png');
        this.load.image('rulesButton', 'assets/rulesButton.png');
        this.load.image('playAgainButton', 'assets/playAgainButton.png');
        this.load.image('moreGamesButton', 'assets/moreGamesButton.png');
        this.load.image('mediumButton', 'assets/mediumButton.png');
        this.load.image('hardButton', 'assets/hardButton.png');
        this.load.image('veryHardButton', 'assets/veryHardButton.png');
        this.load.image('okButton', 'assets/okButton.png');

        //loads in text and displays 
        this.load.image('scoreDisplay', "assets/score.png");
        this.load.image('selectDifficultyText', 'assets/selectDifficultyText.png');
        this.load.image('unluckyText', 'assets/unluckyText.png');

    },

    //Sets cropenabled on asset to false;
    create: function() {
        this.asset.cropEnabled = false;
    },

    //Preload function loads in all images 
    update: function() {
        if (!!this.ready) { // if ready is true then do...
            this.game.state.start('menu');
        }
    },

    //onLoadComplete functions sets ready to true
    onLoadComplete: function() {
        this.ready = true;
    }

};