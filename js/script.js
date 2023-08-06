const wordText = document.querySelector(".word");
const hintText = document.querySelector(".hint span");
const speechText = document.querySelector(".speech span");
const timeText = document.querySelector(".time b");
const inputField = document.querySelector("input");
const refreshBtn = document.querySelector(".refresh-word");
const checkBtn = document.querySelector(".check-word");

let correctWord, timer;
const initTimer = (maxTime) => {
  clearInterval(timer);
  timer = setInterval(() => {
    if (maxTime > 0) {
      maxTime--; // decrement time by -1
      return (timeText.innerHTML = maxTime);
    }
    alert(
      "Sorry! Time Off! " + correctWord.toUpperCase() + " was the correct word"
    );
    initGame(); // call the function so the game restarts
  }, 1000);
};

const initGame = () => {
  initTimer(30); // set the max time (seconds)
  let randomObj = words[Math.floor(Math.random() * words.length)];
  let wordArray = randomObj.word.split("");
  for (let i = wordArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }
  wordText.innerHTML = wordArray.join(""); //pass shuffled word as word text
  hintText.innerHTML = randomObj.hint; // pass random obj hint as hint text
  speechText.innerHTML = randomObj.speech;
  correctWord = randomObj.word.toLocaleLowerCase(); // pass random word to correct word
  inputField.value = ""; //make input field empty
  inputField.setAttribute("maxlength", correctWord.length); // set word maxlength
  console.log(randomObj);
};
initGame();
const checkWord = () => {
  let userWord = inputField.value.toLocaleLowerCase(); // get user value
  if (!userWord) return alert("Please enter a word"); //if user doesn't enter anything
  if (userWord !== correctWord)
    return alert("Oops! " + userWord + " is not correct!"); //if the word doesn't match the correct word

  alert("Well done! " + userWord + " is correct!"); //if the word entered matches the correct word
};
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const STAR_COUNT = 100;
let result = "";
for (let i = 0; i < STAR_COUNT; i++) {
  result += `${randomNumber(-50, 50)}vw ${randomNumber(
    -50,
    50
  )}vh ${randomNumber(0, 3)}px ${randomNumber(0, 3)}px #fff,`;
}
console.log(result.substring(0, result.length - 1));

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);
