const productRoutes = require("./product.route");
const userRoutes = require("./user.route");
const cartRoutes = require("./cart.route");

module.exports = (app) => {
  const version = "/api/v1";

  app.use(version + "/products", productRoutes);
  app.use(version + "/user", userRoutes);
  app.use(version + "/cart", cartRoutes);
}