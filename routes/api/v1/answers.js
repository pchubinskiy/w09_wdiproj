var express = require('express');
var router = express.Router();
var Answer = require('../../../models/answer');
var Question = require('../../../models/question');
var moment = require('moment');

router.get('/', function(req, res) {

  Answer.find({category: "reading"}, 'text category response_to createdAt', function(err, reading) {
    if (err) {
      console.log(err);
      throw err;
    }
    Answer.find({category: "sports"}, 'text category response_to createdAt', function(err, sports) {
      if (err) {
        console.log(err);
        throw err;
      }
      Answer.find({category: "movies"}, 'text category response_to createdAt', function(err, movies) {
        if (err) {
          console.log(err);
          throw err;
        }
        Answer.find({category: "food"}, 'text category response_to createdAt', function(err, food) {
          if (err) {
            console.log(err);
            throw err;
          }

          var answerList = [
            reading,
            sports,
            movies,
            food
          ]

          for (var i=0; i<answerList.length; i++) {
            for (var j=0; j<answerList[i].length; j++) {
              answerList[i][j].formattedDate = moment(answerList[i][j].createdAt).format("h:mm a, MM/DD/YY");
            }
          }

          res.status(200).json(answerList);

        }).limit(5).sort({ createdAt: -1 });
      }).limit(5).sort({ createdAt: -1 });
    }).limit(5).sort({ createdAt: -1 });
  }).limit(5).sort({ createdAt: -1 });
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
