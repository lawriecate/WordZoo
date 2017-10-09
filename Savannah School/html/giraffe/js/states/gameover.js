var giraffe = giraffe || {};

giraffe.GameoverState = function() {};


giraffe.GameoverState.prototype = {
  preload: function () {
    this.background = this.game.add.sprite(0,0, 'difficultyBackground');
    this.unluckyText = this.game.add.sprite(410, 35, 'unluckyText');
	this.playAgain = this.game.add.button(475, 330, 'playAgainButton', this.playAgainClick, this);
	this.moreGames = this.game.add.button(475, 475, 'moreGamesButton', this.moreGamesClick, this);
	scoreBack = this.game.add.sprite(400,135, 'scoreDisplay');
	this.game.add.text(620, 165, scoreText.text, {font: '70px Arial', fill: "#ff9933"});
	scoreBack.scale.setTo(3, 1.5);
  },
  create: function () {
    this.sendResult();
  },
  update: function () {

  },

moreGamesClick: function() {
	window.location = "../gameselect.php";
	
},

playAgainClick: function() {
   this.game.state.start('menu');
},

sendResult: function() { 
    var timeTaken = (this.game.time.time / 1000) - initialTime;
     $.ajax({
       method: 'get',
       url: 'php/connection.php',
       data: {
		'score': score,
		'difficulty': difficulty,
		'chosen': chosenWord,
		'failed': failedWord,
		'time': timeTaken,
		'responseTime': averageResponseTime,
		'ajax': true
       },
       success: function(data) {
        $('#data').text(data);
       }
     }); 
}
};

