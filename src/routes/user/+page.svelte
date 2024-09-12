<script>
  import { onMount } from "svelte";
  import { spotifyClientToken } from "../../store";

  const tmpToken =
    "BQCVnNx5-DMzIVwMedc69TZZLN9jJEcbxY0Q6nrPUjRPfGQgT77M9Xia9YWK1kDVMvLaG7WmVlc1HiTAIaIgtThi_TiDYcLbuW6HqYIyjDU-6G6apUqmAD6Dt_OVFhcErOP-exdXPiVYabP_AKTrWMHDuuMHaxMqlXgvutfOR1eIOilKC92pIrcoHkwrO_CsB448ISQqbKIJr6WjHzG4KW9CVU5UE7dTRFhVxbsFTfy72gzPXq9tRQN4kX4scioyzWOA2gtSMaYOgGunLlFfN7Df84tt6wWa";
  /**
   * @param {string} endpoint
   * @param {string} method
   * @param {undefined} [body]
   */
  async function fetchWebApi(endpoint, method, body) {
    let token;
    const unsubscribe = spotifyClientToken.subscribe((value) => {
      token = value;
    });
    console.log(token);
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${tmpToken}`,
      },
      method,
      body: JSON.stringify(body),
    });
    return await res.json();
  }

  async function getTopTracks() {
    return (
      await fetchWebApi("v1/me/top/tracks?time_range=long_term&limit=5", "GET")
    ).items;
  }
  async function getUserTopTrack() {
    const topTracks = await getTopTracks();
    console.log(
      topTracks?.map(
        ({ name, artists }) =>
          `${name} by ${artists.map((artist) => artist.name).join(", ")}`
      )
    );
  }

  onMount(() => {
    // exchangeAuthCodeForToken();
    getUserTopTrack();
  });

  async function exchangeAuthCodeForToken() {
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get("code");

    console.log("Authorization Code:", authCode);

    const params = new URLSearchParams();
    const clientId = "0ba62474fd4f42a596421f2ed1245481";
    params.append("client_id", clientId);
    params.append("client_secret", import.meta.env.VITE_CLIENT_SECRET);
    params.append("grant_type", "client_credentials");
    params.append("redirect_uri", "http://localhost:5173/callback");
    let token = "";
    await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    })
      .then((response) => response.json())
      .then((data) => (token = data.access_token));

    console.log(token);
    let tokenValue;
    if (token) {
      // Subscribe to the store to get the initial value
      spotifyClientToken.set(token);
      getUserTopTrack();
    }
  }
</script>

<p>Welcome to the user page.</p>
