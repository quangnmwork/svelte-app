// src/lib/graphql-client.ts
import type { TypedDocumentString } from '../gql/graphql';
import { type DocumentNode } from 'graphql';

/**
 * Fetch GraphQL data from the server
 * @param document - The GraphQL document to fetch
 * @param variables - The variables to pass to the GraphQL document
 * @param token - The token to pass to the GraphQL document
 * @returns The data from the GraphQL document
 */
export async function fetchGraphQL<TResult, TVariables>(
	document: string | TypedDocumentString<TResult, TVariables> | DocumentNode,
	variables?: TVariables,
	token?: string
): Promise<TResult> {
	const response = await fetch('http://localhost:4000/graphql', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...(token && { Authorization: `Bearer ${token}` })
		},
		body: JSON.stringify({
			query: document.toString(),
			variables
		})
	});

	const json = await response.json();

	if (json.errors) {
		throw new Error(json.errors[0].message);
	}

	return json.data;
}
