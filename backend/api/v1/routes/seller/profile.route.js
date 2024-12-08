const express = require("express");

const controller = require("../../controllers/seller/profile.controller");

const routes = express.Router();

routes.get("/" , controller.index);
routes.patch("/edit", controller.edit);
// routes.get("/search", controller.search);

module.exports = routes; 