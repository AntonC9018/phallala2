const mongoose = require('mongoose');

//connect to MongoBD
mongoose.connect('mongodb://localhost/test');

mongoose.connection.once('open', function() {
  console.log('Connected to DB');
}).on('error', console.error.bind(console, 'connection error:'));
module.exports = mongoose.connection;
