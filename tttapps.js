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
let round = 0;


//set event listeners =============================

for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", handleClick);
}

//util functions====================================

function displayX(button) {
    const img = document.createElement("img");
    img.src = "assets/X Tic Tac Toe .gif"; // Replace with the path to the animated X GIF
    button.appendChild(img);
    button.value = "x";
    
    // Replace the animated GIF with a static image after 1 second
    setTimeout(() => {
        img.src = "assets/X Tic Tac Toe static.png"; // Replace with the path to the static X image
    }, 1000);
}

function displayO(button) {
    const img = document.createElement("img");
    img.src = "assets/O Tic Tac Toe .gif"; // Replace with the path to your animated O GIF
    button.appendChild(img);
    button.value = "0";
    
    // Replace the animated GIF with a static image after 1 second
    setTimeout(() => {
        img.src = "assets/O Tic Tac Toe static.png"; // Replace with the path to your static O image
    }, 1000);
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
    round++;
    document.getElementById("round").innerHTML = round;
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].innerHTML = "";
        boxes[i].value = "";
        boxes[i].disabled = false;
        boxValues[i] = "";
    }
    document.getElementById("print").innerHTML = "";
}


function checkWinner() {
    // Check for a winner here
    if (currentPlayer === "x") {
        xWins++;
        document.getElementById("xWins").innerHTML = xWins;
        resetGame();
    } else if (currentPlayer === "0") {
        oWins++;
        document.getElementById("oWins").innerHTML = oWins;
        resetGame();
    }
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
         document.getElementById("xWins").innerHTML = xWins;
         document.getElementById("print").innerHTML = "Player X is the Winner!";
         disableAllBoxes();
         colorBoxes(a,b,c);

        document.getElementById("winning-image").style.display = "block";
         setTimeout(() => {
        document.getElementById("winning-image").style.display = "none";
        }, 5000);
        document.getElementById("winning-audio").play();


         return;
       } else if (boxValues[a] === "0" && boxValues[b] === "0" && boxValues[c] === "0") {
         oWins++;
         document.getElementById("oWins").innerHTML = oWins;
         document.getElementById("print").innerHTML = "Player O is the Winner!";
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
