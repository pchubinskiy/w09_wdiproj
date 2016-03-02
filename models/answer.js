var mongoose = require('mongoose');

var answerSchema = new mongoose.Schema({
  text: { type: String, required: true },
  category: { type: String, required: true },
  response_to: { type: String, required: true },
  createdAt: { type: Date, required: true },
  formattedDate: { type: String }
});

var Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;

