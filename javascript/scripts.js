/* eslint-disable no-alert */
/* eslint-disable prefer-const */
function TicTacToe() {
  const ticTacToeGrid = document.querySelector('[data-tic-tac-toe-grid]');

  // Where the game board and everything related to how it functions (like size) resides
  const gameBoard = {
    board: [],
    size: 3,
  };

  // Function to display the game board in the console
  // TO BE REMOVED IN THE FUTURE
  const displayBoard = () => console.log(gameBoard.board);

  // Rreturns current board size to determine rounds to be played for tied games
  const getCurrentBoardSize = () => gameBoard.size;

  // Creates a fresh game board based on the size in the gameBoard object and displays it to the DOM and console
  const createNewBoard = () => {
    // Get user input for board size
    let defaultBoardSize = document.querySelector('[data-board-size]').value;

    // When starting a new game, update board size based on users choice else use the default gameBoard.size
    if (defaultBoardSize) {
      gameBoard.size = defaultBoardSize;
    }

    // When creating a new game this clears the board
    while (ticTacToeGrid.lastElementChild) {
      ticTacToeGrid.removeChild(ticTacToeGrid.lastElementChild);
    }

    // Controls what spaces are available for the player to select from
    let availableSpaces = 0;

    // Sets a custom property to the gameboard to control its size via user input
    ticTacToeGrid.style.setProperty('--board-size', gameBoard.size);

    // Creates the game board display in the DOM and logs it in the console
    for (let i = 0; i < gameBoard.size; i++) {
      gameBoard.board[i] = [];
      for (let j = 0; j < gameBoard.size; j++) {
        gameBoard.board[i].push(availableSpaces);

        const boardSquare = document.createElement('div');

        boardSquare.classList.add('board-square');
        boardSquare.dataset.index = gameBoard.board[i][j];

        ticTacToeGrid.appendChild(boardSquare);

        availableSpaces += 1;
      }
    }
    displayBoard();
  };

  createNewBoard();

  // Controls which position and shape is applied to the respective position on the console game board and updates with that information accordingly
  function playerMove(position, shape, boardPosition) {
    let number = 0;

    // Updates the game board with the players shapes and retains the shape in subsquent plays if a position isn't played twice then updates and displays the new game board in the console with appropiate shape.
    for (let i = 0; i < gameBoard.size; i++) {
      for (let j = 0; j < gameBoard.size; j++) {
        if (number === parseInt(position)) {
          if (!isNaN(gameBoard.board[i][j])) {
            gameBoard.board[i][j] = shape;
            displayBoard();

            const playerShape = document.createElement('img');

            if (shape === 'X') {
              playerShape.src = 'svgs/x-symbol-svgrepo-com.svg';
            } else if (shape === 'O') {
              playerShape.src = 'svgs/circle-outline-svgrepo-com.svg';
            }

            boardPosition.appendChild(playerShape);

            return true;
          }
          console.log('Already been played!');
          displayBoard();
          return false;
        }
        if (
          position < 0 ||
          position > gameBoard.size * gameBoard.size - 1 ||
          isNaN(position)
        ) {
          console.log(
            `Incorrect placement/input: please pick a number between 0 and ${
              gameBoard.size * gameBoard.size - 1
            }`
          );
          displayBoard();
          return false;
        }
        number += 1;
      }
    }
  }

  function checkWinner(winningPlayer, tiedGame) {
    // Set a smaller variable for board size
    const boardPosition = gameBoard.board;

    // Loop through entire board regardless of size
    for (let i = 0; i < boardPosition.length; i++) {
      // Variables used for checking to make sure there's "X" number in a row in any direction to be compared against the array length
      let row = 0;
      let col = 0;
      let topLeft = 0;
      let bottomLeft = 0;

      // For loop to loop through each inner array, adding to the variables above if a match is found till it finds 'n' in a row
      for (let j = 0; j < boardPosition[i].length; j++) {
        if (boardPosition[i][0] === boardPosition[i][j]) {
          row += 1;
        }
        if (boardPosition[0][i] === boardPosition[j][i]) {
          col += 1;
        }
        if (boardPosition[0][0] === boardPosition[j][j]) {
          topLeft += 1;
        }
        if (
          boardPosition[boardPosition[j].length - 1][0] ===
          boardPosition[boardPosition[j].length - j - 1][j]
        ) {
          bottomLeft += 1;
        }
      }

      // If statements to check if the variables above match the length of the array they're compared against, meaning there was a winner if true
      if (row === boardPosition[i].length) {
        console.log(`${winningPlayer} is the winner!`);
        return true;
      }
      if (col === boardPosition[i].length) {
        console.log(`${winningPlayer} is the winner!`);
        return true;
      }
      if (topLeft === boardPosition[i].length) {
        console.log(`${winningPlayer} is the winner!`);
        return true;
      }
      if (bottomLeft === boardPosition[i].length) {
        console.log(`${winningPlayer} is the winner!`);
        return true;
      }
      if (tiedGame === gameBoard.size * gameBoard.size) {
        console.log("It's a tied game!");
        return true;
      }
    }
    return false;
  }

  return {
    displayBoard,
    playerMove,
    createNewBoard,
    checkWinner,
    getCurrentBoardSize,
  };
}

