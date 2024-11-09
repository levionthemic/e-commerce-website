const express = require("express");

const controller = require("../../controllers/client/user.controller");
const { requireAuth } = require("../../middlewares/client/auth.middleware");

const routes = express.Router();

routes.post("/signup", controller.signup);
routes.post("/login", controller.login);
routes.post("/otp-request", controller.otpRequest);
routes.post("/otp-check", controller.otpCheck);
routes.post("/reset-password", requireAuth, controller.resetPassword);

module.exports = routes;
