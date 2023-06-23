let containerQuestionEl = document.getElementById("question-container");
let containerWelcomePageEl = document.getElementById("welcome-page");
let containerEndPageEl = document.getElementById("end-page");
let containerScoreEl = document.getElementById("score-banner");
let formInitials = document.getElementById("initials-form");
let containerHighScoresEl = document.getElementById("highscores");
let ViewHighScoreEl = document.getElementById("view-high-scores");
let listHighScoreEl = document.getElementById("high-score-list");
let correctEl = document.getElementById("correct");
let wrongEl = document.getElementById("wrong");

let btnStartEl = document.querySelector("#start-game");
let btnGoBackEl = document.querySelector("#go-back");
let btnClearScoresEl = document.querySelector("#clear-high-scores");

let questionEl = document.getElementById("question");
let answerOptionsEl = document.getElementById("answer-options");
let timerEl = document.querySelector("#timer");
var score = 0;
var timeleft;
var gameover;
timerEl.innerText = 0;