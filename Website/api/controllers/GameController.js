/**
 * GameController
 *
 * @description :: Server-side logic for managing games
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	select: function (req, res) {
    return res.send('Choose a game:');
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

	sheepgame: function( req,res) {
		return res.view('sheepgame.ejs', {'title':'Sheep Game'});
	}
};
