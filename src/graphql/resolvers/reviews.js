import Review from "../../models/Review.js";
import User from "../../models/User.js";

const reviewResolvers = {
  Query: {
    reviews: async (_, { mediaType = "movie" }) =>
      await Review.find({ mediaType })
        .sort({ createdAt: -1 })
        .populate("author"),
    review: async (_, { id }) => {
      try {
        const review = await Review.findById(id).populate("author");
        return review;
      } catch (err) {
        throw new Error(err);
      }
    },
    userReviews: async (_parent, { mediaType = "movie" }, context) => {
      try {
        const user = await User.findById(context.token.id);
        return await Review.find({ author: user._id, mediaType })
          .populate("author")
          .sort({ createdAt: -1 });
      } catch (err) {
        throw new Error("User not authenticated");
      }
    },
    publicUserReviews: async (_parent, { mediaType = "movie", userId }) => {
      try {
        return await Review.find({ mediaType, author: userId })
          .populate("author")
          .sort({ createdAt: -1 });
      } catch (err) {
        throw new Error(err);
      }
    },
    mediaReviews: async (_, { mediaId }) => {
      try {
        return await Review.find({ mediaId })
          .populate("author")
          .sort({ createdAt: -1 });
      } catch (err) {
        throw new Error("No reviews found");
      }
    },
  },
  Mutation: {
    createReview: async (
      _,
      {
        reviewInput: {
          author,
          content,
          score,
          mediaId,
          mediaType,
          mediaUrl,
          coverUrl,
          mediaTitle,
        },
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
      return await (await newReview.save()).populate("author");
    },
    newReviewInfo: async (
      _,
      { reviewInput: { reviewId, content, score } },
      context
    ) => {
      try {
        const user = await User.findById(context.token.id);
        const review = await Review.findById(reviewId).populate("author");
        if (review.author._id.toString() === user._id.toString()) {
          if (content) review.content = content;
          if (score) review.score = score;
          await review.save();
          return review;
        } else {
          throw new Error("User not authorized");
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    deleteReview: async (_, { reviewId }, context) => {
      try {
        const user = await User.findById(context.token.id);
        const review = await Review.findById(reviewId).populate("author");
        if (review.author._id.toString() === user._id.toString()) {
          await Review.findByIdAndDelete(reviewId);
          return review;
        } else {
          throw new Error("User not authorized");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

export default reviewResolvers;
