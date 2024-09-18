<script>
  import { base64encode, generateRandomString, sha256 } from "./helpers/auth";
  import { codeVerifierStore } from "./store";

  const clientId = import.meta.env.VITE_CLIENT_ID;
  const redirectUri = "http://localhost:5173/user";
  async function login() {
    const scope = "user-read-private user-read-email user-top-read";
    const codeVerifier = generateRandomString(64);
    const authUrl = new URL("https://accounts.spotify.com/authorize");
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);

    // generated in the previous step
    window.localStorage.setItem("code_verifier", codeVerifier);
    console.log(codeVerifier);
    codeVerifierStore.set(codeVerifier);

    const params = {
      response_type: "code",
      client_id: clientId,
      scope,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
      redirect_uri: redirectUri,
    };

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
  }
</script>

<h2>Spotify app</h2>
<button on:click={login}>LOGIN</button>

<p>
  Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
