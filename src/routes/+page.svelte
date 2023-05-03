

<script>
  let count = 0;
  function increment() {
    count += 1;
  }

  import { onMount } from 'svelte';
  let seconds = 0;
  onMount(() => {
    const interval = setInterval(() => {
      seconds++;
      
    }, 1000);
    return () => {
 
      clearInterval(interval);
      
    };

  


  });

  let cps = 0;

  const interval = setInterval(() => {
    count++;
    cps = seconds !== 0 ? count / seconds : 0;
    cps = Math.round(cps);
  }, 1000);

  setTimeout(() => {
    clearInterval(interval);
  }, 11000000000000);



</script>

<center>
  
  <h1 class="mt-[15px] text-4xl font-bold text-center">Main Menu</h1>

  <p class="text-2xl font-semi-bold">Box and Dots Beta / CPS Tester </p>
  <p class="font-normal"> Using Svelte and Tailwind with Tauri currently Testing for your CPS </p>
</center>

<style lang="postcss">
    :global(html) {
      background-color: theme(colors.gray.400);
    }

    
  </style>

<center>
  
  <button class="ripple-bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 mt-[100px] rounded-full w-[600px] h-[200px] text-6xl font-bold text-center active:" on:click={increment}>
    Click!
  </button>
</center>

<center class="mt-[15px] text-2xl font-bold text-center">
  <p>Clicks: {count} CPS: {cps} Seconds: {seconds} </p>
</center>
