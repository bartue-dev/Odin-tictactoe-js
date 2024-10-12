currentPlayer = "X";

const gameBoard = [
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
      //console.log("Player 1 (X) wins");
      return true;
    }
    //checks if each tile in the mark are all "O"
    else if (marks.every(mark => mark === "O")) {
      //console.log("Player 2 (O) wins");
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
  return isBoardFull = gameBoard.flat().every(tile => tile === "X" || tile === "O");
}

function switchPlayer() {
  //if current player is X then it switch into player O vice versa
  currentPlayer = currentPlayer === "X" ? "O" : "X";
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