<script lang="ts">

    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    const gridSize = 10;
    const emptyCell = 0;
    const playerCell = 1;
    const computerCell = 2;
    import audioFile from "/Users/aditya/Downloads/GitHub/Box-and-Dots--1/src/routes/+page.svelte";
  
    let grid = writable(Array(gridSize).fill(Array(gridSize).fill(emptyCell)));
  
    function handleClick(row: number, col: number) {
      grid.update((g) => {
        const newGrid = g.map((r) => r.slice());
        newGrid[row][col] = playerCell;
        return newGrid;
      });
      makeComputerMove();
    }
  
    function makeComputerMove() {
      // Implement your computer move logic here
    }
  
    function cellClass(cell: number) {
      return cell === playerCell
        ? 'bg-blue-500'
        : cell === computerCell
        ? 'bg-red-500'
        : 'bg-white';
    }
  </script>
  
  <style>
    .grid {
      display: grid;
      grid-template-columns: repeat(10, 1fr);
      gap: 2px;
    }
    .cell {
      height: 30px;
      border: 1px solid #ccc;
    }
  </style>
  
  <div class="grid">
    {#each $grid as row, rowIndex}
      {#each row as cell, colIndex}
        <div
          class="cell {cellClass(cell)}"
          on:click={() => handleClick(rowIndex, colIndex)}
        ></div>
      {/each}
    {/each}
  </div>