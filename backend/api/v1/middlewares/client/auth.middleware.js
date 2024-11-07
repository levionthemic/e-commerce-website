const User = require("../../models/user.model");

module.exports.requireAuth = async (req, res, next) => {

  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];

    const user = await User.findOne({
      token: token,
    })
      .select("-password -token");

    if (!user) {
      res.json({
        code: 400,
        message: "Invalid Token"
      })
      return;
    }
    
    res.json({
      code: 200,
      message: "Access Success"
    })

    next();

  } else {
    res.json({
      code: 400,
      message: "Access Denied"
    })
  }
}