const cardsArray = [
    { name: 'A', img: 'A' },
    { name: 'B', img: 'B' },
    { name: 'C', img: 'C' },
    { name: 'D', img: 'D' },
    { name: 'E', img: 'E' },
    { name: 'F', img: 'F' },
    { name: 'G', img: 'G' },
    { name: 'H', img: 'H' },
    { name: 'A', img: 'A' },
    { name: 'B', img: 'B' },
    { name: 'C', img: 'C' },
    { name: 'D', img: 'D' },
    { name: 'E', img: 'E' },
    { name: 'F', img: 'F' },
    { name: 'G', img: 'G' },
    { name: 'H', img: 'H' },
    {name: 'I' , img: 'I' },
    {name: 'J' , img: 'J' },
    {name: 'K' , img: 'K' },
    {name: 'I' , img: 'I' },
    {name: 'J' , img: 'J' },
    {name: 'K' , img: 'K' },
    {name: 'L' , img: 'L' },
    {name: 'L' , img: 'L' },
  ];
  
  
  const gameGrid = document.getElementById('game-grid');
  const resetButton = document.getElementById('reset-button');
  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;
  let matchedPairs = 0;
  
  function shuffle(array) {
    array.sort(() => 0.5 - Math.random());
  }
  
  function createBoard() {
    shuffle(cardsArray);
    gameGrid.innerHTML = '';
    matchedPairs = 0;
    cardsArray.forEach((card, index) => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('card');
      cardElement.dataset.name = card.name;
      cardElement.dataset.id = index;
      cardElement.addEventListener('click', flipCard);
      gameGrid.appendChild(cardElement);
    });
  }
  
  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
  
    this.classList.add('flip');
    this.textContent = this.dataset.name;
  
    if (!firstCard) {
      firstCard = this;
      return;
    }
  
    secondCard = this;
    checkForMatch();
  }
  
  function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unflipCards();
  }
  
  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    matchedPairs++;
    resetBoard();
    if (matchedPairs === cardsArray.length / 2) {
      setTimeout(() => {
        alert('You Win!');
      }, 500);
    }
  }
  
  function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      firstCard.textContent = '';
      secondCard.textContent = '';
      resetBoard();
    }, 1000);
  }
  
  function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
  }
  
  resetButton.addEventListener('click', createBoard);
  
  // Initialize the game board
  createBoard();

  