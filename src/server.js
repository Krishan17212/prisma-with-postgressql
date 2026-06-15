import express from "express";
import { conf } from "./config/config.js";
import movieRoutes from "./routes/movie.routes.js";

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
