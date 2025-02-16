import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function setUser(user) {
  try {
    return jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET
    );
  } catch (error) {
    console.error("Error setting user:", error);
    return null;
  }
}

function getUser(token) {
  if (!token) {
    return null;
  }
  // Remove "Bearer " prefix if present
  if (token.startsWith("Bearer ")) {
    token = token.slice(7).trim();
  }
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}

export { setUser, getUser };
