window.onload = function() {
	var game = new Phaser.Game(1920, 1080, Phaser.AUTO);

	
	// Add the States your game has.
	game.state.add('start', StartScreen);
	game.state.add('rules', RulesScreen);
	game.state.add('play', PlayScreen);
	game.state.add('finish', FinishScreen);
	
	game.state.start('start');
};