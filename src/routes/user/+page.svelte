<script script lang="ts">
  import { onMount } from "svelte";
  import type { Track } from "./types";

  // Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
  let token =
    "BQDEj1upp2EsXgZLvxZU578Q7IRayuoFiC-6tSu-zXhSO0KxktzTjdLv60wFqy5tU0RfAuPT9zUnEC_Tm7N7_9GStw5jXjG_07gaT9zAC3y2fhqZ6CdS1iL7tWBshvW7-cj39RjPOpwYt8jW4Hi76vKvdItQq82IakejnkivDagC0SNPW7S5PfTemeyXKKDIBk_9u90PaiCUhVWzux42Arzw-o4RYsMRY7Jqk4P-1iSdRmy9xTFh7yd4_ChuOHBL5D62_sxvleBq59VhD0EX7KZK4z1xdkHT";
  async function fetchWebApi(endpoint: string, method: string) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method,
    });
    return await res.json();
  }
  let limitTrack = 5;
  let topTracks: Track[] = [];
  async function getTopTracks() {
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
    const response = (
      await fetchWebApi(
        `v1/me/top/tracks?time_range=long_term&limit=${limitTrack}`,
        "GET"
      )
    ).items;
    console.log(response);
    topTracks = response;
  }
  onMount(() => getTopTracks());
</script>

<h2>See top user track of Cathy</h2>
<input type="text" bind:value={token} />
<input type="text" bind:value={limitTrack} />
<button on:click={getTopTracks}>Get top tracks</button>
<ul>
  {#each topTracks as track}
    <li>
      {track.name} by {track.artists.map((artist) => artist.name).join(", ")}
    </li>
    <img src={track.album.images[0].url} alt={track.name} width="50%" />
  {/each}
</ul>
