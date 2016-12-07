var mongoose = require('mongoose');

// 1. define a connection string
var cs = 'mongodb://localhost/fooddb';

// 2. then connect to server/db
mongoose.connect(cs);

// 3. listen for events & log them
mongoose.connection.on('connected', function() {
  console.log('Mongo is up and running');
});

mongoose.connection.on('disconnected', function() {
  console.log('Mongo is DOWN');
});

mongoose.connection.on('error', function(err) {
  console.log('Mongo is having a problem:');
  console.log(err);
});
