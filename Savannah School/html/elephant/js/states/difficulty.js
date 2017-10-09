
/**
@author G52GRP - GAIL - #326704
@license 
@overview difficultuy State imports words depending on which difficulty is clicked
**/
//variable for elephant
var elephant = elephant || {};

//Define DifficultyState as a function and define variables used locally
elephant.DifficultyState = function() {
    var difficultyString = null;
    var difficulty = null;
};


//Allow main.js to inherit properties from methods in prototype
elephant.DifficultyState.prototype = {

    //Create function adds images to the difficulty state and button listeners
    create: function() {

        this.background = this.game.add.sprite(0, 0, 'difficultyBackground');
        this.selectDifficulty = this.game.add.sprite(228, 60, 'selectDifficultyText');
        this.medium = this.game.add.button(85, 280, 'mediumButton', this.mediumClicked, this);
        this.hard = this.game.add.button(485, 280, 'hardButton', this.hardClicked, this);
        this.reallyHard = this.game.add.button(885, 280, 'veryHardButton', this.reallyHardClicked, this);
        this.rules = this.game.add.button(460, 460, 'rulesButton', this.rulesClick, this);
    },

    //medium Clicked function imports words sets difficulty to medium 
    mediumClicked: function() {
        difficultyString = 'php/importMedium.php';
        difficulty = 'Medium';
        this.importWords();
    },

    //hard Clicked function imports words sets difficulty to hard
    hardClicked: function() {
        difficultyString = 'php/importHard.php';
        difficulty = 'Hard';
        this.importWords();
    },

    //reallyHard Clicked function imports words sets difficulty to really hard
    reallyHardClicked: function() {
        difficultyString = 'php/importReallyHard.php';
        difficulty = 'Really Hard';
        this.importWords();
    },

    //import words an ajax function that imports wor using difficulty string
    importWords: function() {
        $.ajax({
            method: 'get',
            url: difficultyString,
            dataType: 'json',
            async: false,
            success: function(data) {
                for (var i = 0; i < data.length; i++) {
                    itemNames[i] = data[i][0];
                    filePath[i] = data[i][1];
                }
            }
        });
        this.game.state.start('play');
    },

    //rulesClick function handles event if rules button is clicked  
    rulesClick: function() {
        this.game.state.start('rules');
    }
};