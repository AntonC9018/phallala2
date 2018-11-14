const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CatSchema = new Schema({
  name: String,
  weight: String
});
const cat = mongoose.model('cat', CatSchema);

module.exports = cat;
