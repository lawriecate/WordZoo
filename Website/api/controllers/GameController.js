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
		data = [
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
		];


		return res.send(data);
	},

	savetestdata: function (req,res) {
		data = req.param('gamename');
		return res.send(data);
	}
};
