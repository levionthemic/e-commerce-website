const Category = require("../../models/category.model");

// [GET] /api/v1/category
module.exports.index = async (req, res) => {
  const categories = await Category.find({}).select("text icon_url id").limit(10);

  res.status(200).json({
    message: "Success",
    data: categories
  })
}

// [GET] /api/v1/category/:categoryId
module.exports.getCategoryByID = async (req, res) => {
  const categoryId = parseInt(req.params.categoryId);
  let title = "";
  try {
    const categories = await Category.find({});
    const getListChildCategories = (categories) => {
      if (!categories) {
        return null;
      }
      for (const category of categories) {
        if (parseInt(category.id) == categoryId) {
          title = category.text || category.name;
          return Array(category.children);
        }
        const result = getListChildCategories(category.children);
        if (result) return result;
      }
    };
  
    const result = JSON.parse(
      JSON.stringify(getListChildCategories(categories))
    )[0];
  
    let data = null;
    if (result) {
      data = result.map((item) => ({
        key: `${item.id}`,
        label: item.name,
        thumbnail: item.thumbnail_url,
        children: item.children
          ? item.children.map((i) => ({ key: `${i.id}`, label: i.name }))
          : null,
      }));
    };
  
    res.status(200).json({
      message: "Success",
      data: {
        title: title,
        data: data,
      },
    })
  } catch (error) {
    res.status(400).json({
      message: error
    })
  }
  
}