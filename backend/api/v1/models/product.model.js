const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
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
    primary_category_path: String,
    thumbnail_url: String,
    description: String,
    stock_item: Object,
    quantity_sold: Object,
    categories: Object,
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;
