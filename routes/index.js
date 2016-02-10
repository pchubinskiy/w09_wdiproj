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
    //lock -= 1;
    //console.log("random q: " + question);

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
          //console.log("random q list: " + questions_list);
          finishRequest();
        }
      });
    }
  });
});

//setTimeout() or alternative on homepage to update answers to questions as they are submitted

module.exports = router;
