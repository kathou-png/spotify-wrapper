<script>
  import { onMount } from "svelte";
  import TopTrack from "./components/TopTrack.svelte";
  import { code, codeVerifierStore } from "../store";
  import { getToken } from "../helpers/auth";
  import { get } from "svelte/store";

  const redirectUri = "http://localhost:5173/user";
  const component = TopTrack;
  const clientId = import.meta.env.VITE_CLIENT_ID;
  onMount(() => {
    console.log(get(codeVerifierStore));

    code.set(window.location.search.replace("?code=", ""));
    getToken(get(code), clientId, redirectUri);
  });
</script>

<h2>See top user track of Cathy</h2>
<svelte:component this={component} {code} />
