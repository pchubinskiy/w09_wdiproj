var express = require('express');
var router = express.Router();
var Question = require('../models/question');

/* GET home page. */
router.get('/', function(req, res, next) {
  var lock = 1;

  Question.findOneRandom({}, 'text category', function(err, question) {
    if (err) {
      console.log(err);
      throw err;
    }

    if (question) {
      Question.find({}, 'text category', function(err, questions_list) {
        if (err) {
          console.log(err);
          throw err;
        }
        lock -= 1;
        var finishRequest = function() {
          res.render('index', { title: 'QandA', question: question, questions_list: questions_list });
        }
        if (lock === 0) {
          finishRequest();
        }
      });
    }
  });
});

module.exports = router;
