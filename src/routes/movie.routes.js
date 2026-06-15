import express from "express";

const routes = express.Router();

routes.post("/", (req, res) => {
  res.send({ httpMethod: "POST", message: "Movie created successfully" });
});

routes.get("/", (req, res) => {
  res.send({ httpMethod: "GET", message: "Movie fetched successfully" });
});

routes.put("/", (req, res) => {
  res.send({ httpMethod: "PUT", message: "Movie updated successfully" });
});

routes.delete("/", (req, res) => {
  res.send({ httpMethod: "DELETE", message: "Movie deleted successfully" });
});

export default routes;
