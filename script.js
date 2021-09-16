const startButton = document.querySelector('.start-button')
const quiz = document.querySelector('.quiz')
const startScreen = document.querySelector('.start-screen')
const questionField = document.querySelector('.question')
const answersField = document.querySelector('.answers')
//const nextButton = document.querySelector('#next-button')
const resultsScreen = document.querySelector('.results-screen')
const API_URL = "https://opentdb.com/api.php?amount=5&category=15&difficulty=easy&type=multiple"
let correctAnswer;
let currentQuestionIndex = 0;
let rightAnswersCount = 0;
startButton.addEventListener('click', startQuiz)
//nextButton.addEventListener('click', getNextQuestion)

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
    renderQuestion(quizData, currentQuestionIndex, questionField);
    let answers = createAnswersArray(quizData, currentQuestionIndex);
    renderAnswers(answers, answersField);
}


function createAnswersArray(data, index) {
    let answers = data[index].incorrect_answers;
    correctAnswer = data[index].correct_answer;
    answers.push(correctAnswer);
    shuffle(answers);
    return answers;
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    while (currentIndex != 0) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
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
        buttons.addEventListener('click', checkAnswer)
      }
}
async function getNextQuestion() {
    let quizData = await getQuizData();
    quizData = quizData.results;
    if (currentQuestionIndex >= quizData.length) {
        quiz.style.display = "none";
        resultsScreen.style.display = "block";
        resultsScreen.innerHTML = `Nice! Your got ${rightAnswersCount} of the ${quizData.length} questions right.`;
    } else {
    correctAnswer = quizData[currentQuestionIndex].correct_answer;
    answersField.innerHTML = "";
    renderQuestion(quizData, currentQuestionIndex, questionField);
    let answers = createAnswersArray(quizData, currentQuestionIndex);
    renderAnswers(answers, answersField);
    }
    currentQuestionIndex++;
}

function checkAnswer(){
    if (this.innerHTML == correctAnswer) {
        this.style.background = 'green';
        rightAnswersCount++;
        getNextQuestion();
    } else {
        this.style.background = 'red';
        getNextQuestion();
    }
}

renderQuiz();
