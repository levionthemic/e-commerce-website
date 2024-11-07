const productRoutes = require("./product.route");
const userRoutes = require("./user.route");
const cartRoutes = require("./cart.route");

const cartMiddleware = require("../../middlewares/client/cart.middleware");

module.exports = (app) => {
  const version = "/api/v1";

  app.use(version + "/products", cartMiddleware.requireCart, productRoutes);
  app.use(version + "/user", userRoutes);
  app.use(version + "/cart", cartMiddleware.requireCart, cartRoutes);
}