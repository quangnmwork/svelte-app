import { GET_TODO_DOCUMENT } from '$lib/api/query';
import { request } from '$lib/api/graffle';
import { error } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/client';
import { zod } from 'sveltekit-superforms/adapters';
import { schema } from './schema';

export const load = async ({ cookies, params }) => {
	try {
		const todo = await request(
			GET_TODO_DOCUMENT.toString(),
			{ id: params.id },
			cookies.get('token')
		);

		if (!todo) error(404, 'Not found');

		const form = await superValidate(todo, zod(schema));
		return { todo, form };
	} catch (loaderError) {
		console.error(loaderError);
		error(500, 'Not found');
	}
};
