
currentPlayer = "X";
let playerData;
const homePageContainer = document.querySelector(".home-page-container");
const indexContainer = document.querySelector(".index-container");

const boardGrid = document.querySelector(".board-grid");
const turnMessage = document.querySelector(".turn-message");
const cancelBtn = document.querySelector(".cancel-button");
const changeNameBtn = document.querySelector(".change-name-button");

const dialog = document.querySelector("dialog");
const dialogPlayer = document.querySelector(".dialog-player");
const dialogWinner = document.querySelector(".dialog-winner");
const closeBtn = document.querySelector(".close-button");
const playAgainBtn = document.querySelector(".play-again-button");

const form = document.querySelector("form");

const inputPlayerOne = document.querySelector("#player-one");
const inputPlayerTwo = document.querySelector("#player-two");


playAgainBtn.addEventListener("click", (event) => {
  event.preventDefault();
  resetGame();
  dialog.close();
});

closeBtn.addEventListener("click", (event) => {
  event.preventDefault();
  resetGame();
  dialog.close();
});

cancelBtn.addEventListener("click", (event) => {
  event.preventDefault();

  form.reset();
});

changeNameBtn.addEventListener("click", (event) => {
  event.preventDefault();
  homePageContainer.style.cssText = "display: none"
  indexContainer.style.cssText = "display: flex"
  resetGame();
});

function playerInfo (firstUsername, secondUsername) {
  const playerOne = firstUsername;
  const playerTwo = secondUsername;

  return {playerOne, playerTwo}
}

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

//initial turn message
inputPlayerOne.addEventListener("input", (event) => {
  let initialPlayerOneVal = event.target.value;
  inputPlayerTwo.addEventListener("input", () => {
    if (inputPlayerOne.value === inputPlayerTwo.value) {
      turnMessage.textContent = `${initialPlayerOneVal} 1 (X) turn`;
    } else {
      turnMessage.textContent = `${initialPlayerOneVal} (X) turn`;
    }
  })
});

//if enter key is press at input 1 form would submit
inputPlayerOne.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    submitForm();
  }
});

//if enter key is press at input 1 form would submit
inputPlayerTwo.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    submitForm();
  }
});

//form is submit if the form button is click
form.addEventListener("submit", (event) => {
  event.preventDefault();
  submitForm();  
});

//submit form function that can be reused to other function or event listener
function submitForm() {
  const inputPlayerOneVal = inputPlayerOne.value;
  const inputPlayerTwoVal = inputPlayerTwo.value;

  if (inputPlayerOneVal && inputPlayerTwoVal) {
    playerData = playerInfo(inputPlayerOneVal, inputPlayerTwoVal);

    homePageContainer.style.cssText = "display: flex"
    indexContainer.style.cssText = "display: none"

    form.reset();
  }else {
    console.log("No data to submit");
  }
  if (inputPlayerOneVal === inputPlayerTwoVal) {
    playerData.playerOne = playerData.playerOne + " " + "1";
    playerData.playerTwo = playerData.playerTwo + " " + "2";
  }
}

function checkWin() {
  //loop through the winningCombinations array
  for (const combo of winningCombinations) {

    //takes each position of the tile in the game board
    const marks = combo.map(tile => gameBoard.flat()[tile - 1]);

    //checks if each tile in the mark are all "X"
    if (marks.every(mark => mark === "X")) {
      console.log(`${playerData.playerOne} wins`);
      dialogPlayer.textContent = `${playerData.playerOne}`
      dialogWinner.textContent = "Won!"
      return true;
    }
    //checks if each tile in the mark are all "O"
    else if (marks.every(mark => mark === "O")) {
      console.log(`${playerData.playerTwo} wins`);
      dialogPlayer.textContent = `${playerData.playerTwo}`
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
  turnMessage.textContent = `${playerData.playerOne} (X) turn`
}

function playGame() {

  for (i = 0; i < gameBoard.length; i++) {
    for (j = 0; j < gameBoard[i].length; j++) {

      const tile = document.createElement("button");
      tile.classList.add("tile-button");
      tile.dataset.row = i;//set a data attribute to each DOM tile with data-row = "0" value of i
      tile.dataset.col = j;//set a data attribute to each DOM tile with data-col = "0" value of j
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
        currentPlayer === "X" ? `${turnMessage.textContent = `${playerData.playerOne} (X) turn`}` : `${turnMessage.textContent = `${playerData.playerTwo} (O) turn`}`;
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
