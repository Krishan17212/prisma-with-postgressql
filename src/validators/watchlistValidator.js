import { z } from "zod";

const addWatchlistSchema = z.object({
  movieId: z.string().uuid(),
  status: z
    .enum(["COMPLETED", "WATCHING", "DROPPED", "PLANNED"], {
      message: "Status is required",
    })
    .optional(),
  rating: z.coerce
    .number()
    .int("Rating must be an integer")
    .min(1, "Rating must be at least 1")
    .max(10, "Rating must be at most 10")
    .optional(),
  notes: z.string().optional(),
  notes: z.string().optional,
});

const updateWatchlistSchema = z.object({
  id: z.string().uuid(),
  status: z
    .enum(["COMPLETED", "WATCHING", "DROPPED", "PLANNED"], {
      message: "Status is required",
    })
    .optional(),
  rating: z.coerce
    .number()
    .int("Rating must be an integer")
    .min(1, "Rating must be at least 1")
    .max(10, "Rating must be at most 10")
    .optional(),
  notes: z.string().optional(),
});
