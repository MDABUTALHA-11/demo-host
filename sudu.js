const sudokuBoard = document.getElementById('sudoku-board');
const checkButton = document.getElementById('check-button');
const setButton = document.getElementById('re-button');

const initialBoard = [
  [5, 3, '', '', 7, '', '', '', ''],
  [6, '', '', 1, 9, 5, '', '', ''],
  ['', 9, 8, '', '', '', '', 6, ''],
  [8, '', '', '', 6, '', '', '', 3],
  [4, '', '', 8, '', 3, '', '', 1],
  [7, '', '', '', 2, '', '', '', 6],
  ['', 6, '', '', '', '', 2, 8, ''],
  ['', '', '', 4, 1, 9, '', '', 5],
  ['', '', '', '', 8, '', '', 7, 9]
];

function createBoard(board) {
  sudokuBoard.innerHTML = '';
  board.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      const cellElement = document.createElement('div');
      cellElement.classList.add('sudoku-cell');
      if (cell !== '') {
        cellElement.textContent = cell;
      } else {
        const inputElement = document.createElement('input');
        inputElement.type = 'number';
        inputElement.min = 1;
        inputElement.max = 9;
        cellElement.appendChild(inputElement);
      }
      sudokuBoard.appendChild(cellElement);
    });
  });
}

function getBoard() {
  const currentBoard = [];
  const cells = document.querySelectorAll('.sudoku-cell');
  cells.forEach((cell, index) => {
    const rowIndex = Math.floor(index / 9);
    const cellIndex = index % 9;
    if (!currentBoard[rowIndex]) {
      currentBoard[rowIndex] = [];
    }
    const input = cell.querySelector('input');
    if (input) {
      currentBoard[rowIndex][cellIndex] = input.value ? parseInt(input.value, 10) : '';
    } else {
      currentBoard[rowIndex][cellIndex] = parseInt(cell.textContent, 10);
    }
  });
  return currentBoard;
}

function isValid(board) {
  const isValidRow = row => {
    const nums = row.filter(num => num !== '');
    return new Set(nums).size === nums.length;
  };

  const isValidColumn = col => {
    const nums = col.filter(num => num !== '');
    return new Set(nums).size === nums.length;
  };

  const isValidSubgrid = (board, startRow, startCol) => {
    const nums = [];
    for (let row = startRow; row < startRow + 3; row++) {
      for (let col = startCol; col < startCol + 3; col++) {
        if (board[row][col] !== '') {
          nums.push(board[row][col]);
        }
      }
    }
    return new Set(nums).size === nums.length;
  };

  for (let i = 0; i < 9; i++) {
    if (!isValidRow(board[i]) || !isValidColumn(board.map(row => row[i]))) {
      return false;
    }
  }

  for (let row = 0; row < 9; row += 3) {
    for (let col = 0; col < 9; col += 3) {
      if (!isValidSubgrid(board, row, col)) {
        return false;
      }
    }
  }

  return true;
}

function checkSolution() {
  const currentBoard = getBoard();
  if (isValid(currentBoard)) {
    alert('Congratulations! The solution is correct.');
  } else {
    alert('The solution is incorrect. Please try again.');
  }
}

function resetGame() {
  createBoard(initialBoard);
}

checkButton.addEventListener('click', checkSolution);
setButton.addEventListener('click', resetGame);

// Initialize the game
createBoard(initialBoard);
