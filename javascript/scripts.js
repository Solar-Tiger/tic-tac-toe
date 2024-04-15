/* eslint-disable no-alert */
/* eslint-disable prefer-const */
function TicTacToe() {
  const ticTacToeGrid = document.querySelector('[data-tic-tac-toe-grid]');
  const ticTacToeUserInfo = document.querySelector(
    '[data-tic-tac-toe-user-info]'
  );

  // Where the game board and everything related to how it functions (like size) resides
  const gameBoard = {
    board: [],
    size: 3,
  };

  const displayUserInfo = (info) => {
    ticTacToeUserInfo.textContent = info;
  };

  // Rreturns current board size to determine rounds to be played for tied games
  const getCurrentBoardSize = () => gameBoard.size;

  // Creates a fresh game board based on the size in the gameBoard object and displays it to the DOM and console
  const createNewBoard = () => {
    // Get user input for board size
    let userChosenBoardSize = document.querySelector('[data-board-size]').value;

    // When starting a new game, update board size based on users choice else use the default gameBoard.size of 3
    if (userChosenBoardSize) {
      gameBoard.size = userChosenBoardSize;
    }

    // When creating a new game this clears the board
    while (ticTacToeGrid.lastElementChild) {
      ticTacToeGrid.removeChild(ticTacToeGrid.lastElementChild);
    }

    // Controls what spaces are available for the player to select from as well as what are legal placements based on the number in each position of the array
    let availableSpaces = 0;

    // Sets a custom property to the gameboard to control its size via user input
    ticTacToeGrid.style.setProperty('--board-size', gameBoard.size);

    // Creates the game board display in the DOM
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
  };

  createNewBoard();

  // Controls which position and shape is applied to the respective position on the console game board and updates with that information accordingly
  function playerMove(position, shape, playerName, boardPosition) {
    let number = 0;

    // Updates the game board with the players shapes and retains the shape in subsquent plays if a position isn't played twice then updates and displays the new game board in the console with appropiate shape.
    for (let i = 0; i < gameBoard.size; i++) {
      for (let j = 0; j < gameBoard.size; j++) {
        if (number === parseInt(position)) {
          if (!isNaN(gameBoard.board[i][j])) {
            gameBoard.board[i][j] = shape;
            const playerShape = document.createElement('img');

            if (shape === 'X') {
              playerShape.src = 'svgs/x-symbol-svgrepo-com.svg';
            } else if (shape === 'O') {
              playerShape.src = 'svgs/circle-outline-svgrepo-com.svg';
            }

            boardPosition.appendChild(playerShape);

            return true;
          }
          displayUserInfo(`Already been played! Pick again, ${playerName}`);
          return false;
        }
        number += 1;
      }
    }
  }

  function checkWinner(winningPlayer, tiedGame) {
    // Sets a better name to check each board position to check how many X's or O's are along each row, column or diagonal
    const boardPosition = gameBoard.board;

    // Loop through entire board regardless of size
    for (let i = 0; i < boardPosition.length; i++) {
      // Variables used for checking to make sure there's any shape n number of times in a row in any direction to be compared against the arrays length
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
      if (
        row === boardPosition[i].length ||
        col === boardPosition[i].length ||
        topLeft === boardPosition[i].length ||
        bottomLeft === boardPosition[i].length
      ) {
        displayUserInfo(`${winningPlayer} is the winner`);
        return true;
      }

      if (tiedGame === gameBoard.size * gameBoard.size - 1) {
        displayUserInfo("It's a tied game!");
        return true;
      }
    }
    return false;
  }

  return {
    playerMove,
    createNewBoard,
    checkWinner,
    getCurrentBoardSize,
    displayUserInfo,
  };
}

