/**
 * Research controller
 *
 * @description :: Server-side logic for providing research dashboard
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var json2csv =  require('nice-json2csv');
var moment = require('moment');

module.exports = {
    home: function(req,res) {
        return res.view('admin/data.ejs', {'title':'Data Tools',  layout: 'layout_admin'});
    },
    exportStates: function(req,res) {
        State.query("select id, pupil, state from State", function(err, list){ 
            if (err) console.log(err);
            // Send a CSV response          
            var config = {
              fields : ['id','pupil', 'state'],
              data: list
            };

            var csvContent = json2csv.convert(list);    
            res.set('Content-Type', 'text/csv');
            res.send(new Buffer(csvContent));
         

        }); 
    },
    exportPlays: function(req,res) {
        Play.query("select id, session_id, pupil, game, clicks from State", function(err, list){ 
            if (err) console.log(err);
            // Send a CSV response          
            var config = {
              fields : ['id','pupil', 'state'],
              data: list
            };

            var csvContent = json2csv.convert(list);    
            res.set('Content-Type', 'text/csv');
            res.send(new Buffer(csvContent));

        }); 
    }
};