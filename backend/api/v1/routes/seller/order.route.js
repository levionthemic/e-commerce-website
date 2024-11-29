const express = require("express");

const controller = require("../../controllers/seller/order.controller");

const routes = express.Router();

routes.get("/" , controller.index);
// routes.get("/search", controller.search);

module.exports = routes; 