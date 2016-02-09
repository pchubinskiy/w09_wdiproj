var express = require('express');
var router = express.Router();
var Answer = require('../../../models/answer');

router.get('/', function(req, res) {

  Answer.find({}, 'text', function(err, answer_list) {
    if (err) {
      console.log(err);
      throw err;
    }

    res.status(200).json(answer_list);
  });
});

router.post('/', function(req, res) {

  var newAnswer = Answer({
    text: req.body.answer
  });
  newAnswer.save(function(err, answer) {
    if (err) console.log(err);
    console.log(answer);
    res.status(200).json(answer);
  });
});

module.exports = router;
