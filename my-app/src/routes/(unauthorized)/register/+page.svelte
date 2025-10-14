<script lang="ts" module>
	import { z } from 'zod';

	const schema = z.object({
		email: z.string().email('Email is required'),
		password: z.string().min(8, 'Password is required')
	});
</script>

<script lang="ts">
	import { superForm, defaults } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';

	const form = superForm(defaults(zod(schema)), {
		validators: zod(schema),
		SPA: true
	});

	const { form: formData, submitting } = form;

	const handleRegister = (e: Event) => {
		e.preventDefault();
	};
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100">
	<div class="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
		<h1 class="mb-6 text-center text-2xl font-bold">Register</h1>

		<form on:submit|preventDefault={handleRegister} class="space-y-4">
			<div>
				<label for="email" class="mb-1 block text-sm font-medium">Email</label>
				<input
					id="email"
					type="email"
					class="w-full rounded border px-3 py-2 focus:border-blue-400 focus:outline-none focus:ring"
					bind:value={$formData.email}
					required
					placeholder="user@example.com"
				/>
			</div>
			<div>
				<label for="password" class="mb-1 block text-sm font-medium">Password</label>
				<input
					id="password"
					type="password"
					class="w-full rounded border px-3 py-2 focus:border-blue-400 focus:outline-none focus:ring"
					bind:value={$formData.password}
					required
					placeholder="Password"
				/>
			</div>
			<button
				type="submit"
				class="flex w-full items-center justify-center rounded bg-blue-600 py-2 text-white transition hover:bg-blue-700 disabled:opacity-50"
				disabled={$submitting}
			>
				{#if $submitting}
					<svg class="mr-2 inline h-5 w-5 animate-spin" viewBox="0 0 24 24">
						<circle
							class="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							stroke-width="4"
							fill="none"
						/>
						<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
					</svg>
					Registering...
				{:else}
					Register
				{/if}
			</button>
		</form>
	</div>
</div>
