import { GraphQLClient } from 'graphql-request';

export const graphQLClient = new GraphQLClient('http://localhost:4000/graphql');

export async function request<T, O extends object = object>(
	document: string,
	variables?: O,
	token?: string
): Promise<T> {
	try {
		return await graphQLClient.request<T>(document, variables, {
			Authorization: token ? `Bearer ${token}` : ''
		});
	} catch (error) {
		console.error('GraphQL Error:', error);
		throw error;
	}
}
