class coronaController {
  constructor(model) {
    this.model = model;
  }
  async index(req, res) {
    const data = await this.model.find({});
    return res.json(data);
  }
  async save(req, res) {
    const model = new this.model(req.body);
    if (!model) {
      return res.json(model);
    }
    const response = await model.save();
    return res.json(response);
  }
}

module.exports = coronaController;
