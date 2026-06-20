import jwt from "jsonwebtoken";
import { conf } from "../config/config.js";

const generateToken = (userId, res) => {
  const payload = { id: userId };
  const token = jwt.sign(payload, conf.jwtSecret, {
    expiresIn: conf.jwtExpiresIn,
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: conf.nodeEnv === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  return token;
};

export { generateToken };
