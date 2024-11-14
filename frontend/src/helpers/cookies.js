export const cookies = () => {
  const cookies = document.cookie.split("; ");
  let result = {};
  cookies.forEach((cookie) => {
    const [key, value] = cookie.split("=");
    result[key] = value;
  });
  return result;
}