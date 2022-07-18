import { gql } from "apollo-server";

const typeDefs = gql`
  type Review {
    _id: ID!
    author: User!
    content: String!
    score: String!
    mediaId: String!
    mediaType: String!
    mediaUrl: String!
    coverUrl: String!
    mediaTitle: String!
    createdAt: String!
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    description: String
    password: String!
    token: String!
    createdAt: String!
    avatar: String!
  }

  input ReviewInput {
    author: String!
    content: String!
    score: String!
    mediaId: String!
    mediaType: String!
    mediaUrl: String!
    coverUrl: String!
    mediaTitle: String!
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  input UpdateUserInput {
    name: String
    email: String
    description: String
    avatarUrl: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input UpdateReviewInput {
    reviewId: String!
    content: String
    score: String
  }

  type Query {
    reviews(mediaType: String): [Review!]
    review(id: String!): Review!
    userReviews(mediaType: String!): [Review!]
    publicUserReviews(mediaType: String!, userId: String!): [Review!]
    userProfile: User!
    publicUserProfile(userId: String!): User
    mediaReviews(mediaId: String!): [Review!]
  }

  type Mutation {
    createReview(reviewInput: ReviewInput): Review
    createUser(userInput: UserInput): User
    loginUser(loginInput: LoginInput): User
    newUserInfo(userInput: UpdateUserInput): User
    newReviewInfo(reviewInput: UpdateReviewInput): Review
    deleteReview(reviewId: String!): Review
  }
`;

export default typeDefs;
