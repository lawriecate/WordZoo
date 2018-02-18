/**
 * GameController
 *
 * @description :: Server-side logic for managing games
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	home: function (req, res) {
			
			if(!req.pupil.completedWelcome) {
				return res.redirect('/student/welcome');
			}

			games = Game.find().exec(function(err,games) {
				if (err) {
					return res.serverError(err);
				}

					return res.view('student/home.ejs', {'title':'Start Screen',games:games,  layout: 'layout_student'});

			});



  },

	play: function(req,res) {

		game = Game.findOne({slug:req.params.gameslug}).exec(function(err,game) {
			if (err) {
				return res.serverError(err);
			}

				return res.view('student/play.ejs', {'title':'Play '+game.name,game:game,  layout: 'student/game_layout'});

		});
	},
	testdata: function (req,res) {
		/*data = [
			['word1','word2'],
			['word1','word2'],
			['word1','word2'],
			['word1','word2'],
			['word1','word2'],
			['word1','word2'],
			['word1','word2'],
			['word1','word2'],
			['word1','word2'],
			['word1','word2'],
		];*/
		var data = [["Z1","Z2","Z3","Z4","Z5","Z6","Z7","Z8"],
							["X1","X2","X3","X4","X5","X6","X7","X8"],
							["C1","C2","C3","C4","C5","C6","C7","C8"],
							["Cat","Hat","Mat","Vat","Pat","Bat","Fat"]];


		return res.send(data);
	},

	savetestdata: function (req,res) {
		data = req.param('gamename');
		return res.send(data);
	},

	endgame: function(req,res) {
		/*wordHistory = req.param('wordHistory');
		// save data from game to student record
		// generate session
		session = Play.create({

		}).exec(function(err,records) {

		});
		_each(wordHistroy,function(wordRecord) {
			//["K1", false, 3277]
			var params = {
				word = wordRecord[0],
				response = wordRecord[1],
				timeToResponse = wordRecord[2]
			}
		});
		return res.ok();*/
	},

	sheepgame: function( req,res) {
		return res.view('sheepgame.ejs', {'title':'Sheep Game'});
	},

	list: function(req,res) {
		games = Game.find().exec(function(err,games) {
			if (err) {
				return res.serverError(err);
			}

				return res.view('admin/games.ejs', {'title':'Manage Games',games:games,  layout: 'layout_admin'});

		});
	},

	create: function(req,res) {
		Game.make({
      name: req.param('name'),
			source: req.param('source'),
			live: req.param('live'),
			slug: req.param('slug')
    }, function (err, game) {
			if (err) {
				return res.serverError(err);
			}

			  return res.redirect('/admin/games/'+game.id);
		});
	},

	editGame: function(req,res) {
		games = Game.findOne({id: req.params.gameid}).exec(function(err,game) {
			if (err) {
				return res.serverError(err);
			}

				return res.view('admin/gameDetails.ejs', {'title':'Edit Game',game:game,  layout: 'layout_admin'});

		});
	},

	updateGame: function(req,res) {
		params = {
      name: req.param('name'),
			source: req.param('source'),
      live: (req.param('live')=="true"),
			  slug: req.param('slug'),
    };
		Game.update({id:req.params.gameid},params).exec(function(err,game) {
			if (err) {
				return res.serverError(err);
			}
			return res.redirect('/admin/games/'+game[0].id+'/');
		})
	}
};
