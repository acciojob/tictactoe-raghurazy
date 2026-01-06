//your JS code here. If required.
const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");
const submitBtn = document.getElementById("submit");
const playerForm = document.getElementById("player-form");
const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let boardState = Array(9).fill(null);
let gameOver = false;

// Winning combinations
const winCombos = [
  [0,1,2],[3,4,5],[6,7,8], // rows
  [0,3,6],[1,4,7],[2,5,8], // cols
  [0,4,8],[2,4,6]           // diagonals
];

// Start game
submitBtn.addEventListener("click", () => {
  player1 = player1Input.value.trim();
  player2 = player2Input.value.trim();
  
  if (!player1 || !player2) {
    alert("Please enter names for both players.");
    return;
  }

  currentPlayer = player1;
  playerForm.style.display = "none";
  board.style.display = "grid";
  message.style.display = "block";
  message.textContent = `${currentPlayer}, you're up`; // ✅ Matches Cypress test
});

// Handle cell click
cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (gameOver) return;

    const index = parseInt(cell.id) - 1;

    if (boardState[index] !== null) return;

    boardState[index] = currentPlayer === player1 ? "X" : "O";
    cell.textContent = boardState[index];

    if (checkWin()) {
      message.textContent = `${currentPlayer} congratulations you won!`;
      gameOver = true;
      return;
    }

    // Check draw
    if (!boardState.includes(null)) {
      message.textContent = "It's a draw!";
      gameOver = true;
      return;
    }

    // Switch player
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    message.textContent = `${currentPlayer}, you're up`; // ✅ Matches Cypress
  });
});

// Check win
function checkWin() {
  const symbol = currentPlayer === player1 ? "X" : "O";
  return winCombos.some(combo => {
    return combo.every(i => boardState[i] === symbol);
  });
}
