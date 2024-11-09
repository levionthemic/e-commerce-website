import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signin from "../pages/Signin/Signin";
import CartPage from "../pages/CartPage/CartPage"; // Thêm trang giỏ hàng
import SearchPage from "../pages/SearchPage/SearchPage";
import DetailProduct from "../pages/DetailProduct/DetailProduct"

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
    path: "/detailproduct/:productId",
    page: DetailProduct,
    isShowHeader: true,
  },
];
