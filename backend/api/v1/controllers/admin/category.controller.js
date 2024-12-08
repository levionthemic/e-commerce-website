const Category = require("../../models/category.model");
const User = require("../../models/user.model");

// [GET] /api/v1/admin/category
module.exports.index = async (req, res) => {
  const categories = await Category.find({});
  Promise.all(
    categories.map((category) => User.findOne({ _id: category.seller_id }))
  ).then((sellers) => {
    res.status(200).json({
      message: "Success",
      data: categories,
      sellers: sellers,
    });
  });
};

// [POST] /api/v1/admin/category/add
module.exports.add = async (req, res) => {
  const { ...categoryInfo } = req.body;

  const newCategory = new Category(categoryInfo);
  await newCategory.save();

  res.status(200).json({
    message: "Success",
  });
};

// [PATCH] /api/v1/admin/category/edit
module.exports.edit = async (req, res) => {
  const { ...categoryInfo } = req.body;
  await Category.updateOne(
    {
      id: categoryInfo.id,
    },
    categoryInfo
  );

  res.status(200).json({
    message: "Success",
  });
};

// [DELETE] /api/v1/admin/category/delete
module.exports.delete = (req, res) => {
  res.send("OK");
};
