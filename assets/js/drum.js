// select all drum buttons
const drumList = document.querySelectorAll(".drum");

// think about how to make code robust by getting the css url background filename and pass it to play sound; alert(window.getComputedStyle(this).getPropertyValue("background-image"));
function playSound(letter) {
  var sound;
  switch (letter) {
    case "w":
      sound = new Audio("/sounds/tom-1.mp3");
      sound.play();
      break;
    case "a":
      sound = new Audio("/sounds/tom-2.mp3");
      sound.play();
      break;
    case "s":
      sound = new Audio("/sounds/tom-3.mp3");
      sound.play();
      break;
    case "d":
      sound = new Audio("/sounds/tom-4.mp3");
      sound.play();
      break;
    case "j":
      sound = new Audio("/sounds/snare.mp3");
      sound.play();
      break;
    case "k":
      sound = new Audio("/sounds/crash.mp3");
      sound.play();
      break;
    case "l":
      sound = new Audio("/sounds/kick-bass.mp3");
      sound.play();
      break;
    default:
      console.log('No related sound found for key: "' + letter + '"');
  }
}

function playAnimation(letter) {
  target = document.querySelector("." + letter);
  console.log(target);
  //   class list to toggle css style
  target.classList.toggle("pressed");
  //   use timeout func to animate; note if time is too large (.2*1000ms), then if the user clicks fast, the button will not have time to recover to the original opacity
  setTimeout(function () {
    target.classList.toggle("pressed");
  }, 0.005 * 1000);
}

// main logic here
for (let drum of drumList) {
  // note the event listener keyword: "click", "keydown", etc.
  drum.addEventListener("click", function () {
    playSound(drum.innerHTML);
    playAnimation(drum.innerHTML);
  });
}

// to detect key events
document.addEventListener("keydown", function (e) {
  playSound(e.key);
  playAnimation(e.key);
});
