const mds = require("../../libs/mds");

class journalController {
  async index(req, res) {
    const { journal } = await mds.getJournal();
    if (!journal) return next();
    return res.status(200).json(journal);
  }
  async indexCountry(req, res, next) {
    const { journal } = await mds.getJournal();
    if (!journal[req.params.country]) return next();
    return res.status(200).json(history[req.params.country]);
  }
  async indexUid(req, res, next) {
    const { journal } = await mds.getJournal();
    if (!journal[req.params.country] || !journal[req.params.country].length)
      return next();
    const object = journal[req.params.country].find(
      el => String(el["uid"]) === req.params.uid
    );
    if (!object) return next();
    return res.status(200).json(object);
  }
}

module.exports = new journalController();
