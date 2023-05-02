<script>
  let count = 0;
  function increment() {
    count += 1;
  }
</script>

<center>
  
  <h1 class="mt-[15px] text-4xl font-bold text-center">Main Menu</h1>

  <p>Box and Dots Beta</p>
  <p> Using Svelte and Tailwind with Tauri </p>
</center>

<style lang="postcss">
    :global(html) {
      background-color: theme(colors.gray.400);
    }
  </style>

<center>
  
  <button class="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 mt-[100px] rounded-full w-[600px] h-[200px] text-6xl font-bold text-center" on:click={increment}>
    Start Game!
  </button>
</center>

<center class="mt-[15px] text-2xl font-bold text-center">
  <p>Clicks: {count}</p>
</center>
