<script lang="ts">
  import { writable } from 'svelte/store';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  const size = 10;
  const playerSymbol = 'P';
  const computerSymbol = 'Ai';
  const empty = '';
  let size2;
  let score = 0;
  let aiDifficulty = 'mom';
  let score2 = 0;
  let score3 = 0;
  let score4 = 0;
  const player2Symbol = 'P2';
  let clicked: boolean;
  let gameAI: boolean; 
  let easyAi: boolean; // declare a typescript variable
  
  // Inside the component 






let boardSize: number; // declare a variable for board size
  $: boardSize = Math.min(window.innerWidth, window.innerHeight) * 0.8; // assign it a value that is 80% of the smaller dimension of the window
  $: console.log(boardSize); // log the board size for debugging

  onMount(() => {
    container.addEventListener("mousemove", listener);
    window.addEventListener("resize", () => {
      boardSize = Math.min(window.innerWidth, window.innerHeight) * 0.8;
    });
  });



  


  // get the value of gameAI from local storage and parse it as a boolean
  gameAI = localStorage.getItem("gameAI") === "true";

  clicked = localStorage.getItem("clicked") === "true"
  easyAi = localStorage.getItem("easyAi") === "true"

  clicked = !clicked;



    let winSound = new Audio(
      "https://audio.jukehost.co.uk/9H4EbqTROfaoR5OFTPgEaxJtMZRu0INV"
    );

    let loseSound = new Audio(
      "https://audio.jukehost.co.uk/gdB7GgbChpDLTAVB6AK3Yv8401FLbc3Q"
    );


  var reloaded = localStorage.getItem("reloaded");

// If not, set the reloaded flag to true and reload the page
// if (!reloaded) {
//   localStorage.setItem("reloaded", true);
//   location.reload(true);
// }

// // If yes, clear the reloaded flag and proceed normally
// else {
//   localStorage.removeItem("reloaded");
//   // Your normal code here
// }

