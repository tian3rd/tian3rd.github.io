// TODO#3: create random numbers
var randomDice1 = Math.floor(Math.random() * 6) + 1;
var randomDice2 = Math.floor(Math.random() * 6) + 1;
// console.log(randomDice1, randomDice2);

// TODO#4: use the random numbers generated to set the corresponding images
document
  .querySelector(".img1")
  .setAttribute("src", "/images/dices/dice" + randomDice1 + ".png");
document
  .querySelector(".img2")
  .setAttribute("src", "/images/dices/dice" + randomDice2 + ".png");

// TODO#5: change the text in h1 depending on the outcomes
if (randomDice1 == randomDice2) {
  document.querySelector("h1").textContent = "Draw!";
} else if (randomDice1 < randomDice2) {
  document.querySelector("h1").textContent = "🚩 Player 2 Wins!";
} else {
  document.querySelector("h1").textContent = "Player 1 Wins!🚩";
}
