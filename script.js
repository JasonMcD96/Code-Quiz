//html items
var startButton = document.querySelector("#startButton");
var questionElement = document.querySelector("#question");
var title = document.querySelector("#title")

//global variables
var currentQuestion = -1; //0 based indexing for questions
var currentAnswer;
var questionsArray = [];

//definitely need Local storage + JSON for objects. 
//just to start building, delete when finished

var exampleQuestion = {
    question: "Which of the following is a string?",
    cAnswer: 2,
    choices: ["3", "false", "javascript"],
}


// Functions

startButton.addEventListener("click", function(event){
    event.preventDefault();
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

function getNextQuestion(){
    currentQuestion++;
    var newQuestion = questionsArray[currentQuestion];
    var prompt = newQuestion.question;
    var cAnswer = newQuestion.cAnswer;
    var choices = newQuestion.choices;

    writeQuestion(prompt, cAnswer, choices);
}

function writeQuestion(question, answer, options){
    currentAnswer = answer;
    //write to question 
    questionElement.textContent = question;
    //add choices to html
}

//put created questions into usable array
function loadQuestions(){
    questionsArray.push(exampleQuestion);
}