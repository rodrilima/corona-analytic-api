const routes = require("express").Router();

const countryController = require("./app/controllers/countryController");
const stateController = require("./app/controllers/stateController");

routes.get("/", countryController.index.bind(countryController));
routes.get("/brazil", stateController.index.bind(stateController));
// routes.get("/save", countryController.save);

module.exports = routes;
