const words = ["example", "coding", "vanilla", "script", "random", "context", "input"];
let currentWord = "";
let scrambled = "";
let tries = 0;
let mistakes = 0;

const scrambledEl = document.getElementById("scrambledWord");
const inputFields = document.getElementById("inputFields");
const mistakesEl = document.getElementById("mistakes");
const wrongLettersEl = document.getElementById("wrongLetters");

function scrambleWord(word) {
  const arr = word.split("");
  for(let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr.join("")
}

function generateRandomWord() {
  resetGame();
  currentWord = words[Math.floor(Math.random() * words.length)];
  scrambled = scrambleWord(currentWord);
  scrambledEl.textContent = scrambled;
  createInputFields(currentWord.length);
}

function createInputFields(length) {
  inputFields.innerHTML = '';
  for (let i = 0; i < length; i++) {
    const input = document.createElement("input");
    input.setAttribute("maxlength", "1");
    input.addEventListener("input", handleInput);
    inputFields.appendChild(input);
  }
  inputFields.querySelector("input").focus();
}

function handleInput(e) {
  const inputs = Array.from(inputFields.querySelectorAll("input"));
  const index = inputs.indexOf(e.target);
  const value = e.target.value.toLowerCase();

  if (value === currentWord[index]) {
    e.target.disabled = true;
    if (inputs.every((input, i) => input.value.toLowerCase() === currentWord[i])) {
      setTimeout(() => alert("🎉 Success"), 100);
    }
  } else {
    mistakes++;
    tries++;
    mistakesEl.textContent = mistakes;
    wrongLettersEl.textContent += ` ${value.toUpperCase()}`;
    e.target.value = "";
    if (mistakes >= 6) {
      alert("Too many mistakes! Resetting the game.");
      generateRandomWord();
      return;
    }
  }

  // Move to next input
  if (index + 1 < inputs.length) {
    inputs[index + 1].focus();
  }
}

function resetGame() {
  tries = 0;
  mistakes = 0;
  mistakesEl.textContent = "0";
  wrongLettersEl.textContent = "";
  inputFields.innerHTML = "";
}

document.getElementById("randomButton").addEventListener("click", generateRandomWord);
document.getElementById("resetButton").addEventListener("click", generateRandomWord);

window.addEventListener("load", generateRandomWord);
