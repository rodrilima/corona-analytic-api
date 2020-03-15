const app = require("./app");
var mongoose = require("mongoose");

app.listen(3000, console.log("Running on port 3000"));

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Database connected");
});
