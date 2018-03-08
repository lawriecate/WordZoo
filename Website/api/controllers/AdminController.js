/**
 * SchoolController
 *
 * @description :: Server-side logic for providing admin dashboard
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	dashboard: function(req,res) {
        stats = {};
			School.count().exec(function(err,schools) {
                stats.school = schools;
                User.count().exec(function(err,users) {
                    stats.users = users;
                    Play.count().exec(function(err,plays) {
                        stats.plays = plays;
                        return res.view('admin/home.ejs', {'title':'WordZoo Admin', stats: stats,  layout: 'layout_admin'});
                    });
                    
                });
				
			});
  },

  graphData: function(req,res) {
    var result = {};
    Game.find().exec(function(err,games) {
        result.labels = games.map(function(a) { return a.name; });
        Play.find({groupBy:'game', count: true}).exec(function(err,plays) {
            result.graphData = plays;
            return res.json(result);
        });
    });
    
  },
};