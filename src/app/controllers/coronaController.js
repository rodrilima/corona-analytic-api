const mds = require("../../libs/mds");

class coronaController {
  async index(req, res) {
    const data = await mds.get();
    return res.status(200).json(data);
  }
  async indexCountry(req, res, next) {
    const data = await mds.get();
    if (!data[req.params.country]) return next();
    return res.status(200).json(data[req.params.country]);
  }
  async indexUid(req, res, next) {
    const data = await mds.get();
    if (!data[req.params.country] || !data[req.params.country].values.length)
      return next();
    const object = data[req.params.country].values.find(
      el => String(el["uid"]) === req.params.uid
    );
    if (!object) return next();
    return res.status(200).json(object);
  }
  async save(req, res) {
    const data = await mds.save();
    return res.status(200).json(data);
  }
}

module.exports = new coronaController();
