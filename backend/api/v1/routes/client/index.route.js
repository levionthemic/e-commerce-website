const productRoutes = require("./product.route");

module.exports = (app) => {
  const version = "/api/v1";

  app.use(version + "/products", productRoutes);
}