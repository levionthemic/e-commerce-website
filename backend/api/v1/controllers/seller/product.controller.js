const Product = require("../../models/product.model");
const User = require("../../models/user.model");
const Category = require("../../models/category.model");
const unidecode = require("unidecode");

// [GET]/api/v1/seller/product
module.exports.index = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const seller = await User.findOne({ token: token });
    const category = await Category.findOne({ seller_id: seller.id });
    const regex = new RegExp(`^\\d+/\\d+/${category.id}/`);

    const products = await Product.find({
      primary_category_path: { $regex: regex },
    })
      .limit(100)
      .select(
        "_id id thumbnail_url name price stock_item quantity_sold categories"
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

//[POST]/api/v1/seller/product/add
module.exports.add = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(200).json({
      message: "Tạo sản phẩm mới thành công",
    });
  } catch (error) {
    res.status(400).json({
      message: "Lỗi không tạo được sản phẩm mới",
    });
  }
};

//[PATCH]/api/v1/seller/product/edit
module.exports.edit = async (req, res) => {
  try {
    const productId = req.body.id;
    const nameProduct = req.body.name;
    const priceProduct = req.body.price;
    const description = req.body.description;
    const quantity = req.body.stockQty;
    const discount = req.body.discountRate;
    const thumbnail = req.body.thumbnailUrl;

    await Product.updateOne(
      {
        id: productId,
      },
      {
        $set: {
          "stock_item.$.qty": quantity,
          name: nameProduct,
          discount_rate: discount,
          price: priceProduct,
          description: description,
          thumbnail_url: thumbnail,
        },
      }
    );
    res.status(200).json({
      message: "Cập nhật sản phẩm thành công",
    });
  } catch (error) {
    res.status(400).json({
      message: "Lỗi không cập nhật được sản phẩm",
    });
  }
};
