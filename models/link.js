const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LinkSchema = new Schema({
  name: String,
  link: String
});
const link = mongoose.model('link', LinkSchema);

module.exports = link;
