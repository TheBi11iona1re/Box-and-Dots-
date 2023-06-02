<script lang="ts">
  import { writable } from 'svelte/store';
  import "/Users/aditya/Downloads/GitHub/Box-and-Dots--1/src/app.css";
  const size = 10;
  const playerSymbol = 'P';
  const computerSymbol = 'Ai';
  const empty = '';
  let size2;
  let score = 0;
  let score2 = 0;
  let score3 = 0;
  let score4 = 0;
  const player2Symbol = 'P2';
  let clicked: boolean;
  let gameAI: boolean; // declare a typescript variable

  // get the value of gameAI from local storage and parse it as a boolean
  gameAI = localStorage.getItem("gameAI") === "true";

  clicked = localStorage.getItem("clicked") === "true"

  clicked = !clicked;

  let audioFile = new Audio(
      "https://audio.jukehost.co.uk/U9SJhg69MqIuCNKJf3dK9bOXa0Co0CeQ"
    );
    audioFile.loop = true; // set loop to true

    // play or pause the audio file based on clicked
    if (clicked === true) {
      audioFile.play();
    } else {
      audioFile.pause();
    }



  var reloaded = localStorage.getItem("reloaded");

// If not, set the reloaded flag to true and reload the page
if (!reloaded) {
  localStorage.setItem("reloaded", true);
  location.reload(true);
}

// If yes, clear the reloaded flag and proceed normally
else {
  localStorage.removeItem("reloaded");
  // Your normal code here
}

  let container: HTMLElement;
  // Declare a variable to store the current event listener
  let listener: (event: MouseEvent) => void;
  // Declare a reactive function for mouse movement
  $: {
    if (container) {
      // Remove the old event listener if it exists
      if (listener) {
        container.removeEventListener("mousemove", listener);
      }
      // Define a new event listener function
      listener = function(event: MouseEvent) {
        // Get the mouse position relative to the container
        let x = event.clientX - container.offsetLeft;
        let y = event.clientY - container.offsetTop;
        // Calculate the percentage of the mouse position
        let xPercent = x / container.offsetWidth * 100;
        let yPercent = y / container.offsetHeight * 100;
        // Set the background position to the percentage
        container.style.backgroundPosition = xPercent + "% " + yPercent + "%";
      };
      // Add the new event listener to the container
      container.addEventListener("mousemove", listener);
    }
  }



  interface Cell {
    id: string;
    symbol: string;
  }

  function resize() {
    size2 = Math.min(window.innerWidth, window.innerHeight) / 2;
     // Set the canvas width and height to match the size
    // Draw the dots and lines on the canvas
  }


  const createBoard = () => Array(size).fill().map((_, i) => 
    Array(size).fill().map((_, j) => ({
      id: `cell-${i}-${j}`,
      symbol: empty
    }))
  );

  const board = writable(createBoard());

  // helper function to copy board
  const copyBoard = (b: Cell[][]) => b.map(row => [...row]);
  let currentPlayer = playerSymbol; // starts with player's turn

  const playerMove = (i: number, j: number) => {
  const copiedBoard = copyBoard($board);
  // check if the cell is empty before proceeding
  if (copiedBoard[i][j].symbol === empty) {
    copiedBoard[i][j].symbol = currentPlayer;
    board.set(copiedBoard);
    if (!checkForLine(currentPlayer)) {
      if (gameAI) {
        computerMove();
      } else {
        // switch between players
        currentPlayer = currentPlayer === playerSymbol ? player2Symbol : playerSymbol;
      }
    }
  } else {

  }
};


let directions = [
  { dr: 1, dc: 0 },
  { dr: 0, dc: 1 },
  { dr: 1, dc: 1 },
  { dr: 1, dc: -1 } // Diagonal up-right
];




// Evaluate potential threats and opportunities
const evaluateMoveImproved = (row: number, col: number, symbol: string, opponentSymbol: string) => {
  let score = 0;

  directions.forEach(direction => {
    let count = 0;
    let opponentCount = 0;
    for (let i = -4; i <= 4; i++) {
      let newRow = row + i * direction.dr;
      let newCol = col + i * direction.dc;
      if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
        let cell = $board[newRow][newCol];
        if (cell.symbol === symbol) {
          count++;
        } else if (cell.symbol === opponentSymbol) {
          opponentCount++;
        }
      }
    }
    if (count >= 4) {
      score += count;
    }
    if (opponentCount >= 4) {
      score += opponentCount * 2; // Increase score if the opponent is about to complete a line
    }
  });
  
  return score;
};

