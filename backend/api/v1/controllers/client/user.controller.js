const User = require("../../models/user.model");
const CryptoJS = require("crypto-js");

// [POST] /api/v1/user/signup
module.exports.signup = async (req, res) => {
  const { email, username, password, role } = req.body;
  
  const isUserExist = await User.findOne({
    $or: [{ email: email }, { username: username }],
  });
  if (isUserExist) {
    res.status(400).json({
      message: "Error: Email or Username Existed",
    });
    return;
  }

  const user = new User({
    username: username,
    password: CryptoJS.SHA256(password).toString(),
    email: email,
    role: role
  });
  await user.save();

  res.json({
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
    res.status(400).json({
      message: "Not Exist Username",
    });
    return;
  }

  if (CryptoJS.SHA256(password).toString() !== user.password) {
    res.status(400).json({
      message: "Wrong Password",
    });
    return;
  }

  res.status(200).json({
    message: "Login Success",
    token: user.token,
  });
};
