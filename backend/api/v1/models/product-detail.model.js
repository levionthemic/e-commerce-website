const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const productDetailSchema = new mongoose.Schema({
  id: Number,
  name: String,
  slug: {
    type: String,
    slug: "name",
    unique: true,
  },
  price: Number,
  original_price: Number,
  discount_rate: Number,
  rating_average: Number,
  thumbnail_url: String,
  description: String,
  stock_item: Object,
  quantity_sold: Object,
  categories: Object,
});

const ProductDetail = mongoose.model(
  "ProductDetail",
  productDetailSchema,
  "products-detail"
);

module.exports = ProductDetail;
