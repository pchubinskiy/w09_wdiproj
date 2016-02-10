var mongoose = require('mongoose');

var answerSchema = new mongoose.Schema({
  text: { type: String, required: true },
  category: { type: String, required: true },
  response_to: { type: String, required: true },
  createdAt: { type: String, required: true }
});

var Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;

