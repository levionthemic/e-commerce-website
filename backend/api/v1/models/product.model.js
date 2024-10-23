const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    price: Number,
    original_price: Number,
    discount_rate: Number,
    // rating_average: Number,
    thumbnail_url: String,
    primary_category_path: String,
    quantity_sold: Object,
  },
  {
    timestamps: true,
  },
  { strict: true }
);

const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;
