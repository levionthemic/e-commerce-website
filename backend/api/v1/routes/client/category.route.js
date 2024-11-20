const express = require("express");

const controller = require("../../controllers/client/category.controller");

const routes = express.Router();

routes.get("/", controller.index);


module.exports = routes;