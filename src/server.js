import express from "express";
import { conf } from "./config/config.js";
import movieRoutes from "./routes/movie.routes.js";
import { connectDB, disconnectDb } from "./config/db.js";

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/movies", movieRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Server is running...</h1>");
});

app.listen(conf.port, () => {
  console.log(`Server is running on port ${conf.port}`);
});

// Handled Unhandled Rejection and Terminating the server
process.on("unhandledRejection", (err) => {
  console.log(
    "Shutting down the server due to Unhandled Rejection ",
    err.message,
  );
  server.close(async () => {
    await disconnectDb();
    process.exit(1);
  });
});

// Handled unhandled exceptions and Terminating the server
process.on("uncaughtException", (err) => {
  console.log(
    "Shutting down the server due to Uncaught Exception ",
    err.message,
  );
  server.close(async () => {
    await disconnectDb();
    process.exit(1);
  });
});

// Handled signals
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDb();
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully");
  server.close(async () => {
    await disconnectDb();
    process.exit(0);
  });
});
