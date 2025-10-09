// GraphQL type definitions
const typeDefs = `#graphql
  scalar Date

  type User {
    id: ID!
    email: String!
    name: String
    createdAt: Date
    updatedAt: Date
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
    description: String
    createdAt: Date
    updatedAt: Date
  }

  type Query {
    me: User
    todos: [Todo!]!
    todo(id: ID!): Todo
  }

  type Mutation {
    register(email: String!, password: String!, name: String): AuthPayload!
    login(email: String!, password: String!): AuthPayload!

    createTodo(title: String!, description: String): Todo!
    toggleTodo(id: ID!, completed: Boolean!): Todo!
    updateTodo(id: ID!, title: String, description: String): Todo!
    deleteTodo(id: ID!): Boolean!
  }
`;

module.exports = { typeDefs };
