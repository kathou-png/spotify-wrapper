<script lang="ts">
  import type { Track } from "../types";
  import { getTopTracks } from "../../helpers/spotify";
  let topTracks: Track[] = [];
  async function getUserTopTracks(timeRange: string) {
    topTracks = await getTopTracks(timeRange);
    console.log(
      topTracks?.map(
        ({ name, artists }) =>
          `${name} by ${artists.map((artist) => artist.name).join(", ")}`
      )
    );
  }

  const SHORT_TERM = "short_term";
  const LONG_TERM = "long_term";
  const MEDIUM_TERM = "medium_term";
</script>

<div class="flex gap-4 w-full p-4">
  <button
    class="border-solid border-2 border-white align-middle items-center hover:border-dotted text-white font-bold py-2 px-14 rounded-lg w-fit"
    on:click={() => getUserTopTracks(SHORT_TERM)}
    >Get top tracks of this month</button
  ><button
    class="border-solid border-2 border-white align-middle items-center hover:border-dotted text-white font-bold py-2 px-14 rounded-lg w-fit"
    on:click={() => getUserTopTracks(MEDIUM_TERM)}
    >Get top tracks half year</button
  ><button
    class="border-solid border-2 border-white align-middle items-center hover:border-dotted text-white font-bold py-2 px-14 rounded-lg w-fit"
    on:click={() => getUserTopTracks(LONG_TERM)}
    >Get top tracks of this year</button
  >
</div>

<div class="flex justify-center flex-row mb-10 p-20">
  {#each topTracks as track}
    <div>
      <img
        src={track.album.images[0].url}
        alt={track.name}
        class="w-1/4 h-auto object-contain transition-transform duration-300 hover:scale-110"
      />
      <div>
        {track.name} by {track.artists.map((artist) => artist.name).join(", ")}
      </div>
    </div>
  {/each}
</div>
<a class="mb-5 hover:underline" href="/about">About</a>
