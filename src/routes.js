const routes = require("express").Router();

const coronaController = require("./app/controllers/coronaController");
const historyController = require("./app/controllers/historyController");

routes.get("/", coronaController.index);

routes.get("/history", historyController.index);
routes.get("/history/:country", historyController.indexCountry);
routes.get("/history/:country/:uid", historyController.indexUid);

routes.get("/:country", coronaController.indexCountry);
routes.get("/:country/:uid", coronaController.indexUid);

routes.use((req, res) => res.status(404).json({ message: "Not found" }));

module.exports = routes;
