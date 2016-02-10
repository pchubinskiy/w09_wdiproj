var express = require('express');
var router = express.Router();
var Answer = require('../../../models/answer');
var Question = require('../../../models/question');

router.get('/', function(req, res) {

  Answer.find({}, 'text category response_to', function(err, answer_list) {
    if (err) {
      console.log(err);
      throw err;
    }

    answer_list.sort(function(a,b) {
      return b.createdAt - a.createdAt;
    });

    res.status(200).json(answer_list);
  });
});

router.post('/', function(req, res) {
  //get question type array: [question id, question category]
  var question_type = req.body.prompt_question.split(" ");
  var question_id = question_type[0];
  var question_category = question_type[1];
  var lock = 1;

  var newAnswer = Answer({
    text: req.body.answer,
    category: question_category,
    response_to: question_id,
    createdAt: Date()
  });

  newAnswer.save(function(err, answer) {
    if (err) console.log(err);
    console.log(answer);
    lock -= 1;

    if (lock === 0) {
      Question.findOneRandom({}, 'text category', function(err, question) {
      if (err) {
        console.log(err);
        throw err;
      }
      console.log(question);
        res.json(question);
      });
    }
  });
});

module.exports = router;
