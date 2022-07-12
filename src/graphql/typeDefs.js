import { gql } from "apollo-server";

const typeDefs = gql`
  type Review {
    _id: ID!
    author: String!
    content: String!
    score: String!
    mediaId: String!
    mediaType: String!
    mediaUrl: String!
    coverUrl: String!
    mediaTitle: String!
    createdAt: String!
  }

  type Query {
    reviews: [Review!]
    review(id: ID!): Review
  }

  type Mutation {
    createReview(
      author: String!
      content: String!
      score: String!
      mediaId: String!
      mediaType: String!
      mediaUrl: String!
      coverUrl: String!
      mediaTitle: String!
    ): Review
  }
`;

export default typeDefs;
