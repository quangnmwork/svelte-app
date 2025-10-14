// src/routes/(authorized)/logout/+server.ts
import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ cookies }) => {
	// delete  token
	cookies.delete('token', { path: '/' });

	// Redirect login
	throw redirect(303, '/login');
};
