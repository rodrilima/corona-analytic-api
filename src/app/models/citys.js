var mongoose = require("mongoose");

var citysSchema = new mongoose.Schema({
  city: String,
  state: String,
  country: String,
  confirmed: Number,
  deaths: Number
});

module.exports = mongoose.model("Citys", citysSchema);
