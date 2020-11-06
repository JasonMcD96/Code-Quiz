//html items
var startButton = document.querySelector("#startButton");
var questionElement = document.querySelector("#question");
var qBox = document.querySelector("#questionBox")
var title = document.querySelector("#title");
var scoreList = document.querySelector("#scoreList");
var scoreSaveArea = document.querySelector("#saveScoreDiv");
var initalsInput = document.querySelector("#initialsInput");
var saveBtn = document.querySelector("#saveButton");

var aText = document.querySelector("#textA");
var bText = document.querySelector("#textB")
var cText = document.querySelector("#textC")
var dText = document.querySelector("#textD")

var aBtn = document.querySelector("#a");
var bBtn = document.querySelector("#b");
var cBtn = document.querySelector("#c");
var dBtn = document.querySelector("#d");

//hide the buttons and other items
aBtn.style.display = "none";
bBtn.style.display = "none";
cBtn.style.display = "none";
dBtn.style.display = "none";
scoreSaveArea.style.display = "none";

//global variables
var currentQuestion = -1; //0 based indexing for questions
var currentAnswer;
var questionsArray = [];
var playerScore = 0;
var scoresArray = [];

var promptArray = [
    "Which of the following is a string?",
    "What operator gives you a remainder of a number?",
]

// A = 0, B = 1, C = 2, D = 3
var cAnswersArray = ['C', 'D']

// each index is an array
var choicesArray = [
    ["3", "false", "\"javascript\"", "5.6"],
    ['+', '-', '===', '%']
]

//keyCodes
const A = 0;
const B = 1;
const C = 2;
const D = 3;

// Functions
startButton.addEventListener("click", function (event) {
    event.preventDefault();
    currentQuestion = -1;
    score = 0;
    aBtn.style.display = "block";
    bBtn.style.display = "block";
    cBtn.style.display = "block";
    dBtn.style.display = "block";
    startButton.style.display = "none";
    title.style.display = "none";

    loadQuestions(); //loads questions into usable global array

    //load next question
    getNextQuestion();

});

// Save score on save button click
saveBtn.addEventListener("click", function(event){
    event.preventDefault();
    if(initalsInput.value.trim() === ""){
        alert("Error: If you want to save please enter initials")
    }
    var newScore = {
        name: initalsInput.value.trim(),
        score: playerScore
    }

    saveScore(newScore);

});

//Listener for multiple choice buttons

qBox.addEventListener("click", function (event) {
    event.preventDefault();
    //user makes a choice
    var displayedQuestion = questionsArray[currentQuestion];
    if (event.target.matches(".answerBtn")) {
        if (event.target.textContent == displayedQuestion.cAnswer) {
            playerScore += 10;
            //display that answer was correct
        } else {
            //display answer was wrong
        }
        //next question
        getNextQuestion();
    }

});

function getNextQuestion() {

    if (currentQuestion + 1 === promptArray.length) {
        //show highscore information
        showEndOfQuiz();
        return;
    }
    currentQuestion++;
    var newQuestion = questionsArray[currentQuestion];
    var prompt = newQuestion.question;
    var cAnswer = newQuestion.cAnswer;
    var choices = newQuestion.choices;
    writeQuestion(prompt, cAnswer, choices);
}

function showEndOfQuiz() {
    hideButtonsAndText();
    scoreSaveArea.style.display = "block";
    title.style.display = "block";
    loadScores();
    title.textContent = "Highscores";
}

function loadScores() {
    var scores = JSON.parse(localStorage.getItem('highscores'));
    if (scores != null) {

    } else {
        return;
    }
}

function writeQuestion(question, answer, options) {
    currentAnswer = answer;
    //write to question 
    questionElement.textContent = question;
    //add choices to html
    for (var i = 0; i < options.length; i++) {
        if (i === 0) {
            aText.textContent = options[i];
        } else if (i === 1) {
            bText.textContent = options[i]
        } else if (i === 2) {
            cText.textContent = options[i];
        } else if (i === 3) {
            dText.textContent = options[i];
        }
    }
}

//put created questions into usable array
function loadQuestions() {
    for (var i = 0; i < promptArray.length; i++) {
        var obj = {
            question: promptArray[i],
            cAnswer: cAnswersArray[i],
            choices: choicesArray[i]
        }
        questionsArray.push(obj);
    }
}

function saveScore(obj){
    //come back and sort the array
    scoresArray.push(obj);
    localStorage.setItem('highscores', JSON.stringify(scoresArray));
}

function hideButtonsAndText() {
    aBtn.style.display = "none";
    bBtn.style.display = "none";
    cBtn.style.display = "none";
    dBtn.style.display = "none";
    aText.textContent = "";
    bText.textContent = "";
    cText.textContent = "";
    dText.textContent = "";
    question.textContent = "";
}