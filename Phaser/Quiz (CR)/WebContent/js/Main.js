//global variables
var quiz = quiz|| {};  


	// current question
	var questionIndex;
	var numOfQuestions = 17;
	var animalSeclectIndex = 15;
	var pictureSpellingIndex = 10;


	// questions
	var questions	= ["I ran to school _________ I was late.",
						"I ____ sports to stay healthy.",
						
						"Choose the noun.",
						"Choose the verb.",
						"Choose the adjective.",
						"Choose the adverb.",
						"Choose the noun phrase.",

						"Which correctly uses an '!'",

						"Which sentence is in the present tense?",
						"Which sentence is in the past tense?",

						"Choose the correct spelling.",
						"Choose the correct spelling.",
						"Choose the correct spelling.",
						"Choose the correct spelling.",
						"Choose the correct spelling.",
						"Choose the correct spelling.",
						];


	// answers
	var answers 	= [["if", "or", "that", "because"],
						["because", "run", "play", "kick"],

						["the", "shoes", "were", "shiny"],
						["I", "ran", "up", "stairs"],
						["I", "have", "blue", "pencils"],
						["the house", "was", "cleaned", "spotlessly"],	
						["the tiny insect", "so quickly", "had been eating", "very colourful"],						

						["What a beautiful picture!","Do you like art!",
								"The colours are so bright!","Can you help Sam!"],

						["Mum made Ella breakfast.","Mum makes Ella a hot drink.",
							"Mum gave Ella a book.","Mum will tell Ella a story."],
						["Mum made Ella breakfast.","Mum makes Ella a hot drink.",
							"Mum gave Ella a book.","Mum will tell Ella a story."],

						["Chop", "Cop", "Shop", "Cope"],
						["Dres", "Dreas", "Dress", "Dess"],
						["Pancaik", "Pancacke", "Pancache", "Pancake"],
						["Puzzle", "Pussle", "Possle", "Puzzel"],
						["Weathre","Wether","Whether","Weather"],
						["Yoke", "Yolk", "Yolck", "Yulk"]
						];


	// correct answers
	var correctAnswers 	= [3,2,	1,1,2,3,0, 	2,	1,0,	0,2,3,0,3,1];

	// correct word vales
	var titleBox;
	var titleText
	var pictureBox;
	var TRBox;
	var TRText;
	var TLBox;
	var TLText;
	var BRBox;
	var BRText;
	var BLBox;
	var BLText;


	// selected animal
	var selectedAnimal;

	// animal sprite assets
	var giraffe;
	var owl;
	var octopus;
	var zebra;
	var panda;
	var sheep;
	var elephant;
	var lion;


	// Record word answers
		// wordHistory[questionIndex] = True/False
	var wordHistory = [];

	// Time records to prevent double clicking
	var timeQuestionShown;
	var inputDelay = 600;


	// Text styles
	var medStyle = {font: "bold 50px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
	var bigStyle = {font: "bold 80px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
	var biggerStyle = {font: "bold 120px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

	
window.onload = function()
{
	// Create game
	var game = new Phaser.Game(1920, 1080, Phaser.AUTO);

			// Add states
			game.state.add('loading', LoadingScreen);
			game.state.add('start', StartScreen);
			game.state.add('play', PlayScreen);

			// Show loading screen
			game.state.start('start');																// ******* CHANGED FOR TESTING *******
/*
	$.get('http://localhost:1337/student/testdata', function(data)
	{
		//console.log("GET" + data);
		groupWords = data;

			// Multiple inputs
		// playerName = data;


	}).fail(function() {
		console.log('i failed');
	});

	$.post('http://localhost:1337/student/savedata',{gamename:'Quiz'}, function(data)
	{
		// Log returned data
		//console.log("POST" + data);

		// Start game
		game.state.start('start');
	});*/
};