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
      console.log("success: " + answers.length);
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
    //$('#answer').empty();

    for (var i=0; i<answers.length; i++) {
      for (var j=0; j<answers[i].length; j++) {
        var answer = answers[i][j];
        appendAnswers(answer, i, j);
      }
    }
    // for (var i=0; i<answers.length; i++) {
    //   var answer = answers[i];
    //   appendAnswers(answer, i);
    // }
  }

  function appendAnswers(answer, q, a) {
    var content = answer.text + '<span style="margin-left: 30px;">' + answer.createdAt + '</span>'
    console.log(number);

    $('div.question_').each(function() {
      if ((this).getAttribute("value") === answer.response_to) {
        $(this).children('.ans').each(function() {
          if ($(this).hasClass(number)) {
            $(this).attr("value", answer._id).html(content);
          }
        });
      } else { return;}
    });
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
      // console.log("lock! " + lock);
      // setTimeout(1000, loadAnswers());
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
       // console.log("lock! " + lock);
       // setTimeout(1000, loadAnswers());
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
