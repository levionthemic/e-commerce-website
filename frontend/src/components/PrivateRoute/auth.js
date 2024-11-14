export const isAuthenticated = () => {
  let isLogin = false;
  const arr = document.cookie.split("; ");
  for (const item of arr) {
    const [key] = item.split("=");
    if (key === "token") {
      isLogin = true;
    }
  }
  return isLogin;
}