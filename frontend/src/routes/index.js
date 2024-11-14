import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import SearchPage from "../pages/SearchPage/SearchPage";
import UserInfo from "../pages/User/UserInfo";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import OTPConfirm from "../pages/Auth/OTPConfirm";
import ResetPassword from "../pages/Auth/ResetPassword";
import CartPage from "../pages/CartPage";
import DetailProduct from "../pages/DetailProduct";

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
    path: "/cart",
    page: CartPage,
    isShowHeader: true,
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
    path: "/detailproduct/:productId",
    page: DetailProduct,
    isShowHeader: true,
  },
];
