<script lang="ts">
  import { onMount } from "svelte";
  import TopTrack from "./components/TopTrack.svelte";
  import type { SpotifyUser } from "./types";
  import UserBlock from "./components/UserBlock.svelte";

  const topTracks = TopTrack;
  let currentUser: SpotifyUser | null = null;

  onMount(async () => {
    const parsedUser = window.localStorage.getItem("user");
    if (parsedUser) {
      currentUser = JSON.parse(parsedUser);
    }
  });
</script>

<div
  class="h-screen flex items-center justify-between flex-col bg-gradient-to-br align-middle from-zinc-950 to-zinc-900 text-white"
>
  <!-- <svelte:component this={Navbar} /> -->
  {#if currentUser}
    <svelte:component this={UserBlock} {currentUser} />
    <svelte:component this={topTracks} />
  {:else}
    <p>Loading...</p>
  {/if}
</div>
