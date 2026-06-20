import jwt from "jsonwebtoken";
import { conf } from "../config/config.js";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, conf.jwtSecret, {
    expiresIn: conf.jwtExpiresIn,
  });
};

export { generateToken };
