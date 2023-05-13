<script lang="ts"> 
  import pop from "/Users/aditya/Downloads/GitHub/Box-and-Dots--1/src/routes/+page.svelte";
  import { goto } from '$app/navigation';
  import { sound } from 'svelte-sound';
  import { tweened } from 'svelte/motion';
  import { onMount } from 'svelte';
  let buttonSound: HTMLAudioElement;
  let showModal = false
  let data = '';

  let size = 0;

  function resize() {
    size = Math.min(window.innerWidth, window.innerHeight) / 2;
  }

  onMount(() => {
    // Call the resize function when the page is loaded
    resize();
    // Add an event listener for window resize
    window.addEventListener('resize', resize);
  });

  
  
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
      "https://audio.jukehost.co.uk/U9SJhg69MqIuCNKJf3dK9bOXa0Co0CeQ"
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




</script>

<style>
  .square {
    background: rgba(98, 98, 98, 0.15);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    backdrop-filter: blur(13px);
    -webkit-backdrop-filter: blur(13px);
    border: 1.25px solid rgba(255, 255, 255, 0.18);
    transition: width 0.4s, height 0.4s;
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: white;
    display: grid;
    place-items: center;

    
    position: absolute; /* Add this to position the dots absolutely */
  }

  
</style>  


<div bind:this={container} style="background-image: url('https://i.imgur.com/vQPuKtq.mp4'); background-size: 125%; position: fixed; top: 0; left: 0; bottom: 0; right: 0;"class="">

  <audio
  src="https://audio.jukehost.co.uk/1Do1qes84j02HAhuxaMy1WI8SJpd0jMX" 
  preload="auto" 
  bind:this={buttonSound} 
  ></audio>
  
  <div style="">
    <button class="fixed bottom-[25px] left-1/2 transform -translate-x-1/2 
    ripple-bg-gray-600 g-clip-text bg-gradient-to-r
     from-gray-600 to-gray-800 hover:bg-blue-800
      hover:bg-gray-800 text-white font-bold py-2
       px-4 mt-[10px] rounded-full w-[250px] h-[100px] text-4xl font-minecraft text-center active:" on:click={() => setTimeout(() => goto('/'), 200)}> 
    Main Menu </button>
    </div>

  <div>
  <button class="   fixed top-[20px]  left-1/2 transform -translate-x-1/2 ripple-bg-green-700 g-clip-text bg-gradient-to-r
  from-green-700 to-green-900 hover:bg-green-800
   hover:bg-green-800 text-white font-bold py-2
    px-4 mt-[10px] rounded-full w-[250px] h-[100px] text-4xl font-minecraft text-center active:" on:click={() => {
  if (clicked) { // check if clicked is true
  buttonSound.volume = 0.4; // set the volume to 0.4
  buttonSound.play(); // play the sound effect
  }
  }}>sound effects</button>
  
  <div class="h-screen flex items-center justify-center">
<!-- Use flexbox to center the square -->




<div
  class="square rounded-lg flex items-center justify-center"
  style="width: {size}px; height: {size}px;"
>
  <!-- Use a nested loop to create a 5x5 grid of dots -->

  <p class="font-minecraft text-gray-300 text-3xl">Dots and Boxes</p>
</div>
</div>
    
    

</div>
  
  <p class="fixed bottom-[60px] fixed left-[125px] font-minecraft text-gray-300 text-2xl"> Ai = {gameAI}</p>
  <p class="fixed bottom-[60px] fixed right-[80px] font-minecraft text-gray-300 text-2xl"> Sound = {clicked}</p>
  
  <p class="font-minecraft text-gray-300 fixed bottom-2 left-2 text-sm">©The_Bi11iona1re</p>
  
  </div>
 