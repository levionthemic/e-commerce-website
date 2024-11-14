const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  id: Number,
  parent_id: Number,
  text: String,
  name: String,
  icon_url: String,
  thumbnail_url: String,
  children: Array,
  is_leaf: Boolean,
});

const Category = new mongoose.model("Category", categorySchema, "categories");

module.exports = Category;
