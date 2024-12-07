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
    stock_item: {
      qty : Number,
    },
    quantity_sold: {
      text: {
        type : String,
        default: "Đã bán 0"
      },
      value: {
        type: Number,
        default: 0
      }
    },
    categories: Object,
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;
