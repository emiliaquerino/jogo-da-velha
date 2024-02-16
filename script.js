// Inicialização do jogo
window.addEventListener("DOMContentLoaded", () => {
  // Constantes
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

  // Elementos do DOM
  const boxes = Array.from(document.querySelectorAll(".box"));
  const playerDisplay = document.querySelector(".display-player");
  const resetButton = document.querySelector("#reset");
  const announcer = document.querySelector(".announcer");
  const result = document.querySelector(".result");

  // Variáveis de estado do jogo
  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let isGameActive = true;
  let winsX = 0;
  let winsO = 0;

  // Funções de atualização e estado
  const isValidAction = (box) => box.innerText === "X" || box.innerText === "O" ? false : true;

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
        winsO += 1;
        announcer.innerHTML = 'Player <span class="playerO">O</span> WON!';
        break;
      case PLAYERX_WON:
        winsX += 1;
        announcer.innerHTML = 'Player <span class="playerX">X</span> WON!';
        break;
      case TIE:
        announcer.innerText = 'TIE!';
        break;
    }
    result.classList.add("hide");
    saveWinsToLocalStorage();
    updateWinsDisplay();
  };

  const handleResultValidation = () => {
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
        boxes[winCondition[0]].style.color = 'red';
        boxes[winCondition[1]].style.color = 'red';
        boxes[winCondition[2]].style.color = 'red';
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      announce(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
      isGameActive = false;
      return;
    }

    // Verifica se todas as células estão preenchidas (empate)
    if (!board.includes("")) {
      announce(TIE);
      isGameActive = false; // Marca o jogo como inativo após um empate
      return;
    }
  };


  const userAction = (box, index) => {
    if (isValidAction(box) && isGameActive) {
      box.innerText = currentPlayer;
      box.classList.add(`player${currentPlayer}`);
      updateBoard(index);
      handleResultValidation();
      changePlayer();
    }
  };

  const resetBoard = () => {
    board.fill("");
    isGameActive = true;
    announcer.classList.add("hide");
    if (currentPlayer === "O") {
      changePlayer();
    }
    boxes.forEach((box) => {
      box.innerText = "";
      box.classList.remove("playerX", "playerO");
    });
  };

  // Funções de armazenamento local
  const saveWinsToLocalStorage = () => {
    localStorage.setItem('winsX', winsX.toString());
    localStorage.setItem('winsO', winsO.toString());
  };

  const loadStateAndWinsFromLocalStorage = () => {
    const savedWinsX = localStorage.getItem('winsX');
    const savedWinsO = localStorage.getItem('winsO');
    if (savedWinsX) winsX = parseInt(savedWinsX, 10);
    if (savedWinsO) winsO = parseInt(savedWinsO, 10);
    updateWinsDisplay();
  };

  const updateWinsDisplay = () => {
    document.getElementById('wins-x').innerText = winsX;
    document.getElementById('wins-o').innerText = winsO;
  };

  loadStateAndWinsFromLocalStorage();
  boxes.forEach((box, index) => {
    box.addEventListener("click", () => userAction(box, index));
  });
  resetButton.addEventListener("click", resetBoard);
});