let container: HTMLElement; // declare a variable for the container element
  let listener: (event: MouseEvent) => void; // declare a variable for the event listener function
  let animationId: number; // declare a variable for the animation frame id

  // Define the event listener function
  listener = function(event: MouseEvent) {
    // Cancel the previous animation frame if it exists
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    // Request a new animation frame and pass a callback function
    animationId = requestAnimationFrame(() => {
      // Get the mouse position relative to the container
      let x = event.clientX - container.offsetLeft;
      let y = event.clientY - container.offsetTop;
      // Calculate the percentage of the mouse position
      let xPercent = x / container.offsetWidth * 100;
      let yPercent = y / container.offsetHeight * 100;
      // Set the background position to the percentage
      container.style.backgroundPosition = xPercent + "% " + yPercent + "%";
    });
  };


  // Remove the event listener from the container when it is destroyed
  function onDestroy() {
    container.removeEventListener("mousemove", listener);
  }



  interface Cell {
    id: string;
    symbol: string;
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



window.addEventListener("beforeunload", () => {
  const audio = window.parent.document.querySelector("audio");

  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
});



let directions = [
  { dr: 1, dc: 0 },
  { dr: 0, dc: 1 },
  { dr: 1, dc: 1 },
  { dr: 1, dc: -1 } // Diagonal up-right
];

// Min-Max search with alpha-beta pruning


if (easyAi === true) {
      aiDifficulty = 'Easy'

    } else {
      aiDifficulty = 'Default'
    }

// Evaluate potential threats and opportunities
// Recursive function to compute the score of a move considering future moves
const evaluateMoveImproved = (row: number, col: number, symbol: string, opponentSymbol: string, depth: number = 4) => {
 // Base case: if depth is 0, return 0
 if (depth === 0) return 0;
 
 let score = 0;

 directions.forEach(direction => {
 let count = 0;
 let opponentCount = 0;
 let blocked = 0;
 let empty = 0;

 for (let i = -4; i <= 4; i++) {
 let newRow = row + i * direction.dr;
 let newCol = col + i * direction.dc;
 
 if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
 let cell = $board[newRow][newCol];
 if (cell.symbol === symbol) {
 count++;
 } else if (cell.symbol === opponentSymbol) {
 opponentCount++;
 if (i >= -3 && i <= 3) blocked++;
 } else if (cell.symbol === '') {
 empty++;
 }
 }
 }

 // Add some bonus points for having more empty cells around the line
 score += empty * 2;

 // Add more points for having four in a row or blocking the opponent's four in a row
 if (count >= 4) score += count * 100;
 if (opponentCount >= 4) score += opponentCount * 200;

 // Add some points for having three in a row or blocking the opponent's three in a row
 if (count === 3 && blocked < 2) score += count * 50;
 if (opponentCount === 3 && blocked < 2) score += opponentCount * 100;

 // Add some points for having two in a row or blocking the opponent's two in a row
 if (count === 2 && blocked === 0) score += count * 10;
 if (opponentCount === 2 && blocked === 0) score += opponentCount * 20;

 // Check if the human has two or three cells in a row with an empty cell at both ends
 // Make sure the leftEnd and rightEnd are within bounds before accessing them
 let leftEndRow = row - direction.dr;
 let leftEndCol = col - direction.dc;
 let rightEndRow = row + direction.dr;
 let rightEndCol = col + direction.dc;
 if (leftEndRow >= 0 && leftEndRow < size && leftEndCol >= 0 && leftEndCol < size &&
 rightEndRow >= 0 && rightEndRow < size && rightEndCol >= 0 && rightEndCol < size) {
 let leftEnd = $board[leftEndRow][leftEndCol];
 let rightEnd = $board[rightEndRow][rightEndCol];
 if (opponentCount === 2 || opponentCount === 3) {
 if (leftEnd.symbol === '' && rightEnd.symbol === '') {
 // Give a higher score to the move that blocks one of the ends
 score += opponentCount * 50;
 }
 }
 }

 // If easyAi is true, reduce the score by half to make the AI weaker
 if (localStorage.getItem("easyAi") === "true") {
 score /= 2;
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




const isBoardFull = () => {
    return $board.every(row => row.every(cell => cell.symbol !== empty));
}

const gameOver = (symbol: string) => {
  if(symbol !== empty) {
    let winner;
    switch(symbol) {
      case playerSymbol:
        winner = 'Player 1';
        score2 = score2 + 1;
        break;
      case player2Symbol:
        winner = 'Player 2';
        score3 = score3 + 1;
        break;
      case computerSymbol:
        winner = 'Computer';
        score4 = score4 + 1;
        break;
    }
    alert(`${winner} wins!`);
    // Play the sound if clicked is true
    if (clicked) {
      if (winner === 'Computer') {
        loseSound.play();
      } else {
        winSound.play();
      }
    }
  } else if (isBoardFull()) {
    alert('Game Over! It\'s a tie!');
    // Play the sound if clicked is true
    if (clicked) {
      loseSound.play();
    }
  }

  // Reset the board and the current player after a delay
  setTimeout(() => { 
    board.set(createBoard()); 
    currentPlayer = playerSymbol; // reset to player's turn
  }, 600);
};

// Modify your checkForLine function to call gameOver with empty symbol if no player has won and board is full.
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
    if(isBoardFull()){
        gameOver(empty);
    }
    return false;
};




let currentPlayerClass: string;
$: {
  currentPlayerClass = (currentPlayer === playerSymbol) 
  ? 'player1-active'
  : (currentPlayer === player2Symbol) 
  ? 'player2-active'
  : (currentPlayer === computerSymbol)
  ? 'computer-active' 
  : '';
}




</script>

<style>
@import 'src/app.css';

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
    cursor: default;
  }

  .cell.P2 {
  background-color: rgba(0, 255, 0, 0.5); /* Choose appropriate color */
}


  .board {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(10, 1fr);
    gap: 1px;

    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  background: rgba(98, 98, 98, 0.15);
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
      backdrop-filter: blur(13px);
      -webkit-backdrop-filter: blur(20px);
      border: 1.25px solid rgba(255, 255, 255, 0.18);
      transition: width .4s, height .4s;
  }
  
  .cell {
    border: 1px solid rgba(255, 255, 255, 0.18);
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.1);
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
.glow.player1-active {
  animation: glow-player1 100s ease-in-out infinite;
}

.glow.player2-active {
  animation: glow-player2 100s ease-in-out infinite;
}

.glow.computer-active {
  animation: glow-computer 100s ease-in-out infinite;
}
.glow.player1-active {
  animation: glow-player1 100s ease-in-out infinite;
}

@keyframes glow-player1 {
  0% {
    text-shadow: 0 0 2px rgba(59, 130, 246, 0.8), 0 0 20px rgba(59, 130, 246, 0.8), 0 0 26px rgba(59, 130, 246, 0.8), 0 0 28px rgba(59, 130, 246, 0.8);
  }
  100% {
    text-shadow: 0 0 4px rgba(59, 130, 246, 0.8), 0 0 28px rgba(59, 130, 246, 0.8), 0 0 12px rgba(59, 130, 246, 0.8), 0 0 16px rgba(59, 130, 246, 0.8);
  }
}





@keyframes glow-player2 {
  0% {
    text-shadow: 0 0 2px #0c0, 0 0 20px #0c0, 0 0 26px #0c0, 0 0 28px #0c0;
  }
  100% {
    text-shadow: 0 0 4px #0c0, 0 0 28px #0c0, 0 0 12px #0c0, 0 0 16px #0c0;
  }
}


@keyframes glow-computer {
  0% {
    text-shadow: 0 0 2px #f00, 0 0 4px #f00, 0 0 6px #f00, 0 0 8px #f00;
  }
  100% {
    text-shadow: 0 0 4px #f00, 0 0 8px #f00, 0 0 12px #f00, 0 0 16px #f00;
  }
}


</style>




<div class="content-container">


  <div  bind:this={container} on:mount={onMount} on:destroy={onDestroy} class="mycontainer " style="width: 100vw; height: 100vh; background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://cutewallpaper.org/21/pixel-art-city-background/Pixel-Art-Background-Gif-1920x1080-Ryanmartinproductionscom.gif'); background-size: 135%; position: relative;" >


  
  <div class="score-container">
    <img class="ml-[0px]" src="https://cdn.discordapp.com/attachments/914440092607741952/1104385925909336174/billionaire_dots_and_boxes_game_logo_pixel_art_5ac3e59f-dec3-4bb9-ab92-44e318bcd4fd.png" alt="Lamp" width="100" height="100">
    <p class="font-minecraft text-transparent bg-clip-text bg-gradient-to-r from-blue-300  to-blue-500  text-3xl mr-4">Dots and Boxes</p> 

    {#if !gameAI}
    <p class={`font-minecraft text-xl text-blue-600 mr-4 ${currentPlayerClass === 'player1-active' ? 'glow player1-active' : ''}`}>Player 1 Score = {score2}</p>
    <p class={`font-minecraft text-xl text-green-500 mr-4 ${currentPlayerClass === 'player2-active' ? 'glow player2-active' : ''}`}>Player 2 Score = {score3}</p>
  {:else}
    <p class={`font-minecraft text-xl text-blue-600 mr-4 `}>Player 1 Score = {score2}</p>
    <p class={`font-minecraft text-xl text-red-500 mr-4 ${currentPlayerClass === 'computer-active' ? 'glow computer-active' : ''}`}>Computer Score = {score4}</p>
  {/if}

    <p class="font-minecraft text-xl text-gray-300 mr-4">Ai = {gameAI}</p>

    <p class="font-minecraft text-xl text-gray-300 mr-4">Ai Difficulty = {aiDifficulty}</p>
    <p class="font-minecraft text-xl text-gray-300 mr-4">Sound = {clicked}</p>
    
    <button class="transition-all duration-300 ease-in-out transform-gpu hover:scale-110 ripple-bg-gray-600  g-clip-text bg-gradient-to-r from-gray-600 to-gray-800 hover:bg-blue-800 hover:bg-gray-800 text-white font-bold py-2 px-4 mt-[20px]  rounded-full w-[150px] h-[50px] text-xl font-minecraft text-center active:" on:click={() => setTimeout(() => goto('/'), 0)}> 
      Main Menu </button>
</div>

  

<div class="board font-minecraft" style={`width: ${boardSize}px !important; height: ${boardSize}px !important;`}>
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



