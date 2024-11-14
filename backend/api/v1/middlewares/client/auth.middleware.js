// const { cookies } = require("../../../../helpers/cookies");
// const User = require("../../models/user.model");

module.exports.requireAuth = async (req, res, next) => {
  // const token = cookies(req).token;
  const token = req.body.token;

  const user = await User.findOne({
    token: token,
  }).select("-password -token");

  if (!user) {
    res.json({
      code: 400,
      message: "Invalid Token",
    });
    return;
  }

  next();
};
