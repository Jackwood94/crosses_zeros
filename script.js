const board = document.getElementById('game-board');
const size = 3;
const boardSize = size * size;
let cells = Array.from({ length: boardSize }, () => '');
let currentPlayer = 'X';

function createCell(value, row, col) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.textContent = value;
    cell.dataset.row = row;
    cell.dataset.col = col;
    cell.addEventListener('click', makeMove);
    return cell;
}

function renderBoard() {
    board.innerHTML = '';
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            const index = row * size + col;
            const value = cells[index];
            const cell = createCell(value, row, col);
            board.appendChild(cell);
        }
    }
}

function makeMove(event) {
    const cell = event.target;
    const row = +cell.dataset.row;
    const col = +cell.dataset.col;
    const index = row * size + col;

    if (cells[index] === '' && !checkWin(cells, currentPlayer)) {
        cells[index] = currentPlayer;
        renderBoard();
        if (checkWin(cells, currentPlayer)) {
            setTimeout(() => alert(`${currentPlayer} выиграли!`), 100);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (currentPlayer === 'O') {
                makeComputerMove();
            }
        }
    }
}

function makeComputerMove() {
    const emptyCells = cells.reduce((acc, cell, index) => {
        if (cell === '') {
            acc.push(index);
        }
        return acc;
    }, []);

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const computerMove = emptyCells[randomIndex];
    cells[computerMove] = 'O';
    renderBoard();

    if (checkWin(cells, 'O')) {
        setTimeout(() => alert('Компьютер выиграл!'), 100);
    } else {
        currentPlayer = 'X';
    }
}

function checkWin(board, player) {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Горизонтальные
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Вертикальные
        [0, 4, 8], [2, 4, 6]           // Диагональные
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] === player && board[b] === player && board[c] === player) {
            return true;
        }
    }
    return false;
}

function init() {
    renderBoard();
    board.addEventListener('click', makeMove);
}

init();
