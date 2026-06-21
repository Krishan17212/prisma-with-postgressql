import express from "express";
import {
  addToWatchlist,
  getAllWatchlistItems,
  updateMovie,
  deleteMovie,
} from "../controllers/watchlist.controller.js";
import { authMiddleWare } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authMiddleWare);

router.get("/", getAllWatchlistItems);
router.post("/", addToWatchlist);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

export default router;
