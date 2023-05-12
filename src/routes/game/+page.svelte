<script lang="ts"> 
  import pop from "/Users/aditya/Downloads/GitHub/Box-and-Dots--1/src/routes/+page.svelte";
  import { goto } from '$app/navigation';
  import { sound } from 'svelte-sound';
  import { onMount } from 'svelte';
  let buttonSound: HTMLAudioElement;
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



  let clicked: boolean;
  let gameAI: boolean; // declare a typescript variable

  // get the value of gameAI from local storage and parse it as a boolean
  gameAI = localStorage.getItem("gameAI") === "true";

  clicked = localStorage.getItem("clicked") === "true"



  clicked = !clicked;

  let audioFile = new Audio(
      "https://audio.jukehost.co.uk/GkT5w2H7t9KL3ZMUbucVG7qVHr50NjW2"
    );
    audioFile.loop = true; // set loop to true

    // play or pause the audio file based on clicked
    if (clicked === true) {
      audioFile.play();
    } else {
      audioFile.pause();
    }



    let score = 0; // declare a variable for the score
let scoreSound: HTMLAudioElement; // declare a variable for the sound effect




</script>

<audio
  src="https://audio.jukehost.co.uk/1Do1qes84j02HAhuxaMy1WI8SJpd0jMX" 
  preload="auto" 
  bind:this={buttonSound} 
></audio>

<button class="ripple-bg-gray-600  g-clip-text bg-gradient-to-r from-gray-600 to-gray-800 hover:bg-blue-800 hover:bg-gray-800 text-white font-bold py-2 px-4 mt-[10px]   rounded-full w-[250px] h-[100px] text-4xl font-minecraft text-center active:" on:click={() => setTimeout(() => goto('/'), 200)}> 
  Main Menu </button>


  <button on:click={() => {
    if (clicked) { // check if clicked is true
      buttonSound.volume = 0.4; // set the volume to 0.4
      buttonSound.play(); // play the sound effect
    }
  }}>Click me to play a sound effect</button>

<p>Ai = {gameAI} Sound = {clicked}</p>