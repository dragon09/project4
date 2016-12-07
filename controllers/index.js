var request = require('request');
var prompt = require('prompt');
var pb = require('pushbullet');
var cheerio = require('cheerio');
// var PriceTracker = require('../models/PriceTracker');

// variables
var asin, price, pb_token;
var amzn_url = 'http://www.amazon.com/dp/';
var span_id = '#priceblock_ourprice';
var check_interval = 60000;

var schema = {

  properties: {
    asin: {
      description: 'Enter the product ASIN',
      type: 'string',
      required: true
    },
    price: {
      description: 'Enter the desired price (USD)',
      type: 'number',
      required: true
    },
    pb_token: {
      description: 'Enter you PushBullet token',
      type: 'string',
      required: true,
      hidden: true
    }
  }
};

prompt.start();

prompt.get(schema, function (error, result) {
  if(!error) {
    asin = result.asin;
    price = result.price;
    pb_token = result.pb_token;

    amzn_url += asin;

    checkPrice();
  }
});

function checkPrice() {
  request(amzn_url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(body);

      var list_price = $(span_id).text();
      var stripped_price = list_price.replace('$', '').replace(',',  '');
      if (stripped_price) {
        sendPush();
      }
    } else {
      console.log('Houston...we have a problem.')
    }
  });
  setTimeout(checkPrice, check_interval);
}

function sendPush() {
  var push = new pb(pb_token);

  pusher.note(null, 'Amazon Price Watch', "A product you are watching has dropped in price." + amzn_url (function (error, response) {
    if (!error) {
      process.exit();
    }
  }))
}

controller.get('/', function(req, res, next) {
  res.send('working')
  res.render('index', { title: 'Price Checker Amazon'})
});

controller.use('/index', function (req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.redirect('/account/register');
});

controller.get('home', renderHome)

controller.get('/account/login', function (req, res) {
  res.render('login', {
    title: 'Price Checker Amazon'
  });
});

module.exports = ctrl;
