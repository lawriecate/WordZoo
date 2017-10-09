var lion = lion || {};

lion.GameoverState = function() {};


lion.GameoverState.prototype = {
  preload: function () {
	  this.background = this.game.add.sprite(0,0, 'difficultyBackground');
    this.unluckyText = this.game.add.sprite(410, 35, 'unlucky');
	  this.playAgain = this.game.add.button(475, 330, 'playAgainButton', this.playAgainClick, this);
	  this.moreGames = this.game.add.button(475, 475, 'moreGamesButton', this.moreGamesClick, this);
	  scoreBack = this.game.add.sprite(315,135, 'scoreDisplay');
    this.game.add.text(580, 180, score, {font: '70px Arial', fill: "#ff9933"});
    scoreBack.scale.setTo(1.8, 2);
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
		'time': timeTaken,
		'chosen': chosenWords,
		'failed': failedWords,
		'responseTime': averageResponseTime,
        'ajax': true
      },
      success: function(data) {
        $('#data').text(data);
      }
    }); 
}
};

