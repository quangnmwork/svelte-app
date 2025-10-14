// Client-side GraphQL documents for runtime requests

import { graphql } from '$lib/gql/gql';

export const TODOS_DOCUMENT = `
  query Todos {
    me { id email name }
    todos { id title completed description }
  }
`;

export const GET_TODO_DOCUMENT = graphql(`
	query Todo($id: ID!) {
		todo(id: $id) {
			id
			title
			completed
			description
			createdAt
			updatedAt
		}
	}
`);

export const REGISTER_DOCUMENT = graphql(`
	mutation Register($email: String!, $password: String!, $name: String) {
		register(email: $email, password: $password, name: $name) {
			token
			user {
				id
				email
				name
			}
		}
	}
`);

export const LOGIN_DOCUMENT = graphql(`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				id
				name
				email
				updatedAt
			}
		}
	}
`);

export const GET_ME_DOCUMENT = graphql(`
	query me {
		me {
			createdAt
			id
			name
			email
		}
	}
`);

export const CREATE_TODO_DOCUMENT = graphql(`
	mutation CreateTodo($title: String!, $description: String!) {
		createTodo(title: $title, description: $description) {
			title
			completed
			createdAt
			description
			updatedAt
		}
	}
`);

export const DELETE_TODO_DOCUMENT = graphql(`
	mutation DeleteTodo($id: ID!) {
		deleteTodo(id: $id)
	}
`);

export const toggleTodoDocument = graphql(`
	mutation ToggleTodo($id: ID!, $completed: Boolean!) {
		toggleTodo(id: $id, completed: $completed) {
			id
			completed
		}
	}
`);
