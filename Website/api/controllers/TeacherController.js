/**
 * TeacherControllerController
 *
 * @description :: Server-side logic for managing Teachercontrollers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
		home: function(req,res) {
			schools = School.findOne({id:req.user.teaches_at[0].id}).exec(function(err,school) {
			 if (err) {
				 return res.serverError(err);
			 }
			 return res.view('teacher/home.ejs', {'title':'Hello', school: school});

		 });
		},
		viewClass: function(req,res) {
		},
		viewSchool: function(req,res) {
		},
		loginPupil: function(req,res) {
		}
};
