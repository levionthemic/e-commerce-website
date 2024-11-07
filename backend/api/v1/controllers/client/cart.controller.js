const Product = require("../../models/product.model");

// [GET] /cart
module.exports.index = async (req, res) => {
  const cartId = req.cookies.cartId;

  const cart = await Cart.findOne({ _id: cartId });

  if (cart.products.length) {
    Promise.all(cart.products.map((item) => Product.findOne({ _id: item.id })))
      .then((products) => {
        res.json({
          code: 200,
          message: "Success",
          data: products,
        });
      })
      .catch((error) =>
        res.json({
          code: 400,
          message: error,
        })
      );
  }
};
