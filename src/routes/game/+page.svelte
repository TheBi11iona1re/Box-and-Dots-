<script lang="ts"> 
  import pop from "/Users/aditya/Downloads/GitHub/Box-and-Dots--1/src/routes/+page.svelte";
  import { goto } from '$app/navigation';
  import { sound } from 'svelte-sound';
  import { tweened } from 'svelte/motion';
  import { onMount } from 'svelte';
  let buttonSound: HTMLAudioElement;
  let showModal = false
  let data = '';
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let size = 0;
  let aitwo = 'mom';

  function resize() {
    size = Math.min(window.innerWidth, window.innerHeight) / 2;
     // Set the canvas width and height to match the size
     canvas.width = size;
    canvas.height = size;
    // Draw the dots and lines on the canvas
    draw();
  }


  function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, size, size);
    // Define a constant for the number of rows and columns
    const N = 5;
    // Define a constant for the dot size
    const dotSize = 10;
    // Calculate the space between the dots based on the size and dot size
    const space = (size - dotSize * N) / (N + 1);
    // Use a dark gray color for the dots and lines
    ctx.fillStyle = '#c7c7c7';
    ctx.strokeStyle = '#c7c7c7';
    // Use a nested loop to draw the dots and lines
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        // Calculate the x and y coordinates of the dot
        let x = space + (dotSize + space) * i + dotSize / 2;
        let y = space + (dotSize + space) * j + dotSize / 2;
        // Draw a circle at the coordinates
        ctx.beginPath();
        ctx.arc(x, y, dotSize / 2, 0, Math.PI * 2);
        ctx.fill();
        // Draw horizontal lines between the dots
        if (i < N - 1) {
          let x2 = x + dotSize + space;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x2, y);
          ctx.stroke();
        }
        // Draw vertical lines between the dots
        if (j < N - 1) {
          let y2 = y + dotSize + space;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x, y2);
          ctx.stroke();
        }
      }
    }
  }


  onMount(() => {
    // Get the canvas context
    ctx = canvas.getContext('2d');
    // Call the resize function when the page is loaded
    resize();
    // Add an event listener for window resize
    window.addEventListener('resize', resize);
  });

  // Define a constant for the number of rows and columns
  const N = 5;
  // Create an array of numbers from 0 to N-1
  const range = Array.from({ length: N }, (_, i) => i);
  
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

if (gameAI === true) {
  aitwo = "AI"

} else {
  aitwo = "2"
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
    /* Use flexbox to align the dots in a grid */
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }


  
</style>  


<div bind:this={container} style="background-image: url('https://i.imgur.com/vQPuKtq.mp4'); background-size: 125%; position: fixed; top: 0; left: 0; bottom: 0; right: 0;"></div>

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
    px-4 mt-[10px] rounded-full w-[150px] h-[50px] text-2xl font-minecraft text-center active:" on:click={() => {
  if (clicked) { // check if clicked is true
  buttonSound.volume = 0.4; // set the volume to 0.4
  buttonSound.play(); // play the sound effect
  }
  }}>sound</button>
  
  <div class="h-screen flex items-center justify-center">
<!-- Use flexbox to center the square -->





<div class="square rounded-lg" style="width: {size}px; height: {size}px;">
  <!-- Use a canvas element to draw the dots and lines -->
  <canvas bind:this={canvas} />
</div>
    

</div>
  <p class="fixed top-[20px] fixed left-[125px] font-minecraft text-red-600 text-2xl"> Player 1</p>
  <p class="fixed top-[20px] fixed left-[125px] font-minecraft text-red-600 text-2xl blur-sm"> Player 1</p>
  <p class="fixed top-[20px] fixed left-[125px] font-minecraft text-red-600 text-2xl blur-2xl"> Player 1</p>
  <p class="fixed top-[50px] fixed left-[130px] font-minecraft text-red-600 text-lg"> Score = 0</p>
  <p class="fixed top-[50px] fixed left-[130px] font-minecraft text-red-600 text-lg blur-sm"> Score = 0</p>
  <p class="fixed top-[50px] fixed left-[130px] font-minecraft text-red-600 text-lg blur-lg"> Score = 0</p>
  <p class="fixed bottom-[60px] fixed left-[125px] font-minecraft text-gray-300 text-2xl"> Ai = {gameAI}</p>
  <p class="fixed bottom-[60px] fixed right-[80px] font-minecraft text-gray-300 text-2xl"> Sound = {clicked}</p>
  <p class="fixed top-[20px] fixed right-[100px] font-minecraft text-blue-600 text-2xl"> Player {aitwo}</p>
  <p class="fixed top-[20px] fixed right-[100px] font-minecraft text-blue-600 text-2xl blur-sm"> Player {aitwo}</p>
  <p class="fixed top-[20px] fixed right-[100px] font-minecraft text-blue-600 text-2xl blur-2xl"> Player {aitwo}</p>
  <p class="fixed top-[50px] fixed right-[110px] font-minecraft text-blue-600 text-lg"> Score = 0</p>
  <p class="fixed top-[50px] fixed right-[110px] font-minecraft text-blue-600 text-lg blur-sm"> Score = 0</p>
  <p class="fixed top-[50px] fixed right-[110px] font-minecraft text-blue-600 text-lg blur-lg"> Score = 0</p>
  
  <p class="font-minecraft text-gray-300 fixed bottom-2 left-2 text-sm">©The_Bi11iona1re</p>
  
  </div>
 