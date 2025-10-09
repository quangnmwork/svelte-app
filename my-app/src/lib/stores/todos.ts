import { browser } from '$app/environment';
import { writable, type Writable } from 'svelte/store';

export type Todo = {
	id: number;
	label: string;
	completed: boolean;
};

const STORAGE_KEY = 'app.todos';

function loadFromStorage(): Todo[] {
	if (!browser) return [];
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? (JSON.parse(raw) as Todo[]) : [];
	} catch {
		return [];
	}
}

function saveToStorage(value: Todo[]) {
	if (!browser) return;
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
	} catch {
		// ignore quota or serialization errors
	}
}

const initialDefaults: Todo[] = [
	{ id: 1, label: 'Học Svelte', completed: false },
	{ id: 2, label: 'Cài Tailwind', completed: true }
];

const initial = (() => {
	const stored = loadFromStorage();
	return stored.length ? stored : initialDefaults;
})();

export const todos: Writable<Todo[]> = writable(initial);

todos.subscribe((value) => {
	saveToStorage(value);
});

export function addTodo(label: string) {
	todos.update((list) => {
		const nextId = list.length ? Math.max(...list.map((t) => t.id)) + 1 : 1;
		const trimmed = label.trim();
		if (!trimmed) return list;
		return [...list, { id: nextId, label: trimmed, completed: false }];
	});
}

export function toggleTodo(id: number, completed: boolean) {
	todos.update((list) => list.map((t) => (t.id === id ? { ...t, completed } : t)));
}

export function removeTodo(id: number) {
	todos.update((list) => list.filter((t) => t.id !== id));
}

export function renameTodo(id: number, label: string) {
	const trimmed = label.trim();
	if (!trimmed) return;
	todos.update((list) => list.map((t) => (t.id === id ? { ...t, label: trimmed } : t)));
}

export function getTodoById(id: number): Todo | undefined {
	let value: Todo[] = [];
	const unsub = todos.subscribe((v) => (value = v));
	unsub();
	return value.find((t) => t.id === id);
}
