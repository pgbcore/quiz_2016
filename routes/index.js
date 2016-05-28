var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var userController = require('../controllers/user_controller');
var sessionController = require('../controllers/session_controller');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET author page. */
router.get('/author', function(req, res, next) {
  res.render('author');
});


// Autoload de parametros
router.param('quizId', quizController.load);  // autoload :quizId
router.param('userId', userController.load);  // autoload :userId
router.param('commentId', commentController.load);  // autoload :commentId


// Definición de rutas de sesion
router.get('/session',    sessionController.new);     // formulario login
router.post('/session',   sessionController.create);  // crear sesión
router.delete('/session', sessionController.destroy); // destruir sesión


// Definición de rutas de cuenta
router.get('/users',                    userController.index);   // listado usuarios
router.get('/users/:userId(\\d+)',      userController.show);    // ver un usuario
router.get('/users/new',                userController.new);     // formulario sign un
router.post('/users',                   userController.create);  // registrar usuario
router.get('/users/:userId(\\d+)/edit', sessionController.loginRequired, sessionController.autologout, userController.edit);  
router.put('/users/:userId(\\d+)',      sessionController.loginRequired, sessionController.autologout, userController.update);   
router.delete('/users/:userId(\\d+)',   sessionController.loginRequired, sessionController.autologout, userController.destroy);  


// Definición de rutas de /quizzes
router.get('/quizzes',                     quizController.index);
router.get('/quizzes/:quizId(\\d+)',       quizController.show);
router.get('/quizzes/:quizId(\\d+)/check', quizController.check);
router.get('/quizzes/new',                 sessionController.loginRequired, sessionController.autologout, quizController.new);
router.post('/quizzes',                    sessionController.loginRequired, sessionController.autologout, quizController.create);
router.get('/quizzes/:quizId(\\d+)/edit',  sessionController.loginRequired, sessionController.autologout, quizController.edit);
router.put('/quizzes/:quizId(\\d+)',       sessionController.loginRequired, sessionController.autologout, quizController.update);
router.delete('/quizzes/:quizId(\\d+)',    sessionController.loginRequired, sessionController.autologout, quizController.destroy);


// Definición de rutas de comentarios
router.get('/quizzes/:quizId(\\d+)/comments/new',  sessionController.loginRequired, sessionController.autologout, commentController.new);
router.post('/quizzes/:quizId(\\d+)/comments',     sessionController.loginRequired, sessionController.autologout, commentController.create);
router.put('/quizzes/:quizId(\\d+)/comments/:commentId(\\d+)/accept',     sessionController.loginRequired, sessionController.autologout, commentController.accept);


module.exports = router;
