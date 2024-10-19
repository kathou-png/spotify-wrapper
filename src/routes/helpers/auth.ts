import { get } from "svelte/store";
import { code } from "./store";

const scope = "user-read-private user-read-email user-top-read";
const redirectUri = "http://localhost:5173/login";
const clientId = import.meta.env.VITE_CLIENT_ID;

export const generateRandomString = (length: number) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

export const sha256 = async (plain: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};
export const base64encode = (input: ArrayBuffer) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};
export const getToken = async () => {
  const url = "https://accounts.spotify.com/api/token";

  try {
    // Log code verifier from localStorage
    console.log(window.localStorage.getItem("code_verifier"));

    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: "authorization_code",
        code: get(code), // Assuming get() is defined elsewhere to retrieve the code
        redirect_uri: redirectUri,
        code_verifier: window.localStorage.getItem("code_verifier") || "",
      }),
    };

    // Make the request
    const body = await fetch(url, payload);

    // Check if the response is ok (status 200-299)
    if (!body.ok) {
      throw new Error(`HTTP error! status: ${body.status}`);
    }

    // Parse the JSON response
    const response = await body.json();

    // Store the token if available
    if (response.access_token) {
      window.localStorage.setItem("token", response.access_token);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching token:", error.message);
    } else {
      console.error("Unknown error occurred:", error);
    }
  }
};

export async function login() {
  const codeVerifier = generateRandomString(64);
  console.log("set code veirfier value", codeVerifier);
  window.localStorage.setItem("code_verifier", codeVerifier);
  const redirectUri = "http://localhost:5173/login";

  const authUrl = new URL("https://accounts.spotify.com/authorize");
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

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

export { code };
