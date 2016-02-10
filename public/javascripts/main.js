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

    for (var i=0; i<answers.length; i++) {
      var answer = answers[i];
      appendAnswers(answer);
    }
  }

  function appendAnswers(answer) {
      $('span.question_').each(function() {
        var children = $(this).parent().children().length;
        //console.log((this).innerHTML + " log children: " + (children - 1));
        if ((this).getAttribute("value") === answer.response_to) {
          if (children <= 5) {
              $(this).after('<p>' + answer.text + '</p>');
          } else { return false;}
        }
      });
  }

  function updateQuestion(question) {
    //console.log("trying to update Q " + question.text);
    $("#prompt_question").html(question.text);
    var new_question_info = question._id + " " + question.category;
    $("#prompt_question").attr("value", new_question_info);
  }

  $("#submit-answer").click(function(event) {
    var answer = $('#answer').val();
    var prompt_question = $('#prompt_question').attr("value");

    if (!answer) {
      return;
    }

    $('#answer').val("");
    $('#prompt_question').val("");

    $.ajax({
      url: apiRoot,
      type: 'POST',
      dataType: 'json',
      data: {
        answer: answer,
        prompt_question: prompt_question
      },
    })
    .done(function(answer) {
      console.log("submit success: " + answer);
      updateQuestion(answer);
      setTimeout(1000, loadAnswers());
    })
    .fail(function(jqXHR, textStatus) {
      console.log("submit error: " + textStatus);
    })
    .always(function() {
      console.log("submit complete");
    });
  });

  loadAnswers();
});
