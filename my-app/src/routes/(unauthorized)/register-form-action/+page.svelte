<!-- This page is used to register a new user using a form action -->

<script lang="ts" module>
	import { z } from 'zod';

	const schema = z.object({
		email: z.string().email('Email is required'),
		password: z.string().min(1, 'Password is required'),
		name: z.string().optional()
	});
</script>

<script lang="ts">
	import { superForm, defaults } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { enhance } from '$app/forms';

	const form = superForm(defaults(zod(schema)), {
		validators: zod(schema),
		SPA: true
	});
	const { form: formData, message } = form;

	let isCreating = $state(false);
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100">
	<div class="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
		<h1 class="mb-6 text-center text-2xl font-bold">Register</h1>

		{#if $message}
			<div
				class="mb-4 rounded p-3 {$message.type === 'error'
					? 'bg-red-100 text-red-700'
					: 'bg-green-100 text-green-700'}"
			>
				{$message.text}
			</div>
		{/if}

		<form
			method="POST"
			class="space-y-4"
			action="?/register"
			use:enhance={() => {
				isCreating = true;

				return async ({ update, result }) => {
					await update();
					isCreating = false;

					if (result.status === 200) {
						window.alert('Registration successful');
					} else {
						window.alert('Registration failed');
					}
				};
			}}
		>
			<div>
				<label for="email" class="mb-1 block text-sm font-medium">Email</label>
				<input
					id="email"
					name="email"
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
					name="password"
					type="password"
					class="w-full rounded border px-3 py-2 focus:border-blue-400 focus:outline-none focus:ring"
					bind:value={$formData.password}
					required
					placeholder="Password"
				/>
			</div>

			<div>
				<label for="name" class="mb-1 block text-sm font-medium">Name (Optional)</label>
				<input
					id="name"
					name="name"
					type="text"
					class="w-full rounded border px-3 py-2 focus:border-blue-400 focus:outline-none focus:ring"
					bind:value={$formData.name}
					placeholder="Your name"
				/>
			</div>

			<button
				type="submit"
				formaction="?/register"
				class="flex w-full items-center justify-center rounded bg-blue-600 py-2 text-white transition hover:bg-blue-700 disabled:opacity-50"
				disabled={isCreating}
			>
				{#if isCreating}
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
