const mds = require("../../libs/mds");

class coronaController {
  async index(req, res) {
    const data = await mds.get();
    return res.status(200).json(data);
  }
  async save(req, res) {
    const data = await mds.save();
    return res.status(200).json(data);
  }
}

module.exports = new coronaController();
