/**
 * TeacherControllerController
 *
 * @description :: Server-side logic for managing Teachercontrollers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var nestedPop = require('nested-pop');
var moment = require('moment');
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
		/*
		addPupils: function(req,res) {
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
		},*/
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
				/*Play.find({pupil:pupil.id}).limit(5).sort('createdAt DESC').populate('game').populate('responses').then(function(sessions) {
 
					return nestedPop(sessions, {
						responses: [
							'word'
						]
					}).then(function(sessions) {
						return res.view('teacher/reviewPupil.ejs', {'title':'Review Pupil',pupil:pupil,  layout: 'layout_teacher', sessions: sessions});
					}).catch(function(err) {
						throw err;
					});
					
				});*/

				Response.find({where:{pupil:pupil.id}}).sort('correct ASC createdAt DESC').limit(10).populate('word').exec(function(err,lowResponses) {
					Response.find({where:{pupil:pupil.id}}).sort('correct DESC createdAt DESC').limit(10).populate('word').exec(function(err,highResponses) {
					return res.view('teacher/reviewPupil.ejs', {'title':'Review Pupil',pupil:pupil,  layout: 'layout_teacher', lowResponses: lowResponses,highResponses:highResponses});
					});
				});
				
				/*.exec(function(err,sessions) {
					sails.log(sessions);
					return res.view('teacher/reviewPupil.ejs', {'title':'Review Pupil',pupil:pupil,  layout: 'layout_teacher', sessions: sessions});
				});*/
			});
			
   
		},

		reviewPupilGraphData: function(req,res) {
			Pupil.findOne({id:req.params.pupilid}).exec(function(err,pupil) {
				// last X days of total points
				var results = {
					labels: [],
					data: []
				};

				function getDay(i) {
					var day = moment().subtract(i, 'days');
					var startOfDay = day.set({hour:0,minute:0,second:0,millisecond:0}).format("YYYY-MM-DD HH:mm:ss");
					var endOfDay = day.set({hour:23,minute:59,second:59,millisecond:999}).format("YYYY-MM-DD HH:mm:ss");
					sails.log(startOfDay + " " + endOfDay);
					results.labels.push(day.format("YYYY-MM-DD"));
					Play.find({where: {pupil:pupil.id,createdAt:{'>=': new Date(startOfDay),'<=': new Date(endOfDay)}} , sum: ['points']}).exec(function(err,plays) {
						// /pupil:pupil.id
						if(err){res.serverError(err);}
						results.data.push(plays[0].points);
						sails.log(plays);
						if(i==0) {
							return res.json(results);
						} else {
							getDay(i-1)
						}
					});
				}
				
				getDay(6);

				
				
				
				/*.exec(function(err,sessions) {
					sails.log(sessions);
					return res.view('teacher/reviewPupil.ejs', {'title':'Review Pupil',pupil:pupil,  layout: 'layout_teacher', sessions: sessions});
				});*/
			});
		},
};
