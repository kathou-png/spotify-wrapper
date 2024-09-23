<script>
  import { onMount } from "svelte";
  import { goToPath } from "./helpers/nav";
  import Navbar from "./components/Navbar.svelte";
  let currentUser = "";
  onMount(() => {
    currentUser = localStorage.getItem("user") || "";
  });
</script>

<div
  class="h-screen flex flex-col bg-gradient-to-br align-middle from-indigo-500"
>
  <!-- <svelte:component this={Navbar} /> -->
  <h1
    class=" w-full text-left p-10 pt-10.5 text-4xl items-center align-middle tracking-wide sm:text-5xl md:text-6xl text-white"
  >
    Spotify App
  </h1>
  <h3 class="p-10 text-white text-xl">
    An experimental app, using spotify API
  </h3>

  {#if currentUser}
    <div class="p-10 items-center align-middle">
      <button
        class="bg-blue-500 align-middle items-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit"
        on:click={() => goToPath("/user")}>Go to my profile</button
      >
    </div>
  {:else}
    <div class="p-10 items-center align-middle">
      <button
        class="bg-blue-500 align-middle items-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit"
        on:click={() => goToPath("/login")}>Get started</button
      >
    </div>
  {/if}
</div>
