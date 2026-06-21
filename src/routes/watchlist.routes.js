import express from "express";
import {
  addToWatchlist,
  getAllWatchlistItems,
} from "../controllers/watchlist.controller.js";
import { authMiddleWare } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authMiddleWare);

router.get("/", getAllWatchlistItems);
router.post("/", addToWatchlist);

export default router;
