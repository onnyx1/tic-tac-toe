const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = function () {
    return board;
  };
  const setBoard = function (array) {
    board = array;
    display();
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

  const winCondition = function () {
    const winCondition = [
      [gameBoard.getBoard()[0], gameBoard.getBoard()[1], gameBoard.getBoard()[2]],
      [gameBoard.getBoard()[3], gameBoard.getBoard()[4], gameBoard.getBoard()[5]],
      [gameBoard.getBoard()[6], gameBoard.getBoard()[7], gameBoard.getBoard()[8]],
      [gameBoard.getBoard()[0], gameBoard.getBoard()[3], gameBoard.getBoard()[6]],
      [gameBoard.getBoard()[1], gameBoard.getBoard()[4], gameBoard.getBoard()[7]],
      [gameBoard.getBoard()[2], gameBoard.getBoard()[5], gameBoard.getBoard()[8]],
      [gameBoard.getBoard()[0], gameBoard.getBoard()[4], gameBoard.getBoard()[8]],
      [gameBoard.getBoard()[2], gameBoard.getBoard()[4], gameBoard.getBoard()[6]],
    ];

    let winX;
    let winO;
    for (let row = 0; row < winCondition.length; row++) {
      winX = 0;
      winO = 0;
      for (let column = 0; column < winCondition[row].length; column++) {
        if (winCondition[row][column] === "x") {
          winX++;
        }

        if (winCondition[row][column] === "o") {
          winO++;
        }

        if (winX === 3) {
          return("X Wins!");
        }

        if (winO === 3) {
          return("O Wins!");
        }
      }
    }

    return ("no one wins");
  };

  const heuristic_function = function (board) {
    if (board[0] == board[1] && board[1] == board[2]) {
      if (board[0] === "x") {
        return +5;
      }

      if (board[0] === "o") {
        return -5;
      }
    }

    if (board[3] == board[4] && board[4] == board[5]) {
      if (board[3] === "x") {
        return +5;
      }

      if (board[3] === "o") {
        return -5;
      }
    }

    if (board[6] == board[7] && board[7] == board[8]) {
      if (board[6] === "x") {
        return +5;
      }

      if (board[6] === "o") {
        return -5;
      }
    }

    if (board[0] == board[3] && board[3] == board[6]) {
      if (board[0] === "x") {
        return +5;
      }

      if (board[0] === "o") {
        return -5;
      }
    }

    if (board[1] == board[4] && board[4] == board[7]) {
      if (board[1] === "x") {
        return +5;
      }

      if (board[1] === "o") {
        return -5;
      }
    }

    if (board[2] == board[5] && board[5] == board[8]) {
      if (board[2] === "x") {
        return +5;
      }

      if (board[2] === "o") {
        return -5;
      }
    }

    if (board[0] == board[4] && board[4] == board[8]) {
      if (board[0] === "x") {
        return +5;
      }

      if (board[0] === "o") {
        return -5;
      }
    }

    if (board[2] == board[4] && board[4] == board[6]) {
      if (board[2] === "x") {
        return +5;
      }

      if (board[2] === "o") {
        return -5;
      }
    }

    return 0;
  };

  const movesRemaining = function (board) {
    for (let i = 0; i < 9; i++) {
      if (board[i] == "") {
        return true;
      }
    }

    return false;
  };

  const testDraw = function (board) {
    let draw = 0;

    for (let i = 0; i < 9; i++) {
      if (board[i] === "x" || board[i] === "o") {
        draw++;
      }
    }

    if (draw == 9) {
      return "Draw";
    } else {
      return "Playing";
    }
  };

  const miniMax = function (board, depth, isMaximizer) {
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
        if (board[j] === "") {
          board[j] = "o";

          bestValue = Math.min(bestValue, miniMax(board, depth + 1, !isMaximizer));

          board[j] = "";
        }
      }
      return bestValue;
    }
  };

  const optimalMove = function (board) {
    let bestValue = 10000;

    let coords = -1;

    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = "o";

        let value = miniMax(board, 0, true);
        board[i] = "";

        if (value < bestValue) {
          coords = i;
          bestValue = value;
        }
      }
    }

    return coords;
  };

  const optimalMove2 = function (board) {
    let bestValue = -10000;

    let coords = -1;

    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = "x";

        let value = miniMax(board, 0, false);
        board[i] = "";

        if (value > bestValue) {
          coords = i;
          bestValue = value;
        }
      }
    }

    return coords;
  };

  const eraseEvent = function () {
    const buttons = document.querySelectorAll(".grid button");
    for (let button of buttons) {
      button.replaceWith(button.cloneNode(true));
    }
  };

  const buttons = document.querySelectorAll(".grid button");
  const message = document.querySelector(".message p");
  const span = document.querySelector(".p span");


  for (let button of buttons) {
    button.addEventListener("click", function () {
      if (validSpot(button)) {
        span.classList.remove("animate__swing");

        x_player.move(button.getAttribute("data-num"));

        if(winCondition() === "X Wins!"){
          eraseEvent();
          message.style.display = "block";
          span.textContent = winCondition();
          span.classList.add("animate__swing");
        }

        if(winCondition() === "O Wins!"){
          eraseEvent();
          message.style.display = "block";
          span.textContent = winCondition();
          span.classList.add("animate__swing");
        }

        if (testDraw(gameBoard.getBoard()) === "Draw" && winCondition() !== "O Wins" && winCondition() !== "X Wins!") {
          message.style.display = "block";
          span.textContent = "Draw!";
          span.classList.add("animate__swing");


        }
        o_player.move(optimalMove(gameBoard.getBoard()));
        if(winCondition() === "X Wins!"){
          eraseEvent();
          message.style.display = "block";
          span.textContent = winCondition();
          span.classList.add("animate__swing");
        }

        if(winCondition() === "O Wins!"){
          eraseEvent();
          message.style.display = "block";
          span.textContent = winCondition();
          span.classList.add("animate__swing");
        }

        if (testDraw(gameBoard.getBoard()) === "Draw" && winCondition() !== "O Wins" && winCondition() !== "X Wins!") {
          span.textContent = "Draw!";
          span.classList.add("animate__animated");
          span.classList.add("animate__swing");
        }
      }
    });
  }


  const x = document.querySelector(".x");
  x.classList.add("style-button");
  const o = document.querySelector(".o");

  x.addEventListener("click", () => {
    x.classList.add("style-button");
    o.classList.remove("style-button");
    message.style.display = "none";



    gameBoard.setBoard(["", "", "", "", "", "", "", "", ""]);

    eraseEvent();

    const buttons = document.querySelectorAll(".grid button");
    for (let button of buttons) {
      button.addEventListener("click", function () {
        if (validSpot(button)) {
          span.classList.remove("animate__swing");
          x_player.move(button.getAttribute("data-num"));
          if(winCondition() === "X Wins!"){
            eraseEvent();
            message.style.display = "block";
            span.textContent = winCondition();
            span.classList.add("animate__swing");
          }
  
          if(winCondition() === "O Wins!"){
            eraseEvent();
            message.style.display = "block";
            span.textContent = winCondition();
            span.classList.add("animate__swing");
          }
          if (testDraw(gameBoard.getBoard()) === "Draw" && winCondition() !== "O Wins" && winCondition() !== "X Wins!") {
            message.style.display = "block";
            span.textContent = "Draw!";
            span.classList.add("animate__swing");
          }
          o_player.move(optimalMove(gameBoard.getBoard()));
          if(winCondition() === "X Wins!"){
            eraseEvent();
            message.style.display = "block";
            span.textContent = winCondition();
            span.classList.add("animate__swing");

          }
  
          if(winCondition() === "O Wins!"){
            eraseEvent();
            message.style.display = "block";
            span.textContent = winCondition();
            span.classList.add("animate__swing");
          }
          if (testDraw(gameBoard.getBoard()) === "Draw" && winCondition() !== "O Wins" && winCondition() !== "X Wins!") {
            message.style.display = "block";
          span.textContent = "Draw!";
          span.classList.add("animate__swing");
          }
        }
      });
    }
  });

  o.addEventListener("click", () => {
    o.classList.add("style-button");
    x.classList.remove("style-button");
    message.style.display = "none";


    gameBoard.setBoard(["", "", "", "", "", "", "", "", ""]);

    eraseEvent();

    x_player.move(Math.floor(Math.random() * 9));

    const buttons = document.querySelectorAll(".grid button");
    for (let button of buttons) {
      button.addEventListener("click", function () {
        span.classList.remove("animate__swing");
        if (validSpot(button)) {
          o_player.move(button.getAttribute("data-num"));
          if(winCondition() === "X Wins!"){
            eraseEvent();
            message.style.display = "block";
            span.textContent = winCondition();
            span.classList.add("animate__swing");
          }
  
          if(winCondition() === "O Wins!"){
            eraseEvent();
            message.style.display = "block";
            span.textContent = winCondition();
            span.classList.add("animate__swing");
          }
          if (testDraw(gameBoard.getBoard()) === "Draw" && winCondition() !== "O Wins" && winCondition() !== "X Wins!") {
            message.style.display = "block";
            span.textContent = "Draw!";
            span.classList.add("animate__swing");
          }

          x_player.move(optimalMove2(gameBoard.getBoard()));

          if(winCondition() === "X Wins!"){
            eraseEvent();
            message.style.display = "block";
            span.textContent = winCondition();
            span.classList.add("animate__swing");
          }
  
          if(winCondition() === "O Wins!"){
            eraseEvent();
            message.style.display = "block";
            span.textContent = winCondition();
            span.classList.add("animate__swing");
          }

          if (testDraw(gameBoard.getBoard()) === "Draw" && winCondition() !== "O Wins" && winCondition() !== "X Wins!") {
            message.style.display = "block";
          span.textContent = "Draw!";
          span.classList.add("animate__swing");
          }
        }
      });
    }
  });


  const restart = document.querySelector(".restart");

  restart.addEventListener("click",()=>{

    gameBoard.setBoard(["", "", "", "", "", "", "", "", ""]);
    message.style.display = "none";
    if(o.classList.contains("style-button")){

    gameBoard.setBoard(["", "", "", "", "", "", "", "", ""]);

    eraseEvent();

    x_player.move(Math.floor(Math.random() * 9));

    const buttons = document.querySelectorAll(".grid button");
    for (let button of buttons) {
      button.addEventListener("click", function () {
        span.classList.remove("animate__swing");
        if (validSpot(button)) {
          o_player.move(button.getAttribute("data-num"));
          if(winCondition() === "X Wins!"){
            eraseEvent();
            message.style.display = "block";
            span.textContent = winCondition();
            span.classList.add("animate__swing");
          }
  
          if(winCondition() === "O Wins!"){
            eraseEvent();
            message.style.display = "block";
            span.textContent = winCondition();
            span.classList.add("animate__swing");
          }
          if (testDraw(gameBoard.getBoard()) === "Draw" && winCondition() !== "O Wins" && winCondition() !== "X Wins!") {
            message.style.display = "block";
            span.textContent = "Draw!";
            span.classList.add("animate__swing");
          }

          x_player.move(optimalMove2(gameBoard.getBoard()));

          if(winCondition() === "X Wins!"){
            eraseEvent();
            message.style.display = "block";
            span.textContent = winCondition();
            span.classList.add("animate__swing");
          }
  
          if(winCondition() === "O Wins!"){
            eraseEvent();
            message.style.display = "block";
            span.textContent = winCondition();
            span.classList.add("animate__swing");
          }

          if (testDraw(gameBoard.getBoard()) === "Draw" && winCondition() !== "O Wins" && winCondition() !== "X Wins!") {
            message.style.display = "block";
          span.textContent = "Draw!";
          span.classList.add("animate__swing");
          }
        }
      });
    }
  } else {





    gameBoard.setBoard(["", "", "", "", "", "", "", "", ""]);

    eraseEvent();

    const buttons = document.querySelectorAll(".grid button");
    for (let button of buttons) {
      button.addEventListener("click", function () {
        if (validSpot(button)) {
          span.classList.remove("animate__swing");
          x_player.move(button.getAttribute("data-num"));
          if(winCondition() === "X Wins!"){
            eraseEvent();
            message.style.display = "block";
            span.textContent = winCondition();
            span.classList.add("animate__swing");
          }
  
          if(winCondition() === "O Wins!"){
            eraseEvent();
            message.style.display = "block";
            span.textContent = winCondition();
            span.classList.add("animate__swing");
          }
          if (testDraw(gameBoard.getBoard()) === "Draw" && winCondition() !== "O Wins" && winCondition() !== "X Wins!") {
            message.style.display = "block";
            span.textContent = "Draw!";
            span.classList.add("animate__swing");
          }
          o_player.move(optimalMove(gameBoard.getBoard()));
          if(winCondition() === "X Wins!"){
            eraseEvent();
            message.style.display = "block";
            span.textContent = winCondition();
            span.classList.add("animate__swing");

          }
  
          if(winCondition() === "O Wins!"){
            eraseEvent();
            message.style.display = "block";
            span.textContent = winCondition();
            span.classList.add("animate__swing");
          }
          if (testDraw(gameBoard.getBoard()) === "Draw" && winCondition() !== "O Wins" && winCondition() !== "X Wins!") {
            message.style.display = "block";
          span.textContent = "Draw!";
          span.classList.add("animate__swing");
          }
        }
      });
    }
  }


  }
);

  return {};
})();
