const State = require("../models/states");
const coronaController = require("./coronaController");

class stateController extends coronaController {
  constructor() {
    super(State);
  }
}

module.exports = new stateController();
