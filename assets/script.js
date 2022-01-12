// global variables
const startButton = document.getElementById("startQuiz");
const stopButton = document.getElementById("stopQuiz");
const scoresButton = document.getElementById("showScores");
const clearScoreBtn = document.getElementById("clearScores");
const questionDiv = document.getElementById("question");
const answersDiv = document.getElementById("answers");
const timerEl = document.getElementById("timer");
const scoreMsgDiv = document.getElementById("scoreMsgDiv");
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
  {
    title: "Cats use head-bunting to:",
    answers: ["Share scent", "Clean their head", "Be annoying"],
    correct: "Share scent",
  },
  {
    title: "A male cat is called a Tom, and a female cat is called a:",
    answers: ["Sally", "Colt", "Queen"],
    correct: "Queen",
  },
  {
    title: "What is a trichobezoar?",
    answers: ["A breed of cat", "A hairball", "an internal organ"],
    correct: "A hairball",
  },
  {
    title: "How many whiskers does a cat have? :",
    answers: ["24", "100", "10"],
    correct: "24",
  },
  {
    title: "Who has the better sense of hearing?",
    answers: ["Cat", "Dog", "Human"],
    correct: "Cat",
  },
];
let questionIndex = 0;
let timerCount = 15;
let isWin = false;
let scoreInput = timerCount;

// function to run quiz game
function startQuiz() {
  timerCount = 12;
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
}

// starts timer, record score & player name at end of game
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
        // enter name and record player score
        let playerName = prompt(`You win! Your score is ${timerCount}. Enter your first name below`);
        // save player name and score to local storage
        localStorage.setItem("Player", playerName);
        localStorage.setItem("Score", timerCount);
        // Clears interval and stops timer
        clearInterval(timer);
      }
    }
    // Tests if time has run out
    if (timerCount <= 0) {
      // Clears interval
      clearInterval(timer);
      // loseGame();
      alert("you lose: womp, womp");
      stopQuiz();
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
    document.getElementById("beatScore").innerHTML = "It's your time to shine, there are no current scores!";
  } else if (lastPlayer === null) {
    document.getElementById("beatScore").innerHTML = "It's your time to shine, there are no current scores!";
  } else if (lastPlayer === "null") {
    document.getElementById("beatScore").innerHTML = "It's your time to shine, there are no current scores!";

    // if a current score is present, display score and player name
  } else {
    document.getElementById("beatScore").innerHTML = `You must beat ${lastPlayer}'s score of ${lastScore} to win!`;
  }
}

// reset score
function clearScores() {
  localStorage.clear();
}

// 'stop quiz' by reloading page
function stopQuiz() {
  location.reload();
}

// initialize - start quiz by clicking button
// startButton.addEventListener("click", startQuiz);
startButton.addEventListener("click", startTimer);

// stops quiz button
stopButton.addEventListener("click", stopQuiz);

// user clicks 'show last score' button to view last score they must beat
scoresButton.addEventListener("click", displayScores);

//create 'reset scores' button
clearScoreBtn.addEventListener("click", clearScores);
