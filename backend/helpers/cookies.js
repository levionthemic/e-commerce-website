module.exports.cookies = (req) => {
  const cookies = req.headers.cookie.split("; ");
  let result = {};
  cookies.forEach((cookie) => {
    const [key, value] = cookie.split("=");
    result[key] = value;
  });
  return result;
};
