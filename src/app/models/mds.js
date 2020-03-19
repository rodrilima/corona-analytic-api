var mongoose = require("mongoose");

var mdsSchema = new mongoose.Schema({
    world: mongoose.Schema.Types.Mixed,
    brazil: mongoose.Schema.Types.Mixed,
    history: mongoose.Schema.Types.Mixed,
    updated_at: Date
});

module.exports = mongoose.model("MDS", mdsSchema);