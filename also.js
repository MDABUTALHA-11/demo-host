document.addEventListener("DOMContentLoaded", function () {
    const words = ["JAVASCRIPT", "HTML", "BOOTSTRAP", "CSS", "GRID", "LAYOUT", "STYLING", "SCRIPT", "CODE", "DESIGN"];
    const gridSize = 10;
    const grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
    const wordSearchGrid = document.getElementById('word-search-grid');
    const wordList = document.getElementById('word-list');
    const alertContainer = document.getElementById('alert-container');
    let selectedCells = [];

    // Function to place words into the grid
    function placeWordsInGrid() {
        words.forEach(word => {
            let placed = false;
            while (!placed) {
                const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
                const row = Math.floor(Math.random() * gridSize);
                const col = Math.floor(Math.random() * gridSize);
                if (direction === 'horizontal' && col + word.length <= gridSize) {
                    if (canPlaceWord(word, row, col, direction)) {
                        for (let i = 0; i < word.length; i++) {
                            grid[row][col + i] = word[i];
                        }
                        placed = true;
                    }
                } else if (direction === 'vertical' && row + word.length <= gridSize) {
                    if (canPlaceWord(word, row, col, direction)) {
                        for (let i = 0; i < word.length; i++) {
                            grid[row + i][col] = word[i];
                        }
                        placed = true;
                    }
                }
            }
        });
    }

    // Function to check if a word can be placed at a position
    function canPlaceWord(word, row, col, direction) {
        for (let i = 0; i < word.length; i++) {
            if (direction === 'horizontal' && grid[row][col + i] !== '' && grid[row][col + i] !== word[i]) {
                return false;
            }
            if (direction === 'vertical' && grid[row + i][col] !== '' && grid[row + i][col] !== word[i]) {
                return false;
            }
        }
        return true;
    }

    // Fill the remaining empty cells with random letters
    function fillEmptyCells() {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                if (grid[row][col] === '') {
                    grid[row][col] = alphabet[Math.floor(Math.random() * alphabet.length)];
                }
            }
        }
    }

    // Render the grid
    function renderGrid() {
        grid.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellElement = document.createElement('div');
                cellElement.classList.add('word-search-cell');
                cellElement.textContent = cell;
                cellElement.dataset.row = rowIndex;
                cellElement.dataset.col = colIndex;
                cellElement.addEventListener('click', onCellClick);
                wordSearchGrid.appendChild(cellElement);
            });
        });
    }

    // Render the word list
    function renderWordList() {
        words.forEach(word => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item');
            listItem.textContent = word;
            wordList.appendChild(listItem);
        });
    }

    // Handle cell click
    function onCellClick(event) {
        const cell = event.target;
        cell.classList.toggle('highlight');
        const row = cell.dataset.row;
        const col = cell.dataset.col;
        selectedCells.push({ row, col });

        if (selectedCells.length >= 2) {
            checkForWordMatch();
            selectedCells = [];
        }
    }

    // Check if the selected cells form a valid word
    function checkForWordMatch() {
        const selectedWord = selectedCells.map(cell => grid[cell.row][cell.col]).join('');
        const reversedWord = selectedCells.map(cell => grid[cell.row][cell.col]).reverse().join('');

        if (words.includes(selectedWord) || words.includes(reversedWord)) {
            showAlert(`You found the word: ${selectedWord}`);
            highlightWord(selectedCells);
        } else {
            selectedCells.forEach(cell => {
                document.querySelector(`[data-row='${cell.row}'][data-col='${cell.col}']`).classList.remove('highlight');
            });
        }
    }

    // Highlight the found word
    function highlightWord(cells) {
        cells.forEach(cell => {
            document.querySelector(`[data-row='${cell.row}'][data-col='${cell.col}']`).classList.add('highlight');
        });
    }

    // Show an alert message
    function showAlert(message) {
        const alert = document.createElement('div');
        alert.className = 'alert alert-success alert-dismissible fade show';
        alert.role = 'alert';
        alert.innerHTML = `
            ${message}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        `;
        alertContainer.appendChild(alert);

        setTimeout(() => {
            alert.classList.remove('show');
            alert.addEventListener('transitionend', () => alert.remove());
        }, 3000);
    }

    // Initialize the game
    function init() {
        placeWordsInGrid();
        fillEmptyCells();
        renderGrid();
        renderWordList();
    }

    init();
});
