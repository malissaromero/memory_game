var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var dataSchema   = new Schema({
  user: String,
  relativeName: String,
  photo: String
});

module.exports = mongoose.model('Data', dataSchema);
