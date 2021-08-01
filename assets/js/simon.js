var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = new Array();
var userChosenPattern = [];

var started = false;
var level = 0;

var userClicks = 0;

function nextSequence() {
  userClicks = 0;
  userChosenPattern = [];
  // increse level by 1
  level += 1;
  $("#level-title").text("Level " + level);
  gamePattern = new Array();
  for (var i = 0; i < level; i++) {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
  }
  for (var k = 0; k < level; k++) {
    // use jQuery to select chosen color to flash
    flashSound(k);
  }
}

// flash button and play sound after j seconds using delay.
function flashSound(j) {
  setTimeout(function () {
    $("#" + gamePattern[j])
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
      var gameOverSound = new Audio("/sounds/wrong.mp3");
      gameOverSound.play();
      $("#level-title").html("Game Over <p>Press any key</>");
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
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

$(document).on("keydown", function (e) {
  if (!started) {
    started = true;
    nextSequence();
  }
});
