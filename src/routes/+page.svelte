
<script> 
import { goto } from '$app/navigation';
import "../app.css";


</script>

<style>
    @font-face {
  font-family: "Minecraft";
  src: url("VCR_OSD_MONO_1.001.ttf");
}


</style>

<div style="width: 100vw; height: 100vh; background-image: url('https://thumbs.gfycat.com/UnfoldedRedJaguarundi-max-1mb.gif'); background-size: cover; position: relative;" >
  <!-- Your content here -->



<center>
  
    <h1 class="text-6xl mt-[0px] text-4xl drop-shadow-lg font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-300  to-blue-900 transform translate-y-[80px] font-minecraft">Dots and Boxes</h1>

  <button class="ripple-bg-blue-600  g-clip-text bg-gradient-to-r from-blue-600 to-blue-900 hover:bg-blue-800   text-white transform translate-y-[100px] font-minecraft py-2 px-4 mt-[00px] rounded-full w-[600px] h-[200px] text-[90px] font-bold text-center active:" on:click={() => setTimeout(() => goto('/game'), 300)}>
    Play!
  </button>



  



</center>

<center>
    <button class="ripple-bg-gray-600  g-clip-text bg-gradient-to-r from-gray-600 to-gray-800 hover:bg-blue-800 hover:bg-gray-800 text-white font-bold py-2 px-4 mt-[120px]  rounded-full w-[250px] h-[100px] text-4xl font-minecraft text-center active:" > 
        Settings </button>
</center>
 
<p class="font-minecraft text-gray-300 fixed bottom-0">©The_Bi11iona1re</p>
</div>