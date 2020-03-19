const request = require("request");
const mdsModel = require("../app/models/mds");
const mdsHelper = require("../helpers/mds");

class mds {
  async get() {
    const response = await mdsModel.findOne({
      _id: "5e6edad816ed1d6c5486f842"
    });
    return response;
  }
  async getHistory() {
    const response = await mdsModel
      .findOne({
        _id: "5e6edad816ed1d6c5486f842"
      })
      .select({ history: 1 });
    return response;
  }
  save() {
    request(
      {
        method: "GET",
        url: process.env.MDS_URL
      },
      async function(error, response, body) {
        if (error) throw new Error(error);
        await mdsModel.updateOne(
          { _id: "5e6edad816ed1d6c5486f842" },
          mdsHelper.sourceParser(body)
        );
        console.log(`Database updated at ${Date.now()}`);
      }
    );
  }
}

module.exports = new mds();
