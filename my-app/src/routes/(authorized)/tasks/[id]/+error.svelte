<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
</script>

<!-- This is the custom error page for the task detail page. -->
<div class="flex min-h-[60vh] flex-col items-center justify-center text-center">
	<h1 class="mb-2 text-3xl font-bold text-red-600">An error occurred</h1>
	<p class="mb-4 text-lg text-gray-700">
		{page.status ? `Error ${page?.status}` : 'Error'}: {page.error?.message ??
			'Something went wrong.'}
	</p>
	<a
		href={resolve('/(authorized)/tasks')}
		class="inline-block rounded bg-black px-4 py-2 text-white hover:bg-black/90"
	>
		← Back to tasks
	</a>
</div>
