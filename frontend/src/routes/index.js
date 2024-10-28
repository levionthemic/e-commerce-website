import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import SearchPage from "../pages/SearchPage/SearchPage";
import Signin from "../pages/Signin";

export const routes = [
  {
    path: "/",
    page: Home,
    isShowHeader: true,
  },
  {
    path: "/auth/login",
    page: Login,
    isShowHeader: false,
  },
  {
    path: "/auth/signin",
    page: Signin,
    isShowHeader: false,
  },
  {
    path: "/search",
    page: SearchPage,
    isShowHeader: true,
  },
];
