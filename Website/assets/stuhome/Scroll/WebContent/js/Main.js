window.onload = function()
{
	var game = new Phaser.Game(1052, 288, Phaser.CANVAS, 'gameselect');

	// Add the States your game has.
	//game.state.add("Loading", Loading);
	game.state.add("Level", Level);


	// Go to *** LOADING ***
	game.state.start("Level");

	/*
	$.get('http://localhost:1337/student/testdata', function(info)
	{
		//console.log("GET" + info);

			// Multiple inputs
		// username = info[0];


	}).fail(function() {
		console.log('i failed');
	});

	$.post('http://localhost:1337/student/savedata',{gamename:'Character'}, function(info)
	{
		// Log info
		//console.log("POST" + info);





		// Wait until level is loaded
		while(1)
		{
			if(levelLoaded)
			{
				// Start Level
				game.state.start("Level");
			}
		}
	});*/
};
