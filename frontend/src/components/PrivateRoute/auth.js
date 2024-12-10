export const isAuthenticated = () => {
  let isLogin = false;
  if (localStorage.getItem("token") && localStorage.getItem("role")) {
    isLogin = true;
    if (localStorage.getItem("role") === "buyer" && !localStorage.getItem("cartId")) {
      isLogin = false;
    }
  }
  if (!isLogin) {
    localStorage.clear();
  }
  return isLogin;
}