$("#a").hide();
$("#b").hide();
$("#c").hide();
$("#d").hide();

//html items
var startButton = document.querySelector("#startButton");
var questionElement = document.querySelector("#question");
var qBox = document.querySelector("#questionBox")
var title = document.querySelector("#title");
var aBtn = document.querySelector("#a");
var bBtn = document.querySelector("#b");
var cBtn = document.querySelector("#c");
var dBtn = document.querySelector("#d");

var aText = document.querySelector("#textA");
var bText = document.querySelector("#textB")
var cText = document.querySelector("#textC")
var dText = document.querySelector("#textD")



//global variables
var currentQuestion = -1; //0 based indexing for questions
var currentAnswer;
var questionsArray = [];
var score = 0;

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


// var exampleQuestion = {
//     question: "Which of the following is a string?",
//     cAnswer: 2,
//     choices: ["3", "false", "\"javascript\"", "5.6"],
// }


// Functions

startButton.addEventListener("click", function (event) {
    event.preventDefault();
    score = 0;
    $("#a").show();
    $("#b").show();
    $("#c").show();
    $("#d").show();
    loadQuestions();
    currentQuestion = -1;

    //start timer

    //poof start button
    startButton.style.display = "none";

    //poof title
    title.style.display = "none";

    //load next question
    getNextQuestion();

});


qBox.addEventListener("click", function (event) {
    event.preventDefault();
    //user makes a choice
    var displayedQuestion = questionsArray[currentQuestion];
    if (event.target.matches(".answerBtn")) {
        if (event.target.textContent == displayedQuestion.cAnswer) {
            score += 10;
            //display that answer was correct
        } else {
            //display answer was wrong
        }
        //next question
        getNextQuestion();
    }

});



function getNextQuestion() {

    if(currentQuestion+1 === promptArray.length){
        alert("End of quiz");
        //show highscore screen
        return;
    }
    currentQuestion++;
    var newQuestion = questionsArray[currentQuestion];
    var prompt = newQuestion.question;
    var cAnswer = newQuestion.cAnswer;
    var choices = newQuestion.choices;

    writeQuestion(prompt, cAnswer, choices);
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

    //questionsArray.push(exampleQuestion);
}