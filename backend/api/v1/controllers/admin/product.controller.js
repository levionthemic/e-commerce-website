const Product = require("../../models/product.model");

// [GET] /api/v1/admin/product
module.exports.index = async (req, res) => {
  let page = parseInt(req.query.page);
  
  if (!page) {
    page = 0;
  }

  try {
    const productsPerPage = 40;

    const totalProducts = await Product.countDocuments({});
    const totalPages = Math.floor(totalProducts / 40);
    if (page > totalPages) {
      res.status(400).json({
        message: "Error: Invalid page",
      });
      return;
    }
    const products = await Product.find({})
      .skip(page * productsPerPage)
      .limit(productsPerPage);

    res.status(200).json({
      message: "Success",
      products: products,
      totalPages: totalPages,
      totalProducts: totalProducts,
      productsPerPage: productsPerPage,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error",
    });
  }
};

// [POST] /api/v1/admin/product/add
module.exports.add = async (req, res) => {
  const { ...productInfo } = req.body;

  const newProduct = new Product(productInfo);
  await newProduct.save();

  res.status(200).json({
    message: "Add Success",
  });
};

// [PATCH] /api/v1/admin/product/edit
module.exports.edit = async (req, res) => {
  const { ...productInfo } = req.body;
  await Product.updateOne(
    {
      id: parseInt(productInfo.id),
    },
    productInfo
  );
  res.status(200).json({
    message: "Edit Success",
  });

  
};

// [DELETE] /api/v1/admin/product/delete
module.exports.delete = (req, res) => {
  res.json({
    message: "Tạm thời không thực hiện chức năng này",
  });
};
