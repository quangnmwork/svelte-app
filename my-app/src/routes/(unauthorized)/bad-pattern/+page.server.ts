import type { PageServerLoad, Actions } from './$types';

let user: { name: string | null; embarrassingSecret: string | null } | null = null;

export const load: PageServerLoad = () => {
	return { user };
};

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		// NEVER DO THIS!
		user = {
			name: data.get('name')?.toString() ?? null,
			embarrassingSecret: data.get('secret')?.toString() ?? null
		};

		// Never do this!

		return {
			user: {
				name: data.get('name')?.toString() ?? null,
				embarrassingSecret: data.get('secret')?.toString() ?? null
			}
		};
	}
} satisfies Actions;
