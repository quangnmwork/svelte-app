<script lang="ts" module>
	import { z } from 'zod';

	const schema = z.object({
		title: z.string().min(1, 'Title is required'),
		description: z.string().optional()
	});
</script>

<script lang="ts">
	import { Checkbox } from 'bits-ui';
	import { resolve } from '$app/paths';
	import { superForm, defaults } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { createQuery, createMutation, useQueryClient } from '@tanstack/svelte-query';
	import {
		CREATE_TODO_DOCUMENT,
		DELETE_TODO_DOCUMENT,
		TODOS_DOCUMENT,
		toggleTodoDocument
	} from '$lib/api/query';
	import { request } from '$lib/api/graffle';
	import type { PageProps } from './$types';
	import type { Todo } from '$lib/gql/graphql';
	import { toast } from 'svelte-french-toast';

	const form = superForm(defaults(zod(schema)), {
		validators: zod(schema),
		SPA: true
	});

	const { form: formData } = form;

	let { data }: PageProps = $props();

	const client = useQueryClient();

	const query = createQuery<{ todos: Todo[] }, Error>(() => ({
		queryKey: ['todos'],
		queryFn: () => request(TODOS_DOCUMENT.toString(), undefined, data.token)
	}));

	const createTodo = createMutation<{ createTodo: Todo }, Error>(() => ({
		onSettled: () => {
			client.invalidateQueries({ queryKey: ['todos'] });
		},
		mutationFn: () =>
			request(
				CREATE_TODO_DOCUMENT.toString(),
				{ title: $formData.title, description: $formData.description },
				data.token
			)
	}));

	const deleteTodo = createMutation<{ deleteTodo: boolean }, Error, string>(() => ({
		onSettled: () => {
			client.invalidateQueries({ queryKey: ['todos'] });
			toast.success('Todo deleted successfully');
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

	const handleDeleteTodo = (todoId: string) => {
		deleteTodo.mutate(todoId);
	};
</script>

<div class="mx-auto max-w-md p-4">
	<h1 class="mb-4 text-2xl font-semibold">Todo</h1>

	<div class="mb-4 flex flex-col gap-2">
		<label for="title">Title</label>
		<input
			id="title"
			class="flex-1 rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400"
			placeholder="Add new task..."
			bind:value={$formData.title}
		/>
		<label for="description">Description</label>
		<textarea
			id="description"
			bind:value={$formData.description}
			placeholder="Task description..."
			class="w-full flex-1 rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400"
		></textarea>
		<button
			type="button"
			class="rounded bg-black px-3 py-2 text-sm font-medium text-white hover:bg-black/90"
			onclick={() => {
				createTodo.mutate();
			}}
		>
			Add
		</button>
	</div>

	{#if query.isLoading}
		<div class="flex items-center justify-center">
			<div
				class="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-transparent"
			></div>
		</div>
	{/if}

	<ul class="space-y-2">
		{#each query.data?.todos as todo (todo.id)}
			<li
				class="flex items-center justify-between rounded border border-gray-200 bg-white px-3 py-2"
			>
				<label class="flex items-center gap-2">
					<Checkbox.Root
						checked={todo.completed}
						onCheckedChange={(val) => toggleTodo.mutate({ todoId: todo.id, completed: val })}
						class="grid size-5 place-items-center rounded border border-gray-300 data-[state=checked]:bg-black data-[state=checked]:text-white"
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
					<a
						href={resolve(`/(authorized)/tasks/[id]`, { id: todo.id.toString() })}
						class="text-left text-sm hover:underline {todo.completed
							? 'text-gray-400 line-through'
							: ''}">{todo.title}</a
					>
				</label>
				<button
					type="button"
					class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700 hover:bg-gray-200"
					onclick={() => handleDeleteTodo(todo.id)}
				>
					Delete
				</button>
			</li>
		{/each}
	</ul>
</div>
