const routes = require("express").Router();

const coronaController = require("./app/controllers/coronaController");

routes.get("/", coronaController.index);
routes.get("/:country", coronaController.indexCountry);
routes.get("/:country/:uid", coronaController.indexUid);

routes.use((req, res) => res.status(404).json({ message: "Not found" }));

module.exports = routes;
