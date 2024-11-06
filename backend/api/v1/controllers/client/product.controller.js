const ProductDetail = require("../../models/product-detail.model");
const Product = require("../../models/product.model");
const unidecode = require("unidecode");

// [GET] /api/v1/products
module.exports.index = async (req, res) => {
  const limitQuantity = parseInt(req.query.limitQuantity);
  const categoryId = req.query.category;

  let findObj = {};

  if (categoryId) {
    const regex = new RegExp(`/${categoryId}`);
    find.primary_category_path = regex;
  }

  let limit = limitQuantity || 100;

  const data = await Product.find(findObj).limit(limit);

  if (data) {
    res.json({
      code: 200,
      message: "Success",
      data: data,
      length: data.length,
      limit: limit,
    });
  } else {
    res.json({
      code: 400,
      message: "Error",
    });
  }
};

// [GET] /api/v1/products/search
module.exports.search = async (req, res) => {
  const limitQuantity = parseInt(req.query.limitQuantity);
  const keyword = req.query.keyword;

  if (keyword) {
    const regex = new RegExp(keyword, "i");

    const slug = unidecode(keyword).trim().replace(/\s+/g, "-");
    const regexSlug = new RegExp(slug, "i");

    let limit = limitQuantity || 100;

    const productsDetail = await ProductDetail.find({
      $or: [{ name: regex }, { slug: regexSlug }],
    }).limit(limit);

    if (productsDetail) {
      Promise.all(
        productsDetail.map((product) => Product.findOne({ id: product.id }))
      ).then((products) => {
        const result = products;
        res.json({
          code: 200,
          message: "Success",
          data: result,
          length: result.length,
          limit: limit,
        });
      });
    } else {
      res.json({
        code: 400,
        message: "Error",
      });
    }
    return;
  }

  res.json({
    code: 400,
    message: "Error",
  });
};

// [GET] /api/v1/products/detail/:productId
module.exports.detail = async (req, res) => {
  const productId = req.params.productId;

  const product = await ProductDetail.findOne({
    id: productId,
  });

  if (product) {
    res.json({
      code: 200,
      message: "Success",
      data: product,
    });
  } else {
    res.json({
      code: 400,
      message: "Error not found",
    });
  }
};
