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

const updateMovie = async (req, res) => {
  const { rating, notes, status } = req.body;
  const { id } = req.params;
  if (!id) {
    return res
      .status(400)
      .json({ error: "ID is required in request parameters" });
  }

  try {
    // 1. Try to find the watchlist item by its own ID (watchlistItemId) first
    let watchlistExist = await prisma.watchlistItem.findFirst({
      where: {
        id: id,
        userId: req.user.id,
      },
    });

    // 2. If not found, try to find it by the movieId
    if (!watchlistExist) {
      watchlistExist = await prisma.watchlistItem.findFirst({
        where: {
          movieId: id,
          userId: req.user.id,
        },
      });
    }

    if (!watchlistExist) {
      return res
        .status(404)
        .json({ error: "Movie/Watchlist item not found in your watchlist" });
    }

    // 3. Normalize & validate input data
    let parsedRating = undefined;
    if (rating !== undefined) {
      parsedRating = rating === null ? null : parseInt(rating, 10);
      if (parsedRating !== null && isNaN(parsedRating)) {
        return res.status(400).json({ error: "Rating must be a valid number" });
      }
    }

    let parsedStatus = undefined;
    if (status !== undefined) {
      if (status === null) {
        parsedStatus = null;
      } else {
        const uppercaseStatus = status.toUpperCase();
        const validStatuses = ["COMPLETED", "WATCHING", "DROPPED", "PLANNED"];
        if (!validStatuses.includes(uppercaseStatus)) {
          return res.status(400).json({
            error: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
          });
        }
        parsedStatus = uppercaseStatus;
      }
    }

    // 4. Update using the resolved watchlist item's unique primary key
    const watchlist = await prisma.watchlistItem.update({
      where: { id: watchlistExist.id },
      data: {
        rating: parsedRating,
        notes,
        status: parsedStatus,
      },
    });

    return res.status(200).json({
      message: "Movie updated in watchlist successfully",
      watchlist,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to update movie in watchlist",
      message: error.message,
    });
  }
};

const deleteMovie = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(400)
      .json({ error: "ID is required in request parameters" });
  }
  try {
    let watchlistExist = await prisma.watchlistItem.findFirst({
      where: {
        id: id,
        userId: req.user.id,
      },
    });
    if (!watchlistExist) {
      watchlistExist = await prisma.watchlistItem.findFirst({
        where: {
          movieId: id,
          userId: req.user.id,
        },
      });
    }
    if (!watchlistExist) {
      return res.status(404).json({ error: "Movie not found in watchlist" });
    }
    const watchlist = await prisma.watchlistItem.delete({
      where: { id: id },
    });
    return res.status(200).json({
      message: "Movie deleted from watchlist successfully",
      watchlist,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to delete movie from watchlist",
      message: error.message,
    });
  }
};

export { addToWatchlist, getAllWatchlistItems, updateMovie, deleteMovie };
