var mongoose = require("mongoose");

var countrysSchema = new mongoose.Schema({
  country: String,
  confirmed: Number,
  deaths: Number,
  countryDetail: String
});

module.exports = mongoose.model("Countrys", countrysSchema);
