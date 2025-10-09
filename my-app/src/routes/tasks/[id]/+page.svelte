<script lang="ts">
	import { goto } from '$app/navigation';
	import { Checkbox } from 'bits-ui';
	import { todos, toggleTodo, renameTodo, removeTodo, type Todo } from '$lib/stores/todos';
	// type import suppressed to avoid lint error in editor without build types
	// import type { PageData } from './$types';

	export let data: { id: number };
	const idParam = data.id;

	let current: Todo | undefined;

	// reactivity to store changes
	$todos;
	current = $todos.find((t) => t.id === idParam);

	if (!current) {
		goto('/');
	}

	let editLabel = current?.label ?? '';

	function saveLabel() {
		if (current) renameTodo(current.id, editLabel);
	}

	function goBack() {
		goto('/');
	}

	function handleRemove() {
		if (!current) return;
		removeTodo(current.id);
		goto('/');
	}
</script>

{#if current}
<div class="mx-auto max-w-xl p-4">
	<div class="mb-4 flex items-center justify-between">
		<button type="button" class="rounded bg-gray-100 px-3 py-1.5 text-sm hover:bg-gray-200" on:click={goBack}>← Quay lại</button>
		<button type="button" class="rounded bg-red-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-600" on:click={handleRemove}>Xóa task</button>
	</div>

	<div class="rounded border border-gray-200 bg-white p-4 shadow-sm">
		<div class="flex items-start gap-3">
			<Checkbox.Root
				checked={current.completed}
				onCheckedChange={(val) => toggleTodo(current!.id, val)}
				class="mt-1 size-5 rounded border border-gray-300 data-[state=checked]:bg-black data-[state=checked]:text-white grid place-items-center"
			>
				{#snippet children({ checked })}
					{#if checked}
						<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" class="size-4">
							<path d="M5 10.5 8.5 14 15 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
					{/if}
				{/snippet}
			</Checkbox.Root>
			<div class="flex-1">
				<input
					class="w-full rounded border border-gray-300 bg-white px-3 py-2 text-lg font-medium outline-none focus:border-gray-400"
					bind:value={editLabel}
					on:blur={saveLabel}
					placeholder="Tên công việc"
				/>
				<p class="mt-1 text-sm text-gray-500">ID: {current.id}</p>
			</div>
		</div>

		<div class="mt-4 grid gap-3 sm:grid-cols-2">
			<div class="rounded border border-gray-100 bg-gray-50 p-3">
				<h2 class="text-sm font-semibold text-gray-700">Trạng thái</h2>
				<p class="mt-1 text-sm">{current.completed ? 'Đã hoàn thành' : 'Chưa hoàn thành'}</p>
			</div>
			<div class="rounded border border-gray-100 bg-gray-50 p-3">
				<h2 class="text-sm font-semibold text-gray-700">Mô tả</h2>
				<p class="mt-1 text-sm text-gray-600">(Có thể mở rộng thêm phần mô tả chi tiết ở đây...)</p>
			</div>
		</div>
	</div>
</div>
{/if}


