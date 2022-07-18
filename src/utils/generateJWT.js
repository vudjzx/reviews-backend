import jwt from "jsonwebtoken";

const generateJWT = (id) => {
  const token = jwt.sign(
    {
      id: id,
    },
    process.env.JWT_SECRET || "",
    { expiresIn: "30d" }
  );
  return token;
};

export default generateJWT;
