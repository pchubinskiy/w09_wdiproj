var mongoose = require('mongoose');

var answerSchema = new mongoose.Schema({
  text: { type: String, required: true },
  //category: String
});

var Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;

