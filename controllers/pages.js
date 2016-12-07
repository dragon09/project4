var express = require('express');
var ctrl = express.Router();

<!-- <div class="dropdown-menu">
  <h5>Price Checker Amazon:</h5>
<ul>
  <li><a href="/all">All</a></li>
  <li><a href="/apparel">Apparel</a></li>
  <li><a href="/beauty">Beauty</a></li>
  <li><a href="/books">Books</a></li>
  <li><a href="/electronics">Electronics</a></li>
  <li><a href="/tools">Tools</a></li>
  <li><a href="/toys">Toys</a></li>
</ul>
</div> -->



ctrl.get('/all', function(req, res, next){
  res.render('page', { title: 'Welccome to all your products' });
});

ctrl.get('/apparel', function(req, res, next){
  res.render('page', { title: 'Welcome to apparel' });
});


ctrl.get('/beauty', function (req, res, next) {
  res.render('page', { title: 'Welcome to beauty'});
});

ctrl.get('/books', function (req, res, next) {
  res.render('page', { title: 'Welcome to books'});
});

ctrl.get('/electronics', function (req, res, next) {
  res.render('page', { title: 'Welcome to electronics'});
});
ctrl.get('/tools', function (req, res, next) {
  res.render('page', { title: 'Welcome to tools'});
});
ctrl.get('/toys', function (req, res, next) {
  res.render('page', { title: 'Welcome to toys'});
});



module.exports = ctrl;
