const tiles = document.querySelectorAll('[data-tile]');
const board = document.getElementById('board');
const gameInfo = document.getElementById('game-info');
const resetbutton = document.getElementById('set-button');
let currentPlayer = 'X';
let gameActive = true;
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleTileClick(event) {
  const tile = event.target;
  const tileIndex = Array.from(tiles).indexOf(tile);

  if (tile.textContent !== '' || !gameActive) {
    return;
  }

  tile.textContent = currentPlayer;
  tile.classList.add(`player${currentPlayer}`);
  
  if (checkWin(currentPlayer)) {
    gameInfo.textContent = `${currentPlayer} wins!`;
    gameActive = false;
  } else if (isDraw()) {
    gameInfo.textContent = `It's a draw!`;
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameInfo.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin(currentPlayer) {
  return winningCombos.some(combo => {
    return combo.every(index => {
      return tiles[index].classList.contains(`player${currentPlayer}`);
    });
  });
}

function isDraw() {
  return Array.from(tiles).every(tile => {
    return tile.textContent === 'X' || tile.textContent === 'O';
  });
}

function restartGame() {
  currentPlayer = 'X';
  gameActive = true;
  gameInfo.textContent = `Player ${currentPlayer}'s turn`;
  tiles.forEach(tile => {
    tile.textContent = '';
    tile.classList.remove('playerX', 'playerO');
  });
}

tiles.forEach(tile => tile.addEventListener('click', handleTileClick));
resetbutton.addEventListener('click', restartGame);

// Initialize the game
gameInfo.textContent = `Player ${currentPlayer}'s turn`;
