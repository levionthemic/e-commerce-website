const productRoutes = require("./product.route");
const userRoutes = require("./user.route");
const cartRoutes = require("./cart.route");
const checkoutRoutes = require("./checkout.route");
const categoryRoutes = require("./category.route");
const { requireAuth } = require("../../middlewares/client/auth.middleware");
// const { requireCart } = require("../../middlewares/client/cart.middleware");

module.exports = (app) => {
  const version = "/api/v1";

  app.use(version + "/products", requireAuth, productRoutes);
  app.use(version + "/user", userRoutes);
  app.use(version + "/cart", requireAuth, cartRoutes);
  app.use(version + "/checkout", requireAuth, checkoutRoutes);
  app.use(version + "/category", requireAuth, categoryRoutes);

}