<script>
      import "/Users/aditya/Downloads/GitHub/Box-and-Dots--1/src/app.css";
      import { useChat } from "ai/svelte";

    const { messages, handleSubmit, input } = useChat({
    api: "/test",
    }); 
</script>

<style>
  @font-face {
    font-family: "Minecraft";
    src: url("/Users/aditya/Downloads/GitHub/Box-and-Dots--1/src/routes/test/VCR_OSD_MONO_1.001.ttf");
  }

  .assistant-message {
    margin-bottom: 20px;
  }
</style>

<center class="font-minecraft mt-[300px]">
  <ul>
    {#each $messages as message}
      {#if message.role === 'assistant'}
        <li class="assistant-message">🤖 {message.role} says... {message.content}</li>
      {:else}
        <li>😊 {message.role} says... {message.content}</li>
      {/if}
    {/each}
  </ul>
  
  <form class="w-full max-w-sm" on:submit={handleSubmit}>
    <input class="font-minecraft appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Talk to AI"  bind:value={$input}/>
    <button class="font-minecraft ripple-bg-blue-600  g-clip-text bg-gradient-to-r from-blue-600 to-blue-900 hover:bg-blue-800  text-white font-bold py-2 px-4 rounded-full" type='submit'>Send</button>
  </form>
</center>
