var mongoose = require('mongoose');
var random = require('mongoose-simple-random');

var questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  category: String
});
questionSchema.plugin(random);

var Question = mongoose.model('Question', questionSchema);

module.exports = Question;

