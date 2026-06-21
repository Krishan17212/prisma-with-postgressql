import express from "express";
import { authMiddleWare } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authMiddleWare);

router.post("/", (req, res) => {
  res.send({ httpMethod: "POST", message: "Movie created successfully" });
});

router.get("/", (req, res) => {
  res.send({ httpMethod: "GET", message: "Movie fetched successfully" });
});

router.put("/", (req, res) => {
  res.send({ httpMethod: "PUT", message: "Movie updated successfully" });
});

router.delete("/", (req, res) => {
  res.send({ httpMethod: "DELETE", message: "Movie deleted successfully" });
});

export default router;