// Function for playing Tic Tac Toe
(function PlayTicTacToe() {
  // Initializes the tic tac toe board
  const board = TicTacToe();

  // These values speak for themself except "players", which is used to keep track of player names and shapes
  let currentBoardSize = board.getCurrentBoardSize();
  let roundsPlayed = 0;
  let victor = false;

  let playerOneName = 'Player One';
  let playerTwoName = 'Player Two';
  let players;

  // Used to get the input values and display them to the user in the DOM
  let playerOneNameInput = document.querySelector(
    '[data-player-one-name-input]'
  );
  let playerTwoNameInput = document.querySelector(
    '[data-player-two-name-input]'
  );

  let playerOneNameDisplay = document.querySelector(
    '[data-player-one-name-display]'
  );
  let playerTwoNameDisplay = document.querySelector(
    '[data-player-two-name-display]'
  );

  // Used to handle naming the player, displaying it in the DOM or using the default names if the player cancels the initial modal
  function playerNames() {
    // Used to handle and update player names
    function updatePlayerNames(tttNameInput, tttName, tttNameDisplay) {
      if (tttNameInput.value === '') {
        tttNameDisplay.textContent = tttName;
        return tttName;
      }
      tttNameDisplay.textContent = tttNameInput.value;
      return tttNameInput.value;
    }

    playerOneName = updatePlayerNames(
      playerOneNameInput,
      playerOneName,
      playerOneNameDisplay
    );
    playerTwoName = updatePlayerNames(
      playerTwoNameInput,
      playerTwoName,
      playerTwoNameDisplay
    );

    // Handles players variable to control which player is currently active
    players = [
      { name: playerOneName, shape: 'X' },
      { name: playerTwoName, shape: 'O' },
    ];
  }

  playerNames();

  // Sets the current player as Player 1 always
  let currentPlayer = players[0];

  board.displayUserInfo(`It's ${currentPlayer.name}'s turn!`);

  // Updates current player by seeing who current player is and switching when that player makes a move
  function getCurrentPlayer() {
    currentPlayer =
      currentPlayer.name === players[0].name ? players[1] : players[0];
  }

  // Sets the event listeners on each square regardless of board size on each new game/reset game
  function playerClickedSquare() {
    const squares = document.querySelectorAll('[data-index]');

    squares.forEach((square) => {
      square.addEventListener('click', () => {
        playRound(square.dataset.index, square);
      });
    });
  }

  playerClickedSquare();

  // Handles playing of each round, checking to make sure moves are valid and placement is valid
  function playRound(placement, currentSquare) {
    const boardSize = currentBoardSize * currentBoardSize;

    if (roundsPlayed !== boardSize && victor !== true) {
      const placedMarker = board.playerMove(
        placement,
        currentPlayer.shape,
        currentPlayer.name,
        currentSquare
      );

      if (placedMarker && placement >= 0 && placement <= boardSize - 1) {
        board.displayUserInfo(
          `${currentPlayer.name} places their marker ${currentPlayer.shape} at ${placement}`
        );

        victor = board.checkWinner(currentPlayer.name, roundsPlayed);

        if (roundsPlayed !== boardSize && victor !== true) {
          roundsPlayed += 1;
          getCurrentPlayer();
          board.displayUserInfo(`It's ${currentPlayer.name}'s turn now!`);
        } else {
          board.displayUserInfo(
            `${currentPlayer.name} is the winner! Game Over!`
          );
        }
      }
    } else {
      board.displayUserInfo(`${currentPlayer.name} is the winner! Game Over!`);
    }
  }

  // Steps to start a fresh new game
  function beginNewGame() {
    board.createNewBoard();
    currentBoardSize = board.getCurrentBoardSize();
    playerClickedSquare();
    playerNames();
    currentPlayer = players[0];
    roundsPlayed = 0;
    victor = false;
    board.displayUserInfo(
      `A new game begins! It's ${currentPlayer.name}'s turn!`
    );
  }

  // DOM elements used to start a new game and adjust the game board size using user input and buttons
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

  window.onload = newGameOptions.showModal();

  // return { playRound, beginNewGame };
})();
