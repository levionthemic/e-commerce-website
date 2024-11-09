const productRoutes = require("./product.route");
const categoryRoutes = require("./category.route");

const systemConfig = require("../../../../config/system");

module.exports = (app) => {
  const version = "/api/v1";

  app.use(version + systemConfig.prefixAdmin + "/products", productRoutes);
  app.use(version + systemConfig.prefixAdmin + "/category", categoryRoutes);
}