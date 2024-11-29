const Product = require("../../models/product.model");
const unidecode = require("unidecode");

// [GET]/api/v1/seller/product
module.exports.index = async (req, res) => {
  try {
    const products = await Product.find({})
      .limit(100)
      .select(
        "-_id thumbnail_url name price stock_item quantity_sold categories"
      );
    res.status(200).json({
      message: "Success",
      products: products,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error",
    });
  }
};

// [GET] /api/v1/seller/product/search
module.exports.search = async (req, res) => {
  const keyword = req.query.keyword;
  if (keyword) {
    const regex = new RegExp(keyword, "i");

    const slug = unidecode(keyword).trim().replace(/\s+/g, "-");
    const regexSlug = new RegExp(slug, "i");

    const products = await Product.find({
      $or: [{ name: regex }, { slug: regexSlug }],
    })
      .limit(100)
      .select(
        "-_id thumbnail_url name price stock_item quantity_sold categories"
      );

    if (products) {
      res.json({
        code: 200,
        message: "Success",
        data: products,
        length: products.length,
        limit: 100,
      });
    } else {
      res.json({
        code: 400,
        message: "Error",
      });
    }
  }
};
