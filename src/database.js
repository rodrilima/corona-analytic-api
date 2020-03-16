const mongoose = require("mongoose");

class Database {
  constructor() {
    mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    var db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function() {
      console.log("Database connected");
    });
  }
}

module.exports = new Database();
