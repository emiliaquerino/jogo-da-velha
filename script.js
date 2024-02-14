window.addEventListener("DOMContentLoaded", () => {
  const boxes = Array.from(document.querySelectorAll(".box")); //  retorna um NodeList, então temos que convertê-lo em um array usando Array.from()
  const playerDisplay = document.querySelector(".display-player");
  const resetButton = document.querySelector("#reset");
  const announcer = document.querySelector(".announcer");

  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let isGameActive = true;

  const PLAYERX_WON = "PLAYERX_WON";
  const PLAYERO_WON = "PLAYERO_WON";
  const TIE = "TIE";
});
