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
        var graphData = [];
        _.each(games, function (game,i) {
            //sails.log(game);
            Play.count({game:game.id}).exec(function(err,count) {
                //sails.log(count);
                if (err) {
                    return res.serverError(err);
                }
                graphData.push(count);
               
                if(i == (games.length-1)) {
                    result.graphData = graphData;
                    return res.json(result);
                }
            });
            
            
        });
      
    });
    
  },
};