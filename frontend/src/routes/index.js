import Home from "../pages/Buyer/Home";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import SearchPage from "../pages/Buyer/SearchPage";
import UserInfo from "../pages/Buyer/User/UserInfo";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import OTPConfirm from "../pages/Auth/OTPConfirm";
import ResetPassword from "../pages/Auth/ResetPassword";
import CartPage from "../pages/Buyer/CartPage";
import DetailProduct from "../pages/Buyer/DetailProduct";
import UserOrder from "../pages/Buyer/User/UserOrder";
import Checkout from "../pages/Buyer/Checkout";
import Admin from "../pages/Admin/Admin";

import ShopOverview from "../pages/Shoper/ShopOverview";
import ShopProfle from "../pages/Shoper/ShopProfile";
import ManageOrders from "../pages/Shoper/ManageOrders";
import ManageProducts from "../pages/Shoper/ManageProducts";
import AddProduct from "../pages/Shoper/ManageProducts/AddProduct";
import EditProduct from "../pages/Shoper/ManageProducts/EditProduct";



export const routes = [
  // Các route dành cho khách hàng
  {
    path: "/",
    page: Home,
    isShowHeader: true,
    isAuthorized: true,
  },
  {
    path: "/auth/login",
    page: Login,
    isShowHeader: false,
    isAuthorized: false,
  },
  {
    path: "/auth/signup",
    page: Signup,
    isShowHeader: false,
    isAuthorized: false,
  },
  {
    path: "/auth/forgot-password",
    page: ForgotPassword,
    isShowHeader: false,
    isAuthorized: false,
  },
  {
    path: "/auth/otp-confirm",
    page: OTPConfirm,
    isShowHeader: false,
    isAuthorized: false,
  },
  {
    path: "/auth/reset-password",
    page: ResetPassword,
    isShowHeader: false,
    isAuthorized: false,
  },
  {
    path: "/cart",
    page: CartPage,
    isShowHeader: true,
    isAuthorized: true,
  },
  {
    path: "/search",
    page: SearchPage,
    isShowHeader: true,
    isAuthorized: true,
  },
  {
    path: "/user/info",
    page: UserInfo,
    isShowHeader: true,
    isAuthorized: true,
  },
  {
    path: "/detailproduct/:productId",
    page: DetailProduct,
    isShowHeader: true,
    isAuthorized: true,
  },
  {
    path: "/user/order",
    page: UserOrder,
    isShowHeader: true,
    isAuthorized: true,
  },
  {
    path: "/checkout",
    page: Checkout,
    isShowHeader: true,
    isAuthorized: true,
  },
  {
    path: "/admin",
    page: Admin,
    isShowHeader: false,
    isAuthorized: true,
  },

  // Các route dành cho người bán 
  {
    path: "/shop/overview",
    page: ShopOverview,
    isShowHeader: false,
    isAuthorized: true,
    role: "seller"
  },
  {
    path: "/shop/products/add",
    page: AddProduct,
    isShowHeader: false,
    isAuthorized: true,
    role: "seller"
  },
  {
    path: "/shop/products",
    page: ManageProducts,
    isShowHeader: false,
    isAuthorized: true,
    role: "seller"
  },
  {
    path: "/shop/orders",
    page: ManageOrders,
    isShowHeader: false,
    isAuthorized: true,
    role: "seller"
  },
  {
    path: "/shop/profile",
    page: ShopProfle,
    isShowHeader: false,
    isAuthorized: true,
    role: "seller"
  },
  {
    path: "/shop/products/edit",
    page: EditProduct,
    isShowHeader: false,
    isAuthorized: true,
    role: "seller"
  },
  
];
