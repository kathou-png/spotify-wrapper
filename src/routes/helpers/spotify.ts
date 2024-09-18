import { get } from "svelte/store";
import { token } from "../store";
async function fetchWebApi(endpoint : string, method : string, body ? : any) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${get(token)}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}
export async function getTopTracks(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi(
    'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
  )).items;
}