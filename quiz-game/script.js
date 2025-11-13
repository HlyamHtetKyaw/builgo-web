// DOM Ements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startButton = document.getElementById('start-btn');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const scoreSpan = document.getElementById('score');
const finalScoreSpan = document.getElementById('final-score');
const maxScoreSpan = document.getElementById('max-score');
const resultMessage = document.getElementById('result-message');
const restartButton = document.getElementById('restart-btn');
const progressBar = document.getElementById('progress');

const quizQuestions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false }   
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false }   
        ]
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        answers: [
            { text: "Harper Lee", correct: true },
            { text: "Mark Twain", correct: false },
            { text: "F. Scott Fitzgerald", correct: false },
            { text: "Ernest Hemingway", correct: false }   
        ]
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true }   
        ]
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: [
            { text: "Au", correct: true },
            { text: "Ag", correct: false },
            { text: "Gd", correct: false },
            { text: "Go", correct: false }   
        ]
    }
];

// Quiz State Variables
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// Event Listeners
startButton.addEventListener('click', startQuiz);
restartButton.addEventListener('click', restartQuiz);

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');

    showQuestion();
}

function showQuestion(){
    answersDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];

    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = ((currentQuestionIndex) / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";

    questionText.textContent = currentQuestion.question;
    answersContainer.innerHTML = '';

    currentQuestion.answers.forEach(answer=>{
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('answer-btn');
        button.dataset.correct = answer.correct;

        button.addEventListener('click', selectAnswer);

        answersContainer.appendChild(button);
    });
}
function selectAnswer(e){
    if(answersDisabled) return;
    answersDisabled = true;
    const selectdButton = e.target;
    const correct = selectdButton.dataset.correct === 'true';

    Array.from(answersContainer.children).forEach(button=>{
        if(button.dataset.correct === 'true'){
            button.classList.add('correct');
        }
        button.disabled = true;
    });

    if(correct){
        score++;
        scoreSpan.textContent = score;
        selectdButton.classList.add('correct');
    }else{
        selectdButton.classList.add('wrong');
    }

    setTimeout(()=>{
        currentQuestionIndex++;
        if(currentQuestionIndex < quizQuestions.length){
            showQuestion();
        }else{
            console.log("Quiz Over");
            showResult();
        }
    }, 500);
    
}

function showResult(){
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');

    finalScoreSpan.textContent = score;

    const progressPercent = (quizQuestions.length / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";

    if(score === quizQuestions.length){
        resultMessage.textContent = "Perfect Score! Well done!";
    }else if(score >= quizQuestions.length / 2){
        resultMessage.textContent = "Good Job! You passed!";
    }else{
        resultMessage.textContent = "Better luck next time!";
    }

}
function restartQuiz(){
    resultScreen.classList.remove('active');
    startScreen.classList.add('active');
    scoreSpan.textContent = '0';
    startQuiz();
}