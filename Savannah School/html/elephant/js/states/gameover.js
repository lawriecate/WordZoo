
/**
@author G52GRP - GAIL - #326704
@license 
@overview Game over state sends results to server
          also gives user option to play again 
**/
//define elephant variable
var elephant = elephant || {};


//Define GameoverState as a function
elephant.GameoverState = function() {};

//Allow main.js to inherit properties from methods in prototype
elephant.GameoverState.prototype = {

    //createFunction adds in images and text to gameover state
    create: function() {
        this.background = this.game.add.sprite(0, 0, 'difficultyBackground');
        this.unluckyText = this.game.add.sprite(410, 35, 'unluckyText');
        this.playAgain = this.game.add.button(475, 330, 'playAgainButton', this.playAgainClick, this);
        this.moreGames = this.game.add.button(475, 475, 'moreGamesButton', this.moreGamesClick, this);
        scoreBack = this.game.add.sprite(315, 135, 'scoreDisplay');
        this.game.add.text(600, 180, scoreText.text, {
            font: '70px Arial',
            fill: "#ff9933"
        });
        scoreBack.scale.setTo(1.8, 2);
        this.sendResult();
    },


    //moreGamesClick function handles event if moregames button is clicked
    moreGamesClick: function() {
        window.location = "../gameselect.php";
    },

    //playAgainclick function handles event if difficulty button is clicked
    playAgainClick: function() {
        score = 0;
        numResponses = 0;
        timeAllowed = 60;
        failedItems = "";
        chosenItems = "";
        responseTimes = new Array();
        this.game.state.start('menu');
    },
    //SendResult function sends results to server
    sendResult: function() {
        var timeTaken = (this.game.time.time / 1000) - initialTime;
        $.ajax({
            method: 'get',
            url: 'php/connection.php',
            data: {
                'score': score,
                'time': timeTaken,
                'difficulty': difficulty,
                'chosen': chosenItems,
                'failed': failedItems,
                'responseTime': averageResponseTime,
                'ajax': true
            },
            success: function(data) {
                $('#data').text(data);
            }
        });
    }
};