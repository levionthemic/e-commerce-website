const express = require("express");

const controller = require("../../controllers/seller/product.controller");

const routes = express.Router();

routes.get("/" , controller.index);
routes.get("/search", controller.search);
routes.patch("/edit", controller.edit);
routes.post("/add", controller.add);
routes.patch("/delete", controller.delete);

module.exports = routes;