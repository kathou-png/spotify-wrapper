<script lang="ts">
  import { onMount } from "svelte";
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import { getContext } from "svelte";
  let verifier = getContext("verifier") as string;

  /**
   * @param {string} clientId
   */
  async function redirectToAuthCodeFlow(clientId: string) {
    verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);
    const localStorage = writable();

    localStorage.set(verifier);
    setContext("verifier", localStorage);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("scope", "user-read-private user-read-email");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  /**
   * @param {string} clientId
   * @param {string} code
   */
  export async function getAccessToken(clientId: string, code: string) {
    //const verifier = getContext("verifier") as string;

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("code_verifier", verifier!);

    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });

    const { access_token } = await result.json();
    console.log(result.json());
    return "BQD4azaij8t3Uxv03O-7uvIxaea4dBFjKhsqh4Aa-XoBs8tMMwt3ghguTKbOLTuzZAeDhkLgLLekYDAmCqnjzZOzmmj3W_toLb3EScoJk3ICyMngT6U";
  }

  function generateCodeVerifier(length: number) {
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  async function fetchProfile(token: string): Promise<any> {
    const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    return await result.json();
  }
  async function generateCodeChallenge(codeVerifier: string) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    console.log(
      btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "")
    );
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }
  async function login() {
    // we detect a callback from Spotify by checking for the hash fragment
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const urlParams = new URLSearchParams({
      grant_type: "authorization_code",
      code: "authorization-code-from-redirect",
    });
    const code = urlParams.get("code");

    if (!code) {
      redirectToAuthCodeFlow(clientId);
    } else {
      const accessToken = await getAccessToken(clientId, code);
      const profile = await fetchProfile(accessToken);
      console.log(profile);
    }
  }
  onMount(() => {
    login();
  });
</script>

<h1>Welcome to SvelteKit</h1>

<h2>Spotify app</h2>

<p>
  Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
