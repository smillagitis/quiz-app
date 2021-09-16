const startButton = document.querySelector('.start-button')
const quiz = document.querySelector('.quiz')
const startScreen = document.querySelector('.start-screen')
const questionField = document.querySelector('.question')
const answersField = document.querySelector('.answers')
const API_URL = "https://opentdb.com/api.php?amount=15&category=15&difficulty=easy&type=multiple"
let answerButtons;
let incorrectAnswers = [];
let correctAnswer = '';
let answers = incorrectAnswers.slice();
startButton.addEventListener('click', startQuiz)

function startQuiz() {
    quiz.style.display = "block";
    startScreen.style.display = "none";
}

async function getQuizData() {
    try {
        let response = await fetch(API_URL);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
    
}

async function renderQuiz() {
    let quizData = await getQuizData();
    quizData = quizData.results;
    renderQuestion(quizData, 0, questionField);
    let answers = createAnswersArray(quizData, 0);
    renderAnswers(answers, answersField);
}


function createAnswersArray(data, index) {
    incorrectAnswers = data[index].incorrect_answers;
    correctAnswer = data[index].correct_answer;
    incorrectAnswers.push(correctAnswer);
    return incorrectAnswers;
}
function renderQuestion(data, index, field) {
    field.innerHTML = data[index].question;
}

function renderAnswers(answersArray, field) {
    for (let i = 0; i < answersArray.length; i++) {
        let buttons=document.createElement("button");
        buttons.innerHTML=answersArray[i];
        buttons.classList.add('answer')
        field.appendChild(buttons);
      }
}

renderQuiz();
