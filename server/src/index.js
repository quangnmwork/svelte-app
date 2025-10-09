// Server entrypoint - starts Express and Apollo Server
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const { typeDefs } = require("./schema/typeDefs");
const { resolvers } = require("./schema/resolvers");
const { connectMongo } = require("./lib/mongo");
const { getUserFromToken } = require("./lib/auth");

async function start() {
  await connectMongo();

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const apollo = new ApolloServer({ schema });
  await apollo.start();

  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(
    "/graphql",
    expressMiddleware(apollo, {
      context: async ({ req }) => {
        const token = req.headers.authorization?.replace("Bearer ", "") || null;
        const user = token ? await getUserFromToken(token) : null;
        return { user };
      },
    })
  );

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`GraphQL server ready at http://localhost:${port}/graphql`);
  });
}

start().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});
