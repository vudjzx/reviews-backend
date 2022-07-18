import mongoose from "mongoose";
import { ApolloServer } from "apollo-server";
import * as dotenv from "dotenv";
import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers/index.js";
import jwt from "jsonwebtoken";

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  },
  context: ({ req }) => {
    const ctx = {};
    try {
      if (req.headers["x-token"]) {
        const token = jwt.verify(
          req.headers["x-token"],
          process.env.JWT_SECRET || ""
        );
        ctx.token = token;
      }
    } catch (err) {}
    return ctx;
  },
});

const url = process.env.MONGO_URL ?? "";
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async (db) => {
    console.log("Db is connected");
    return server.listen({ port: process.env.PORT || 3100 }).then(({ url }) => {
      console.log(`Server is running on ${url}`);
    });
  })
  .catch((err) => console.log(err));
