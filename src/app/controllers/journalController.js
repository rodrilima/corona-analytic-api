const mds = require("../../libs/mds");

class journalController {
  async index(req, res) {
    const { journal } = await mds.getJournal();
    if (!journal) return next();
    return res.status(200).json(journal);
  }
  async indexState(req, res, next) {
    const { journal } = await mds.getJournal();
    if (!journal) return next();
    const object = journal.values.find(
      el => String(el["state"]) === req.params.state
    );
    return res.status(200).json(object);
  }
}

module.exports = new journalController();
