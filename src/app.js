require("dotenv/config");
const express = require("express");
const routes = require("./routes");
var mongoose = require("mongoose");

class App {
  constructor() {
    this.server = express();

    this.database();
    this.middlewares();
    this.routes();
  }

  database() {
    mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  middlewares() {
    this.server.use(
      express.urlencoded({
        extended: true
      })
    );
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
