import Review from "../models/Review.js";

const resolvers = {
  Query: {
    reviews: async () => await Review.find().sort({ createdAt: -1 }),
    review: async (_, { id }) => await Review.findById(id),
  },
  Mutation: {
    createReview: async (
      _,
      {
        author,
        content,
        score,
        mediaId,
        mediaType,
        mediaUrl,
        coverUrl,
        mediaTitle,
      }
    ) => {
      const newReview = new Review({
        author,
        content,
        score,
        mediaId,
        mediaType,
        mediaUrl,
        coverUrl,
        mediaTitle,
      });
      return await newReview.save();
    },
    // updateReview: async (_, { id, review }) => {
    //   return await Review.findByIdAndUpdate(id, review, { new: true });
    // },
    // deleteReview: async (_, { id }) => {
    //   return await Review.findByIdAndDelete(id);
    // },
  },
};

export default resolvers;
