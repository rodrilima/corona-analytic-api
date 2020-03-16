const mds = require("../../libs/mds");

class coronaController {
  async index(req, res) {
    const data = await mds.get();
    return res.json(data);
  }
  async save(req, res) {
    const data = await mds.save();
    return res.json(data);
  }
}

module.exports = new coronaController();
