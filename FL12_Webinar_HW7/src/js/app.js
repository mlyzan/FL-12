import { computer } from './computer.js';

const resultDiv = document.querySelector('.result');
const playerScore = document.querySelector('.player__score p');
const computerScore = document.querySelector('.computer__score p');
const playBtn = document.querySelector('#play');
const playerHandBtn = document.querySelector('.player_hand');
const computerHandBtn = document.querySelector('.computer_hand');
const winnerDiv = document.querySelector('.winner_result');
const resetBtn = document.querySelector('.reset');
const matchDiv = document.querySelector('.match');
const scissorsBtn = document.querySelector('.scissors');
const paperBtn = document.querySelector('.paper');
const rockBtn = document.querySelector('.rock');

let playerWins = 0;
let computerWins = 0;
let round = 1;
const roundLimit = 3;

playBtn.addEventListener('click', function() {
  document.querySelector('.match').style.display = 'block';
  this.style.display = 'none';
});

document.querySelector('.scissors').addEventListener('click', function() {
  startGame(this.innerText, computer());
});

document.querySelector('.paper').addEventListener('click', function() {
  startGame(this.innerText, computer());
});

document.querySelector('.rock').addEventListener('click', function() {
  startGame(this.innerText, computer());
});

resetBtn.addEventListener('click', function() {
  matchDiv.style.display = 'none';
  this.style.display = 'none';
  rockBtn.style.display = 'inline';
  scissorsBtn.style.display = 'inline';
  paperBtn.style.display = 'inline';
  playerHandBtn.src = './img/rock.png';
  computerHandBtn.src = './img/rock.png';
  winnerDiv.innerText = '';
  resultDiv.innerText = '';
  playBtn.style.display = '';
  playerWins = 0;
  computerWins = 0;
  round = 1;
  playerScore.innerText = playerWins;
  computerScore.innerText = computerWins;
});

function startGame(playerChoise, computerChoise) {
  resetBtn.style.display = 'inline';
  if (playerChoise === computerChoise) {
    resultDiv.innerText = `Round ${round},  a draw!`;
    round++;
  } else if (computerChoise === 'Rock') {
    if (playerChoise === 'Scissors') {
      resultDiv.innerText = `Round ${round}, ${playerChoise} vs. ${computerChoise}, You’ve LOST!`;
      computerWins++;
      round++;
    } else {
      resultDiv.innerText = `Round ${round}, ${playerChoise} vs. ${computerChoise}, You’ve WON!`;
      playerWins++;
      round++;
    }
  } else if (computerChoise === 'Paper') {
    if (playerChoise === 'Rock') {
      resultDiv.innerText = `Round ${round}, ${playerChoise} vs. ${computerChoise}, You’ve LOST!`;
      computerWins++;
      round++;
    } else {
      resultDiv.innerText = `Round ${round}, ${playerChoise} vs. ${computerChoise}, You’ve WON!`;
      playerWins++;
      round++;
    }
  } else if (computerChoise === 'Scissors') {
    if (playerChoise === 'Rock') {
      resultDiv.innerText = `Round ${round}, ${playerChoise} vs. ${computerChoise}, You’ve WON!`;
      playerWins++;
      round++;
    } else {
      resultDiv.innerText = `Round ${round}, ${playerChoise} vs. ${computerChoise}, You’ve LOST!`;
      computerWins++;
      round++;
    }
  }
  playerScore.innerText = playerWins;
  computerScore.innerText = computerWins;
  playerHandBtn.src = `./img/${playerChoise}.png`;
  computerHandBtn.src = `./img/${computerChoise}.png`;
  if (round > roundLimit) {
    rockBtn.style.display = 'none';
    scissorsBtn.style.display = 'none';
    paperBtn.style.display = 'none';
    if (playerWins === computerWins) {
      winnerDiv.innerText = 'A friendship won :)';
    } else if (playerWins < computerWins) {
      winnerDiv.innerText = `Computer won ${computerWins} to ${playerWins}`;
    } else if (playerWins > computerWins) {
      winnerDiv.innerText = `You won ${playerWins} to ${computerWins}`;
    }
  }
}

