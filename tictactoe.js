const boxes = document.querySelectorAll('.box');
const statusDisplay = document.querySelector('.status');
const resetButton = document.querySelector('#reset');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function handleBoxClick(e) {
    const box = e.currentTarget;
    const index = Array.from(boxes).indexOf(box);

    if (gameState[index] !== '' || !gameActive) return;

    gameState[index] = currentPlayer;
    box.querySelector('span').textContent = currentPlayer;
    box.classList.add('filled');

    if (checkWin()) {
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        highlightWinningBoxes();
        gameActive = false;
        return;
    }

    if (checkDraw()) {
        statusDisplay.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

function highlightWinningBoxes() {
    winningCombinations.forEach(combination => {
        if (combination.every(index => gameState[index] === currentPlayer)) {
            combination.forEach(index => {
                boxes[index].classList.add('winner', 'vibrate');
            });
        }
    });
}

function checkDraw() {
    return gameState.every(cell => cell !== '');
}

function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    boxes.forEach(box => {
        box.querySelector('span').textContent = '';
        box.classList.remove('filled', 'winner', 'vibrate');
    });
}

boxes.forEach(box => box.addEventListener('click', handleBoxClick));
resetButton.addEventListener('click', resetGame);
