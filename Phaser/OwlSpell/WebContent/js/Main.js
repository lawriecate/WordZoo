window.onload = function() {
	var game = new Phaser.Game(1920, 1080, Phaser.AUTO);

	// Add the States your game has.
	game.state.add("Start", StartScreen);
	game.state.add("Rules", RulesScreen);
	game.state.add("Level", Level);
	game.state.add("Finish", FinishScreen);

	game.state.start("Start");
};
