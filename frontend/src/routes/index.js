import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import SearchPage from "../pages/SearchPage/SearchPage";

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
    path: "/auth/signup",
    page: Signup,
    isShowHeader: false,
  },
  {
    path: "/search",
    page: SearchPage,
    isShowHeader: true,
  },
];
