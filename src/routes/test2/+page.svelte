<script lang="ts">
  import { writable } from 'svelte/store';
  import "/Users/aditya/Downloads/GitHub/Box-and-Dots--1/src/app.css";
  const size = 10;
  const playerSymbol = 'P';
  const computerSymbol = 'Ai';
  const empty = '';
  let size2;
  let score = 0;

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

  const playerMove = (i: number, j: number) => {
  const copiedBoard = copyBoard($board);
  copiedBoard[i][j].symbol = playerSymbol;
  board.set(copiedBoard);
  if (!checkForLine(playerSymbol)) {
    computerMove();
  }
};

let directions = [
  { dr: 1, dc: 0 },
  { dr: 0, dc: 1 },
  { dr: 1, dc: 1 },
  { dr: 1, dc: -1 } // Diagonal up-right
];


const evaluateMove = (row: number, col: number, symbol: string) => {

  directions.forEach(direction => {
    let count = 0;
    let blocked = 0;
    for (let i = -4; i <= 4; i++) {
      let newRow = row + i * direction.dr;
      let newCol = col + i * direction.dc;
      if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
        let cell = $board[newRow][newCol];
        if (cell.symbol === symbol) {
          count++;
        } else if (cell.symbol !== '') {
          blocked++;
        }
      } else {
        blocked++;
      }
    }
    if (count >= 4 && blocked < 2) {
      score += count;
    }
  });
  return score;
};

const computerMove = () => {
  let emptyCells = [];
  let bestMove = null;
  let highestScore = -Infinity;
  $board.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell.symbol === '') {
        emptyCells.push(cell);
        let score = evaluateMove(i, j, computerSymbol) + evaluateMove(i, j, playerSymbol);
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

  const checkForLine = (symbol: string) => {
    // implement your line-checking logic here
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

  .board {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(10, 1fr);
    gap: 1px;
    width: 80vmin;
    height: 80vmin;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    border-radius: 15px;
    padding: 10px;
    box-shadow: 0 8px 32px 0 rgba(31, 33, 69, 0.37);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.18);
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
  src: url("VCR_OSD_MONO_1.001.ttf");
}
</style>




<div bind:this={container} style="background-image: url('https://i.imgur.com/vQPuKtq.mp4');
  background-size: cover; /* change this */
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;"
  class="mycontainer">" >
  <div class="board font-minecraft">
    {#each $board as row, i}
      {#each row as cell, j}
        <div class={`cell ${cell.symbol}`} on:click={() => playerMove(i, j)}>
          {cell.symbol}
        </div>
      {/each}
    {/each}

    <p>Score = {score}</p>
  </div>
</div>

