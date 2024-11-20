const Category = require("../../models/category.model");

// [GET] /api/v1/category
module.exports.index = async (req, res) => {
  const categories = await Category.find({}).select("text icon_url id").limit(10);

  res.status(200).json({
    message: "Success",
    data: categories
  })
}