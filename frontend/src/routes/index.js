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
import Shoper from "../pages/Shoper/Shoper";
// import ShopOverview from "../pages/Shoper/ShopOverview";
// import AddProduct from "../pages/Shoper/AddProduct";
// import ManageProducts from "../pages/Shoper/ManageProducts";
// import EditProduct from "../pages/Shoper/EditProduct";
// import ManageOrders from "../pages/Shoper/ManageOrders";
// import ChatWithCustomers from "../pages/Shoper/ChatWithCustomers";
// import ShopProfile from "../pages/Shoper/ShopProfile";
// // Import route mới
// import ShopStatistics from "../pages/Shoper/ShopStatistics";

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

  // Các route dành cho người bán (không hiển thị header khách hàng)
  {
    path: "/shoper",
    page: Shoper,
    isShowHeader: false,
    isAuthorized: true,
  },
  // {
  //   path: "/shoper/overview",
  //   page: ShopOverview,
  //   isShowHeader: false,
  // },
  // {
  //   path: "/shoper/add-product",
  //   page: AddProduct,
  //   isShowHeader: false,
  // },
  // {
  //   path: "/shoper/manage-products",
  //   page: ManageProducts,
  //   isShowHeader: false,
  // },
  // {
  //   path: "/shoper/edit-product/:productId",
  //   page: EditProduct,
  //   isShowHeader: false,
  // },
  // {
  //   path: "/shoper/manage-orders",
  //   page: ManageOrders,
  //   isShowHeader: false,
  // },
  // {
  //   path: "/shoper/chat",
  //   page: ChatWithCustomers,
  //   isShowHeader: false,
  // },
  // {
  //   path: "/shoper/profile",
  //   page: ShopProfile,
  //   isShowHeader: false,
  // },
  // {
  //   path: "/shoper/product/:productId",
  //   page: DetailProduct,
  //   isShowHeader: false,
  // },
  // {
  //   path: "/shoper/statistics",
  //   page: ShopStatistics,
  //   isShowHeader: false,
  // },
];
