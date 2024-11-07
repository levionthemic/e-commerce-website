const productRoutes = require("./product.route");
const userRoutes = require("./user.route");
const cartRoutes = require("./cart.route");
const { requireAuth } = require("../../middlewares/client/auth.middleware");
const { requireCart } = require("../../middlewares/client/cart.middleware");

module.exports = (app) => {
  const version = "/api/v1";

  app.use(requireAuth);
  app.use(requireCart);

  app.use(version + "/products", productRoutes);
  app.use(version + "/user", userRoutes);
  app.use(version + "/cart", cartRoutes);

}