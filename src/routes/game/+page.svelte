<script lang="ts"> 
  import audioFile from "/Users/aditya/Downloads/GitHub/Box-and-Dots--1/src/routes/+page.svelte";
  import { goto } from '$app/navigation';
  import { sound } from 'svelte-sound';
  import { onMount } from 'svelte';


  let showModal = false
  let data = '';


  // Check if the page has been reloaded or not
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



  let gameAI: boolean; // declare a typescript variable

  // get the value of gameAI from local storage and parse it as a boolean
  gameAI = localStorage.getItem("gameAI") === "true";

</script>

<button class="ripple-bg-gray-600  g-clip-text bg-gradient-to-r from-gray-600 to-gray-800 hover:bg-blue-800 hover:bg-gray-800 text-white font-bold py-2 px-4 mt-[10px]   rounded-full w-[250px] h-[100px] text-4xl font-minecraft text-center active:" on:click={() => setTimeout(() => goto('/'), 200)}> 
  Main Menu </button>

<p>Ai = {gameAI}</p>