/**
 * TeacherControllerController
 *
 * @description :: Server-side logic for managing Teachercontrollers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
		home: function(req,res) {
			schools = School.findOne({id:req.user.teaches_at[0].id}).populate('classes').exec(function(err,school) {
			 if (err) {
				 return res.serverError(err);
			 }
			 return res.view('teacher/home.ejs', {'title':'Hello', school: school});

		 });
		},
		viewClass: function(req,res) {
			schools = School.findOne({id:req.user.teaches_at[0].id}).populate('classes').exec(function(err,school) {
			 if (err) {
				 return res.serverError(err);
			 }
			 schoolClass = School.findOne({id:req.params.classid}).populate('pupils').exec(function(err,schoolClass) {
	 			 if (err) {
	 				 return res.serverError(err);
	 			 }
	 			 return res.view('teacher/class.ejs', {'title':schoolClass.name, school: school,schoolClass:schoolClass});

	 		 });
		 });
		},
		startSession: function(req,res) {
			pupil = Pupil.findOne({id:req.params.pupilid}).exec(function(err,pupil) {
				req.session.pupilIsLoggedIn = true
				req.session.pupilId = pupil.id
				return res.redirect('student');
			});
		},
		viewSchool: function(req,res) {
		},
		loginPupil: function(req,res) {
		}
};
