require("dotenv/config");
const express = require("express");
require("express-async-errors");
const routes = require("./routes");
require("./database");
const Youch = require("youch");
const cors = require("cors");

class App {
    constructor() {
        this.server = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(cors());
        this.server.use(
            express.urlencoded({
                extended: true
            })
        );
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
        this.server.use(async(err, req, res, next) => {
            const errors = await new Youch(err, req).toJSON();
            console.log(errors);
            return res.status(500).json({ message: errors });
        });
    }
}

module.exports = new App().server;