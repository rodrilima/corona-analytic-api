const states = require("../config/states");

class mdsHelper {
  sourceParser(body) {
    const data = JSON.parse(body.substring(13));
    const brazil = data["brazil"][data["brazil"].length - 1];
    const world = data["world"][data["world"].length - 1];
    this.brazilValuesParser.call(brazil);
    return {
      brazil,
      world,
      updated_at: Date.now()
    };
  }
  brazilValuesParser() {
    this["values"] = this["values"].map(value => {
      return {
        uid: value["uid"] || "",
        state: states[value["uid"]] || "",
        cases: value["cases"] || 0,
        deaths: value["deaths"] || 0,
        suspects: value["suspects"] || 0,
        refuses: value["refuses"] || 0,
        broadcast: value["broadcast"] || false,
        comments: value["comments"] || ""
      };
    });
  }
}

module.exports = new mdsHelper();
