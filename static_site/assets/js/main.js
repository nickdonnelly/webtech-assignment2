// API STUFF
var API_BASE_URL = 'http://trump-api.herokuapp.com/api/revision1/';

var trump_intro = 'trump-welcome.jpg';

var rounds_played = 0;
//GAME STATES: 0 = begin screen, 1 = question screen, 2 = in between questions, 3 = score+replay
var score = 0;
var quote_index = 0;
var current_quote = '';
var correct_answer = 'trump';
var chosen_answer = '';
var current_image_uri = '';

var num_questions = 10; // TODO: make this changeable by slider on front page.
var all_questions = [];

$(document).ready(function(){
    $('.wrapper').css({opacity: '1', transform: 'none'}); // fade it in and move it up a bit
    requestQuestions();

    $('#start-button').click(function(){
      $('.begin-container').hide('fast');
      rounds_played = 1;
      queueQuestion();
      $('.question-container').show('slow');
    });

    $('#choice-trump').click(function(){
      if('trump' === correct_answer){
        showCorrect();
      }else{
        showIncorrect();
      }
      queueQuestion();
    });
    $('#choice-other').click(function(){
      if('other' === correct_answer){
        showCorrect();
      }else{
        showIncorrect();
      }
      queueQuestion();
    });
    $('#choice-none').click(function(){
      if('none' === correct_answer){
        showCorrect();
      }else{
        showIncorrect();
      }
      queueQuestion();
    });

    $('#next-question').click(function(){
      if(rounds_played > 10){
        showEnd();
      }else{
        queueQuestion();
        $('.next-question-container').hide('fast');
        $('.question-container').show('fast');
      }
    });

    $('#play-again').click(function(){
      location.reload(); // refresh page.
    });

});

function requestQuestions(){
  var xReq = $.get(API_BASE_URL + 'quote/10', function(data){
    if(!data.error){
      all_questions = all_questions.concat(data.value); // add all the stuff it returned.
    }else{
      location.reload(); // try again.
    }
  });
}

function queueQuestion(){
  if(rounds_played - 1 < 10){
    correct_answer = all_questions[rounds_played - 1].attribution;
    current_quote = all_questions[rounds_played - 1].text;
    $('#question-counter').text("Question " + rounds_played +" of 10");
    $('#quote').text('"' + current_quote + '"');
  }
}

function showCorrect(){
  var zReq = $.get(API_BASE_URL + 'image/true', function(data){
    if(!data.error){
      current_image_uri = data.value;
      $('#between-img').attr("src", current_image_uri);
    }else{
      // if it fails, just set it to a static one.
      $('#between-img').attr("src", 'assets/img/trump-right-1.jpg');
    }
  });
  rounds_played++;
  score++;
  $('#correct-indicator').text("You were correct!");
  $('#correct-answer-reveal').text("It was said by " + getCorString(correct_answer) + ".");
  $('.next-question-container').addClass('correct');
  $('.next-question-container').removeClass('incorrect');
  img_str = "assets/img/trump-right-" + (Math.floor(Math.random() * 3) + 1) + ".jpg"
  $('#between-img').attr("src", img_str);
  if(rounds_played > 10){
    var jReq = $.get(API_BASE_URL + 'endgame/' + score, function(data){
      if(!data.error){
        $('#endgame-quote').text(data.value);
      }
    });
    $('#next-question').text("Show my score");
  }
  $('.question-container').hide('fast');
  $('.next-question-container').show('fast');
}

function showIncorrect(){
  var yReq = $.get(API_BASE_URL + 'image/false', function(data){
    if(!data.error){
      current_image_uri = data.value;
      $('#between-img').attr("src", current_image_uri);
    }else{
      $('#between-img').attr("src", 'assets/img/trump-wrong-1.jpg');
    }
  });
  rounds_played++;
  $('#correct-indicator').text("You were incorrect!");
  $('#correct-answer-reveal').text("It was said by " + getCorString(correct_answer) + ".");
  $('.next-question-container').removeClass('correct');
  $('.next-question-container').addClass('incorrect');
  if(rounds_played > 10){
    var kReq = $.get(API_BASE_URL + 'endgame/' + score, function(data){
      if(!data.error){
        $('#endgame-quote').text(data.value);
      }
    });
    $('#next-question').text("Show my score");
  }
  $('.question-container').hide('fast');
  $('.next-question-container').show('fast');
}


function getCorString(inp){
  if(inp === "trump") return "Trump";
  if(inp === "other") return "somebody else";
  if(inp === "none") return "nobody";
  return "nobody";
}

function showEnd(){
  $('#scorenum').text(score + '/10');
  $('.next-question-container').hide('fast');
  $('.game-over-container').show('fast');
}
