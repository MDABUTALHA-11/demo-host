// script.js

const puzzleContainer = document.getElementById('puzzle-container');
const shuffleButton = document.getElementById('shuffle-button');

const imageSrc = 'image.game/best.png';  // Replace with your image path
const gridSize = 4;
const pieces = [];

// Create the puzzle pieces
for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
        const piece = document.createElement('div');
        piece.classList.add('puzzle-piece');
        piece.style.backgroundImage = `url(${imageSrc})`;
        piece.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;
        piece.dataset.row = row;
        piece.dataset.col = col;
        if (row === gridSize - 1 && col === gridSize - 1) {
            piece.style.opacity = 0;  // Hide the last piece (empty space)
        } else {
            piece.addEventListener('click', movePiece);
        }
        puzzleContainer.appendChild(piece);
        pieces.push(piece);
    }
}

// Shuffle the pieces
shuffleButton.addEventListener('click', shuffle);

function shuffle() {
    const emptyPiece = pieces[pieces.length - 1];
    let shuffled = false;

    while (!shuffled) {
        const shuffledPieces = pieces.slice(0, pieces.length - 1).sort(() => Math.random() - 0.5);
        shuffledPieces.push(emptyPiece);
        if (isSolvable(shuffledPieces)) {
            pieces.forEach((piece, index) => {
                piece.style.order = index;
                piece.dataset.index = index;
            });
            shuffled = true;
        }
    }
}

function movePiece(event) {
    const piece = event.target;
    const emptyPiece = pieces[pieces.length - 1];
    const pieceIndex = parseInt(piece.dataset.index);
    const emptyIndex = parseInt(emptyPiece.dataset.index);

    const pieceRow = Math.floor(pieceIndex / gridSize);
    const pieceCol = pieceIndex % gridSize;
    const emptyRow = Math.floor(emptyIndex / gridSize);
    const emptyCol = emptyIndex % gridSize;

    const distance = Math.abs(pieceRow - emptyRow) + Math.abs(pieceCol - emptyCol);

    if (distance === 1) {
        [piece.dataset.index, emptyPiece.dataset.index] = [emptyPiece.dataset.index, piece.dataset.index];
        [piece.style.order, emptyPiece.style.order] = [emptyPiece.style.order, piece.style.order];
    }
}

function isSolvable(pieces) {
    let inversions = 0;
    const pieceNumbers = pieces.map(piece => parseInt(piece.dataset.row) * gridSize + parseInt(piece.dataset.col) + 1);
    pieceNumbers.forEach((number, index) => {
        for (let i = index + 1; i < pieceNumbers.length; i++) {
            if (pieceNumbers[i] && number && number > pieceNumbers[i]) {
                inversions++;
            }
        }
    });
    const emptyRow = Math.floor(pieceNumbers.indexOf(16) / gridSize);
    return (gridSize % 2 !== 0 && inversions % 2 === 0) ||
        (gridSize % 2 === 0 && (inversions + emptyRow) % 2 !== 0);
}

shuffle();
