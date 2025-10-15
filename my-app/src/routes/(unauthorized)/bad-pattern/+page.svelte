<script lang="ts">
	import { setContext } from 'svelte';
	import type { PageData } from './$types';
	import Name from './name.svelte';

	export let data: PageData;
	/**
	 * Pass the user object to the context
	 * so that the Child component can access it
	 */
	setContext('user', () => data.user);
</script>

<h1>Bad Pattern</h1>

<form method="POST" class="mx-auto mt-8 max-w-md space-y-4 rounded-lg bg-white p-6 shadow-md">
	<div>
		<label for="name" class="mb-1 block text-sm font-semibold text-gray-700">Name</label>
		<input
			id="name"
			type="text"
			name="name"
			class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 focus:border-blue-400 focus:outline-none focus:ring"
			placeholder="Enter your name"
		/>
	</div>
	<div>
		<label for="secret" class="mb-1 block text-sm font-semibold text-gray-700"
			>Embarrassing Secret</label
		>
		<input
			id="secret"
			type="text"
			name="secret"
			class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 focus:border-pink-400 focus:outline-none focus:ring"
			placeholder="Share your secret"
		/>
	</div>
	<button type="submit" class="rounded0 w-full"> Submit </button>
</form>

{#if data.user}
	<h2>Your secret</h2>
	<p>{data.user.name}</p>
	<p>{data.user.embarrassingSecret}</p>
{/if}

<Name />
