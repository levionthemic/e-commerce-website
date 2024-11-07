const User = require("../../models/user.model");
const CryptoJS = require("crypto-js");

// [POST] /api/v1/user/signup
module.exports.signup = async (req, res) => {
  const { email, username, password } = req.body;
  
  const isUserExist = await User.findOne({
    $or: [{ email: email }, { username: username }],
  });
  if (isUserExist) {
    res.json({
      code: 400,
      message: "Error: Email or Username Existed",
    });
    return;
  }

  const user = new User({
    username: username,
    password: CryptoJS.SHA256(password).toString(),
    email: email,
  });
  await user.save();

  res.json({
    code: 200,
    message: "Success",
  });
};

// [POST] /api/v1/user/login
module.exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    username: username,
  });

  if (!user) {
    res.json({
      code: 400,
      message: "Not Exist Username",
    });
    return;
  }

  if (CryptoJS.SHA256(password).toString() !== user.password) {
    res.json({
      code: 400,
      message: "Wrong Password",
    });
    return;
  }

  res.json({
    code: 200,
    message: "Login Success",
    token: user.token,
  });
};
