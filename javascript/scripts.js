/* eslint-disable prefer-const */
function TicTacToe() {
  // Where the game board and everything related to how it functions (like size) resides
  const gameBoard = {
    board: [],
    size: 3,
  };

  // Function to display the game board in the console
  const displayBoard = () => console.log(gameBoard.board);

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
          gameBoard.board[i][j] = shape;
          displayBoard();
          return;
        }
        number += 1;
      }
    }
    // displayBoard();
  }

  return { displayBoard, playerMove, createNewBoard };
}

// Function for playing Tic Tac Toe
function PlayTicTacToe(
  playerOneName = 'Player one',
  playerTwoName = 'Player two'
) {
  const board = TicTacToe();

  const players = [
    { name: playerOneName, shape: 'X' },
    { name: playerTwoName, shape: 'O' },
  ];

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
    board.playerMove(placement, currentPlayer.shape);

    console.log(
      `${currentPlayer.name} places their marker ${currentPlayer.shape} at ${placement}`
    );

    getCurrentPlayer();
  }

  function newGame() {
    board.createNewBoard();
    console.log(`A new game has been declared!`);
  }

  return { playRound, showCurrentPlayer, newGame };
}

const game = PlayTicTacToe();
