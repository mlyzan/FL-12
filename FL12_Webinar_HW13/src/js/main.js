import { checkWin } from './checkWin';
import isDraw from './isDraw';
const initialWins = 0;
let winsX = 0;
let winsO = 0;
let circleTurn;

const cellElements = document.querySelectorAll('.cell');
const winnerElemnt = document.querySelector('.winner');
const newGameBtn = document.querySelector('.new-game');
const clearBtn = document.querySelector('.clear');
const playerXElement = document.querySelector('.playerX');
const playerOElement = document.querySelector('.playerO');
const playerXWins = document.querySelector('.playerX-wins');
const playerOWins = document.querySelector('.playerO-wins');

function startGame() {
    let random = Math.random();
    const randomTurn = 0.5;
    playerXElement.classList.remove('turn');
    playerOElement.classList.remove('turn');
    circleTurn = false;
    winnerElemnt.innerText = '';
    cellElements.forEach(e => {
        e.removeEventListener('click', handleClick);
        e.addEventListener('click', handleClick, {once: true});
        e.classList.remove('x');
        e.classList.remove('o');
    })
    if (random > randomTurn) {
        playerXElement.classList.add('turn');
    } else {
        circleTurn = true;
        playerOElement.classList.add('turn');
    }
}
startGame();

function handleClick(e) {
    const cell = e.target;
    let clazz = circleTurn ? 'o' : 'x';
    cell.classList.add(clazz);
    playerXElement.classList.toggle('turn');
    playerOElement.classList.toggle('turn');
    if (checkWin(clazz)) { 
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        circleTurn = !circleTurn;
    }
}

function endGame(draw) {
    cellElements.forEach(e => {
        e.removeEventListener('click', handleClick)
    })
    if (draw) {
        winsX++
        winsO++
        winnerElemnt.innerText = 'Draw!'
        playerOWins.innerText = `Player O winnings ${winsO}`
        playerXWins.innerText = `Player X winnings ${winsX}`
    } else if (!draw && !circleTurn) {
        winsX++
        winnerElemnt.innerText = 'Player X wins!!!'
        playerXWins.innerText = `Player X winnings ${winsX}`
    } else if (!draw && circleTurn) {
        winsO++
        winnerElemnt.innerText = 'Player O wins!!!'
        playerOWins.innerText = `Player O winnings ${winsO}`
    }
}

// listeners
cellElements.forEach(e => e.addEventListener('click', handleClick, { once: true } ));

newGameBtn.addEventListener('click', startGame);

clearBtn.addEventListener('click', () => {
    winsX = initialWins;
    winsO = initialWins;
    playerOWins.innerText = `Player O winnings ${winsO}`;
    playerXWins.innerText = `Player X winnings ${winsX}`;
    startGame();
});
