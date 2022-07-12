import mongoose from "mongoose";
import { ApolloServer } from "apollo-server";
import * as dotenv from "dotenv";
import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers.js";
dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: [process.env.FRONTEND_URL],
    credentials: true,
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
