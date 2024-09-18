// src/stores.ts
import { writable } from 'svelte/store';

// Create a writable store for the code_verifier
export const codeVerifierStore = writable<string>("");
export const code = writable<string>('');
export const token = writable<string>("")