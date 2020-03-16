const routes = require("express").Router();

const coronaController = require("./app/controllers/coronaController");

routes.get("/", coronaController.index);

routes.use((req, res) => res.status(404).json({ message: "Not found" }));

module.exports = routes;
