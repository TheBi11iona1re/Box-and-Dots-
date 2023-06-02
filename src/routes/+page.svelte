<script lang="ts">
import { goto } from '$app/navigation';
import { sound } from 'svelte-sound';
import { onMount } from 'svelte';
import { appWindow } from '@tauri-apps/api/window'
import { invoke } from '@tauri-apps/api/tauri'
import "../app.css";
import { message } from '@tauri-apps/api/dialog';
let gameAI = false


  
function handleToggle(event: KeyboardEvent<HTMLInputElement>) {
    gameAI = event.target.checked; // assign the value of the checkbox to the variable
    localStorage.setItem("gameAI", gameAI.toString()); // store the variable in local storage
  }

  let showDialog = false;
  
  function toggleDialog() {
    showDialog = !showDialog;

}



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
  

let clicked = false;
  let showPopup = false;

  let audioFile: HTMLAudioElement = new Audio(
    "https://audio.jukehost.co.uk/oLi9mXMDDx1Jb5whJjRPMzdTogQFcS82"
  );
  audioFile.play();
  audioFile.loop = true;

  function mute() {
    clicked = !clicked; // toggle clicked
    if (audioFile.paused) {
      audioFile.play();
    } else {
      audioFile.pause();
    }
    localStorage.setItem("clicked", String(clicked)); // store clicked in localStorage
    return true;
  }


  onMount(() => {
    // get clicked from localStorage on page load
    clicked = localStorage.getItem("clicked") === "true";
    // pause audio if clicked is true
    if (clicked) {
      audioFile.pause();
    }
  });



  // Get the container element
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

/* Popup box BEGIN */


@font-face {
  font-family: "Minecraft";
  src: url("VCR_OSD_MONO_1.001.ttf");
}



dialog {
  font-family: "Minecraft";
  position: absolute;
  top: 50%; /* Adjust this value to suit your needs */
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  padding: 20px;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  background: rgba(98, 98, 98, 0.15);
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
      backdrop-filter: blur(13px);
      -webkit-backdrop-filter: blur(20px);
      border: 1.25px solid rgba(255, 255, 255, 0.18);
      transition: width 0.4s, height 0.4s;
}



.backdrop.open {
  top: 0;
  position: fixed; 
  z-index: 0; 
  -webkit-backdrop-filter: blur(10px) brightness(0.69);
  width: 100vw;
  height: 100vh;
  animation: fadeIn .5s forwards;
  opacity: 1;
  pointer-events: auto;
}


.backdrop.closed {
  top: 0;
  position: fixed; 
  z-index: 0; 
  -webkit-backdrop-filter: blur(10px) brightness(0.69);
  width: 100vw;
  height: 100vh;
  animation: fadeOut .5s forwards;
  opacity: 0;
  pointer-events: none;
}



@keyframes fadeIn {
  from {opacity: 0;}
  to {opacity: 1;}
}

@keyframes fadeOut {
  from {opacity: 1;}
  to {opacity: 0;}
}

</style>

<div bind:this={container} style="width: 100vw; height: 100vh; background-image: url('https://cutewallpaper.org/21/pixel-art-city-background/Pixel-Art-Background-Gif-1920x1080-Ryanmartinproductionscom.gif'); background-size: 135%; position: relative;" >


<center>
  
    <h1 class="text-6xl mt-[0px] text-4xl drop-shadow-lg font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-300  to-blue-900 transform translate-y-[80px] font-minecraft">Dots and Boxes</h1>

  <button class="ripple-bg-blue-600  g-clip-text bg-gradient-to-r from-blue-600 to-blue-900 hover:bg-blue-800   text-white transform translate-y-[100px] font-minecraft py-2 px-4 mt-[00px] rounded-full w-[600px] h-[200px] text-[90px] font-bold text-center active:" on:click={() => setTimeout(() => goto('/game'), 200)}>
    Play!
  </button>







</center>



<center>
    <button class="ripple-bg-gray-600  g-clip-text bg-gradient-to-r from-gray-600 to-gray-800 hover:bg-blue-800 hover:bg-gray-800 text-white font-bold py-2 px-4 mt-[110px]  rounded-full w-[400px] h-[90px] text-4xl font-minecraft text-center active:" on:click={toggleDialog} > 
        Settings & Info</button>
</center>

<div id="backdrop" class={showDialog ? 'backdrop open' : 'backdrop closed'} on:click={toggleDialog}></div>


<dialog open={showDialog}>
  <h1 class="text-2xl text-white text-opacity-60">Settings</h1>
  <p>
    <button class="font-minecraft">
      <label class="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" class="sr-only peer" on:change={handleToggle} />
        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span class="ml-3 text-sm font-minecraft text-gray-900 dark:text-gray-800">Toggle AI</span>
      </label>
    </button>
  </p>
  <p class="text-2xl text-white text-opacity-60">How to Play</p>
  <p class="text-sm text-gray-900">    Start the game; AI or 2-player mode depends on the gameAI setting.
    Click on a grid cell to place your symbol.
    Aim to get 5 of your symbols in a row horizontally, vertically, or diagonally.
    The game ends when a player gets a line of 5. Winner gets an alert and the score updates.
    The game resets for another round.</p>
    <p class="text-2xl text-white text-opacity-60">Showcase</p>
    <div style="width:90%;height:0px;position:relative;padding-bottom:54%;">
      <iframe src="https://streamable.com/e/5axrh5?autoplay=1&muted=1" frameborder="0" width="100%" height="100%" allowfullscreen allow="autoplay;" style="width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;"></iframe>
    </div>
    
  <button class="mt-5 ripple-bg-gray-600  g-clip-text bg-gradient-to-r from-gray-600 to-gray-800 hover:bg-blue-800 hover:bg-gray-800 text-white font-bold py-2 px-4 mt-[0px]  rounded-full w-[100px] h-[40px] text-sm font-minecraft text-center active:" on:click={toggleDialog}>Close</button>
</dialog>





   


<button
  class="text-blue-600 hover:text-blue-900 font-minecraft font-bold text-center fixed bottom-2 right-2 "
  on:click={mute}
>
  <img
    src={clicked ? "https://i.imgur.com/arTIVuh.png" : "https://i.imgur.com/ljVuBNm.png"}
    alt="sound icon"
    width="30px"
    height="30px"
  />
</button>

<p class="font-minecraft text-gray-300 fixed bottom-2 left-2">©The_Bi11iona1re</p>
</div>

