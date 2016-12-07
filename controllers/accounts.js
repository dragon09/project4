var express = require('express');
var Account = require('../models/Account');
var controller = express.Router();


controller.get('/', function(req, res, next){
  res.send('respond with a resource');
});

controller.get('/register', renderForm);

controller.post('/register', attemptToRegister);

controller.post('/account/login', attemptToLogin)

controller.post('/login', attemptToLogin)

controller.get('/login', renderLogin);

function renderLogin(req, res, next) {
  res.render('login', {});
};

function renderForm(req, res, next) {
  res.render('form', {})
};

function attemptToLogin(req, res, next) {
  var password = req.body.password;
  User.where('email', req.body.email).fetch().then(
    function (result) {
      console.log('DB result:', result);
    })
}

controller.get('/', function(req, res) {
  res.render('account', { user: req.user });
});

controller.get('/register', function(req, res) {
  res.render('register', {});
});

function attemptToRegister (req, res, next) {
  console.log(req.session);
  var password = req.body.password;
  var hashedPassword = createPasswordHash(password);
  var account = new User({
    first_name: req.boy.first_name,
    email: req.body.email,
    password_hash: hashedPassword
  }).save().then(function (result) {
    req.session.theResultsFromModelInsertion = result.attributes.email;
    req.session.user = result.attributes;
    console.log(result.attributes.email);
    res.redirect('/')
  });
};

// controller.post('/register', function(req, res) {
//   Account.register(new Account({ email: req.body.email }),

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


module.exports = ctrl;
