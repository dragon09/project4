$(document).ready(function() {

  console.log('lol')

  var schema = {
     properties: {
        asin: {
           description: 'Enter the product ASIN',
           type: 'string',
           required: true
        },

     }
  };

  prompt.start();

  prompt.get(schema, function (error, result) {
     asin = result.asin;
     price = result.price;
     pb_token = result.pb_token;

  });


});
