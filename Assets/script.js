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

//buttons
let btnStartEl = document.querySelector("#start-game");
let btnGoBackEl = document.querySelector("#go-back");
let btnClearScoresEl = document.querySelector("#clear-high-scores");

//question/answers section
let questionEl = document.getElementById("question");
let answerOptionsEl = document.getElementById("answer-options");
let timerEl = document.querySelector("#timer");
var score = 0;
var timeleft;
var gameover;
timerEl.innerText = 0;

//High Score Array
let HighScores = [];

//assign array details for questions 
let arrayShuffledQuestions;
let QuestionIndex = 0;


var questions = [
    { q: 'Arrays in Javascript can be used to store __________.', 
      a: '4. all of the above', 
      choices: [{choice: '1. numbers'}, {choice: '2. booleans'}, {choice: '3. strings'}, {choice: '4. all of the above'}]
    },
    { q: 'Inside which HTML element do we put the javascript?', 
      a: '3. <script>', 
      choices: [{choice: '1. <h1>'}, {choice: '2. <js>'}, {choice: '3. <script>'}, {choice: '4. <head>'}]
    },
    { q: 'In the code -- setinterval(time(),1000) -- what is time()?', 
      a: '1. callback function', 
      choices: [{choice: '1. callback function'}, {choice: '2. undefined'}, {choice: '3. variable'}, {choice: '4. all of the above'}]
    },
    { q: 'What syntax would call a function?', 
      a: '4. function()', 
      choices: [{choice: '1. var function'}, {choice: '2. function'}, {choice: '3. call function'}, {choice: '4. function()'}]
    },
    { q: 'When did javascript first appear?', 
      a: '1. 1995', 
      choices: [{choice: '1. 1995'}, {choice: '2. Roaring twenties'}, {choice: '3. 2005'}, {choice: '4. 2000'}]
    },
    { q: 'What does DOM stand for?', 
      a: '2. Document Object Model', 
      choices: [{choice: '1. Do Overnight Modules'}, {choice: '2. Document Object Model'}, {choice: '3. Divas Obviously Model'}, {choice: '4. Do Oo Mo'}]
    },
    { q: 'What is getItem commonly used for?', 
      a: '2. local storage', 
      choices: [{choice: '1. adding drama'}, {choice: '2. local storage'}, {choice: '3. online shopping'}, {choice: '4. naming a variable'}]
    },
  ];

  let renderStartPage = function () {
    containerHighScoresEl.classList.add("hide");
    containerHighScoresEl.classList.remove("show");
    containerWelcomePageEl.classList.remove("hide");
    containerWelcomePageEl.classList.add("show");
    containerScoreEl.removeChild(containerScoreEl.lastChild);
    QuestionIndex = 0;
    gameover = "";
    timerEl.textContent = 0;
    score = 0;

    if (correctEl.className = "show") {
        correctEl.classList.remove("show");
        correctEl.classList.add("hide")
    }
    if (wrongEl.className = "show") {
        wrongEl.classList.remove("show");
        wrongEl.classList.add("hide");
    }
  }

  let setTime = function () {
    timeleft = 30;

    let timercheck = setInterval(function() {
        timerEl.innerText = timeleft;
        timeleft--

        if (gameover) {
            clearInterval(timercheck)
        }
       
        if (timeleft < 0) {
            showScore()
            timerEl.innerText = 0
            clearInterval(timercheck)
        }

        }, 1000)
  }

  let startGame = function() {
    //add classes to show/hide start and quiz screen
    containerWelcomePageEl.classList.add('hide');
    containerWelcomePageEl.classList.remove('show');
    containerQuestionEl.classList.remove('hide');
    containerQuestionEl.classList.add('show');
    //Shuffle the questions so they show in random order
    arrayShuffledQuestions = questions.sort(() => Math.random() - 0.5)
    setTime()
    setQuestion()
  }

let setQuestion = function() {
    resetAnswers()
    displayQuestion(arrayShuffledQuestions[QuestionIndex])
}

let resetAnswers = function() {
    while (answerOptionsEl.firstChild) {
        answerOptionsEl.removeChild(answerOptionsEl.firstChild)
    };
};

let displayQuestion = function(index) {
    questionEl.innerText = index.q
    for (var i = 0; i < index.choices.length; i++) {
        let answerbutton = document.createElement('button')
        answerbutton.innerText = index.choices[i].choice
        answerbutton.classList.add('btn')
        answerbutton.classList.add('answerbtn')
        answerbutton.addEventListener("click", answerCheck)
        answerOptionsEl.appendChild(answerbutton);
        }
    };

let answerCorrect = function() {
    if (correctEl.className === "hide") {
        correctEl.classList.remove("hide")
        correctEl.classList.add("banner")
        wrongEl.classList.remove("banner")
        wrongEl.classList.add("hide")
        }
    } 

