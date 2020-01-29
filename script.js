const button0 = document.querySelector('.col-0');
const button1 = document.querySelector('.col-1');
const button2 = document.querySelector('.col-2');
const button3 = document.querySelector('.col-3');
const button4 = document.querySelector('.col-4');
const button5 = document.querySelector('.col-5');
const button6 = document.querySelector('.col-6');
const gameInfo = document.getElementById('gameInfo');
const start = document.getElementById('startGame');
const modal = document.querySelector('.modal');
const close = document.querySelector('.close');
const restart = document.querySelector('.restart');
const congrats = document.querySelector('.congrats');
const reset = document.getElementById('resetGame');
const p1Wins = document.getElementById('p1Wins');
const p2Wins = document.getElementById('p2Wins');
const playTheme = document.getElementById('theme');
const mute = document.getElementById('music');

var gameActive = false;
var activePlayer = 1;
var gameBoard = [];
var playerColor = [];
playerColor[1] = "green";
playerColor[2] = "yellow";
var col, row;
var p1GamesWon = 0;
var p2GamesWon = 0;

var disc1 = document.querySelector('disc-1');
var disc2 = document.querySelector('disc-2');
var disc3 = document.querySelector('disc-3');
var disc4 = document.querySelector('disc-4');
var disc5 = document.querySelector('disc-5');

var playerDisc1;
var playerDisc2;

disc1.addEventListener('click', function () {
  if (player1) {
    playerDisc1 = 'disc-1'
  } else {
    playerDisc2 = 'disc-1'
  }
})
disc2.addEventListener('click', function () {
  if (player1) {
    playerDisc1 = 'disc-2'
  } else {
    playerDisc2 = 'disc-2'
  }
})
disc3.addEventListener('click', function () {
  if (player1) {
    playerDisc1 = 'disc-3'
  } else {
    playerDisc2 = 'disc-3'
  }
})
disc4.addEventListener('click', function () {
  if (player1) {
    playerDisc1 = 'disc-4'
  } else {
    playerDisc2 = 'disc-4'
  }
})
disc5.addEventListener('click', function () {
  if (player1) {
    playerDisc1 = 'disc-5'
  } else {
    playerDisc2 = 'disc-5'
  }
})


button0.addEventListener('click', function () {
  drop(0);
});
button1.addEventListener('click', function () {
  drop(1);
});
button2.addEventListener('click', function () {
  drop(2);
});
button3.addEventListener('click', function () {
  drop(3);
});
button4.addEventListener('click', function () {
  drop(4);
});
button5.addEventListener('click', function () {
  drop(5);
});
button6.addEventListener('click', function () {
  drop(6);
});








start.addEventListener('click', startGame);
close.addEventListener('click', function () {
  modal.classList.add('hidden');
})
restart.addEventListener('click', function () {
  modal.classList.add('hidden');
  startGame();
})
reset.addEventListener('click', resetGame);

function startGame() {
  if (gameActive === true) {
    return false;
  } else {
    gameActive = true;
  }
  for (row = 0; row <= 5; row++) {
    gameBoard[row] = [];
    for (col = 0; col <= 6; col++) {
      gameBoard[row][col] = 0;
    }
  }
  gameInfo.innerHTML = '';
  // for (var i = 0; i < 7; i++) {
  //   document.querySelector('.col-' + i).classList.remove('hidden');
  // }
  for (row = 0; row <= 5; row++) {
    for (col = 0; col <= 6; col++) {
      var initDisc = document.getElementById('td' + row + col);
      initDisc.classList.remove('fall-' + row);
    }
  }
  start.setAttribute('disabled', 'true');
  updateBoard();
  playAudio();
}

function resetGame() {
  p1GamesWon = 0;
  p2GamesWon = 0;
  p1Wins.textContent = "Player 1 Number of Wins: " + p1GamesWon;
  p2Wins.textContent = "Player 2 Number of Wins: " + p2GamesWon;
  gameInfo.innerHTML = '';
  for (row = 0; row <= 5; row++) {
    gameBoard[row] = [];
    for (col = 0; col <= 6; col++) {
      gameBoard[row][col] = 0;
    }
  }
  for (row = 0; row <= 5; row++) {
    for (col = 0; col <= 6; col++) {
      var initDisc = document.getElementById('td' + row + col);
      initDisc.classList.remove('fall-' + row);
    }
  }
  for (col = 0; col <= 6; col++) {
    for (row = 0; row <= 5; row++) {
      document.getElementById('td' + row + col).innerHTML = "<span class='tdElement player" + gameBoard[row][col] + "'> </span>";
    }
  }
  updateTurn();
}

