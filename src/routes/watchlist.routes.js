import express from "express";
import {
  addToWatchlist,
  getAllWatchlistItems,
  updateMovie,
  deleteMovie,
} from "../controllers/watchlist.controller.js";
import { authMiddleWare } from "../middleware/auth.middleware.js";
import { validateRequest } from "../middleware/validate.middleware.js";
import {
  addWatchlistSchema,
  updateWatchlistSchema,
} from "../validators/watchlistValidator.js";

const router = express.Router();

router.use(authMiddleWare);

// Routes
router.get("/", getAllWatchlistItems);
router.post("/", validateRequest(addWatchlistSchema), addToWatchlist);
router.put("/:id", validateRequest(updateWatchlistSchema), updateMovie);
router.delete("/:id", deleteMovie);

export default router;
