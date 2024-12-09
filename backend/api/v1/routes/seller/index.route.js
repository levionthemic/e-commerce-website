const productRoutes = require("./product.route");
const orderRoutes = require("./order.route");
const profileRoutes = require("./profile.route");

const systemConfig = require("../../../../config/system");
const { requireAuth } = require("../../middlewares/seller/auth.middleware");

module.exports = (app) => {
  const version = "/api/v1";
  app.use(requireAuth);

  app.use(version + systemConfig.prefixSeller + "/product", productRoutes);
  app.use(version + systemConfig.prefixSeller + "/order", orderRoutes);
  app.use(version + systemConfig.prefixSeller + "/profile", profileRoutes);  
}