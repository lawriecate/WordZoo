
/**
@author G52GRP - GAIL - #326704
@license 
@overview preloadState is where all images are loaded in.
There is also a gif that plays whilst loading in all variables 
After all images are loaded in, starts the menu state. 
**/
//Define PreloadState as a function
zebra.PreloadState = function() {

    this.asset = null;
    this.ready = false;
}

//Allow main.js to inherit properties from methods in prototype
zebra.PreloadState.prototype = {


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

        //Loads in backgrounds and menus
        this.load.image('menuBackground', 'assets/menuBackground.png');
        this.load.image('playBackground', 'assets/playBackground.png');
        this.load.image('difficultyBackground', 'assets/difficultyBackground.png');
        this.load.image('rulesBackground', 'assets/rulesBackground.png');

        //loads in spites
        this.game.load.spritesheet('zebraSprite', 'assets/zebraSprite.png', 157, 130);
        this.game.load.spritesheet('livesSprite', 'assets/livesSprite.png', 275, 80);

        //Loads in buttons
        this.load.image('playButton', 'assets/playButton.png');
        this.load.image('rulesButton', 'assets/rulesButton.png');
        this.load.image('playAgainButton', 'assets/playAgainButton.png');
        this.load.image('moreGamesButton', 'assets/moreGamesButton.png');
        this.load.image('mediumButton', 'assets/mediumButton.png');
        this.load.image('hardButton', 'assets/hardButton.png');
        this.load.image('veryHardButton', 'assets/veryHardButton.png');
        this.load.image('okButton', 'assets/okButton.png');

        //Loads in Text and displays
        this.load.image('scoreDisplay', 'assets/scoreDisplay.png');
        this.load.image('wordDisplay', 'assets/scoreDisplay.png');
        this.load.image('selectDifficultyText', 'assets/selectDifficultyText.png');
        this.load.image('unluckyText', 'assets/unluckyText.png');
    },

    //Sets cropenabled on asset to false
    create: function() {
        this.asset.cropEnabled = false;
    },

    //Preload function loads in all images
    update: function() {
        if (!!this.ready) { //if ready is true then do...
            this.game.state.start('menu');
        }
    },

    //onLoadComplete function sets ready to true
    onLoadComplete: function() {
        this.ready = true;
    }

};