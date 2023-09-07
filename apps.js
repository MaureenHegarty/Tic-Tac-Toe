//global variables  ==================================
//boxes, boxValues and winningCombinations are all stored in arrays
const boxes = Array.from(document.querySelectorAll(".cell"));
const boxValues = [];
for (let i = 0; i < boxes.length; i++) {
  boxValues[i] = "";
}
const winningCombinations = [
  [0, 1, 2],  /* across the top */
  [3, 4, 5],  /* across the middle */
  [6, 7, 8],  /* across the bottom */
  [0, 3, 6],  /* left vertical */
  [1, 4, 7],  /* middle vertical */
  [2, 5, 8],  /* right vertical */
  [0, 4, 8],  /* tLeft to bRight diagonal */
  [2, 4, 6]   /* tRight to bLeft diagonal */
];
//round is the variable which is keeping track of the current number of games - it increments by 1 each time the resetGame function is called
let xWins = 0;
let oWins = 0;
let round = 1;

//set event listeners =============================
//the for loop iterates over the boxes array, for each box element the eventListener is added that will call the handleClick function when the box is clicked.
for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", handleClick);
}

//util functions====================================

function displayX(button) {
    const img = document.createElement("img");
    img.src = "assets/X Tic Tac Toe .gif"; // I have replaced the path to the animated X GIF
    button.appendChild(img);
    button.value = "x";
    
    // I have replaced the animated GIF with a static image after 1 second
    setTimeout(() => {
        img.src = "assets/X Tic Tac Toe static.png"; // I have replaced the path to the static X image
    }, 1000);
}

function displayO(button) {
    const img = document.createElement("img");
    img.src = "assets/O Tic Tac Toe .gif"; // I have replaced the path to the animated O GIF
    button.appendChild(img);
    button.value = "0";
    
    // I have replaced the animated GIF with a static image after 1 second
    setTimeout(() => {
        img.src = "assets/O Tic Tac Toe static.png"; // I have replaced the path to your static O image
    }, 1000);
}
// The disableAllBoxes function is called when there is a winner or a tie in the game
function disableAllBoxes() {
   for (let i = 0; i < boxes.length; i++) {
     boxes[i].disabled = true;
   }
}
// values of a,b, and c are determined in the checkWinner()function which loops through the winningCombinations array - for each winning combination a,b and c are set to the indices of the boxes in that combination and if they match ie all "x's" or all "o's" there is a winner and this function is called to make the contents red.
function colorBoxes(a,b,c) {
   boxes[a].style.color = "red";
   boxes[b].style.color = "red";
   boxes[c].style.color = "red";
}
// after checkWinner() function loops through winningCombinations and there is no winner the isTie(boxValues) function is called to check if game has ended in a tie. if "true" is returned the checkWinner() function updates the display and calls the disableAll Boxes()function.
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
    //resets all the boxes to an empty string with no "x's" or "o's" so a new game can be started. it increments the round variable to show the new value of round ie number of games played and iterates over the boxes to reset the property to an empty string. also sets "disabled" to false to enable user input to box
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
    // Loop through the winning combinations and compare the values of the buttons. for each winning combo the function checks if the values of the boxes are all "x's" or all "o's" - if they are the function increments the xWins or oWins variable, updates who has won (X or O), disables the boxes, and returns from the functon. if no winner, the function checks if there's a tie by calling the isTie function.
    for (let i = 0; i < winningCombinations.length; i++) {
       const a = winningCombinations[i][0];
       const b = winningCombinations[i][1];
       const c = winningCombinations[i][2];
        // use logical AND operator that returns true if both operands are true, and here it checks if all 3 conditions are true. if so player X has won.
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

         document.getElementById("winning-image").style.display = "block";
         setTimeout(() => {
        document.getElementById("winning-image").style.display = "none";
        }, 5000);
        document.getElementById("winning-audio").play();
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

//event handlers =====================================
// handleClick function is triggered when a player clicks on a box in the game. this function checks whose turn it is, displays an "X" or "O", updates the game state and checks if there is a winner or a tie. it also alternates the current player for the next turn.
let currentPlayer = "x"; 

function handleClick(event) {    
    // the button variable is the box clicked by the player and is set to the target property of the event obect.
    const button = event.target;
    
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
