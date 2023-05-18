<script lang="ts"> 
    import audioFile from "/Users/aditya/Downloads/GitHub/Box-and-Dots--1/src/routes/+page.svelte";
    import { goto } from '$app/navigation';
    import { sound } from 'svelte-sound';
    import { onMount } from 'svelte';
    let gameAI = false
    let showModal = false
    let data = '';


    
  
    function handleToggle(event: KeyboardEvent<HTMLInputElement>) {
    gameAI = event.target.checked; // assign the value of the checkbox to the variable
    localStorage.setItem("gameAI", gameAI.toString()); // store the variable in local storage
  }
  

  
  
    onMount(() => {
      data = localStorage.getItem('data');
    });
  

    function handleInput(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      localStorage.setItem('data', event.target.value);
    }
  }

  function handleClick() {
    const input = document.querySelector('input');
    localStorage.setItem('data', input.value);
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




  </script>

  
<div style="width: 100vw; height: 100vh; background-size: 135%; position: relative;">
    <div bind:this={container} style="background-image: url('https://cutewallpaper.org/21/pixel-art-city-background/Pixel-Art-Background-Gif-1920x1080-Ryanmartinproductionscom.gif'); background-size: 135%; width: 100%; height: 100%;" class="filter blur-sm brightness-75"></div>
    <div class="absolute top-[80px] left-1/2 transform -translate-x-1/2 ">
        <h1 class="font-minecraft text-6xl text-transparent bg-clip-text bg-gradient-to-r from-blue-300  to-blue-900 ">Settings</h1>
        <button class=" font-minecraf">
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" class="sr-only peer" on:change={handleToggle}>
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span class="ml-3 text-sm font-minecraft text-gray-900 dark:text-gray-800">Toggle AI</span>
            </label>
          </button>

          <center>
            <button class="ripple-bg-gray-600  g-clip-text bg-gradient-to-r from-gray-600 to-gray-800 hover:bg-blue-800 hover:bg-gray-800 text-white font-bold py-2 px-4 mt-[10px]   rounded-full w-[250px] h-[100px] text-4xl font-minecraft text-center active:" on:click={() => setTimeout(() => goto('/'), 200)}> 
                Main Menu </button>
        </center>
        <p class="font-minecraft text-gray-800 mt-[20px] ml-[50px]">©The_Bi11iona1re</p>
    </div>
    
  </div>
  
   



    
  