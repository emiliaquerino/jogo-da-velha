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
    if (box.innerText === 'X' || box.innerText === 'O'){
        return false;
    }

    return true;
};
 
});
