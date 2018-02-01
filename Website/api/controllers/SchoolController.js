/**
 * SchoolController
 *
 * @description :: Server-side logic for managing schools
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	list: function(req,res) {

			schools = School.find().exec(function(err,schools) {
				if (err) {
					return res.serverError(err);
				}

					return res.view('admin/schools.ejs', {'title':'Manage Schools', schools: schools});


			});


  },

	create: function(req,res) {
		School.make({
      name: req.param('name'),
			phone: req.param('phone'),
			address: req.param('address'),
			postcode: req.param('postcode'),
			country: req.param('country'),
    }, function (err, school) {
			if (err) {
				return res.serverError(err);
			}

			  return res.redirect('/admin/schools');
		});
	},

	edit: function(req,res) {
		School.findOne({id:req.params.id}).populate('teachers').exec(function(err,school) {
			if (err) {
				return res.serverError(err);
			}
			users = User.find().exec(function(err,users) {
				if (err) {
					return res.serverError(err);
				}
//				sails.log(school.teachers);
				return res.view('admin/schoolDetails', {'title':'Edit School',school: school, users: users});
			});
		})

	},

	update: function(req,res) {
		params = {
      name: req.param('name'),
			phone: req.param('phone'),
			address: req.param('address'),
			postcode: req.param('postcode'),
			country: req.param('country'),
    };
		School.update({id:req.params.id},params).exec(function(err,school) {
			if (err) {
				return res.serverError(err);
			}
			return res.redirect('/admin/schools/'+school[0].id+'/edit');
		})


	},

	assignTeacher: function(req,res) {
		School.findOne({id:req.params.id}).exec(function(err,school) {
			if (err) {
				return res.serverError(err);
			}
			sails.log(school.name);
				User.findOne({id:req.param('teacher_id')}).exec(function(err,user) {
					if (err) {
						return res.serverError(err);
					}
					//user.teaches_at
					school.teachers.add(user.id);
					sails.log(user.name);
					school.save(function(err) {
						if (err) {
							return res.serverError(err);
						}
						return res.redirect('/admin/schools/'+school.id+'/edit');
				});

			});
		});


	},

	viewClasses: function(req,res) {
		School.findOne({id:req.params.id}).populate('classes').exec(function(err,school) {
			if (err) {
				return res.serverError(err);
			}
			sails.log(school);
			//school.classes.populate('pupils');
			return res.view('admin/schoolPupils', {'title':'Manage School',school: school});
		});
	},

	addClass: function(req,res) {
		School.findOne({id:req.params.id}).populate('classes').exec(function(err,school) {
			if (err) {
				return res.serverError(err);
			}
			newClass = {name:req.param('name'), school: school.id};
			//sails.log(newClass);
			school.classes.add(newClass);

			//sails.log(school);
			school.save(function(err) {
					if (err) {
						return res.serverError(err);
					}
					return res.redirect('/admin/schools/'+school.id+'/classes');
			});
			//school.classes.populate('pupils');

		});
	},

	manageClass: function(req,res) {
		School.findOne({id:req.params.schoolid}).populate('classes').exec(function(err,school) {
			if (err) {
				return res.serverError(err);
			}
			Class.findOne({id:req.params.classid}).populate('pupils').exec(function(err,schoolClass) {
				if (err) {
					return res.serverError(err);
				}

				return res.view('admin/schoolClass', {'title':'Manage Class',school: school,schoolClass:schoolClass});

			//school.classes.populate('pupils');
		});
		});
	},

	addPupil: function(req,res) {
		School.findOne({id:req.params.schoolid}).populate('classes').exec(function(err,school) {
			if (err) {
				return res.serverError(err);
			}
			params = {name:req.param('name'), dob:req.param('dob'),school:school.id};
			Pupil.make(params, function(err,pupil) {
				Class.findOne({id:req.params.classid}).exec(function(err,schoolClass) {
					if (err) {
						return res.serverError(err);
					}
					schoolClass.pupils.add(pupil);
					sails.log(pupil);
					schoolClass.save(function(err) {
							if (err) {
								return res.serverError(err);
							}
							return res.redirect('/admin/schools/'+school.id+'/classes/'+schoolClass.id);
					});
				});

			});
			//sails.log(newClass);

			//sails.log(school);

			//school.classes.populate('pupils');

		});
	}
};
