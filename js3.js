// script.js
const gameBoard = document.getElementById('game-board');
const colors = ['red', 'yellow', 'blue', 'green', 'purple', 'orange'];
const width = 8;
let squares = [];
let selectedCandy = null;
let replacedCandy = null;
let score = 0;
let timeLeft = 60;
let timer;
let countdownTimer;

const scoreDisplay = document.getElementById('score');
const timeLeftDisplay = document.getElementById('time-left');
const restartButton = document.getElementById('restart-button');

function createBoard() {
    gameBoard.innerHTML = '';
    squares = [];
    for (let i = 0; i < width * width; i++) {
        const square = document.createElement('div');
        square.setAttribute('draggable', true);
        square.setAttribute('id', i);
        let randomColor = colors[Math.floor(Math.random() * colors.length)];
        square.classList.add('candy', randomColor);
        gameBoard.appendChild(square);
        squares.push(square);

        square.addEventListener('dragstart', dragStart);
        square.addEventListener('dragend', dragEnd);
        square.addEventListener('dragover', dragOver);
        square.addEventListener('dragenter', dragEnter);
        square.addEventListener('dragleave', dragLeave);
        square.addEventListener('drop', dragDrop);
    }
}

function dragStart() {
    selectedCandy = this;
}

function dragEnd() {
    let selectedCandyId = parseInt(selectedCandy.id);
    let replacedCandyId = parseInt(replacedCandy.id);

    let validMoves = [
        selectedCandyId - 1,
        selectedCandyId + 1,
        selectedCandyId - width,
        selectedCandyId + width
    ];

    if (validMoves.includes(replacedCandyId)) {
        squares[replacedCandyId].style.backgroundColor = selectedCandy.style.backgroundColor;
        squares[selectedCandyId].style.backgroundColor = replacedCandy.style.backgroundColor;

        selectedCandy = null;
        replacedCandy = null;

        checkRowForThree();
        checkColumnForThree();
        moveDown();
    } else {
        squares[replacedCandyId].style.backgroundColor = replacedCandy.style.backgroundColor;
        squares[selectedCandyId].style.backgroundColor = selectedCandy.style.backgroundColor;
    }
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {
}

function dragDrop() {
    replacedCandy = this;
}

function checkRowForThree() {
    for (let i = 0; i < 61; i++) {
        let rowOfThree = [i, i + 1, i + 2];
        let decidedColor = squares[i].style.backgroundColor;
        const isBlank = squares[i].classList.contains('blank');

        if (rowOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
            rowOfThree.forEach(index => {
                squares[index].style.backgroundColor = '';
                squares[index].classList.add('blank');
            });
            score += 3;
            scoreDisplay.innerText = score;
        }
    }
}

function checkColumnForThree() {
    for (let i = 0; i < 47; i++) {
        let columnOfThree = [i, i + width, i + width * 2];
        let decidedColor = squares[i].style.backgroundColor;
        const isBlank = squares[i].classList.contains('blank');

        if (columnOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
            columnOfThree.forEach(index => {
                squares[index].style.backgroundColor = '';
                squares[index].classList.add('blank');
            });
            score += 3;
            scoreDisplay.innerText = score;
        }
    }
}

function moveDown() {
    for (let i = 0; i < 55; i++) {
        if (squares[i + width].classList.contains('blank')) {
            squares[i + width].style.backgroundColor = squares[i].style.backgroundColor;
            squares[i + width].classList.remove('blank');
            squares[i].style.backgroundColor = '';
            squares[i].classList.add('blank');
        }
    }

    for (let i = 0; i < width; i++) {
        if (squares[i].classList.contains('blank')) {
            let randomColor = colors[Math.floor(Math.random() * colors.length)];
            squares[i].style.backgroundColor = randomColor;
            squares[i].classList.remove('blank');
        }
    }
}

function countdown() {
    if (timeLeft > 0) {
        timeLeft--;
        timeLeftDisplay.innerText = timeLeft;
    } else {
        clearInterval(timer);
        clearInterval(countdownTimer);
        document.getElementById("gameM").innerHTML=('Game Over! Your score is ' + score);
    }
}

function startGame() {
    createBoard();
    score = 0;
    timeLeft = 60;
    scoreDisplay.innerText = score;
    timeLeftDisplay.innerText = timeLeft;

    clearInterval(timer);
    clearInterval(countdownTimer);

    timer = setInterval(function() {
        checkRowForThree();
        checkColumnForThree();
        moveDown();
    }, 100);

    countdownTimer = setInterval(countdown, 1000);
}

restartButton.addEventListener('click', startGame);

startGame();
