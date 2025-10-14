<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	let { children, data } = $props();
</script>

<div class="mx-auto max-w-md p-4">
	<div class="mb-6 flex items-center gap-3">
		<div
			class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-black/90 to-gray-400 shadow-md"
		>
			<span class="text-2xl font-bold text-white">
				{data.user.name?.[0]?.toUpperCase() ?? 'U'}
			</span>
		</div>
		<div>
			<h1 class="text-xl font-semibold">
				Welcome, <span class="text-black">{data.user.name}</span> 👋
			</h1>
			<p class="text-sm text-gray-500">Here’s your task dashboard</p>
		</div>
	</div>
	{#if data.user}
		<button
			class="mt-2 rounded bg-red-600 px-4 py-2 font-semibold text-white shadow transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2"
			onclick={() => {
				fetch(resolve('/(authorized)/logout'), {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					}
				});
				goto(resolve('/(unauthorized)/login'));
			}}
		>
			Log out 🔒
		</button>
	{/if}
	{@render children()}
</div>
