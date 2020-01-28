const button0 = document.querySelector('.col-0');
const button1 = document.querySelector('.col-1');
const button2 = document.querySelector('.col-2');
const button3 = document.querySelector('.col-3');
const button4 = document.querySelector('.col-4');
const button5 = document.querySelector('.col-5');
const button6 = document.querySelector('.col-6');
const gameInfo = document.getElementById('gameInfo');
const start = document.getElementById('startGame');

var gameActive = false;
var activePlayer = 1;
var gameBoard = [];
var playerColor = [];
playerColor[1] = "green";
playerColor[2] = "yellow";
var col, row;

button0.addEventListener('click', function() {
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
  for (var i = 0; i < 7; i++) {
    document.querySelector('.col-' + i).disabled = false;
  }
  updateBoard();
  updateTurn();
}

function updateBoard() {
  checkWin();
  for (col = 0; col <= 6; col++) {
    for (row = 0; row <= 5; row++) {
      document.getElementById('td' + row + col).innerHTML = "<span class='tdElement player" + gameBoard[row][col] + "'> </span>";
    }
  }
}

function updateTurn() {
  if (gameActive) {
    gameInfo.innerHTML = "Current Player: Player " + activePlayer + " <span class='player" + activePlayer + "'>(" + playerColor[activePlayer] + ")</span>";
  }
}

function checkWin() {
  // Check left to right
  for (var i = 1; i <= 2; i++) {
    for (col = 0; col <= 3; col++) {
      for (row = 0; row <= 5; row++) {
        if (gameBoard[row][col] === i) {
          if ((gameBoard[row][col+1] === i) && (gameBoard[row][col+2] === i) && (gameBoard[row][col+3] === i)) {
            endGame(i);
            return true;
          }
        }
      }
    }
  }
  // Check top to bottom
  for (var i = 1; i <= 2; i++) {
    for (col = 0; col <= 6; col++) {
      for (row = 0; row <= 2; row++) {
        if (gameBoard[row][col] === i) {
          if ((gameBoard[row+1][col] === i) && (gameBoard[row+2][col] === i) && (gameBoard[row+3][col] === i)) {
            endGame(i);
            return true;
          }
        }
      }
    }
  }
  // Check down diagonally
  for (var i = 1; i <= 2; i++) {
    for (col = 0; col <= 3; col++) {
      for (row = 0; row <= 2; row++) {
        if (gameBoard[row][col] === i) {
          if ((gameBoard[row+1][col+1] === i) && (gameBoard[row+2][col+2] === i) && (gameBoard[row+3][col+3] === i)) {
            endGame(i);
            return true;
          }
        }
      }
    }
  }
  // Check up diagonally
  for (var i = 1; i <= 2; i++) {
    for (col = 0; col <= 3; col++) {
      for (row = 3; row <= 5; row++) {
        if (gameBoard[row][col] === i) {
          if ((gameBoard[row-1][col+1] === i) && (gameBoard[row-2][col+2] === i) && (gameBoard[row-3][col+3] === i)) {
            endGame(i);
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
  for (var i = 0; i < 7; i++) {
    document.querySelector('.col-'+i).disabled = true;
  }
}

function drop(col) {
  for (row = 5; row >= 0; row--) {
    if (gameBoard[row][col] === 0) {
      gameBoard[row][col] = activePlayer;
      updateBoard();
      activePlayer = (activePlayer === 1) ? 2 : 1;
      updateTurn();
      return true;
    }
  }
}
