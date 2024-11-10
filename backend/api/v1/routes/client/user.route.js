const express = require("express");

const controller = require("../../controllers/client/user.controller");

const routes = express.Router();

routes.post("/signup", controller.signup);
routes.post("/login", controller.login);

routes.get("/nations", controller.getNations);
routes.get("/:token", controller.getUser);

routes.patch("/update", controller.update);

module.exports = routes;
