const express = require("express");

const controller = require("../../controllers/client/user.controller");

const routes = express.Router();

routes.post("/signin", controller.signin);
routes.post("/login", controller.login);

module.exports = routes;
