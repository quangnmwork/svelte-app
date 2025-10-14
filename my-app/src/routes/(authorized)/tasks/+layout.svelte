<script lang="ts">
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
	{@render children()}
</div>