// --------------updated board add disc--------------

function updateBoard() {
  checkWin();
  for (col = 0; col <= 6; col++) {
    for (row = 0; row <= 5; row++) {
      document.getElementById('td' + row + col).innerHTML = "<span class='tdElement player" + gameBoard[row][col] + "'> </span>";
    }
  }
}

function updateTurn() {
  var p1WinsInfo = "Player 1 Number of Wins: " + p1GamesWon;
  var p2WinsInfo = "Player 2 Number of Wins: " + p2GamesWon;
  p1Wins.textContent = p1WinsInfo;
  p2Wins.textContent = p2WinsInfo;
  if (gameActive) {
    gameInfo.innerHTML = "Current Player: Player " + activePlayer + " <span class='player" + activePlayer + "'>(" + playerColor[activePlayer] + ")</span>";
  }
}

function playAudio() {
  playTheme.play();
}

mute.addEventListener('click', function () {
  if (playTheme.muted === false) {
    playTheme.muted = true;
  }
  else {
    playTheme.muted = false;
  }
});


function checkWin() {
  // Check left to right
  for (var i = 1; i <= 2; i++) {
    for (col = 0; col <= 3; col++) {
      for (row = 0; row <= 5; row++) {
        if (gameBoard[row][col] === i) {
          if ((gameBoard[row][col + 1] === i) && (gameBoard[row][col + 2] === i) && (gameBoard[row][col + 3] === i)) {
            endGame(i);
            if (i === 1) {
              p1GamesWon += 1;
            } else {
              p2GamesWon += 1;
            }
            return true;
          }
        }
      }
    }
  }
  // Check top to bottom
  for (i = 1; i <= 2; i++) {
    for (col = 0; col <= 6; col++) {
      for (row = 0; row <= 2; row++) {
        if (gameBoard[row][col] === i) {
          if ((gameBoard[row + 1][col] === i) && (gameBoard[row + 2][col] === i) && (gameBoard[row + 3][col] === i)) {
            endGame(i);
            if (i === 1) {
              p1GamesWon += 1;
            } else {
              p2GamesWon += 1;
            }
            return true;
          }
        }
      }
    }
  }
  // Check down diagonally
  for (i = 1; i <= 2; i++) {
    for (col = 0; col <= 3; col++) {
      for (row = 0; row <= 2; row++) {
        if (gameBoard[row][col] === i) {
          if ((gameBoard[row + 1][col + 1] === i) && (gameBoard[row + 2][col + 2] === i) && (gameBoard[row + 3][col + 3] === i)) {
            endGame(i);
            if (i === 1) {
              p1GamesWon += 1;
            } else {
              p2GamesWon += 1;
            }
            return true;
          }
        }
      }
    }
  }
  // Check up diagonally
  for (i = 1; i <= 2; i++) {
    for (col = 0; col <= 3; col++) {
      for (row = 3; row <= 5; row++) {
        if (gameBoard[row][col] === i) {
          if ((gameBoard[row - 1][col + 1] === i) && (gameBoard[row - 2][col + 2] === i) && (gameBoard[row - 3][col + 3] === i)) {
            endGame(i);
            if (i === 1) {
              p1GamesWon += 1;
            } else {
              p2GamesWon += 1;
            }
            return true;
          }
        }
      }
    }
  }
}

function endGame(winner) {
  gameActive = false;
  gameInfo.textContent = "Winner: " + winner;
  // for (var i = 0; i < 7; i++) {
  //   document.querySelector('.col-' + i).classList.add('hidden');
  // }
  start.removeAttribute('disabled');
  modal.classList.remove('hidden');
  congrats.textContent = "Congratulations player " + activePlayer + ", you have won!";
}

function drop(col) {
  for (row = 5; row >= 0; row--) {
    if (gameBoard[row][col] === 0) {
      gameBoard[row][col] = activePlayer;
      var disc = document.getElementById('td' + row + col);
      disc.classList.add('fall-' + row);
      updateBoard();
      activePlayer = (activePlayer === 1) ? 2 : 1;
      updateTurn();
      return true;
    }
  }
}
