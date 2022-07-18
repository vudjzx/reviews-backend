import User from "../../models/User.js";
import generateJWT from "../../utils/generateJWT.js";
const userResolvers = {
  Query: {
    userProfile: async (_, __, context) => {
      try {
        const user = await User.findById(context.token.id);
        return user;
      } catch (err) {
        throw new Error("User not authenticated");
      }
    },

    publicUserProfile: async (_, { userId }) => {
      try {
        const user = await User.findById(userId);
        return user;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    createUser: async (_, { userInput: { name, email, password } }) => {
      const userExists = await User.findOne({ email });
      if (userExists) {
        throw new Error("User already exists");
      }
      const newUser = new User({
        name,
        email,
        password,
      });
      newUser.token = generateJWT(newUser._id);
      try {
        return await newUser.save();
      } catch (err) {
        throw new Error(err);
      }
    },

    loginUser: async (_, { loginInput: { email, password } }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User does not exist");
      }
      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword) {
        throw new Error("Invalid password");
      }
      user.token = generateJWT(user._id);
      return user;
    },

    newUserInfo: async (
      _,
      { userInput: { name, email, description, avatarUrl } },
      context
    ) => {
      try {
        const user = await User.findById(context.token.id);
        const emailExists = await User.findOne({ email });
        const canUpdateEmail = !emailExists && email && user.email !== email;
        if (name) {
          user.name = name;
        }
        if (canUpdateEmail) {
          user.email = email;
        }
        if (description) {
          user.description = description;
        }
        if (avatarUrl) {
          user.avatar = avatarUrl;
        }
        return await user.save();
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
};

export default userResolvers;
