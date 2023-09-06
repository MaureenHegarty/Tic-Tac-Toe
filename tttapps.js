//global variables  ==================================

const boxes = Array.from(document.querySelectorAll(".cell"));
const boxValues = [];
for (let i = 0; i < boxes.length; i++) {
  boxValues[i] = "";
}
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
let xWins = 0;
let oWins = 0;

//set event listeners =============================

for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", handleClick);
}

//util functions====================================

function displayX(button) {
    button.innerHTML = "X";
    button.value = "x";
}

function displayO(button) {
    button.innerHTML = "O";
    button.value = "0";
}

function disableAllBoxes() {
   for (let i = 0; i < boxes.length; i++) {
     boxes[i].disabled = true;
   }
}

function colorBoxes(a,b,c) {
   boxes[a].style.color = "red";
   boxes[b].style.color = "red";
   boxes[c].style.color = "red";
}

function isTie(boxValues) {
   for (let i = 0; i < boxValues.length; i++) {
     if (boxValues[i] === "") {
       return false;
     }
   }
   return true;
}

function resetGame() {
   location.reload();
}

//event handlers =====================================

let currentPlayer = "x"; // or "0" // This is the line that changed from const to let

function handleClick(event) {    
    const button = event.target;
    // Display the image of the current player on the button
    if (currentPlayer === "x") {
        displayX(button);
        boxValues[boxes.indexOf(button)] = "x";
    } else if (currentPlayer === "0") {
        displayO(button);
        boxValues[boxes.indexOf(button)] = "0";
    }

    // Disable this button after clicking

    button.disabled = true;

    // Check if there is a winner or a tie

    checkWinner();

    // Alternate the current player for the next turn
    if (currentPlayer === "x") {
        currentPlayer = "0";
    } else if (currentPlayer === "0") {
        currentPlayer = "x";
    }
 }

function checkWinner() {
   // Loop through the winning combinations and compare the values of the buttons
   for (let i = 0; i < winningCombinations.length; i++) {
      const a = winningCombinations[i][0];
      const b = winningCombinations[i][1];
      const c = winningCombinations[i][2];

      if (boxValues[a] === "x" && boxValues[b] === "x" && boxValues[c] === "x") {
        xWins++;
        console.log("win"); // This is the line you need to add
        document.getElementById("print").innerHTML = "Player X won. Total wins: " + xWins;
        disableAllBoxes();
        colorBoxes(a,b,c);
        return;
      } else if (boxValues[a] === "0" && boxValues[b] === "0" && boxValues[c] === "0") {
        oWins++;
        document.getElementById("print").innerHTML = "Player O won. Total wins: " + oWins;
        disableAllBoxes();
        colorBoxes(a,b,c);
        return;
      }
   }

   // If there is no winner, check if there is a tie

   
   if (isTie(boxValues)) {
      document.getElementById("print").innerHTML = "Match Tie";
      disableAllBoxes();
      return;
   }
}
