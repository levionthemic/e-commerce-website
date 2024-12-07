export const isAuthenticated = () => {
  let isLogin = false;
  if (localStorage.getItem("token")) {
    isLogin = true;
  }
  return isLogin;
}