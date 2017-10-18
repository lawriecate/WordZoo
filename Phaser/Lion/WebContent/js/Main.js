window.onload = function() {
	var game = new Phaser.Game(1960, 1080, Phaser.AUTO);

	
	// Add the States your game has.
	game.state.add("start", StartScreen);
	game.state.add("rules", RulesScreen);
	// game.state.add("play", Play);
	// game.state.add("finish", Finish);
	
	 game.state.start("start");
};
