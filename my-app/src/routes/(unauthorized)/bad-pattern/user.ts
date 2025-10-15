// $lib/user.ts
import { writable } from 'svelte/store';

export const user = writable(null); // ← Global store
