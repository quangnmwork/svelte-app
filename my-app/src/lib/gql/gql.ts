/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n\tquery Todo($id: ID!) {\n\t\ttodo(id: $id) {\n\t\t\tid\n\t\t\ttitle\n\t\t\tcompleted\n\t\t\tdescription\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t}\n\t}\n": typeof types.TodoDocument,
    "\n\tmutation Register($email: String!, $password: String!, $name: String) {\n\t\tregister(email: $email, password: $password, name: $name) {\n\t\t\ttoken\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\temail\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t}\n": typeof types.RegisterDocument,
    "\n\tmutation Login($email: String!, $password: String!) {\n\t\tlogin(email: $email, password: $password) {\n\t\t\ttoken\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\temail\n\t\t\t\tupdatedAt\n\t\t\t}\n\t\t}\n\t}\n": typeof types.LoginDocument,
    "\n\tquery me {\n\t\tme {\n\t\t\tcreatedAt\n\t\t\tid\n\t\t\tname\n\t\t\temail\n\t\t}\n\t}\n": typeof types.MeDocument,
    "\n\tmutation CreateTodo($title: String!, $description: String!) {\n\t\tcreateTodo(title: $title, description: $description) {\n\t\t\ttitle\n\t\t\tcompleted\n\t\t\tcreatedAt\n\t\t\tdescription\n\t\t\tupdatedAt\n\t\t}\n\t}\n": typeof types.CreateTodoDocument,
    "\n\tmutation DeleteTodo($id: ID!) {\n\t\tdeleteTodo(id: $id)\n\t}\n": typeof types.DeleteTodoDocument,
    "\n\tmutation ToggleTodo($id: ID!, $completed: Boolean!) {\n\t\ttoggleTodo(id: $id, completed: $completed) {\n\t\t\tid\n\t\t\tcompleted\n\t\t}\n\t}\n": typeof types.ToggleTodoDocument,
};
const documents: Documents = {
    "\n\tquery Todo($id: ID!) {\n\t\ttodo(id: $id) {\n\t\t\tid\n\t\t\ttitle\n\t\t\tcompleted\n\t\t\tdescription\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t}\n\t}\n": types.TodoDocument,
    "\n\tmutation Register($email: String!, $password: String!, $name: String) {\n\t\tregister(email: $email, password: $password, name: $name) {\n\t\t\ttoken\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\temail\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t}\n": types.RegisterDocument,
    "\n\tmutation Login($email: String!, $password: String!) {\n\t\tlogin(email: $email, password: $password) {\n\t\t\ttoken\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\temail\n\t\t\t\tupdatedAt\n\t\t\t}\n\t\t}\n\t}\n": types.LoginDocument,
    "\n\tquery me {\n\t\tme {\n\t\t\tcreatedAt\n\t\t\tid\n\t\t\tname\n\t\t\temail\n\t\t}\n\t}\n": types.MeDocument,
    "\n\tmutation CreateTodo($title: String!, $description: String!) {\n\t\tcreateTodo(title: $title, description: $description) {\n\t\t\ttitle\n\t\t\tcompleted\n\t\t\tcreatedAt\n\t\t\tdescription\n\t\t\tupdatedAt\n\t\t}\n\t}\n": types.CreateTodoDocument,
    "\n\tmutation DeleteTodo($id: ID!) {\n\t\tdeleteTodo(id: $id)\n\t}\n": types.DeleteTodoDocument,
    "\n\tmutation ToggleTodo($id: ID!, $completed: Boolean!) {\n\t\ttoggleTodo(id: $id, completed: $completed) {\n\t\t\tid\n\t\t\tcompleted\n\t\t}\n\t}\n": types.ToggleTodoDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery Todo($id: ID!) {\n\t\ttodo(id: $id) {\n\t\t\tid\n\t\t\ttitle\n\t\t\tcompleted\n\t\t\tdescription\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t}\n\t}\n"): typeof import('./graphql').TodoDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation Register($email: String!, $password: String!, $name: String) {\n\t\tregister(email: $email, password: $password, name: $name) {\n\t\t\ttoken\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\temail\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t}\n"): typeof import('./graphql').RegisterDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation Login($email: String!, $password: String!) {\n\t\tlogin(email: $email, password: $password) {\n\t\t\ttoken\n\t\t\tuser {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\temail\n\t\t\t\tupdatedAt\n\t\t\t}\n\t\t}\n\t}\n"): typeof import('./graphql').LoginDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery me {\n\t\tme {\n\t\t\tcreatedAt\n\t\t\tid\n\t\t\tname\n\t\t\temail\n\t\t}\n\t}\n"): typeof import('./graphql').MeDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation CreateTodo($title: String!, $description: String!) {\n\t\tcreateTodo(title: $title, description: $description) {\n\t\t\ttitle\n\t\t\tcompleted\n\t\t\tcreatedAt\n\t\t\tdescription\n\t\t\tupdatedAt\n\t\t}\n\t}\n"): typeof import('./graphql').CreateTodoDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation DeleteTodo($id: ID!) {\n\t\tdeleteTodo(id: $id)\n\t}\n"): typeof import('./graphql').DeleteTodoDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation ToggleTodo($id: ID!, $completed: Boolean!) {\n\t\ttoggleTodo(id: $id, completed: $completed) {\n\t\t\tid\n\t\t\tcompleted\n\t\t}\n\t}\n"): typeof import('./graphql').ToggleTodoDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
