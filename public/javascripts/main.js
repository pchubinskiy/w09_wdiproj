$(function() {
  var apiRoot = '/api/v1/answers/';

  function loadAnswers() {

    $.ajax({
      url: apiRoot,
      type: 'GET',
      dataType: 'json',
      crossDomain: 'true',
      data: {},
    })
    .done(function(answers) {
      console.log("success: " + answers);
      displayAnswers(answers);
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });
  }

  function displayAnswers(answers) {
    $('#answer').empty();

    for (var i=answers.length-5; i<answers.length; i++) {
      var answer = answers[i];
      appendAnswers(answer);
    }
  }

  function appendAnswers(answer) {
    $('#question_').after('<p>' + answer.text + '</p>');
  }

  $("#submit-answer").click(function(event) {
    var answer = $('#answer').val();

    if (!answer) {
      return;
    }

    $('#answer').val("");

    $.ajax({
      url: apiRoot,
      type: 'POST',
      dataType: 'json',
      data: {answer: answer},
    })
    .done(function(answer) {
      console.log("submit success: " + answer);
    })
    .fail(function(jqXHR, textStatus) {
      console.log("submit error: " + textStatus);
    })
    .always(function() {
      console.log("submit complete");
    });

    setTimeout(1000, loadAnswers());
  });

  loadAnswers();
});
