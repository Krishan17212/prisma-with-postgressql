import express from "express";
import { getAllWatchlistItems } from "../controllers/watchlist.controller.js";

const router = express.Router();

router.get("/", getAllWatchlistItems);

export default router;
