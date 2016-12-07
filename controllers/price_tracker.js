var request = require('request');
var fs = require('fs');
var cheerio = require('cheerio');

// var sendgrid = require("sendgrid")("SENDGRID_APIKEY");
// var email = new sendgrid.Email();
//
// email.addTo("test@sendgrid.com");
// email.setFrom("victoria.fajardo@gmail.com");
// email.setSubject("Sending with SendGrid is Fun");
// email.setHtml("and easy to do anywhere, even with Node.js");
//
// sendgrid.send(email);

// var asin = 'B01E6AO69U';
var asin = 'B008BEYEL8';
var amzn_url = 'http://www.amazon.com/dp/' + asin;

console.log('requesting', amzn_url);
request(amzn_url, function (error, response, body) {
  fs.writeFile('product.html', body, function(error) {
    console.log('Page has been saved!');
  });

});

checkPrice();


var prev_price;

function checkPrice() {
  request (amzn_url, function (error, response, body) {
    var $ = cheerio.load(body);
    var list_price = $('#priceblock_ourprice').text();
    var stripped_price = +list_price.replace('$', '').replace(',', '');
    console.log('PRICE:', stripped_price);

    if(stripped_price <= prev_price){
      notify();
    }

    else if (stripped_price >= prev_price) {
      notify();
    }

    prev_price = stripped_price;

  });

  setTimeout(checkPrice, 60000);
}


var cl = console.log;
var jsonify = JSON.stringify;

function notify(){
  console.log('PUSH! ALERT! The  item price  is now lower!');

  console.log('Price is going up!  Buy now!');
  var pushBullet = new pb("o.w4vaucUjHlG3eyEZgjSilhdLObLrmvkk");
  cl('pushBullet', jsonify(pushBullet));
  pushBullet.alert(null, "Amazon Price Watch", "Price dropped for: ", amzn_url, function (error, response) {
    process.exit()

 
  });
}

// FE: AJAX calls to your BE
// BE in Express
// REST request
// jQuery pseudocode


// const updateFreq = 10 * 1000;
// setInterval(getUpdate, updateFreq);
//
// function getUpdate() {
//   $.ajax({
//       url: '/update',
//       data: { productID: 499, ... }
//       success: function(data) {
//         // on success, do this
//         if (data.updated) {
//           $('#update').append(`<p>Item ${data.productID} updated! Now ${data.newPrice}.</p>`);
//         }
//       }
//   })
// }


// BE to price_tracker communication

// in price_tracker

// ... when update found
// var productID = ...;
// var newPrice = ...;


// { productID: 445, newPrice: 45.44 }
//
// var updateRecord = { productID, newPrice };
// fs.writeFileSync('/data/updates.json', updateRecord);


// in express code
// when get request on /update URL

// update = fs.readFileSync('/data/updates.json');
// return update to FE
// make sure this is the JSON return
