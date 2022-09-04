const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = function () {
    return board;
  };
  const setBoard = function (array) {
    board = array;
  };

  const display = function () {
    const buttons = document.querySelectorAll(".grid button");
    let i = 0;
    for (let button of buttons) {
      button.textContent = board[i];
      i++;
    }
  };

  const changeElement = function (i, item) {
    board[i] = item;
    display();
  };
  return { getBoard, setBoard, changeElement };
})();






const player = (name) => {
  const getName = () => {
    return name;
  };

  const move = (i) => {
    gameBoard.changeElement(i, getName());
  };

  return { getName, move };
};






const displayController = (function () {
  const x_player = player("x");
  const o_player = player("o");
  let currentPlayer = x_player;
  let turn = 0;

  const switchTurn = function () {
    if (turn % 2 === 0) {
      currentPlayer = x_player;
    } else {
      currentPlayer = o_player;
    }
  };

  const validSpot = function (button) {
    if (button.textContent !== "x" && button.textContent !== "o") {
      return true;
    } else {
      return false;
    }
  };


  const winCondition = function() {


    const winCondition = [[gameBoard.getBoard()[0], gameBoard.getBoard()[1], gameBoard.getBoard()[2]], [gameBoard.getBoard()[3], gameBoard.getBoard()[4], gameBoard.getBoard()[5]],
    [gameBoard.getBoard()[6], gameBoard.getBoard()[7], gameBoard.getBoard()[8]], [gameBoard.getBoard()[0], gameBoard.getBoard()[3], gameBoard.getBoard()[6]],
    [gameBoard.getBoard()[1], gameBoard.getBoard()[4], gameBoard.getBoard()[7]], [gameBoard.getBoard()[2], gameBoard.getBoard()[5], gameBoard.getBoard()[8]],
    [gameBoard.getBoard()[0], gameBoard.getBoard()[4], gameBoard.getBoard()[8]], [gameBoard.getBoard()[2], gameBoard.getBoard()[4], gameBoard.getBoard()[6]]];

    let winX;
    let winO;
    for (let row = 0; row < winCondition.length; row++) {
        winX = 0;
        winO = 0;
        for (let column = 0; column < winCondition[row].length; column++) {

            if (winCondition[row][column] === ("x")) {
                winX++;
            }

            if (winCondition[row][column] === ("o")) {
                winO++;
            }

            if (winX === 3) {
                console.log("X Wins");
            }

            if (winO === 3) {
              console.log("O Wins")
            }

        }
    }

    console.log("no one wins");
  }




  const heuristic_function = function(board) {


    if (board[0] == board[1] && board[1] == board[2]) {

      if (board[0]===("x")) {
          return +5;
      }

      if (board[0]===("o")) {
          return -5;
      }

    }

      if (board[3] == board[4] && board[4] == board[5]) {

        if (board[3]===("x")) {
            return +5;
        }

        if (board[3]===("o")) {
            return -5;
        }

      }

        if (board[6] == board[7] && board[7] == board[8]) {

          if (board[6]===("x")) {
              return +5;
          }

          if (board[6]===("o")) {
              return -5;
          }

        }



        if (board[0] == board[3] && board[3] == board[6]) {

          if (board[0]===("x")) {
              return +5;
          }

          if (board[0]===("o")) {
              return -5;
          }
      }


      if (board[1] == board[4] && board[4] == board[7]) {

        if (board[1]===("x")) {
            return +5;
        }

        if (board[1]===("o")) {
            return -5;
        }
    }


    if (board[2] == board[5] && board[5] == board[8]) {

      if (board[2]===("x")) {
          return +5;
      }

      if (board[2]===("o")) {
          return -5;
      }
  }


    if (board[0] == board[4] && board[4] == board[8]) {

        if (board[0]===("x")) {
            return +5;
        }

        if (board[0]===("o")) {
            return -5;
        }
    }

    if (board[2] == board[4] && board[4] == board[6]) {

        if (board[2]===("x")) {
            return +5;
        }

        if (board[2]===("o")) {
            return -5;
        }
    }

    return 0;

}







const movesRemaining = function(board) {

    for(let i = 0; i < 9; i++) {
            if (board[i] == "") {
                return true;
            }
    }

    return false;

}




const miniMax = function(board, depth, isMaximizer) {

  let outcome = heuristic_function(board);
  if (outcome === 5) {
      return outcome;
  }

  if (outcome === -5) {
      return outcome;
  }

  if (movesRemaining(board) === false) {
      return 0;
  }

  if (isMaximizer === true) {

      let bestValue = -10000000;

      for (let i = 0; i < 9; i++) {

              if (board[i] === "") {

                  board[i] = "x";

                  bestValue = Math.max(bestValue, miniMax(board, depth + 1, !isMaximizer));

                  board[i] = "";

              }
          
      }

      return bestValue;

  } else {

      let bestValue = 1000;

      for (let j = 0; j < 9; j++) {

              if (board[j]==="") {

                  board[j] = "o";

                  bestValue = Math.min(bestValue, miniMax(board, depth + 1, !isMaximizer));

                  board[j] = "";

              }
          
      }
      return bestValue;

  }

}





const optimalMove = function(board) {

  let bestValue = -10000;

  let coords = -1;

  for (let i = 0; i < 9; i++) {

          if (board[i] === "") {
              board[i] = "x";

              let value = miniMax(board, 0, false);
            console.log("minimax" + value);
              board[i] = "";

              if (value > bestValue) {
                  coords = i;
                  bestValue = value;

              }

          }
      }
  
  return coords;
}












































































































































































































































































  
  const buttons = document.querySelectorAll(".grid button");
  for (let button of buttons) {
    button.addEventListener("click", function () {
      if (validSpot(button)) {
        o_player.move(button.getAttribute("data-num"));
        x_player.move(optimalMove(gameBoard.getBoard()));

      }
    });
  }

return {movesRemaining, heuristic_function, optimalMove};

})();