const computerMove = () => {
  let bestMove = null;
  let highestScore = -Infinity;

  $board.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell.symbol === '') {
        let score = evaluateMoveImproved(i, j, computerSymbol, playerSymbol);
        if (score > highestScore) {
          highestScore = score;
          bestMove = { i, j };
        }
      }
    });
  });

  if (bestMove) {
    const copiedBoard = copyBoard($board);
    copiedBoard[bestMove.i][bestMove.j].symbol = computerSymbol;
    board.set(copiedBoard);
    checkForLine(computerSymbol);
  }
};


let checkForLine = (symbol: string): boolean => {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            // Check row
            if (j <= size - 5 && [...Array(5).keys()].every(k => $board[i][j+k].symbol === symbol)) {
                gameOver(symbol);
                return true;
            }
            // Check column
            if (i <= size - 5 && [...Array(5).keys()].every(k => $board[i+k][j].symbol === symbol)) {
                gameOver(symbol);
                return true;
            }
            // Check diagonal (top-left to bottom-right)
            if (i <= size - 5 && j <= size - 5 && [...Array(5).keys()].every(k => $board[i+k][j+k].symbol === symbol)) {
                gameOver(symbol);
                return true;
            }
            // Check diagonal (bottom-left to top-right)
            if (i >= 4 && j <= size - 5 && [...Array(5).keys()].every(k => $board[i-k][j+k].symbol === symbol)) {
                gameOver(symbol);
                return true;
            }
        }
    }
    return false;
};



const gameOver = (symbol: string) => {
  let winner;
  switch(symbol) {
    case playerSymbol:
      winner = 'Player 1';
      score2 = score2 + 1
      break;
    case player2Symbol:
      winner = 'Player 2';
      score3 = score2 + 1

      break;
    case computerSymbol:
      winner = 'Computer';
      score4 = score2 + 1
      break;
  }
  alert(`${winner} wins!`);
  // reloading the game by creating a new game board
  board.set(createBoard());
  currentPlayer = playerSymbol; // reset to player's turn
};





</script>

<style>


.mycontainer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    position: relative;
    z-index: 1;
    margin: 0;    /* Add this line to remove any default margins */
    padding: 0;   /* Add this line to remove any default padding */
    box-sizing: border-box; /* Add this line to include padding and border in the element's total width and height */
  }

  .cell.P2 {
  background-color: rgba(0, 255, 0, 0.5); /* Choose appropriate color */
}


  .board {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(10, 1fr);
    gap: 1px;
    width: 80vmin;
    height: 80vmin;
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  background: rgba(98, 98, 98, 0.15);
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
      backdrop-filter: blur(13px);
      -webkit-backdrop-filter: blur(20px);
      border: 1.25px solid rgba(255, 255, 255, 0.18);
      transition: width 0.4s, height 0.4s;
  }
  .cell {
    border: 1px solid rgba(255, 255, 255, 0.18);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.1);
    cursor: pointer;
    transition: background-color 0.3s;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.18);
  }
  .cell.P {
    background-color: rgba(64, 64, 237, 0.5); /* 70% opacity */
  }
  .cell.Ai {
    background-color: rgba(237, 64, 64, 0.5); /* 70% opacity */
  }

  @font-face {
  font-family: "Minecraft";
  src: url("/Users/aditya/Downloads/GitHub/Box-and-Dots--1/src/routes/test2/VCR_OSD_MONO_1.001.ttf");
}


.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.score-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 20px;
  margin-bottom: 20px;
  margin-right: 30px; /* Adjust the margin-left value as needed */
  border: 1.25px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}



</style>




<div class="content-container">


  <div bind:this={container} style="background-image: url('https://i.imgur.com/vQPuKtq.mp4');
  background-size: cover; /* change this */
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;"
  class="mycontainer">
  
  <div class="score-container">
    <img class="ml-[0px]" src="https://cdn.discordapp.com/attachments/914440092607741952/1104385925909336174/billionaire_dots_and_boxes_game_logo_pixel_art_5ac3e59f-dec3-4bb9-ab92-44e318bcd4fd.png" alt="Lamp" width="100" height="100">
    <p class="font-minecraft text-3xl text-gray-200 mr-4">Dots and Boxes</p> 
    <p class="font-minecraft text-xl text-blue-600 mr-4">Player 1 Score = {score2}</p> 
    <p class="font-minecraft text-xl text-green-500 mr-4">Player 2 Score = {score3}</p>
    <p class="font-minecraft text-xl text-red-500 mr-4">Computer Score = {score4}</p>
    <p class="font-minecraft text-xl text-gray-300 mr-4">Ai = {gameAI}</p>
    <p class="font-minecraft text-xl text-gray-300 mr-4">Sound = {clicked}</p>
  </div>
  

  <div class="board font-minecraft">
    {#each $board as row, i}
      {#each row as cell, j}
        <div class={`cell ${cell.symbol}`} on:click={() => playerMove(i, j)}>
          {cell.symbol}
        </div>
      {/each}
    {/each}
  </div>
</div>

</div>

