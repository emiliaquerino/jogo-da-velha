window.addEventListener("DOMContentLoaded", () => {
  const boxes = Array.from(document.querySelectorAll(".box")); //  retorna um NodeList, então temos que convertê-lo em um array usando Array.from()
  const playerDisplay = document.querySelector(".display-player");
  const resetButton = document.querySelector("#reset");
  const announcer = document.querySelector(".announcer");

  const PLAYERX_WON = "PLAYERX_WON";
  const PLAYERO_WON = "PLAYERO_WON";
  const TIE = "TIE";

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  /*
   Indexes within the board
   [0] [1] [2]
   [3] [4] [5]
   [6] [7] [8]
*/

  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let isGameActive = true;

  const isValidAction = (box) => {
    if (box.innerText === "X" || box.innerText === "O") {
      return false;
    }

    return true;
  };

  const updateBoard = (index) => {
    board[index] = currentPlayer;
  };

  const changePlayer = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
  };

  const announce = (type) => {
    switch (type) {
      case PLAYERO_WON:
        announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
        break;
      case PLAYERX_WON:
        announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
        break;
      case TIE:
        announcer.innerText = "Tie";
    }
    announcer.classList.remove("hide");
  };

  function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      const a = board[winCondition[0]];
      const b = board[winCondition[1]];
      const c = board[winCondition[2]];
      if (a === "" || b === "" || c === "") {
        continue;
      }
      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }
  
    if (roundWon) {
      announce(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
      alert(`Jogador ${currentPlayer} venceu!`);
      isGameActive = false;
      return;
    }
  
    if (!board.includes("")) {
      announce(TIE);
      alert("Empate!");
    }
  }
  

  const userAction = (box, index) => {
    if (isValidAction(box) && isGameActive) {
      box.innerText = currentPlayer;
      box.classList.add(`player${currentPlayer}`);
      updateBoard(index);
      handleResultValidation();
      changePlayer();
    }
  };

  boxes.forEach((box, index) => {
    box.addEventListener("click", () => userAction(box, index));
  });

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    announcer.classList.add("hide");

    if (currentPlayer === "O") {
      changePlayer();
    }

    boxes.forEach((box) => {
      box.innerText = "";
      box.classList.remove("playerX");
      box.classList.remove("playerO");
    });
  };
  
  resetButton.addEventListener("click", resetBoard);
});
