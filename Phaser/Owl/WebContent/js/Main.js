window.onload = function() {
	var game = new Phaser.Game(1960, 1080, Phaser.AUTO);

	// Add the States your game has.
	game.state.add("StartScreen", StartScreen);
	// game.state.add("Rules", Rules);
	// game.state.add("Play", Play);
	// game.state.add("Finish", Finish);

	game.state.start("StartScreen");
};
