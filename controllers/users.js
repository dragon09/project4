// var express = require('express');
// var ctrl = express.Router();
//
//
// // Import model
// // var User = require('../models/User');
//
// /* GET users listing. */
// ctrl.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
//
// /* GET /users/register */
// ctrl.get('/register', renderForm);
//
//
// /* POST /users/register */
// ctrl.post('/register', attemptToRegister);
//
// /* POST /users/login/new_user */
// // ctrl.post('/users/login/new_user', attemptToLogin)
// ctrl.post('/users/login', attemptToLogin)
// /* POST /users/login */
// ctrl.post('/login', attemptToLogin);
//
// /* GET /users/login */
// ctrl.get('/login', renderLogin);
//
//
// function renderLogin(req, res, next) {
//   res.render('login', {});
// };
//
// function renderForm(req, res, next) {
//   res.render('form', {});
// };
//
//
// function attemptToLogin(req, res, next) {
//   var password = req.body.password;
//   User.where('email', req.body.email).fetch().then(
//     function (result) {
//       console.log('DB result:', result);
//       var attempt = comparePasswordHashes(req.body.password, result.attributes.password_hash);
//       if(attempt){
//         req.session.theResultsFromModelInsertion = result.attributes.email;
//         req.session.user = result.attributes;
//         res.redirect('/home')
//       } else {
//         res.status(403).send("Invalid credentials.");
//       }
//     });
// };
//
// function attemptToRegister(req, res, next) {
//
//   console.log(req.session);
//   var password = req.body.password;
//   var hashedPassword = createPasswordHash(password);
//   var account = new User({
//     first_name: req.body.first_name,
//     email: req.body.email,
//     password_hash: hashedPassword
//   }).save().then(function(result) {
//     req.session.theResultsFromModelInsertion = result.attributes.email;
//     req.session.user = result.attributes;
//     console.log(result.attributes.email);
//     res.redirect('/home')
//   });
// };
//
//
//
//
//
// function createPasswordHash (password) {
//   var salt = 10; // salt factor of 10
//
//
//   var hash = bcrypt.hashSync(password, salt);
//   return hash;
// };
// function comparePasswordHashes (input, db) {
//   return bcrypt.compareSync(input, db);
// };
//
//
// module.exports = ctrl;
