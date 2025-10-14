<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';

	let isLoggingIn = $state(false);
	const { data } = $props<{ data: ActionData }>();
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100">
	<div class="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
		<h1 class="mb-6 text-center text-2xl font-bold">Login</h1>

		<form
			method="POST"
			class="space-y-4"
			use:enhance={() => {
				isLoggingIn = true;

				return async ({ update }) => {
					await update();
					isLoggingIn = false;
				};
			}}
		>
			<div>
				<label for="email" class="mb-1 block text-sm font-medium">Email</label>
				<input
					id="email"
					type="email"
					name="email"
					class="w-full rounded border px-3 py-2 focus:border-blue-400 focus:outline-none focus:ring"
					required
					placeholder="user@example.com"
				/>
				{#if data?.errors?.email}
					<p class="text-red-500">{data?.errors?.email}</p>
				{/if}
			</div>
			<div>
				<label for="password" class="mb-1 block text-sm font-medium">Password</label>
				<input
					id="password"
					type="password"
					name="password"
					class="w-full rounded border px-3 py-2 focus:border-blue-400 focus:outline-none focus:ring"
					required
					placeholder="Password"
				/>
				{#if data?.errors?.password}
					<p class="text-red-500">{data?.errors?.password}</p>
				{/if}
			</div>
			<button
				type="submit"
				class="flex w-full items-center justify-center rounded bg-blue-600 py-2 text-white transition hover:bg-blue-700 disabled:opacity-50"
				disabled={isLoggingIn}
			>
				{#if isLoggingIn}
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
					Logging in...
				{:else}
					Login
				{/if}
			</button>
		</form>
		<p class="mt-6 text-center text-sm text-gray-500">Hint: user@example.com / password</p>
	</div>
</div>
