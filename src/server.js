import express from "express";
import { conf } from "./config/config.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("<h1>Server is running...</h1>");
});

app.listen(conf.port, () => {
  console.log(`Server is running on port ${conf.port}`);
});
