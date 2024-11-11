const express = require("express");

const controller = require("../../controllers/client/user.controller");
const { requireAuth } = require("../../middlewares/client/auth.middleware");

const routes = express.Router();

routes.post("/signup", controller.signup);
routes.post("/login", controller.login);
routes.post("/otp-request", controller.otpRequest);
routes.post("/otp-check", controller.otpCheck);
routes.post("/reset-password", requireAuth, controller.resetPassword);

routes.get("/nations", controller.getNations);
routes.get("/:token", controller.getUser);

routes.patch("/update", controller.update);

routes.get("/order", controller.order);
module.exports = routes;
