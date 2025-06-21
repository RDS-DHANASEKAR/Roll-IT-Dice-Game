let scores = [0, 0];
let gameStarted = false;
let playerName = "Player";
const computerName = "Computer";


const dice1 = document.getElementById('dice1');
const dice2 = document.getElementById('dice2');
const rollBtn = document.getElementById('rollBtn');
const resetBtn = document.getElementById('resetBtn');
const player1Score = document.getElementById('player1Score');
const player2Score = document.getElementById('player2Score');
const winnerText = document.getElementById('winnerText');
const resultText = document.getElementById('resultText');
const readyMessage = document.querySelector('.result h2');
const player1Element = document.getElementById('player1');
const player2Element = document.getElementById('player2');

const nameModal = document.getElementById('nameModal');
const playerNameInput = document.getElementById('playerName');
const startGameBtn = document.getElementById('startGame');


function initGame() {
  nameModal.style.display = 'flex';
  
  startGameBtn.addEventListener('click', startGame);
  playerNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') startGame();
  });
  
  rollBtn.addEventListener('click', rollDice);
  resetBtn.addEventListener('click', resetGame);
}

function startGame() {
  const enteredName = playerNameInput.value.trim();
  if (enteredName) {
    playerName = enteredName;
    player1Element.textContent = playerName;
    player2Element.textContent = computerName;
    nameModal.style.display = 'none';
    updateScores(); 
  } else {
    alert("Please enter your name to start!");
    playerNameInput.focus();
  }
}


function rollDice() {
  if (!playerName) return; 
  
  if (!gameStarted) {
    gameStarted = true;
    readyMessage.style.display = 'none';
  }

  const rnum1 = Math.floor(Math.random() * 6) + 1;
  const rnum2 = Math.floor(Math.random() * 6) + 1;
  
  dice1.innerHTML = `<img src="./dice${rnum1}.png" alt="Dice ${rnum1}">`;
  dice2.innerHTML = `<img src="./dice${rnum2}.png" alt="Dice ${rnum2}">`;
  
  let result;
  if (rnum1 > rnum2) {
    scores[0]++;
    result = `${playerName} Wins!`;
  } else if (rnum1 < rnum2) {
    scores[1]++;
    result = `${computerName} Wins!`;
  } else {
    result = "Draw!";
  }
  
  updateScores();
  resultText.textContent = result;
  
  if (scores[0] >= 5) {
    winnerText.textContent = `You Won the game! 🎉`;
    rollBtn.disabled = true;
  } else if (scores[1] >= 5) {
    winnerText.textContent = `${computerName} wins the game!`;
    rollBtn.disabled = true;
  }
}

function updateScores() {
  player1Score.textContent = `${playerName}: ${scores[0]}`;
  player2Score.textContent = `${computerName}: ${scores[1]}`;
}

function resetGame() {
  scores = [0, 0];
  gameStarted = false;
  readyMessage.style.display = 'block';
  dice1.innerHTML = '<img src="./images/dice1.png" alt="Dice 1">';
  dice2.innerHTML = '<img src="./images/dice1.png" alt="Dice 2">';
  resultText.textContent = '';
  winnerText.textContent = '';
  updateScores();
  rollBtn.disabled = false;
}

document.addEventListener('DOMContentLoaded', initGame);

const sections = document.querySelectorAll('.content-section');
const navLinks = document.querySelectorAll('.nav a');

window.addEventListener('scroll', () => {
    let current = '';
    const offset = window.innerHeight / 2;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - offset)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});