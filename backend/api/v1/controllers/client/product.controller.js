const Product = require("../../models/product.model");

// [GET] /api/v1/products
module.exports.index = async (req, res) => {
  const qty_product = req.query.limit;

  const categoryId = req.query.category;

  const regex = new RegExp(`/${categoryId}`);

  const data = await Product.find({
    primary_category_path: regex,
  })
    .limit(qty_product)
    .select(
      "id name price original_price rating-average discount_rate thumbnail_url primary_category_path quantity_sold"
    );

  res.json({
    code: 200,
    message: "Success",
    data: data,
  });
};
