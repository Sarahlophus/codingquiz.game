// global variables
const startButton = document.getElementById("startQuiz");
const questionDiv = document.getElementById("question");
const answersDiv = document.getElementById("answers");
const timerEl = document.getElementById("timer");
const questions = [
  {
    title: "is this question 1?",
    answers: ["Answer 1", "Answer 2", "Answer 3"],
    correct: "Answer 1",
  },
  {
    title: "is this question 2?",
    answers: ["Answer 1", "Answer 2", "Answer 3"],
    correct: "Answer 3",
  },
];
let questionIndex = 0;
let timerCount = 20;
let isWin = false;

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
  if (chosenAnswer === questions[0].correct) {
    // let user know if answer was right
    alert("correct: hooray!");
    // move to next question or end game
    questionIndex++;
    if (questions.length > questionIndex) {
      startQuiz();
    } else {
      endQuiz();
    }
  } else {
    // let user know if answer was wrong
    alert("incorrect: womp, womp");
    // TODO: subtract time from timer
  }
}

// end quiz and enter initials
function endQuiz() {
  isWin = true;
}

// start timer
function startTimer() {
  startQuiz();
  // Sets timer
  timer = setInterval(function () {
    timerCount--;
    timerEl.textContent = timerCount;
    if (timerCount >= 0) {
      // Tests if win condition is met
      if (isWin && timerCount > 0) {
        // Clears interval and stops timer
        alert(timerCount);
        clearInterval(timer);
        // clearInterval(timer);
        // winGame();
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

// save high scores

// show  high scores on button click

// initialize - start quiz by clicking button
startButton.addEventListener("click", startTimer);
