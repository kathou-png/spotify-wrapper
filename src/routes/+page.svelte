<script lang="ts">
  import { login } from "./helpers/auth";
</script>

<div
  class="h-screen flex items-center justify-center flex-col bg-gradient-to-br align-middle from-zinc-950 to-zinc-900"
>
  <h1 class="p-10 pt-10.5 text-4xl sm:text-5xl md:text-6xl text-white">
    WrappedUp
  </h1>
  <h3 class="p-10 text-white text-xl">
    An experimental app, using spotify API
  </h3>

  <div class="p-10 items-center align-middle">
    <button
      class="border-solid border-2 border-white align-middle items-center hover:border-dotted text-white font-bold py-2 px-14 rounded-lg w-fit"
      on:click={() => login()}>Start</button
    >
  </div>
</div>
