## .env example

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/svelte_todos
MONGO_DB=
JWT_SECRET=replace_me
```

## GraphQL

- Query `me`, `todos`, `todo(id)`
- Mutations: `register`, `login`, `createTodo`, `toggleTodo`, `updateTodo`, `deleteTodo`

Send `Authorization: Bearer <token>` after `login`/`register`.

## Notes

- Passwords are hashed with bcrypt.
- JWT expires in 7 days.
- CORS enabled for local development.
