import { request } from '$lib/api/graffle';
import { GET_ME_DOCUMENT } from '$lib/api/query';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import type { User } from '$lib/gql/graphql';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const token = cookies.get('token');

	if (!token) {
		throw redirect(307, '/login');
	}

	const user = await request<{ me: User }>(GET_ME_DOCUMENT.toString(), undefined, token);

	if (!user.me) {
		throw redirect(307, '/login');
	}

	return {
		user: user.me || null,
		token: token
	};
};
