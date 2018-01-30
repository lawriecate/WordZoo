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


	}
};
