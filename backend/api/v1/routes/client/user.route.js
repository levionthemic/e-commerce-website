const express = require("express");

const controller = require("../../controllers/client/user.controller");

const routes = express.Router();

routes.post("/signin", controller.signin);

module.exports = routes;
