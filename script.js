
currentPlayer = "X";
const boardGrid = document.querySelector(".board-grid");
const turnMessage = document.querySelector(".turn-message");
const dialog = document.querySelector("dialog");
const dialogPlayer = document.querySelector(".dialog-player");
const dialogWinner = document.querySelector(".dialog-winner");
const closeBtn = document.querySelector(".close-button");
const playAgainBtn = document.querySelector(".play-again-button");
dialog.classList.add("close")

playAgainBtn.addEventListener("click", (event) => {
  event.preventDefault();
  resetGame();
  dialog.close();
})

closeBtn.addEventListener("click", (event) => {
  event.preventDefault();
  resetGame();
  dialog.close();
});

let gameBoard = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]];

const winningCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
];


function printBoard() {
  //Use map method to return all the array with the a separator
  console.log(gameBoard.map(row => row.join("|")).join("\n-----\n"))
}

function checkWin() {
  //loop through the winningCombinations array
  for (const combo of winningCombinations) {

    //takes each position of the tile in the game board
    const marks = combo.map(tile => gameBoard.flat()[tile - 1]);

    //checks if each tile in the mark are all "X"
    if (marks.every(mark => mark === "X")) {
      console.log("Player 1 (X) wins");
      dialogPlayer.textContent = "Player 1 (X)"
      dialogWinner.textContent = "Won!"
      return true;
    }
    //checks if each tile in the mark are all "O"
    else if (marks.every(mark => mark === "O")) {
      console.log("Player 2 (O) wins");
      dialogPlayer.textContent = "Player 2 (O)"
      dialogWinner.textContent = "Won!"
      return true;
    }

  }
  //return false if no win found
  return false;
}

function checkDraw() {
  if (checkWin()) {
    //if checkWin true the code below wont execute
    return false;
  }
  //check if the game board is full
   const isBoardFull = gameBoard.flat().every(tile => tile === "X" || tile === "O");

   if (isBoardFull) {
    console.log("DRAW!")
    dialogPlayer.textContent = "It's a draw!"
    dialogWinner.textContent = ""
    return true;
   } 
}

function switchPlayer() {
  //if current player is X then it switch into player O vice versa
  currentPlayer = currentPlayer === "X" ? "O" : "X";

}

function resetGame() {
  //reset the game board from string "X" or "O" to its original value so it can be use to next game
  gameBoard = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]];

  //reset all the tile from the DOM board
  document.querySelectorAll(".tile-button").forEach((tile) => {
    tile.textContent = ""
  })
  

  //rest the current player state
  currentPlayer = "X";
  //reset the turn message state
  turnMessage.textContent = "Player 1 (X) turn"
}

/* function playGame() {
  let gameActive = true;

  //loop the game until their's a winner or draw
  while (gameActive) {
    printBoard();
    console.log(`${currentPlayer === "X" ? "Player 1 (X)" : "Player 2 (O)"}'s turn`);

    //player choose move with prompt input
    let boardTile = parseInt(prompt("Choose a tile between 1-9"));

    // Validate input
    if (isNaN(boardTile) || boardTile < 1 || boardTile > 9) {
      console.log("Invalid move. Please choose a number between 1-9");
      continue;  // Skip to next iteration of loop
    }

    //Instead of nested loop use the row and column to find the position in the 2D array
    const row = Math.floor((boardTile - 1) / 3);
    const col = (boardTile - 1) % 3;

    // Check if the tile is already taken
    if (typeof gameBoard[row][col] === 'string') {
      console.log("This tile is already taken. Choose another one.");
      continue;  // Skip to next iteration of loop
    }

    // Change the value of the tile with the marker of the current player
    gameBoard[row][col] = currentPlayer;

    // Check for win
    if (checkWin()) {
      printBoard();
      console.log(`${currentPlayer === "X" ? "Player 1 (X)" : "Player 2 (O)"} wins!`);
      gameActive = false;  // End the game
      break;
    }

    // Check for draw
    if (checkDraw()) {
      printBoard();
      console.log("It's a draw!");
      gameActive = false;  // End the game
      break;
    }

    // If game continues, switch player
    switchPlayer();
  }

  // Game end message
  console.log("Game Over!");
  return;
}
playGame(); */
function playGame() {

  for (i = 0; i < gameBoard.length; i++) {
    for (j = 0; j < gameBoard[i].length; j++) {

      const tile = document.createElement("button");
      tile.classList.add("tile-button");
      tile.dataset.row = i;
      tile.dataset.col = j;
      boardGrid.appendChild(tile);

      

      tile.addEventListener("click", (event) => {
        event.preventDefault();
        const row = parseInt(tile.dataset.row);//set a data attribute to each DOM tile with data-row = "0" value of i
        const col = parseInt(tile.dataset.col);//set a data attribute to each DOM tile with data-col = "0" value of j

        //validate the tile if already taken.
        if (typeof gameBoard[row][col] === "string") {
          console.log("This tile is already taken. Choose another one.");
          turnMessage.textContent = "Tile is already taken"
          return;
        }

        gameBoard[row][col] = currentPlayer; //Change the value of the game board that is selected in DOM board
        tile.textContent = currentPlayer;
        switchPlayer();
        currentPlayer === "X" ? `${turnMessage.textContent = "Player 1 (X) turn"}` : `${turnMessage.textContent = "Player 2 (O) turn"}`;
        console.log(gameBoard);


        if (checkWin()) {
          dialog.showModal();
          //resetGame();          
          return;
        }

        if (checkDraw()) {
          dialog.showModal();
          //resetGame();
          return;
        }
      });
    }
  }

  
}

playGame()
