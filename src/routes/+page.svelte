<script lang="ts">
import { goto } from '$app/navigation';
import { sound } from 'svelte-sound';
import { onMount } from 'svelte';
import { appWindow } from '@tauri-apps/api/window'
import { invoke } from '@tauri-apps/api/tauri'
import "../app.css";
import { message } from '@tauri-apps/api/dialog';



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



</style>

<div bind:this={container} style="width: 100vw; height: 100vh; background-image: url('https://cutewallpaper.org/21/pixel-art-city-background/Pixel-Art-Background-Gif-1920x1080-Ryanmartinproductionscom.gif'); background-size: 135%; position: relative;" >


<center>
  
    <h1 class="text-6xl mt-[0px] text-4xl drop-shadow-lg font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-300  to-blue-900 transform translate-y-[80px] font-minecraft">Dots and Boxes</h1>

  <button class="ripple-bg-blue-600  g-clip-text bg-gradient-to-r from-blue-600 to-blue-900 hover:bg-blue-800   text-white transform translate-y-[100px] font-minecraft py-2 px-4 mt-[00px] rounded-full w-[600px] h-[200px] text-[90px] font-bold text-center active:" on:click={() => setTimeout(() => goto('/game'), 200)}>
    Play!
  </button>







</center>

<center>
    <button class="ripple-bg-gray-600  g-clip-text bg-gradient-to-r from-gray-600 to-gray-800 hover:bg-blue-800 hover:bg-gray-800 text-white font-bold py-2 px-4 mt-[120px]  rounded-full w-[250px] h-[100px] text-4xl font-minecraft text-center active:" on:click={() => setTimeout(() => goto('/settings'), 200)}> 
        Settings </button>
</center>

<button class="ripple-bg-gray-600  g-clip-text bg-gradient-to-r from-gray-600 to-gray-800 hover:bg-blue-800 hover:bg-gray-800 text-white font-bold py-2 px-4 mt-[0px]  rounded-full w-[100px] h-[40px] text-sm font-minecraft text-center active:" on:click={() => setTimeout(() => goto('/test'), 200)}> 
  Test</button>

  <button class="ripple-bg-gray-600  g-clip-text bg-gradient-to-r from-gray-600 to-gray-800 hover:bg-blue-800 hover:bg-gray-800 text-white font-bold py-2 px-4 mt-[0px]  rounded-full w-[100px] h-[40px] text-sm font-minecraft text-center active:" on:click={() => setTimeout(() => goto('/test2'), 200)}> 
    Test 2 </button>


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

