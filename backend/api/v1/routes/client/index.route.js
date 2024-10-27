const productRoutes = require("./product.route");
const userRoutes = require("./user.route");

module.exports = (app) => {
  const version = "/api/v1";

  app.use(version + "/products", productRoutes);
  app.use(version + "/user", userRoutes);
}