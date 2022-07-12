import mongoose from "mongoose";
const { Schema, model } = mongoose;
const reviewSchema = new Schema(
  {
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    score: {
      type: String,
      required: true,
    },
    mediaId: {
      type: String,
      required: true,
    },
    mediaType: {
      type: String,
      required: true,
    },
    mediaUrl: {
      type: String,
      required: true,
    },
    coverUrl: {
      type: String,
      required: true,
    },
    mediaTitle: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Review", reviewSchema);
