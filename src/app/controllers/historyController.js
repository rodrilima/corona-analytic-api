const mds = require("../../libs/mds");

class historyController {
  async index(req, res) {
    const { history } = await mds.getHistory();
    if (!history) return next();
    return res.status(200).json(history);
  }
  async indexCountry(req, res, next) {
    const { history } = await mds.getHistory();
    if (!history[req.params.country]) return next();
    return res.status(200).json(history[req.params.country]);
  }
  async indexUid(req, res, next) {
    const { history } = await mds.getHistory();
    if (!history[req.params.country] || !history[req.params.country].length)
      return next();
    const object = history[req.params.country].find(
      el => String(el["uid"]) === req.params.uid
    );
    if (!object) return next();
    return res.status(200).json(object);
  }
}

module.exports = new historyController();
