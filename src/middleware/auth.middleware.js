import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";
const authMiddleWare = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    if (!token) {
      return res.status(401).json({
        status: "Error",
        message: "Unauthorized",
      });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decodedToken.id },
    });
    if (!user) {
      return res.status(401).json({
        status: "Error",
        message: "Unauthorized",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      message: error.message || "Internal Server Error",
    });
  }
};

export { authMiddleWare };
