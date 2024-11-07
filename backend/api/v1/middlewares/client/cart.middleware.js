const Cart = require("../../models/cart.model");

module.exports.requireCart = async (req, res, next) => {
  const cartId = req.cookies.cartId;

  if (!cartId)  {
    const cart = new Cart();
    await cart.save();

    const expiresTime = 1000 * 60 * 60 * 24 * 365;

    res.cookie("cartId", cart._id, {
      expires: new Date(Date.now() + expiresTime),
    });
  }

  next();
}