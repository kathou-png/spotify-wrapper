<script lang="ts">
  import { onMount } from "svelte";
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import { getContext } from "svelte";
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const responseType = "code";
  const redirectUri = "http://localhost:5173/user";
  function login() {
    // const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUri}`;

    // // Redirect the user to Spotify's authorization page
    // window.location.href = url;
    // // In your redirect callback page (http://localhost:5173/callback), grab the code from the URL

    window.location.href = "http://localhost:3000/login";
  }
</script>

<h2>Spotify app</h2>
<button on:click={login}> Log in with Spotify </button>

<p>
  Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
