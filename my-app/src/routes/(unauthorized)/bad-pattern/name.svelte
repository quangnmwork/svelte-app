<script lang="ts">
	import { getContext } from 'svelte';

	const user = getContext('user') as () => { name: string };
</script>

<p>Name: {JSON.stringify(user())}</p>
