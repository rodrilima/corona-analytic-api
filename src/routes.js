const routes = require("express").Router();

const coronaController = require("./app/controllers/coronaController");

routes.get("/", coronaController.index);

routes.use((req, res) => res.json({ message: "404 - Not found" }));

module.exports = routes;
