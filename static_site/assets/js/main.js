// ASSET FILENAMES
var trump_correct = ['trump-right-1.jpg', 'trump-right-2.jpg', 'trump-right-3.jpg'];
var trump_wrong = ['trump-wrong-1.jpg', 'trump-wrong-2.jpg', 'trump-wrong-3.jpg'];
var trump_intro = 'trump-welcome.jpg';
var trump_quotes = [
  "An ‘extremely credible source’ has called my office and told me that Barack Obama’s birth certificate is a fraud.",
  "Robert Pattinson should not take back Kristen Stewart. She cheated on him like a dog & will do it again – just watch. He can do much better!",
  "Ariana Huffington is unattractive, both inside and out. I fully understand why her former husband left her for a man – he made a good decision.",
  "Lyin’ Ted Cruz just used a picture of Melania from a shoot in his ad. Be careful, Lyin’ Ted, or I will spill the beans on your wife!",
  "Number one, I have great respect for women. I was the one that really broke the glass ceiling on behalf of women, more than anybody in the construction industry.",
  "The other candidates — they went in, they didn’t know the air conditioning didn’t work. They sweated like dogs…How are they gonna beat ISIS? I don’t think it’s gonna happen.",
  "My Twitter has become so powerful that I can actually make my enemies tell the truth.",
  "My IQ is one of the highest - and you all know it! Please don't feel so stupid or insecure; it's not your fault.",
  "The point is, you can never be too greedy.",
  "I have never seen a thin person drinking Diet Coke.",
  "It's freezing and snowing in New York - we need global warming!",
  "The beauty of me is that I'm very rich.",
  "When Mexico sends its people, they're not sending the best. They're not sending you, they're sending people that have lots of problems and they're bringing those problems with us. They're bringing drugs. They're bringing crime. They're rapists... And some, I assume are good people.",
  "If I were running 'The View', I'd fire Rosie O'Donnell. I mean, I'd look at her right in that fat, ugly face of hers, I'd say 'Rosie, you're fired.'"
];
var other_quotes = [
  "And where I excel is ridiculous, sickening, work ethic. You know, while the other guy's sleeping? I'm working.",
  "I'm having a great time. It's like I'm on some ridiculous big roller coaster not knowing what's happening next, but just having a great time on the ride.",
  "Everyone is entitled to their own opinion. It's just that yours is stupid.",
  "If you don't like your job, you don't strike! You just go in every day, and do it really half assed. That's the American way.",
  "Would you believe in what you believe in if you were the only one who believed in it?",
  "I walk through the hotel, and I walk down the street, and people look at me like I'm insane, like I'm Hitler.",
  "Hitler massacred three million Jews. Now, there is three million drug addicts. I'd be happy to slaughter them.",
  "Barack Obama is a son of a whore.",
  "If you know of any addicts, go ahead and kill them yourself as getting their parents to do it would be too painful.",
  "Disney expects us to believe that Mulan's ingenuity and courage were enough to carry her to military success on an equal basis with her cloddish cohorts.",
];
var none_quotes = [
  "China always wins, we always lose. We need to win again.",
  "I don't hate China, I mean, I don't hate Chinese people or anything. I just think America deserves better.",
  "She's disgusting. Honestly, disgusting. Please don't bring up Rosie again.",
  "I will be the greatest president who will ever take the office.",
  "Mike Pence is a great human being.",
  "We're going to make America great again. We're going to seal up the borders and make sure ISIS is prompty obliterated.",
  "ISIS should be running scared, let me tell you.",
  "I vow that I will not let Shillary Clinton take away your guns.",
  "Reducing taxes on the wealthy is a really good way to stimulate the economy for middle class Americans.",
  "My new hotel is wonderful, I mean, it is built by the finest workers and it is really just so beautiful. You're going to love it.",
  "The bankruptcy laws here in America have allowed me to attain great wealth.",
  "My tax returns are very long, you wouldn't really even want me to release them.",
  "We need to drain the swamp, and replace all the corrupt politicians with billionaires.",
  "Clean coal is good for the environment, that's why they call it clean.",
];
var rounds_played = 0;
//GAME STATES: 0 = begin screen, 1 = question screen, 2 = in between questions, 3 = score+replay
var score = 0;
var quote_index = 0;
var current_quote = '';
var correct_answer = 'trump';
var chosen_answer = '';

$(document).ready(function(){
    $('.wrapper').css({opacity: '1', transform: 'none'}); // fade it in and move it up a bit

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

function queueQuestion(){
  var xReq = $.get('http://localhost:3000/api/revision1/quote/10', function(data){
    console.log(data.value[0].text + data.value[0].attribution);
  });
  x = Math.floor(Math.random() * 3); // btwn 0 and 2
  if(x == 0){ // trump
    correct_answer = 'trump';
    quote_index = Math.floor(Math.random() * trump_quotes.length);
    current_quote = trump_quotes[quote_index];
    trump_quotes.splice(quote_index, 1); // remove it
  }else if(x == 1){ // other
    correct_answer = 'other';
    quote_index = Math.floor(Math.random() * other_quotes.length);
    current_quote = other_quotes[quote_index];
    other_quotes.splice(quote_index, 1);
  }else{ // nobody
    correct_answer = 'none';
    quote_index = Math.floor(Math.random() * none_quotes.length);
    current_quote = none_quotes[quote_index];
    none_quotes.splice(quote_index, 1);
  }
  $('#question-counter').text("Question " + rounds_played +" of 10");
  $('#quote').text('"' + current_quote + '"');
  //
}

function showCorrect(){
  rounds_played++;
  score++;
  $('#correct-indicator').text("You were correct!");
  $('#correct-answer-reveal').text("It was said by " + getCorString(correct_answer) + ".");
  $('.next-question-container').addClass('correct');
  $('.next-question-container').removeClass('incorrect');
  img_str = "assets/img/trump-right-" + (Math.floor(Math.random() * 3) + 1) + ".jpg"
  $('#between-img').attr("src", img_str);
  if(rounds_played > 10) $('#next-question').text("Show my score");
  $('.question-container').hide('fast');
  $('.next-question-container').show('fast');
}

function showIncorrect(){
  rounds_played++;
  $('#correct-indicator').text("You were incorrect!");
  $('#correct-answer-reveal').text("It was said by " + getCorString(correct_answer) + ".");
  $('.next-question-container').removeClass('correct');
  $('.next-question-container').addClass('incorrect');
  img_str = "assets/img/trump-wrong-" + (Math.floor(Math.random() * 3) + 1) + ".jpg"
  $('#between-img').attr("src", img_str);
  if(rounds_played > 10) $('#next-question').text("Show my score");
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
