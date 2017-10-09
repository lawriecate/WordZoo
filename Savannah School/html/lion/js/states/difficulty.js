var lion = lion || {};

lion.DifficultyState = function() {};


lion.DifficultyState.prototype = {

  create: function() {

    this.background = this.game.add.sprite(0,0, 'difficultyBackground');
    this.selectDifficulty = this.game.add.sprite(228, 60, 'selectDifficulty');
    this.medium = this.game.add.button(85,280, 'mediumButton', this.mediumClicked, this);
    this.hard = this.game.add.button(485,280, 'hardButton', this.hardClicked, this);
    this.reallyHard = this.game.add.button(885,280, 'veryHardButton', this.reallyHardClicked, this);
    this.rules = this.game.add.button(460, 460, 'rulesButton', this.rulesClick, this);
  },
  
  mediumClicked: function() {
	difficultyString = 'php/importMedium.php';
	difficulty = 'Medium';
    this.game.state.start('play');
	this.importWords();
  },
  
  hardClicked: function() {
	difficultyString = 'php/importHard.php';
	difficulty = 'Hard';
    this.game.state.start('play');
	this.importWords();
  },
  
  reallyHardClicked: function() {
	difficultyString = 'php/importReallyHard.php';
	difficulty = 'Really Hard';
    this.game.state.start('play');
	this.importWords();
  },
  
  importWords: function() {
   var returnedArray;
   $.ajax({
      method: 'get',
      url: difficultyString,
      dataType: 'json',
      async: false,
      success: function(data) {       
	for(var i = 0; i<data.length; i++) {
	    wordBank[i] = data[i];
	}
      }
    });
   this.game.state.start('play');
},

    
  rulesClick: function() {
     this.game.state.start('rules');
  },

  update: function() {
  }
};

