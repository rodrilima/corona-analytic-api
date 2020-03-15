const Country = require("../models/country");
const coronaController = require("./coronaController");

class countryController extends coronaController {
  constructor() {
    super(Country);
  }
}

module.exports = new countryController();
