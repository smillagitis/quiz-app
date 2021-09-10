const startButton = document.querySelector('.start-button')
const quiz = document.querySelector('.quiz')
const startScreen = document.querySelector('.start-screen')
const questionField = document.querySelector('.question')
const API_URL = "https://opentdb.com/api.php?amount=15&category=15&difficulty=easy&type=multiple"
var answerButtons;
var incorrectAnswers = [];
var correctAnswer = '';
var answers = incorrectAnswers.slice();
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
    questionField.innerHTML = quizData.results[0].question;
    incorrectAnswers = quizData.results[0].incorrect_answers;
    let correctAnswer = quizData.results[0].correct_answer;
    incorrectAnswers.push(correctAnswer);
    let answers = incorrectAnswers.slice();
    var more = document.querySelector('.answers')
  for (var i = 0; i < answers.length; i++) {
    var butt=document.createElement("button");
    butt.innerHTML=answers[i];
    butt.classList.add('answer')
    more.appendChild(butt);
  }
}

renderQuiz();
answerButtons = document.querySelector('.answer');
// answerButtons.forEach(el => el.addEventListener('click', event => {
//     console.log(event.target);
//   }));