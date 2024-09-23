<script lang="ts">
  import { onMount } from "svelte";
  import type { Track } from "../types";
  import { getTopTracks } from "../../helpers/spotify";
  let topTracks: Track[] = [];
  async function getUserTopTracks() {
    topTracks = await getTopTracks();
    console.log(
      topTracks?.map(
        ({ name, artists }) =>
          `${name} by ${artists.map((artist) => artist.name).join(", ")}`
      )
    );
  }

  onMount(async () => {
    getTopTracks();
  });
</script>

<button on:click={getUserTopTracks}>Get top tracks</button>
<ul>
  {#each topTracks as track}
    <li>
      {track.name} by {track.artists.map((artist) => artist.name).join(", ")}
    </li>
    <img src={track.album.images[0].url} alt={track.name} width="50%" />
  {/each}
</ul>
