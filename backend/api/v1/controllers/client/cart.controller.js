const Product = require("../../models/product.model");
const Cart = require("../../models/cart.model");
const { cookies } = require("../../../../helpers/cookies");

// [GET] /cart
module.exports.index = async (req, res) => {
  // const cartId = cookies(req).cartId;
  const cartId = req.body.cartId;

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
  } else {
    res.json({
      code: 400,
      message: "Error: Cart Empty",
    });
  }
};

// [POST] /cart/add
module.exports.add = async (req, res) => {
  // const cartId = cookies(req).cartId;
  const cartId = req.body.cartId;
  const productId = req.body.productId;
  const quantity = parseInt(req.body.quantity);

  const cart = await Cart.findOne({
    _id: cartId,
  });

  const existProductInCart = cart.products.find(
    (item) => item.productId === productId
  );

  if (existProductInCart) {
    const newQuantity = quantity + existProductInCart.quantity;
    await Cart.updateOne(
      {
        _id: cartId,
        "products.productId": productId,
      },
      {
        $set: {
          "products.$.quantity": newQuantity,
        },
      }
    );
  } else {
    const objectCart = {
      productId: productId,
      quantity: quantity,
    };
    await Cart.updateOne(
      { _id: cartId },
      {
        $push: { products: objectCart },
      }
    );
  }
  res.json({
    code: 200,
    message: "Success",
  });
};

// [DELETE] /cart/delete
module.exports.delete = async (req, res) => {
  // const cartId = cookies(req).cartId;
  const cartId = req.body.cartId;
  const productId = req.body.productId;

  const cart = await Cart.findOne({
    _id: cartId,
  });
  if (!cart.products.length) {
    res.json({
      code: 400,
      message: "Error: Products Array Empty",
    });
    return;
  }

  await Cart.updateOne(
    {
      _id: cartId,
    },
    {
      $pull: { products: { productId: productId } },
    }
  );
  res.json({
    code: 200,
    message: "Success",
  });
};

// [PATCH] /cart/update
module.exports.update = async (req, res) => {
  // const cartId = cookies(req).cartId;
  const cartId = req.body.cartId;
  const productId = req.body.productId;
  const quantity = req.body.quantity;

  await Cart.updateOne(
    {
      _id: cartId,
      "products.productId": productId,
    },
    {
      $set: {
        "products.$.quantity": quantity,
      },
    }
  );

  res.json({
    code: 200,
    message: "Success",
  });
};
