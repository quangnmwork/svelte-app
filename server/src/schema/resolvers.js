// GraphQL resolvers
const { GraphQLError } = require("graphql");
const bcrypt = require("bcryptjs");
const { User } = require("../models/User");
const { Todo } = require("../models/Todo");
const { signToken } = require("../lib/auth");

function requireUser(ctx) {
  if (!ctx.user) {
    throw new GraphQLError("Unauthorized", {
      extensions: { code: "UNAUTHENTICATED" },
    });
  }
  return ctx.user;
}

const resolvers = {
  Query: {
    me: (_, __, ctx) => ctx.user || null,
    todos: async (_, __, ctx) => {
      const user = requireUser(ctx);
      const list = await Todo.find({ userId: user._id }).sort({
        createdAt: -1,
      });
      return list.map(toGraph);
    },
    todo: async (_, { id }, ctx) => {
      const user = requireUser(ctx);
      const item = await Todo.findOne({ _id: id, userId: user._id });
      return item ? toGraph(item) : null;
    },
  },
  Mutation: {
    register: async (_, { email, password, name }) => {
      const existing = await User.findOne({ email });
      if (existing) {
        throw new GraphQLError("Email already in use", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }
      const passwordHash = await bcrypt.hash(password, 10);
      const user = await User.create({ email, passwordHash, name });
      const token = signToken(user);
      return { token, user: toGraphUser(user) };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new GraphQLError("Invalid credentials", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }
      const ok = await user.validatePassword(password);
      if (!ok) {
        throw new GraphQLError("Invalid credentials", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }
      const token = signToken(user);
      return { token, user: toGraphUser(user) };
    },
    createTodo: async (_, { title, description }, ctx) => {
      const user = requireUser(ctx);
      const created = await Todo.create({
        userId: user._id,
        title,
        description: description || "",
      });
      return toGraph(created);
    },
    toggleTodo: async (_, { id, completed }, ctx) => {
      const user = requireUser(ctx);
      const item = await Todo.findOneAndUpdate(
        { _id: id, userId: user._id },
        { $set: { completed } },
        { new: true }
      );
      if (!item) throw notFound("Todo");
      return toGraph(item);
    },
    updateTodo: async (_, { id, title, description }, ctx) => {
      const user = requireUser(ctx);
      const item = await Todo.findOneAndUpdate(
        { _id: id, userId: user._id },
        {
          $set: {
            ...(title != null ? { title } : {}),
            ...(description != null ? { description } : {}),
          },
        },
        { new: true }
      );
      if (!item) throw notFound("Todo");
      return toGraph(item);
    },
    deleteTodo: async (_, { id }, ctx) => {
      const user = requireUser(ctx);
      const res = await Todo.deleteOne({ _id: id, userId: user._id });
      return res.deletedCount > 0;
    },
  },
};

function notFound(entity) {
  return new GraphQLError(`${entity} not found`, {
    extensions: { code: "NOT_FOUND" },
  });
}

function toGraph(doc) {
  return {
    id: doc._id.toString(),
    title: doc.title,
    completed: !!doc.completed,
    description: doc.description || "",
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

function toGraphUser(doc) {
  return {
    id: doc._id.toString(),
    email: doc.email,
    name: doc.name || "",
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

module.exports = { resolvers };
