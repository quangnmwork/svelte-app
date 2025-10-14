<script lang="ts">
	import { Checkbox } from 'bits-ui';
	import { todos, addTodo, toggleTodo, removeTodo } from '$lib/stores/todos';
	import { resolve } from '$app/paths';

	let newTodoLabel = '';

	function handleAdd() {
		addTodo(newTodoLabel);
		newTodoLabel = '';
	}
</script>

<div class="mx-auto max-w-md p-4">
	<h1 class="mb-4 text-2xl font-semibold">Todo</h1>

	<div class="mb-4 flex gap-2">
		<input
			class="flex-1 rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400"
			placeholder="Thêm việc cần làm..."
			bind:value={newTodoLabel}
			on:keydown={(e) => e.key === 'Enter' && handleAdd()}
		/>
		<button
			type="button"
			class="rounded bg-black px-3 py-2 text-sm font-medium text-white hover:bg-black/90"
			on:click={handleAdd}
		>
			Thêm
		</button>
	</div>

	<ul class="space-y-2">
		{#each $todos as todo (todo.id)}
			<li
				class="flex items-center justify-between rounded border border-gray-200 bg-white px-3 py-2"
			>
				<label class="flex items-center gap-2">
					<Checkbox.Root
						checked={todo.completed}
						onCheckedChange={(val) => toggleTodo(todo.id, val)}
						class="grid size-5 place-items-center rounded border border-gray-300 data-[state=checked]:bg-black data-[state=checked]:text-white"
					>
						{#snippet children({ checked })}
							{#if checked}
								<!-- simple checkmark -->
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
						href={resolve('/tasks/[id]', { id: todo.id.toString() })}
						class="text-left text-sm hover:underline {todo.completed
							? 'text-gray-400 line-through'
							: ''}">{todo.label}</a
					>
				</label>
				<button
					type="button"
					class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700 hover:bg-gray-200"
					on:click={() => removeTodo(todo.id)}
				>
					Xóa
				</button>
			</li>
		{/each}
	</ul>
</div>
