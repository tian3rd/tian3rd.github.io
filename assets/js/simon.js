var buttonColors = ["red", "blue", "green", "yellow"];
// no big different in the following initialisation
var gamePattern = new Array();
var userChosenPattern = [];
var started = false;
var level = 0;
var userClicks = 0;

// generate level seq with animation and sound
function nextSequence() {
  // at the start of the game states
  userClicks = 0;
  userChosenPattern = [];
  // increse level by 1
  level += 1;
  $("#level-title").text("Level " + level);
  gamePattern = new Array();
  //   generate level seq
  for (var i = 0; i < level; i++) {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
  }
  //   beware of delay, do not contain the anonymous function directly in a loop
  for (var k = 0; k < level; k++) {
    // use jQuery to select chosen color to flash
    flashSound(k);
  }
}

// flash button and play sound after j seconds using delay.
function flashSound(j) {
  // because there's an anonymous function, don't call it in a loop
  setTimeout(function () {
    $("#" + gamePattern[j])
      // flash animation
      .fadeOut(100)
      .fadeIn(100);
    playSound(gamePattern[j]);
  }, 1000 * j);
}

// choose type=button or $('.btn') using class property
// $("div[type='button'").click(function (e) {
//   var userChosenColor = e.target.id;
//   userChosenPattern.push(userChosenColor);
// });

/* main logic while a user clicks a button:
 * 1. play sound, animate
 * 2. check if the seq is right or not: wrong -> restart at level 0
 * 3. check if the seq has completed: if correct seq -> next level
 * 4. whenever wrong, display gameover settings
 */
$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userChosenPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  if (userChosenPattern.length <= gamePattern.length) {
    if (userChosenPattern[userClicks] != gamePattern[userClicks]) {
      console.log(userClicks);
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 1000);
      level = 0;
      started = false;
      // game over sound
      playSound("wrong");
      $("#level-title").html("Game Over <p>Press any key</p>");
    }
    if (userChosenPattern.length == gamePattern.length && started) {
      $("#level-title").text("Bingo!");
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  userClicks++;
});

function playSound(name) {
  var chosenSound = new Audio("/sounds/" + name + ".mp3");
  chosenSound.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  // add and remove later for animation
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// listen for a key event to start the game
$(document).on("keydown", function () {
  if (!started) {
    started = true;
    nextSequence();
  }
});
