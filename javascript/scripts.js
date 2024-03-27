function TicTacToe() {
  const gameBoard = {
    board: [],
    size: 3,
  };

  function createNewBoard() {
    let number = 0;
    for (let i = 0; i < gameBoard.size; i++) {
      gameBoard.board[i] = [];
      for (let j = 0; j < gameBoard.size; j++) {
        gameBoard.board[i].push(number);
        number += 1;
      }
    }
    console.log(gameBoard.board);
  }

  createNewBoard();

  const displayBoard = () => console.log(gameBoard.board);

  function playerMove(position, shape) {
    let number = 0;
    for (let i = 0; i < gameBoard.size; i++) {
      for (let j = 0; j < gameBoard.size; j++) {
        if (number === position) {
          gameBoard.board[i][j] = shape;
        }
        number += 1;
      }
    }
    displayBoard();
  }

  return { displayBoard, playerMove, createNewBoard };
}

const ticTacToeGame = TicTacToe();
