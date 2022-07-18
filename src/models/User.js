import mongoose from "mongoose";
const { Schema, model } = mongoose;
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
    avatar: {
      type: String,
      trim: true,
      default:
        "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default model("User", userSchema);
