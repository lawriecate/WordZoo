/**
 * Research controller
 *
 * @description :: Server-side logic for providing research dashboard
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var json2csv = require('json2csv');
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

            json2csv(config, function(err, csv) {
              if (err) console.log(err);
              var filename = "states-" + moment().format("YYYY-MM-DD") + ".csv";
              res.attachment(filename);
              res.end(csv, 'UTF-8');
            });

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

            json2csv(config, function(err, csv) {
              if (err) console.log(err);
              var filename = "plays-" + moment().format("YYYY-MM-DD") + ".csv";
              res.attachment(filename);
              res.end(csv, 'UTF-8');
            });

        }); 
    }
};