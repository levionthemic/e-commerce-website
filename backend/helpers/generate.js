

module.exports.generateTokenString = (length) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  let token = "";
  for (let i = 0; i < length; i++) {
    const pos = parseInt(Math.floor(Math.random() * 61));
    token += letters.charAt(pos);
  }
  return token;
}

module.exports.generateOTP = (length) => {
  const letters = "1234567890";
  let otp = "";
  for (let i = 0; i < length; i++) {
    const pos = parseInt(Math.floor(Math.random() * 9));
    otp += letters.charAt(pos);
  }
  return otp;
}