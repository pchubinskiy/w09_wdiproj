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
    $('#answer').empty();

    for (var i=0; i<answers.length; i++) {
      var answer = answers[i];
      appendAnswers(answer);
    }
  }

  function appendAnswers(answer) {
      $('span.question_').each(function() {
        if ((this).getAttribute("value") === answer.response_to) {

          //console.log("iterating over: " + (this).getAttribute("value"));
          $(this).parent().children('.par').each(function() {
            //if the child's "value" attr (_id) is === to answer._id
            //return false
            //console.log("child: " + (this).innerHTML);
            if ((this).getAttribute("value") === answer._id) {
              return;
            }
          });

          var children = $(this).parent().children().length;
          //console.log((this).innerHTML + " log children: " + (children - 1));
          //if ((this).getAttribute("value") === answer.response_to) {
            if (children <= 5) {

              $(this).after('<p class="par" value="' + answer._id + '">' + answer.text + '</p>');
            } else { return;}
        } else { return;}
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
    .done(function(result) {
      console.log("submit success: " + result);
      updateQuestion(result);
      lock += 1;
      console.log("lock! " + lock);
      setTimeout(1000, loadAnswers());
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
       console.log("lock! " + lock);
       setTimeout(1000, loadAnswers());
      })
      .fail(function(jqXHR, textStatus) {
       console.log("submit error: " + textStatus);
      })
      .always(function() {
       console.log("submit complete");
      });
    }
  });

  if (lock === 0) {
    loadAnswers();
  } else {
    return;
  }
});
