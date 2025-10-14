import { REGISTER_DOCUMENT } from '$lib/api/query';
import type { AuthPayload, MutationRegisterArgs } from '$lib/gql/graphql';
import { fail, json } from '@sveltejs/kit';
import type { Actions } from './$types';
import { fetchGraphQL } from '$lib/api/graphql-client';

export const actions = {
	register: async (event) => {
		try {
			const formData = await event.request.formData();
			const email = formData.get('email');
			const password = formData.get('password');
			const name = formData.get('name');

			const result = await fetchGraphQL<{ register: AuthPayload }, MutationRegisterArgs>(
				REGISTER_DOCUMENT,
				{ email: email, password: password, name: name as string } as MutationRegisterArgs
			);

			if (!result.register.token) {
				return json({ error: 'Failed to register user' }, { status: 400 });
			}

			return { success: true };
		} catch (error) {
			console.error(error);
			return fail(500, { error: 'Failed to register user' });
		}
	}
} satisfies Actions;
