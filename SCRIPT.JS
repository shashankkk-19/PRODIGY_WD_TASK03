document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset-button');
    const statusDisplay = document.getElementById('status');
    const playwithai = document.getElementById('opponentAi');
    const playwithhuman = document.getElementById('opponentHuman');
    const playerX = 'X';
    const playerO = 'O';
    let aiPlayer;
    let currentPlayer = playerX;
    let gameState = Array(9).fill(null);
    let gameActive = true;
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    playwithai.addEventListener('click', withai);
    function withai(){
        playwithai.innerText = "Playing with AI";
        playwithhuman.innerText = "PLAY WITH HUMAN";
         aiPlayer = playerO;
         handleCellClick();
    }
    playwithhuman.addEventListener('click', withhuman);
    function withhuman(){
        playwithhuman.innerText = "Playing with HUMAN";
        playwithai.innerText = "PLAY WITH AI";
        location.reload();
    }
function handleCellClick(event) {      
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameState[clickedCellIndex] !== null || !gameActive) {
            return;
        }

        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        if (checkWin()) {
            statusDisplay.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
            return;
        }

        if (checkDraw()) {
            statusDisplay.textContent = 'Game ends in a draw!';
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === playerX ? playerO : playerX;
        statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
        if (!gameActive) return;
        if (currentPlayer === aiPlayer) {
            makeAiMove();
        }
    }

    function makeAiMove() {
        let availableMoves = gameState.map((val, index) => (val === null ? index : null)).filter(val => val !== null);
        if (availableMoves.length === 0) return;

        let move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        gameState[move] = aiPlayer;
        cells[move].textContent = aiPlayer;

        if (checkWin()) {
            statusDisplay.textContent = `Player ${aiPlayer} wins!`;
            gameActive = false;
            return;
        }

        if (checkDraw()) {
            statusDisplay.textContent = 'Game ends in a draw!';
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === playerX ? playerO : playerX;
        statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
    }
    function checkWin() {
        return winningConditions.some(condition => {
            return condition.every(index => gameState[index] === currentPlayer);
        });
    }

    function checkDraw() {
        return gameState.every(cell => cell !== null);
    }

    function resetGame() {
        gameState = Array(9).fill(null);
        cells.forEach(cell => (cell.textContent = ''));
        currentPlayer = playerX;
        gameActive = true;
        statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
});
