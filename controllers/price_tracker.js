var request = require('request');
var fs = require('fs');
var cheerio = require('cheerio');
var prompt = require('prompt');
var pb = require('pushbullet');


// var asin = 'B01E6AO69U';
//http://www.amazon.com/dp/B008BEYEL8

var amzn_domain_url= "http://www.amazon.com/dp/";
var asin='';
var amzn_url = '';

prompt.start();

prompt.get(['asin'], function(err,result) { console.log('Entered amazon url is ' + result.asin); amzn_url = amzn_domain_url + result.asin;
  console.log('requesting', amzn_url);

  request(amzn_url, function (error, response, body) {
    fs.writeFile('product.html', body, function(error) {
      console.log('Page has been saved!');
    });

  });

  checkPrice();

})

var prev_price;

function checkPrice() {
  request (amzn_url, function (error, response, body) {
    var $ = cheerio.load(body);
    var list_price = $('#priceblock_ourprice').text();
    var item_name = $("#productTitle").text();
    var stripped_price = + list_price.replace('$', '').replace(',', '');
    console.log('PRICE:', stripped_price);

    if (stripped_price <= prev_price){
      notify (item_name, "down", stripped_price, prev_price);
    }

    else if (stripped_price >= prev_price) {
      notify (item_name, "up", stripped_price, prev_price);
    }

    prev_price = stripped_price;

  });

  setTimeout(checkPrice, 60000);
}


var cl = console.log;
var jsonify = JSON.stringify;

function notify(item, updown, current, prev){
  var message = "";
  if (updown == "up" ){
    message = "The item "+ item +" price went up from $"+ prev + " to $"+ current;
  } else if (updown = "down"){
    message = "The item "+ item + " price went down from $"+ current + " from $"+ prev;
  } else{
    message = "There is no change in the item price";
  }
  console.log('Sending PUSH! ALERT!');
  var pushBullet = new pb("o.Di1vhBbC18bYUoxmmQvVffiE5nrb4OKA");
  cl('pushBullet', jsonify(pushBullet));
   console.log("push bullet object", pushBullet);
  pushBullet.note(null, "Amazon Price Watch", message, amzn_url, function (error, response) {

    process.exit()


  });
}

// FE: AJAX calls to BE
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


// in express
// when get request on /update URL

// update = fs.readFileSync('/data/updates.json');
// return update to FE
// this on JSON return
