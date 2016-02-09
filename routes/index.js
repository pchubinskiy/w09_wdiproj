var express = require('express');
var router = express.Router();
var Question = require('../models/question');

/* GET home page. */
router.get('/', function(req, res, next) {

  Question.findOneRandom({}, 'text category', function(err, result) {
    if (err) {
      console.log(err);
      throw err;
    }

    console.log("logging... ");
    console.log(result);
    res.render('index', { title: 'QandA', question: result.text });
  });
});

module.exports = router;
