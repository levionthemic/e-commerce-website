import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import SearchPage from "../pages/SearchPage/SearchPage";
import Signin from "../pages/Signin";
import UserInfo from "../pages/User/UserInfo";

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
  {
    path: "/user/info",
    page: UserInfo,
    isShowHeader: true,
  },
];
