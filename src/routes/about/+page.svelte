<div
  class="h-screen flex items-center align-center justify-around flex-col bg-gradient-to-br align-middle from-zinc-950 to-zinc-900 text-white"
>
  <h1 class="mt-20 text-2xl">
    This app was developed by <a
      href="https://kathou-pf.vercel.app/"
      target="_blank">Cathy</a
    > for educational purposes
  </h1>
  <div
    class="flex flex-row gap-10 m-4 h-1/5 justify-center items-center align-center"
  >
    <a href="https://svelte.dev/docs/introduction" target="_blank">
      <img
        src="/Svelte_Logo.png"
        alt="svelte logo"
        class="h-40 w-auto transition-transform duration-300 hover:scale-105"
      /></a
    >
    <a href="https://tailwindcss.com/" target="_blank">
      <img
        src="/tailwind_logo.png"
        alt="tailwind logo"
        class="h-40 w-auto transition-transform duration-300 hover:scale-105"
      /></a
    >
  </div>
  <button
    class="border-solid border-2 border-white align-middle items-center hover:border-dotted text-white font-bold py-2 px-14 rounded-lg w-fit"
    on:click={() => window.history.back()}>Go back to app</button
  >
  <div class="inline-flex gap-5">
    <a
      href="https://github.com/kathou-png/spotify-wrapper"
      target="_blank"
      class="hover:underline">Link to the repo</a
    >
    <a
      href="https://www.linkedin.com/in/cathy-truong/"
      class="hover:underline"
      target="_blank">Contact</a
    >
  </div>
</div>
