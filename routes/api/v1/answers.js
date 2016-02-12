var express = require('express');
var router = express.Router();
var Answer = require('../../../models/answer');
var Question = require('../../../models/question');

router.get('/', function(req, res) {
  // lock = 1;
  // var date_sort_asc = function (date1, date2) {
  //   // This is a comparison function that will result in dates being sorted in
  //   // ASCENDING order. As you can see, JavaScript's native comparison operators
  //   // can be used to compare dates. This was news to me.
  //   console.log(date1);
  //   console.log(date2);
  //   if (date1.createdAt > date2.createdAt) return 1;
  //   if (date1.createdAt < date2.createdAt) return -1;
  //   return 0;
  // };
  // var date_sort_desc = function (date1, date2) {
  //   // This is a comparison function that will result in dates being sorted in
  //   // DESCENDING order.
  //   console.log(date1);
  //   console.log(date2);
  //   if (date1.createdAt > date2.createdAt) return -1;
  //   if (date1.createdAt < date2.createdAt) return 1;
  //   return 0;
  // };

  Answer.find({category: "general"}, 'text category response_to createdAt', function(err, general) {
    if (err) {
      console.log(err);
      throw err;
    }
    Answer.find({category: "challenges"}, 'text category response_to createdAt', function(err, challenges) {
      if (err) {
        console.log(err);
        throw err;
      }
      Answer.find({category: "deliverables"}, 'text category response_to createdAt', function(err, deliverables) {
        if (err) {
          console.log(err);
          throw err;
        }
        Answer.find({category: "technologies"}, 'text category response_to createdAt', function(err, technologies) {
          if (err) {
            console.log(err);
            throw err;
          }

          //answer_list.sort(date_sort_asc);
          var answer_list = [
            general,
            challenges,
            deliverables,
            technologies
          ]
          //console.log(answer_list)
          //console.log(general, challenges, deliverables, technologies);
          //if (lock === 0) {
            res.status(200).json(answer_list);
          //}
        }).limit(5).sort({ createdAt: 1 });;
      }).limit(5).sort({ createdAt: 1 });;
    }).limit(5).sort({ createdAt: 1 });;
  }).limit(5).sort({ createdAt: 1 });
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
