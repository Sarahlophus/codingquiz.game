// global variables
const startButton = document.getElementById("startQuiz");
const scoresButton = document.getElementById("showScores");
const questionDiv = document.getElementById("question");
const answersDiv = document.getElementById("answers");
const scoresDiv = document.getElementById("scores");
const timerEl = document.getElementById("timer");
const questions = [
  {
    title: "What time of day are cats most active?",
    answers: ["Daytime", "Dawn/Dusk", "Nighttime"],
    correct: "Dawn/Dusk",
  },
  {
    title: "What is a cat signaling when they show their belly?",
    answers: ["I want a belly rub", "I'm hungry", "I trust you"],
    correct: "I trust you",
  },
  {
    title: "A group of cats is called a:",
    answers: ["Clowder", "Mischief", "Tiny Pride"],
    correct: "Clowder",
  },
];
let questionIndex = 0;
let timerCount = 12;
let isWin = false;
let scoreInput = timerCount;

// function to run quiz game
function startQuiz() {
  // clear previous question
  answersDiv.textContent = "";
  // show first question with answer choices
  questionDiv.innerHTML = questions[questionIndex].title;
  // loop through answers
  questions[questionIndex].answers.forEach((answer) => {
    //create element button
    const answerBtn = document.createElement("button");
    answerBtn.textContent = answer;
    //  add attributes (value, text)
    answerBtn.setAttribute("value", answer);
    // add click event
    answerBtn.onclick = answerClick;
    // append button to answer div
    answersDiv.appendChild(answerBtn);
  });
}

// function for on-click answers
function answerClick() {
  // dertermine the answer the user chose
  let chosenAnswer = this.value;
  // check to see if answer is correct
  if (chosenAnswer === questions[questionIndex].correct) {
    // let user know if answer was right
    alert("Correct, +2 bonus!");
    //add time bonus
    timerCount = timerCount + 2;
    // move to next question or end game
    questionIndex++;
    if (questions.length > questionIndex) {
      startQuiz();
    } else {
      endQuiz();
    }
  } else {
    // let user know if answer was wrong
    alert("Incorrect, -2 penalty. Try again");
    // subtract time from timer
    timerCount = timerCount - 2;
  }
}

// end quiz and enter initials
function endQuiz() {
  isWin = true;
  // enter initials
  let playerName = prompt(`your score is ${timerCount}. Enter your first name below`);
  // save player name and score to local storage
  localStorage.setItem("Player", playerName);
  localStorage.setItem("Score", timerCount);
}

// start timer
function startTimer() {
  startQuiz();
  // Sets timer
  timer = setInterval(function () {
    // timer decreases by one each second
    timerCount--;
    timerEl.textContent = timerCount;
    if (timerCount >= 0) {
      // Tests if win condition is met
      if (isWin && timerCount > 0) {
        // Clears interval and stops timer
        // alert("your score is: " + timerCount);
        clearInterval(timer);
      }
    }
    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      // loseGame();
      alert("you lose: womp, womp");
    }
  }, 1000);
}

// show  last score on button click
function displayScores() {
  // retrieve last scores
  let lastPlayer = localStorage.getItem("Player");
  let lastScore = localStorage.getItem("Score");
  // let user know if there is no current score to beat
  if (localStorage.key === undefined) {
    scoresDiv.textContent = "It's your time to shine, there are no current scores!";
  } else if (lastPlayer === "null") {
    scoresDiv.textContent = "It's your time to shine, there are no current scores!";
    // if a current score is present, display score and player name
  } else {
    scoresDiv.textContent = `You must beat ${lastPlayer}'s score of ${lastScore} to win!`;
  }
}

// function clearScores() {
//   localStorage.clear();
// }

// initialize - start quiz by clicking button
// startButton.addEventListener("click", startQuiz);
startButton.addEventListener("click", startTimer);
// user clicks 'show last score' button to view last score they must beat
scoresButton.addEventListener("click", displayScores);

//create 'clear scores' button
// scoresButton.addEventListener("click", clearScores);
