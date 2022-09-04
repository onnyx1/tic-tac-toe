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




  
  const buttons = document.querySelectorAll(".grid button");
  for (let button of buttons) {
    button.addEventListener("click", function () {
      if (validSpot(button)) {
        switchTurn();
        currentPlayer.move(button.getAttribute("data-num"));
        winCondition();
        turn++;
      }
    });
  }
})();
