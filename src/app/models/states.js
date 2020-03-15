var mongoose = require("mongoose");

var statesSchema = new mongoose.Schema({
  state: String,
  country: String,
  confirmed: Number,
  deaths: Number,
  stateDetail: String
});

module.exports = mongoose.model("States", statesSchema);
