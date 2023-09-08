# Barbie Tic-Tac-Toe
[game-link](https://mauzzah.github.io/Tic-Tac-Toe/)

# Project Name
Barbie Tic Tac Toe

## [Click here](#) to see my live project!

## About
- This is a traditional game of Tic-Tac-Toe, or noughts and crosses which displays the symbols of X’s and O’s, as two players take turns clicking on the boxes of a three-by-three grid. The player who gets three of their symbols in a horizontal, vertical, or diagonal row is the winner.

![Screenshot](/assets/Barbie-Tic-Tac-Toe.png)

## Planning & Problem Solving
- my starting point was breaking down the global variables, event listeners, util functions, and event handlers.  
- the global variables to me were the cells in the table, the buttons, and the possible winning combinations by player X or O
- I numbered the boxes 1-9
- then I started with player X and “if/else if” statements and operators
- however this soon looked to be a very inefficient way of writing the code for a simple game with a set number of winning combos (8) and turn-taking between 2 players. Also the way I was writing the code, the variables were all specific to each function and did not seem to be global.
- I investigated alternatives, by googling and speaking with my neighbour who suggested arrays. 
- I went back to the 4 sections and started with the global variables, making the boxes(cells), the box values, and the winning combos all arrays and all const’s.
- then I added the event listener of clicking on the boxes
- for the checkWinner function I used the logical AND operator after looping through the winning combos array and searched online how to record the incrementing wins of both player X and player O
- I googled the reset button and used the round value and searched online how to alternate players


## Cool tech
- downloaded a free mp3 to display when the winning conditions were met
- made gifs for the x’s o’s and rotating barbie


## Bugs to fix
- reset game button can be clicked when no game has been played, so it can look like Round 4, Round 5 etc. when no round/game has been played

## Lessons learnt
- Keep better notes along the way for a  wireframe and track all the errors and research 

## Future features
- have a “Try Again” graphic which displays after the match is tied that is different from just clicking the reset button
- include a timer
- include a volume button as the audio file gets to be annoying