let answerWrong = function() {
    if (wrongEl.className === "hide") {
        wrongEl.classList.remove("hide")
        wrongEl.classList.add("banner")
        correctEl.classList.remove("banner")
        correctEl.classList.add("hide")
        }
    }

    let answerCheck = function(event) {
        let selectedanswer = event.target
            if (arrayShuffledQuestions[QuestionIndex].a === selectedanswer.innerText){
                answerCorrect()
                score = score + 7
            }

            else {
              answerWrong()
              score = score - 1;
              timeleft = timeleft - 3;
          };

          QuestionIndex++
            if  (arrayShuffledQuestions.length > QuestionIndex + 1) {
                setQuestion()
            }   
            else {
               gameover = "true";
               showScore();
                }
    }

    let showScore = function () {
        containerQuestionEl.classList.add("hide");
        containerEndPageEl.classList.remove("hide");
        containerEndPageEl.classList.add("show");

        let scoreDisplay = document.createElement("p");
        scoreDisplay.innerText = ("Your final score is " + score + "!");
        containerScoreEl.appendChild(scoreDisplay);
    }       

    let createHighScore = function(event) { 
        event.preventDefault() 
        let initials = document.querySelector("#initials").value;
        if (!initials) {
          alert("Enter your intials!");
          return;
        }

      formInitials.reset();

      let HighScore = {
      initials: initials,
      score: score
      } 

      //push and sort scores
      HighScores.push(HighScore);
      HighScores.sort((a, b) => {return b.score-a.score});

    //clear visibile list to resort
    while (listHighScoreEl.firstChild) {
       listHighScoreEl.removeChild(listHighScoreEl.firstChild)
    }
    //create elements in order of high scores
    for (var i = 0; i < HighScores.length; i++) {
      var highscoreEl = document.createElement("li");
      highscoreEl.ClassName = "high-score";
      highscoreEl.innerHTML = HighScores[i].initials + " - " + HighScores[i].score;
      listHighScoreEl.appendChild(highscoreEl);
    }

      saveHighScore();
      displayHighScores();

    }

    var saveHighScore = function () {
        localStorage.setItem("HighScores", JSON.stringify(HighScores))
            
    }

    //load values/ called on page load
    var loadHighScore = function () {
        var LoadedHighScores = localStorage.getItem("HighScores")
            if (!LoadedHighScores) {
            return false;
        }

        LoadedHighScores = JSON.parse(LoadedHighScores);
        LoadedHighScores.sort((a, b) => {return b.score-a.score})
 

        for (var i = 0; i < LoadedHighScores.length; i++) {
            var highscoreEl = document.createElement("li");
            highscoreEl.ClassName = "high-score";
            highscoreEl.innerText = LoadedHighScores[i].initials + " - " + LoadedHighScores[i].score;
            listHighScoreEl.appendChild(highscoreEl);

            HighScores.push(LoadedHighScores[i]);
            
        }
    }  

    //display high score screen from link or when intiials entered
    var displayHighScores = function() {

        containerHighScoresEl.classList.remove("hide");
        containerHighScoresEl.classList.add("show");
        gameover = "true"

        if (containerEndEl.className = "show") {
            containerEndEl.classList.remove("show");
            containerEndEl.classList.add("hide");
            }
        if (containerStartEl.className = "show") {
            containerStartEl.classList.remove("show");
            containerStartEl.classList.add("hide");
            }
            
        if (containerQuestionEl.className = "show") {
            containerQuestionEl.classList.remove("show");
            containerQuestionEl.classList.add("hide");
            }

        if (correctEl.className = "show") {
            correctEl.classList.remove("show");
            correctEl.classList.add("hide");
        }

        if (wrongEl.className = "show") {
            wrongEl.classList.remove("show");
            wrongEl.classList.add("hide");
            }
        
    }
    //clears high scores
    var clearScores = function () {
        HighScores = [];

        while (listHighScoreEl.firstChild) {
            listHighScoreEl.removeChild(listHighScoreEl.firstChild);
        }

        localStorage.clear(HighScores);

    } 

    loadHighScore()
        
      //on start click, start game
      btnStartEl.addEventListener("click", startGame);

      btnStartEl.addEventListener("click", function() {
        console.log("Start Quiz button clicked");
        startGame();
      });

      //on submit button -- enter or click
      formInitials.addEventListener("submit", createHighScore);
      //when view high-scores is clicked
      ViewHighScoreEl.addEventListener("click", displayHighScores);
      //Go back button
      btnGoBackEl.addEventListener("click", renderStartPage);
      //clear scores button
      btnClearScoresEl.addEventListener("click", clearScores);