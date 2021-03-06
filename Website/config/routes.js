/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

    'get /login': { view: 'auth/login' },
    'get /signup': 'UserController.signupForm',
    'get /welcome': 'UserController.welcome',
    'post /login': 'UserController.login',
    'post /signup': 'UserController.signup',
    '/logout': 'UserController.logout',
    

    'get /admin': 'AdminController.dashboard',
    'get /admin/getDashData': 'AdminController.graphData',
    'get /admin/schools': 'SchoolController.list' ,
    'get /admin/schools/new': { view: 'admin/school_new',
    locals: {
      layout: 'layout_admin'
    } },
    'post /admin/schools/new': 'SchoolController.create' ,
    'get /admin/schools/manage': { view: 'admin/schoolDetails' ,
    locals: {
      layout: 'layout_admin'
    }},
    'get /admin/schools/:id/classes': 'SchoolController.viewClasses',
    'get /admin/schools/:schoolid/classes/:classid': 'SchoolController.manageClass',
    'post /admin/schools/:schoolid/classes/:classid/addpupil': 'SchoolController.addPupil',
    'post /admin/schools/:id/classes': 'SchoolController.addClass',
    'get /admin/schools/:id/newsulink': 'SchoolController.refreshSignup',

    'get /admin/schools/:id/edit': 'SchoolController.edit' ,
    'post /admin/schools/:id/edit': 'SchoolController.update' ,
    'post /admin/schools/:id/assignteacher': 'SchoolController.assignTeacher' ,
    'get /admin/users': 'UserController.list',
    'get /admin/users/:id': 'UserController.edit',
    'post /admin/users/:id': 'UserController.update',
    'post /admin/users/:id/assignto': 'UserController.assignSchool',
    'get /admin/games': 'GameController.list' ,
    'get /admin/games/new': {view:'admin/gameNew',
    locals: {
      layout: 'layout_admin'
    }},
    'post /admin/games/new': 'GameController.create' ,
    'get /admin/games/:gameid': 'GameController.editGame' ,
    'post /admin/games/:gameid': 'GameController.updateGame' ,

    'get /admin/data': 'ResearchController.home' ,
    'get /admin/data/export/states/json': 'ResearchController.exportStates' ,
    'get /admin/data/export/plays/json': 'ResearchController.exportPlays' ,
    'get /admin/data/export/states/csv': 'ResearchController.exportStatesCsv' ,
    'get /admin/data/export/plays/csv': 'ResearchController.exportPlaysCsv' ,

    'get /admin/install': 'AdminController.install',


    'get /teach': 'TeacherController.home',
    'get /teach/account': 'TeacherController.accountEdit',
    'post /teach/account': 'TeacherController.accountUpdate',
    'post /teach/newclass': 'TeacherController.newClass',
    'get /teach/class/:classid': 'TeacherController.viewClass',
    'get /teach/class/:classid/photo': 'TeacherController.viewClassPhoto',
    'get /teach/class/:classid/classdata': 'TeacherController.getClassPhotoData',
    'post /teach/class/:classid/newpupil': 'TeacherController.addPupil',
    'post /teach/class/:classid/regenerate': 'TeacherController.regenKey',
    'post /teach/class/:classid/deletePupil': 'TeacherController.deletePupil',
   // 'get /teach/start/:pupilid': 'TeacherController.startSession',
    'get /teach/review/:pupilid': 'TeacherController.reviewPupil',
    'get /teach/review/:pupilid/graphdata': 'TeacherController.reviewPupilGraphData',

    'get /student':'GameController.home' ,
    'get /student/welcome':'StudentController.quiz' ,
    'post /student/welcome':'StudentController.finishQuiz' ,
    'get /student/profile':'StudentController.profile',
    'post /student/buy': 'StudentController.saveProfile',
    'get /student/play/:gameslug': 'GameController.play',
    'get /student/play/:gameslug/startdata': 'GameController.startGame',
    //'post /student/play/:gameslug/end': 'GameController.endGame',
    'get /student/testdata': 'GameController.testdata',
    'get /student/python': 'GameController.pythonTest',
    'get /student/getWords': 'GameController.getWords',
    'post /student/getMatchingPair': 'GameController.getWords',
    'post /student/savedata': 'GameController.savetestdata',
    'post /student/play/end': 'GameController.endGame',
    'get /student/login': 'StudentController.loginForm',
    'post /student/login': 'StudentController.login',
};
