<script>
  import { useChat } from "ai/svelte";
  import { goto } from '$app/navigation';
  import { onMount, afterUpdate } from 'svelte';

  let contentCentered = false;
  let messages;
  let handleSubmit;
  let input;

  let cursor;
  let x = 0;
  let y = 0;
  let size = 20;
  let isReady = false;

  onMount(() => {
    cursor = document.querySelector(".cursor");
    window.addEventListener("mousemove", (e) => {
      x = e.clientX;
      y = e.clientY;
      cursor.style.left = x + "px";
      cursor.style.top = y + "px";
    });
    window.addEventListener("mousedown", () => {
      isReady = true;
      size = 40;
    });
    window.addEventListener("mouseup", () => {
      isReady = false;
      size = 20;
    });
  });

  // Only execute useChat on the client side
  if (typeof window !== 'undefined') {
    ({ messages, handleSubmit, input } = useChat({
      api: "/test",
    }));
  }

  afterUpdate(() => {
    contentCentered = true;
  });
</script>


<style>
  @import 'src/app.css';

  .cursor {
  
  position: fixed;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  pointer-events: none;
  transition: width 0.3s ease-in-out, height 0.3s ease-in-out;
}
  
  @font-face {
    font-family: "Minecraft";
    src: url("/Users/aditya/Downloads/GitHub/Box-and-Dots--1/src/routes/test/VCR_OSD_MONO_1.001.ttf");
  }

  * {
    font-family: "Minecraft", sans-serif;
  }

  .assistant-message {
    margin-bottom: 20px;
  }

  .button-container {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
  }

  .content-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }
</style>

<div class="width: 100vw; height: 100vh;" style="background-image: url('https://img.freepik.com/free-vector/geometric-pattern-background_1409-921.jpg?w=2000&t=st=1687178476~exp=1687179076~hmac=4219f14fbbf6e5be8f0f28fe0724e50434e011d99b569c0fcc13620f4eb5c73b')">
  <div class={contentCentered ? 'content-container' : ''}>
    <h1 class="mt-[-100px] text-6xl">Box and Dots AI</h1>
    <ul style="margin: 0 20px;" >
      {#each $messages as message}
        {#if message.role === 'assistant'}
          <li class="assistant-message" style="color: red; font-weight: bold;">🤖 {message.role} says... {message.content}</li>
        {:else}
          <li style="color: blue; font-weight: bold;">😊 {message.role} says.... {message.content}</li>
        {/if}
      {/each}
    </ul>


    <form class="w-full max-w-sm mt-5" on:submit={handleSubmit}>
      <input class="font-minecraft appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Talk to the game's AI" bind:value={$input} />
      <center>

      <button class="font-minecraft ripple-bg-blue-600 g-clip-text bg-gradient-to-r from-blue-600 to-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full" type='submit'>Send</button>
    </center>
    </form>


  </div>

  <div class="cursor" style="--size: {size}px;"></div>

  <div class="button-container">
    <center>
      <button class="ripple-bg-gray-600 g-clip-text bg-gradient-to-r from-gray-600 to-gray-800 text-white font-minecraft py-2 px-4 mt-[00px] rounded-full w-[100px] h-[50px] text-[20px] font-bold text-center active:" on:click={() => setTimeout(() => goto('/'), 200)}>
        Back
      </button>
    </center>
  </div>
</div>
