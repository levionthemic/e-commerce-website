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

// [GET] /api/v1/products/search
module.exports.search = async (req, res) => {
  const keyword = req.query.keyword;
  if (keyword) {
    const regex = new RegExp(keyword, "i");

    const products = await Product.find({
      url_key: regex,
    })
      .select(
        "id name price original_price rating-average discount_rate thumbnail_url primary_category_path quantity_sold"
      )
      .limit(100);

    res.json({
      code: 200,
      message: "Success",
      data: products
    });
    return;
  }

  res.json({
    code: 400,
    message: "Error",
  });
};