// Function for playing Tic Tac Toe
function PlayTicTacToe() {
  const board = TicTacToe();

  let currentBoardSize = board.getCurrentBoardSize();
  let roundsPlayed = 0;
  let victor = false;

  let playerOneName = 'Player one';
  let playerTwoName = 'Player two';

  let players = [
    { name: playerOneName, shape: 'X' },
    { name: playerTwoName, shape: 'O' },
  ];

  function setUpPlayers() {
    const choosePlayerNames = prompt(
      'Would you like to name the players? Yes or No'
    );

    if (choosePlayerNames === null) {
      alert('Input cancelled, default names will be used.');
    } else if (
      choosePlayerNames.toLowerCase() === 'no' ||
      choosePlayerNames.toLowerCase() !== 'yes'
    ) {
      alert('Input invalid, default names will be used');
    } else if (choosePlayerNames.toLowerCase() === 'yes') {
      playerOneName = prompt("Enter Player one's name");

      if (playerOneName === null) {
        alert('Incorrect name, default name will be used.');
        playerOneName = 'Player one';
      }

      playerTwoName = prompt("Enter Player two's name");

      if (playerTwoName === null) {
        alert('Incorrect name, default name will be used.');
        playerTwoName = 'Player two';
      }
    }
    players = [
      { name: playerOneName, shape: 'X' },
      { name: playerTwoName, shape: 'O' },
    ];
  }

  //   setUpPlayers();

  let currentPlayer = players[0];

  console.log(`It's ${currentPlayer.name}'s turn!`);

  function getCurrentPlayer() {
    currentPlayer =
      currentPlayer.name === players[0].name ? players[1] : players[0];
  }

  function showCurrentPlayer() {
    console.log(`It's currently ${currentPlayer.name}'s turn!`);
  }

  function playerClickedSquare() {
    const squares = document.querySelectorAll('[data-index]');

    squares.forEach((square) => {
      square.addEventListener('click', () => {
        playRound(square.dataset.index, square);
      });
    });
  }

  playerClickedSquare();

  function playRound(placement, currentSquare) {
    if (
      roundsPlayed !== currentBoardSize * currentBoardSize &&
      victor !== true
    ) {
      const placedMarker = board.playerMove(
        placement,
        currentPlayer.shape,
        currentSquare
      );

      if (
        placedMarker &&
        placement >= 0 &&
        placement <= currentBoardSize * currentBoardSize - 1
      ) {
        console.log(
          `${currentPlayer.name} places their marker ${currentPlayer.shape} at ${placement}`
        );

        victor = board.checkWinner(currentPlayer.name, roundsPlayed);

        if (victor !== true) {
          roundsPlayed += 1;
          getCurrentPlayer();
          console.log(`It's ${currentPlayer.name}'s turn now!`);
        }
      }
    } else {
      console.log("Game Over! Please use 'game.newGame()");
    }
  }

  // Steps to start a fresh new game
  function beginNewGame() {
    board.createNewBoard();
    currentBoardSize = board.getCurrentBoardSize();
    playerClickedSquare();
    currentPlayer = players[0];
    roundsPlayed = 0;
    victor = false;
    console.log(`A new game has been declared!`);
    console.log(`It's ${currentPlayer.name}'s turn!`);
  }

  // DOM elements used to start a new game and adjust the game board size
  const newGame = document.querySelector('[data-new-game]');
  const newGameOptions = document.querySelector('[data-new-game-options]');
  const startNewGame = document.querySelector('[data-start-new-game]');
  const cancelNewGame = document.querySelector('[data-cancel-new-game]');
  const resetGame = document.querySelector('[data-reset-game]');
  const ticTacToeForm = document.querySelector('[data-tic-tac-toe-form]');

  newGame.addEventListener('click', () => {
    newGameOptions.showModal();
  });

  startNewGame.addEventListener('click', (e) => {
    e.preventDefault();

    if (ticTacToeForm.checkValidity()) {
      beginNewGame();
      newGameOptions.close();
    } else {
      ticTacToeForm.reportValidity();
    }
  });

  cancelNewGame.addEventListener('click', () => {
    newGameOptions.close();
  });

  resetGame.addEventListener('click', () => {
    beginNewGame();
  });

  return { playRound, showCurrentPlayer, newGame };
}

const game = PlayTicTacToe();
