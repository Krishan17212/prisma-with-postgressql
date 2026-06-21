import { prisma } from "../config/db.js";

const addToWatchlist = async (req, res) => {
  const { movieId, rating, notes, status } = req.body;
  if (!movieId) {
    return res.status(400).json({ error: "Movie ID is required" });
  }
  try {
    const movieExist = await prisma.movie.findUnique({
      where: { id: movieId },
    });
    if (!movieExist) {
      return res.status(404).json({ error: "Movie not found" });
    }
    const watchlistExist = await prisma.watchlistItem.findFirst({
      where: { movieId, userId: req.user.id },
    });
    if (watchlistExist) {
      return res
        .status(400)
        .json({ error: "Movie already exists in watchlist" });
    }
    const watchlist = await prisma.watchlistItem.create({
      data: {
        movieId,
        userId: req.user.id,
        rating,
        notes,
        status,
      },
    });
    return res.status(201).json({
      message: "Movie added to watchlist successfully",
      watchlist,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to add to watchlist", message: error.message });
  }
};

const getAllWatchlistItems = async (req, res) => {
  try {
    const watchlist = await prisma.watchlistItem.findMany({
      where: { userId: req.user.id },
    });
    return res.status(200).json({ watchlist });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to get watchlist", message: error.message });
  }
};

export { addToWatchlist, getAllWatchlistItems };
