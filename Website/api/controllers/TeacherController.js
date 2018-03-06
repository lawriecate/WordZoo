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
			 return res.view('teacher/home.ejs', {'title':'Hello', school: school,  layout: 'layout_teacher'});

		 });
		},
		accountEdit: function(req,res) {

			 return res.view('teacher/editAccount.ejs', {'title':'Edit Account',  layout: 'layout_teacher'});


		},
		accountUpdate: function(req,res) {

			params = {
	      name: req.param('name'),
				email: req.param('email'),

	    };

			if(req.param('password') != '') {
				params.password = req.param('password');
			}
			sails.log(params);

			User.update({id:req.user.id},params).exec(function(err,user) {
				if (err) {
					return res.serverError(err);
				}
				sails.log(user);
				return res.redirect('/teach/account/');
			})


		},
		viewClass: function(req,res) {
			schools = School.findOne({id:req.user.teaches_at[0].id}).populate('classes').exec(function(err,school) {
			 if (err) {
				 return res.serverError(err);
			 }
			 schoolClass = Class.findOne({id:req.params.classid}).populate('pupils').exec(function(err,schoolClass) {
	 			 if (err) {
	 				 return res.serverError(err);
	 			 }

				// sails.log(schoolClass);
	 			 return res.view('teacher/class.ejs', {'title':schoolClass.name, school: school,schoolClass:schoolClass,  layout: 'layout_teacher'});

	 		 });
		 });
		},
		newClass: function(req,res) {
			School.findOne({id:req.user.teaches_at[0].id}).populate('classes').exec(function(err,school) {

								sails.log(school);
				if (err) {
					return res.serverError(err);
				}
				newClass = {name:req.param('name'), school:school.id};
				sails.log(newClass);
				school.classes.add(newClass);

				school.save(function(err) {
						if (err) {
							return res.serverError(err);
						}
						return res.redirect('/teach');
				});
				//school.classes.populate('pupils');

			});
		},
		viewClassPhoto: function(req,res) {
			schools = School.findOne({id:req.user.teaches_at[0].id}).populate('classes').exec(function(err,school) {
				if (err) {
					return res.serverError(err);
				}
				schoolClass = Class.findOne({id:req.params.classid}).populate('pupils').exec(function(err,schoolClass) {
					 if (err) {
						 return res.serverError(err);
					 }
   
				   // sails.log(schoolClass);
					 return res.view('teacher/classPhoto.ejs', {'title':schoolClass.name, school: school,schoolClass:schoolClass,  layout: 'layout_teacher'});
   
				 });
			});
		},
		getClassPhotoData: function(req,res) {
			schools = School.findOne({id:req.user.teaches_at[0].id}).populate('classes').exec(function(err,school) {
				if (err) {
					return res.serverError(err);
				}
				schoolClass = Class.findOne({id:req.params.classid}).populate('pupils').exec(function(err,schoolClass) {
					 if (err) {
						 return res.serverError(err);
					 }

					var data ={
						className: schoolClass.name,
						pupils: []
					};

					function generateProfile() {
						len = 45;
						value = 0;
						if (len == 0) return [];
						var a = [value];
						while (a.length * 2 <= len) a = a.concat(a);
						if (a.length < len) a = a.concat(a.slice(0, len - a.length));
						return a;
					}

					_.each(schoolClass.pupils, function (pupil) { 
						pupilData = [];
						if(pupil.character=="") {
							pupil.character = generateProfile();
						} else {
							pupilData = JSON.parse(pupil.character);
						}
						
						sails.log(pupil);
						sails.log(pupilData);
						pupilData.push(pupil.name);
						data.pupils.push(pupilData);
					});

   
				   // sails.log(schoolClass);
					 return res.json(data);
   
				 });
			});
		},
		addPupil: function(req,res) {
			schools = School.findOne({id:req.user.teaches_at[0].id}).populate('classes').exec(function(err,school) {
			 if (err) {
				 return res.serverError(err);
			 }
			 params = {name:req.param('name'), dob:req.param('dob'),school:school.id};
 			Pupil.make(params, function(err,pupil) {
 				if (err) {
 					return res.serverError(err);
 				}
 				Class.findOne({id:req.params.classid}).exec(function(err,schoolClass) {
 					if (err) {
 						return res.serverError(err);
 					}
 					schoolClass.pupils.add(pupil.id);
 					schoolClass.save(function(err) {
 							if (err) {
 								return res.serverError(err);
 							}
 							return res.redirect('/teach/class/'+schoolClass.id);
 					});
 				});

 			});
		 });
		},
		regenKey:function(req,res) {

				Pupil.regenerate(req.param('pupilid'),{},function() {
					return res.redirect('/teach/class/'+req.params.classid);
				});

		},
		deletePupil:function(req,res) {

			Pupil.destroy({id:req.param('pupilid')}).exec(function(err) {
				return res.redirect('/teach/class/'+req.params.classid);
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
		},
		reviewPupil: function(req,res) {
			Pupil.findOne({id:req.params.pupilid}).populate('in_class').exec(function(err,pupil) {
				return res.view('teacher/reviewPupil.ejs', {'title':'Review Pupil',pupil:pupil,  layout: 'layout_teacher'});
			});
			
   
		},
};
