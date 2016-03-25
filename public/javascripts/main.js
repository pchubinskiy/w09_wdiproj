$(function() {
  var apiRoot = '/api/v1/answers/';
  var lock = 0;

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
    for (var i=0; i<answers.length; i++) {
      for (var j=0; j<answers[i].length; j++) {
        var answer = answers[i][j];
        appendAnswers(answer, i, j);
      }
    }
  }

  function appendAnswers(answer, i, j) {
    var content = answer.text + '<span class="answer_item">' + answer.formattedDate + '</span>';
    var logged_ans = document.getElementById("ans "+i+"-"+j);
    logged_ans.innerHTML = content;
  }

  function updateQuestion(question) {
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
    .done(function(result) {
      console.log("submit success: " + result);
      updateQuestion(result);
      lock += 1;
    })
    .fail(function(jqXHR, textStatus) {
      console.log("submit error: " + textStatus);
    })
    .always(function() {
      console.log("submit complete");
    });
  });

  $(document).keypress(function(e) {
    if(e.which == 13) {
      e.preventDefault();
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
      .done(function(result) {
       console.log("submit success: " + result);
       updateQuestion(result);
       lock += 1;
      })
      .fail(function(jqXHR, textStatus) {
       console.log("submit error: " + textStatus);
      })
      .always(function() {
       console.log("submit complete");
      });
    }
  });

  window.setInterval(loadAnswers, 1000);

  if (lock === 0) {
    loadAnswers();
  } else {
    return;
  }
});
