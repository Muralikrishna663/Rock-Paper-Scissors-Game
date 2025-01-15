let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};
document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    makeMove('rock');
  } else if (event.key === 'p') {
    makeMove('paper');
  } else if (event.key === 's') {
    makeMove('scissors');
  } else if (event.key === 'a') {
    autoPlay();
  } else if (event.key === 'Backspace') {
    showResetConformation();
  }
})

document.querySelector('.js-auto-play').addEventListener('click', () => {
  autoPlay();
})

document.querySelector('.js-reset-score-button').addEventListener('click', () => {
  showResetConformation();
});

let isAutoPlay = false;
let intervalId;
function autoPlay(){
  if(!isAutoPlay){
    intervalId = setInterval(function() {
      const playerMove = pickComputerMove();
      makeMove(playerMove);
    }, 1000);
    isAutoPlay = true;

    document.querySelector('.js-auto-play').innerHTML = 'Stop Play';
  }else{
    clearInterval(intervalId);
    isAutoPlay = false;

    console.log(document.querySelector('.js-auto-play').innerHTML = 'Auto Play');
  }
}

updateScoreElement();

function showResetConformation() {
  document.querySelector('.js-reset-conformation').innerHTML = `
    Are you sure you want to reset the score? 
    <button class = "js-reset-confirm-yes reset-confirm-button">
      Yes
    </button>
    <button class = "js-reset-confirm-no reset-confirm-button">
      No
    </button>
  `

document.querySelector('.js-reset-confirm-yes').addEventListener('click', () => {
  resetScore();
  hideResetConformation();
});
document.querySelector('.js-reset-confirm-no').addEventListener('click', () => {
  hideResetConformation();
});
}

function hideResetConformation() {
  document.querySelector('.js-reset-conformation').innerHTML = '';
}

function makeMove(playerMove) {
  const computerMove = pickComputerMove();
  const resultElement = document.querySelector('.js-result');

  if (playerMove === computerMove) {
    resultElement.innerHTML = `Tie.`;
    score.ties += 1;

  } else if (
    (playerMove === 'rock' && computerMove === 'scissors') ||
    (playerMove === 'paper' && computerMove === 'rock') ||
    (playerMove === 'scissors' && computerMove === 'paper')
  ) {
    resultElement.innerHTML = `You win.`;
    score.wins += 1;

  } else {
    resultElement.innerHTML = `You lose.`;
    score.losses += 1;
  }

  const movesElement = document.querySelector('.js-moves-chosen');
  movesElement.innerHTML = `
    You
    <img src="https://supersimple.dev/projects/rock-paper-scissors/images/${playerMove}-emoji.png" class="move-icon">
    <img src="https://supersimple.dev/projects/rock-paper-scissors/images/${computerMove}-emoji.png" class="move-icon">
    Computer
  `;

  updateScoreElement();
  localStorage.setItem('score', JSON.stringify(score));
}

function resetScore() {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };

  updateScoreElement();
  localStorage.removeItem('score');
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove;

  if (randomNumber < (1 / 3)) {
    computerMove = 'rock';
  } else if (randomNumber < (2 / 3)) {
    computerMove = 'paper';
  } else {
    computerMove = 'scissors';
  }

  return computerMove;
}

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML = `
    Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}
  `;
}
