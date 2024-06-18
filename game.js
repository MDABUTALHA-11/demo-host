const questionElement = document.getElementById('question');
const answerInput = document.getElementById('answer');
const submitButton = document.getElementById('submit-button');
const startButton = document.getElementById('start-button');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');

let score = 0;
let timeLeft = 30;
let currentQuestion;
let gameInterval;

function startGame() {
  score = 0;
  timeLeft = 30;
  scoreElement.textContent = `Score: ${score}`;
  timeElement.textContent = `Time Left: ${timeLeft}s`;
  generateQuestion();
  gameInterval = setInterval(updateTime, 1000);
}

function updateTime() {
  timeLeft--;
  timeElement.textContent = `Time Left: ${timeLeft}s`;

  if (timeLeft === 0) {
    clearInterval(gameInterval);
    feedbackElement.textContent = `Game Over! Your final score is: ${score}`;
    disableGame();
  }
}

function generateQuestion() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operators = ['+', '-', '*', '/'];
  const operator = operators[Math.floor(Math.random() * operators.length)];
  
  if (operator === '/') {
    currentQuestion = { num1: num1 * num2, num2, operator };
  } else {
    currentQuestion = { num1, num2, operator };
  }

  questionElement.textContent = `${currentQuestion.num1} ${currentQuestion.operator} ${currentQuestion.num2} = ?`;
}

function checkAnswer() {
  const userAnswer = parseFloat(answerInput.value);
  let correctAnswer;

  switch (currentQuestion.operator) {
    case '+':
      correctAnswer = currentQuestion.num1 + currentQuestion.num2;
      break;
    case '-':
      correctAnswer = currentQuestion.num1 - currentQuestion.num2;
      break;
    case '*':
      correctAnswer = currentQuestion.num1 * currentQuestion.num2;
      break;
    case '/':
      correctAnswer = currentQuestion.num1 / currentQuestion.num2;
      break;
  }

  if (userAnswer === correctAnswer) {
    score += 10;
    feedbackElement.textContent = 'Correct!';
  } else {
    feedbackElement.textContent = `Wrong! The correct answer was ${correctAnswer}`;
  }

  scoreElement.textContent = `Score: ${score}`;
  answerInput.value = '';
  generateQuestion();
}

function disableGame() {
  questionElement.textContent = '';
  answerInput.disabled = true;
  submitButton.disabled = true;
}

startButton.addEventListener('click', () => {
  answerInput.disabled = false;
  submitButton.disabled = false;
  feedbackElement.textContent = '';
  startGame();
});

submitButton.addEventListener('click', checkAnswer);

answerInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    checkAnswer();
  }
});
