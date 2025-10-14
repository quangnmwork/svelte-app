<script lang="ts">
	import { Checkbox } from 'bits-ui';
	import { superForm } from 'sveltekit-superforms';
	import { createQuery, createMutation, useQueryClient } from '@tanstack/svelte-query';
	import { DELETE_TODO_DOCUMENT, GET_TODO_DOCUMENT, toggleTodoDocument } from '$lib/api/query';
	import { request } from '$lib/api/graffle';
	import type { PageProps } from './$types';
	import type { Todo } from '$lib/gql/graphql';
	import { toast } from 'svelte-french-toast';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';

	// This is the data from the server
	// Inspried by the sveltekit-superforms documentation
	// @see https://superforms.rocks/get-started
	let { data }: PageProps = $props();

	// Client API:
	const { form: formData } = superForm(data.form);

	const client = useQueryClient();

	const query = createQuery<{ todo: Todo }, Error>(() => ({
		queryKey: ['todos', page.params.id],
		queryFn: () => request(GET_TODO_DOCUMENT.toString(), { id: page.params.id }, data.token)
	}));

	const deleteTodo = createMutation<{ deleteTodo: boolean }, Error, string>(() => ({
		onSettled: () => {
			client.invalidateQueries({ queryKey: ['todos'] });
			toast.success('Todo deleted successfully');
			goto(resolve('/(authorized)/tasks'));
		},
		mutationFn: (todoId: string) =>
			request(DELETE_TODO_DOCUMENT.toString(), { id: todoId }, data.token)
	}));

	const toggleTodo = createMutation<
		{ toggleTodo: Todo },
		Error,
		{ todoId: string; completed: boolean }
	>(() => ({
		onSettled: () => {
			client.invalidateQueries({ queryKey: ['todos'] });
			toast.success('Todo toggled successfully');
		},
		mutationFn: ({ todoId, completed }: { todoId: string; completed: boolean }) =>
			request(toggleTodoDocument.toString(), { id: todoId, completed }, data.token)
	}));

	$effect(() => {
		if (query.data) {
			$formData.title = query.data.todo.title;
			$formData.description = query.data.todo.description ?? '';
		}
	});
</script>

{#if query.data}
	<div class="mx-auto max-w-xl p-4">
		<div class="mb-4 flex items-center justify-between">
			<button
				type="button"
				class="rounded bg-gray-100 px-3 py-1.5 text-sm hover:bg-gray-200"
				onclick={() => goto(resolve('/(authorized)/tasks'))}>← Back</button
			>
			<button
				type="button"
				class="rounded bg-red-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-600"
				onclick={() => deleteTodo.mutate(query.data.todo.id)}>Delete task</button
			>
		</div>

		<div class="rounded border border-gray-200 bg-white p-4 shadow-sm">
			<div class="flex items-start gap-3">
				<Checkbox.Root
					checked={query.data.todo.completed}
					onCheckedChange={(val) =>
						toggleTodo.mutate({ todoId: query.data.todo.id, completed: val })}
					class="mt-1 grid size-5 place-items-center rounded border border-gray-300 data-[state=checked]:bg-black data-[state=checked]:text-white"
				>
					{#snippet children({ checked })}
						{#if checked}
							<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" class="size-4">
								<path
									d="M5 10.5 8.5 14 15 6"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						{/if}
					{/snippet}
				</Checkbox.Root>
				<div class="flex-1">
					<input
						class="w-full rounded border border-gray-300 bg-white px-3 py-2 text-lg font-medium outline-none focus:border-gray-400"
						placeholder="Task title"
						bind:value={$formData.title}
					/>
					<p class="mt-1 text-sm text-gray-500">ID: {query.data.todo.id}</p>
				</div>
			</div>

			<div class="mt-4 grid gap-3 sm:grid-cols-2">
				<div class="rounded border border-gray-100 bg-gray-50 p-3">
					<h2 class="text-sm font-semibold text-gray-700">Status</h2>
					<p class="mt-1 text-sm">{query.data.todo.completed ? 'Completed' : 'Not completed'}</p>
				</div>
				<div class="rounded border border-gray-100 bg-gray-50 p-3">
					<h2 class="text-sm font-semibold text-gray-700">Description</h2>
					<p class="mt-1 text-sm text-gray-600">
						{query.data.todo.description}
					</p>
				</div>
			</div>
		</div>
	</div>
{/if}
