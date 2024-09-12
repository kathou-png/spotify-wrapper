// src/stores.js
import { writable } from 'svelte/store';

// Create writable stores for config values
export const spotifyClientId = writable('default_client_id');
export const spotifyClientSecret = writable('default_client_secret');
export const spotifyClientToken = writable('');
export const redirectUri = writable('http://localhost:5173/callback');
