const Product = require("../../models/product.model");
const Cart = require("../../models/cart.model");

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

// [POST] /cart/add
module.exports.add = async (req, res) => {
  const cartId = req.cookies.cartId;
  const productId = req.body.productId;
  const quantity = parseInt(req.body.quantity);

  const cart = await Cart.findOne({
    _id: cartId,
  });

  const existProductInCart = cart.products.find(
    (item) => item.product_id == productId
  );

  if (existProductInCart) {
    const newQuantity = quantity + existProductInCart.quantity;
    await Cart.updateOne(
      {
        _id: cartId,
        "products.product_id": productId,
      },
      {
        $set: {
          "products.$.quantity": newQuantity,
        },
      }
    );
  } else {
    const objectCart = {
      product_id: productId,
      quantity: quantity,
    };
    await Cart.updateOne(
      { _id: cartId },
      {
        $push: { products: objectCart },
      }
    );
  }
};

// [DELETE] /cart/delete
module.exports.delete = async (req, res) => {
  const cartId = req.cookies.cartId;
  const productId = req.body.productId;

  await Cart.updateOne(
    {
      _id: cartId,
    },
    {
      $pull: { products: { product_id: productId } },
    }
  );
};

// [PATCH] /cart/update/:productId/:quantity
module.exports.update = async (req, res) => {
  const cartId = req.cookies.cartId;
  const productId = req.params.productId;
  const quantity = req.params.quantity;

  await Cart.updateOne(
    {
      _id: cartId,
      "products.product_id": productId,
    },
    {
      $set: {
        "products.$.quantity": quantity,
      },
    }
  );
};
