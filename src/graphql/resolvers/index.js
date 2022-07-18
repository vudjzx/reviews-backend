import reviewResolvers from "./reviews.js";
import userResolvers from "./users.js";
const resolvers = {
  Query: {
    ...reviewResolvers.Query,
    ...userResolvers.Query,
  },
  Mutation: {
    ...reviewResolvers.Mutation,
    ...userResolvers.Mutation,
  },
};

export default resolvers;
