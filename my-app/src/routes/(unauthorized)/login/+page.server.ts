import { graphQLClient } from '$lib/api/graffle';
import { LOGIN_DOCUMENT } from '$lib/api/query';
import type { AuthPayload } from '$lib/gql/graphql';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { schema } from './schema';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const resultParse = schema.safeParse({ email, password });

		if (!resultParse.success) {
			const errors = resultParse.error.flatten().fieldErrors;
			return fail(400, { data: { email, password }, errors });
		}

		const result = await graphQLClient.request<{ login: AuthPayload }>(LOGIN_DOCUMENT.toString(), {
			email,
			password
		});

		// Save token to httpOnly cookie (more secure than localStorage)
		cookies.set('token', result.login.token, {
			path: '/',
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 7 // 7 days
		});

		// In actions, you must throw to redirect
		redirect(307, '/tasks');
	}
};
