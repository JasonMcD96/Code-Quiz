//html items
var startButton = document.querySelector("#startButton");
var questionElement = document.querySelector("#question");
var qBox = document.querySelector("#questionBox")
var title = document.querySelector("#title");
var scoreList = document.querySelector("#scoreList");
var scoreSaveArea = document.querySelector("#saveScoreDiv");
var initalsInput = document.querySelector("#initialsInput");
var saveBtn = document.querySelector("#saveButton");
var clearBtn = document.querySelector("#clearButton");
var highscoresTextLink = document.querySelector("#highscoresWord");
var restartBtn = document.querySelector("#restartButton");
var timerNumber = document.querySelector("#time");
var finalScoreLine = document.querySelector("#scoreLine");
var finalScoreDisplay = document.querySelector("#finalScore"); 

var aText = document.querySelector("#textA");
var bText = document.querySelector("#textB")
var cText = document.querySelector("#textC")
var dText = document.querySelector("#textD")

var aBtn = document.querySelector("#a");
var bBtn = document.querySelector("#b");
var cBtn = document.querySelector("#c");
var dBtn = document.querySelector("#d");

//global variables
var currentQuestion = -1; //0 based indexing for questions
var currentAnswer;
var questionsArray = [];
var scoresArray = [];
var playerScore = 0;
var timeLeft = 30; //also max time available
var interval;

var promptArray = [
    "Which of the following is a string?",
    "What operator gives you a remainder of a number?",
    "What is the main language used for back end web development?",
    "Which of the following is used to print to the console in Javascript"
]

// each index is an array
var choicesArray = [
    ["3", "false", "\"javascript\"", "5.6"],
    ['+', '-', '===', '%'],
    ['Javascript', 'HTML', 'CSS', 'C#'],
    ['System.out.println();', 'write()', 'console.write()', 'console.log()'],
]

// A = 0, B = 1, C = 2, D = 3
var cAnswersArray = ['C', 'D', 'A', 'D']

//keyCodes
const A = 0;
const B = 1;
const C = 2;
const D = 3;

init();
// Functions

function init(){
    //creates the element in local if it doesnt exist
    if(localStorage.getItem('highscores') === null){
        localStorage.setItem('highscores', JSON.stringify(scoresArray));
    }
};

startButton.addEventListener("click", function (event) {
    event.preventDefault();
    currentQuestion = -1;
    score = 0;
    aBtn.style.display = "block";
    bBtn.style.display = "block";
    cBtn.style.display = "block";
    dBtn.style.display = "block";
    finalScoreLine.style.display = "block";
    startButton.style.display = "none";
    title.style.display = "none";

    loadQuestions(); //loads questions into usable global array
    getNextQuestion();

});

//timer event
startButton.addEventListener("click", function(event){
    event.preventDefault();
    interval = setInterval(function(){
        timeLeft--;
        timerNumber.textContent = " " + timeLeft;
        if(timeLeft <= 0){
            showEndOfQuiz();
            clearInterval(interval);
        }
    }, 1000)
})

restartBtn.addEventListener("click", function(event){
    event.preventDefault();
    window.location.reload();
})

// Save score on save button click
saveBtn.addEventListener("click", function(event){
    event.preventDefault();
    if(initalsInput.value.trim() === ""){
        alert("Error: If you want to save please enter initials")
        return;
    }
    wipeDisplayedScores();
    var newScore = {
        name: initalsInput.value.trim(),
        score: playerScore
    }
    saveScore(newScore);
    loadScores();

});

clearBtn.addEventListener("click", function(event){
    event.preventDefault();
    if(confirm("WARNING: THIS WILL DELETE ALL RECORDS!")){
        wipeDisplayedScores();
        var emptyArray = [];
        localStorage.setItem("highscores", JSON.stringify(emptyArray));
        alert("DELETED");
    }
});

highscoresTextLink.addEventListener("click", function(event){
    //probably need to kill timer and set score to zero
    event.preventDefault();
    startButton.style.display = "none";
    playerScore = 0;
    finalScoreLine.style.display = "block";
    showEndOfQuiz();
})

//Listener for multiple choice buttons
qBox.addEventListener("click", function (event) {
    event.preventDefault();
    var displayedQuestion = questionsArray[currentQuestion];
    
    //user chooses an answer choice
    if (event.target.matches(".answerBtn")) {
        if (event.target.textContent == displayedQuestion.cAnswer) { //correct answer
            playerScore += 10;
            finalScoreDisplay.textContent = playerScore;

        } else { //wrong answer
            //reduce time
            timeLeft -= 4;
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
    timerNumber.textContent = " " + 0;
    clearInterval(interval);
    hideButtonsAndText();
    scoreSaveArea.style.display = "flex";
    title.style.display = "block";
    finalScoreDisplay.textContent = playerScore;
    loadScores();
    title.textContent = "Highscores";
}

function loadScores() {
    wipeDisplayedScores();
    scoresArray = JSON.parse(localStorage.getItem('highscores'));
    if (scoresArray != null) {
        for(var i = 0; i < scoresArray.length; i++){
            var newLI = document.createElement('li');
            newLI.innerHTML = "<span id=\"initials\">" + scoresArray[i].name + "</span>-"+
            "Score: <span>"+ scoresArray[i].score+"</span>";
            scoreList.appendChild(newLI);
        }
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

    var tempScores = JSON.parse(localStorage.getItem('highscores'));
    tempScores.push(obj);
    tempScores.sort(function(a,b){return b.score - a.score});
    localStorage.setItem('highscores', JSON.stringify(tempScores));
}

function wipeDisplayedScores(){
    
    while(scoreList.firstChild){
        scoreList.removeChild(scoreList.firstChild);
    }
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