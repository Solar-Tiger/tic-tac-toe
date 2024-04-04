/* eslint-disable no-alert */
/* eslint-disable prefer-const */
function TicTacToe() {
  // Where the game board and everything related to how it functions (like size) resides
  const gameBoard = {
    board: [],
    size: 3,
  };

  const changeBoardSize = () => {
    let newBoardSize = prompt('What size is the board?');

    if (
      newBoardSize === null ||
      newBoardSize === '' ||
      isNaN(newBoardSize) ||
      newBoardSize < 3 ||
      newBoardSize > 7
    ) {
      alert('No size/incorrect size, using default of 3');

      gameBoard.size = 3;
      return;
    }

    gameBoard.size = parseInt(newBoardSize);
  };

  changeBoardSize();

  // Function to display the game board in the console
  const displayBoard = () => console.log(gameBoard.board);

  const getCurrentBoardSize = () => gameBoard.size;

  // Creates a fresh game board based on the size in the gameBoard object
  function createNewBoard() {
    // Controls what spaces are available
    let availableSpaces = 0;

    // Creates the game board display and logs it in the console
    for (let i = 0; i < gameBoard.size; i++) {
      gameBoard.board[i] = [];
      for (let j = 0; j < gameBoard.size; j++) {
        gameBoard.board[i].push(availableSpaces);
        availableSpaces += 1;
      }
    }
    displayBoard();
  }

  createNewBoard();

  // Controls which position and shape is applied to the respective position on the console game board and updates with that information accordingly
  function playerMove(position, shape) {
    let number = 0;

    // Updates the game board with the players shapes and retains the shape in subsquent plays if a position isn't played twice then updates and displays the new game board in the console with appropiate shape. Will implement logic later for duplicate plays.
    for (let i = 0; i < gameBoard.size; i++) {
      for (let j = 0; j < gameBoard.size; j++) {
        if (number === position) {
          if (!isNaN(gameBoard.board[i][j])) {
            gameBoard.board[i][j] = shape;
            displayBoard();
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

  function checkWinner(winningPlayer) {
    // Set a smaller variable for board size
    const boardSize = gameBoard.board;

    // Loop through entire board regardless of size
    for (let i = 0; i < boardSize.length; i++) {
      // Variables used for checking to make sure there's "X" number in a row in any direction to be compared against the array length
      let row = 0;
      let col = 0;
      let topLeft = 0;
      let bottomLeft = 0;

      // For loop to loop through each inner array, adding to the variables above if a match is found till it finds 'n' in a row
      for (let j = 0; j < boardSize[i].length; j++) {
        if (boardSize[i][0] === boardSize[i][j]) {
          row += 1;
        }
        if (boardSize[0][i] === boardSize[j][i]) {
          col += 1;
        }
        if (boardSize[0][0] === boardSize[j][j]) {
          topLeft += 1;
        }
        if (
          boardSize[boardSize[j].length - 1][0] ===
          boardSize[boardSize[j].length - j - 1][j]
        ) {
          bottomLeft += 1;
        }
      }

      // If statements to check if the variables above match the length of the array they're compared against, meaning there was a winner if true
      if (row === boardSize[i].length) {
        console.log(`${winningPlayer} is the winner!`);
        return true;
      }
      if (col === boardSize[i].length) {
        console.log(`${winningPlayer} is the winner!`);
        return true;
      }
      if (topLeft === boardSize[i].length) {
        console.log(`${winningPlayer} is the winner!`);
        return true;
      }
      if (bottomLeft === boardSize[i].length) {
        console.log(`${winningPlayer} is the winner!`);
        return true;
      }
    }
  }

  return {
    displayBoard,
    playerMove,
    createNewBoard,
    checkWinner,
    changeBoardSize,
    getCurrentBoardSize,
  };
}

// Function for playing Tic Tac Toe
function PlayTicTacToe() {
  const board = TicTacToe();
  let currentBoardSize = board.getCurrentBoardSize();

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

  setUpPlayers();

  let currentPlayer = players[0];

  console.log(`It's ${currentPlayer.name}'s turn!`);

  function getCurrentPlayer() {
    currentPlayer =
      currentPlayer.name === players[0].name ? players[1] : players[0];
  }

  function showCurrentPlayer() {
    console.log(`It's currently ${currentPlayer.name}'s turn!`);
  }

  function playRound(placement) {
    const placedMarker = board.playerMove(placement, currentPlayer.shape);

    if (
      placedMarker &&
      placement >= 0 &&
      placement <= currentBoardSize * currentBoardSize - 1
    ) {
      console.log(
        `${currentPlayer.name} places their marker ${currentPlayer.shape} at ${placement}`
      );

      board.checkWinner(currentPlayer.name);
      getCurrentPlayer();
      console.log(`It's ${currentPlayer.name}'s turn now!`);
    }
  }

  function newGame() {
    board.changeBoardSize();
    currentBoardSize = board.getCurrentBoardSize();
    board.createNewBoard();
    setUpPlayers();
    currentPlayer = players[0];
    console.log(`A new game has been declared!`);
    console.log(`It's ${currentPlayer.name}'s turn!`);
  }
  return { playRound, showCurrentPlayer, newGame };
}

const game = PlayTicTacToe();
