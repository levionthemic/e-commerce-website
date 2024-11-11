import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import SearchPage from "../pages/SearchPage/SearchPage";
import UserInfo from "../pages/User/UserInfo";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import OTPConfirm from "../pages/Auth/OTPConfirm";
import ResetPassword from "../pages/Auth/ResetPassword";
import UserOrder from "../pages/User/UserOrder";

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
    path: "/auth/forgot-password",
    page: ForgotPassword,
    isShowHeader: false,
  },
  {
    path: "/auth/otp-confirm",
    page: OTPConfirm,
    isShowHeader: false,
  },
  {
    path: "/auth/reset-password",
    page: ResetPassword,
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
  {
    path: "/user/order",
    page: UserOrder,
    isShowHeader: true,
  },

];
