<script lang="ts">
  import { onMount } from "svelte";
  import TopTrack from "./components/TopTrack.svelte";
  import { goToPath } from "../helpers/nav";
  import { getUserProfile } from "../helpers/spotify";
  import type { SpotifyUser } from "./types";
  import Navbar from "../components/Navbar.svelte";
  import { getToken } from "../helpers/auth";

  const topTracks = TopTrack;
  let token: string | null = null;
  let currentUser: SpotifyUser | null = null;

  async function getCurrentUserProfile() {
    currentUser = await getUserProfile();
    window.localStorage.setItem("user", JSON.stringify(currentUser));
  }

  onMount(() => {
    if (window.localStorage.getItem("code") === null) {
      window.localStorage.setItem(
        "code",
        window.location.search.replace("?code=", "") || ""
      );
    }
    token = window.localStorage.getItem("token");
    const code = window.localStorage.getItem("code") || "";
    const redirectUri = "http://localhost:5173/user";
    const clientId = import.meta.env.VITE_CLIENT_ID;
    getToken(code, clientId, redirectUri);
    getCurrentUserProfile();
  });
</script>

<div class="flex flex-col">
  <svelte:component this={Navbar} />
  {#if currentUser}
    <h2 class="text-3xl w-full p-5 text-center">
      Welcome, {currentUser.display_name}.
    </h2>
    <div class="flex justify-center items-center">
      <img
        src={currentUser.images[0].url}
        alt={currentUser.display_name}
        class="w-1/3 p-3 items-center bg-stone-600"
      />
    </div>
    <p>{currentUser.country}</p>
    <p>Followers : {currentUser.followers.total}</p>

    <svelte:component this={topTracks} />
  {:else}
    <p>Please log in before</p>
    <button on:click={() => goToPath("/login")}>Lets go</button>
  {/if}
</div>
