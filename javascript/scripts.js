function TicTacToe() {
  const ticTacToeBoard = [];
  const boardSize = 3;

  function createNewBoard() {
    let number = 0;
    for (let i = 0; i < boardSize; i++) {
      ticTacToeBoard[i] = [];
      for (let j = 0; j < boardSize; j++) {
        ticTacToeBoard[i].push(number);
        number += 1;
      }
    }
    console.log(ticTacToeBoard);
  }

  createNewBoard();

  const displayBoard = () => console.log(ticTacToeBoard);
  function playerMove(position, shape) {
    let number = 0;
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (number === position) {
          ticTacToeBoard[i][j] = shape;
        }
        number += 1;
      }
    }
    displayBoard();
  }

  return { displayBoard, playerMove, createNewBoard };
}

const ticTacToeGame = TicTacToe();
