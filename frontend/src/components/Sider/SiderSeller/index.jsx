import { memo } from "react";
import "./SiderSeller.css";
import {
  FaHome,
  FaPlus,
  FaBox,
  FaShoppingCart,
  FaComments,
  FaUser,
} from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function SiderSeller() {
  const navigate = useNavigate();

  const handleMenuClick = (tab) => {
    switch (tab) {
      case "overview":
        navigate("/shop/overview");
        break;
      case "add-product":
        navigate("/shop/products/add");
        break;
      case "manage-products":
        navigate("/shop/products");
        break;
      case "manage-orders":
        navigate("/shop/orders");
        break;
      case "profile":
        navigate("/shop/profile");
        break;
      case "logout":
        localStorage.removeItem("token");
        window.location.reload();
        break;
      default:
        break;
    }
  };
  return (
    <div className="sidebar">
      <h2 className="text-center mb-4">seller</h2>
      <ul className="nav flex-column">
        {[
          { id: "overview", label: "Tổng quan", icon: <FaHome /> },
          { id: "add-product", label: "Thêm sản phẩm", icon: <FaPlus /> },
          {
            id: "manage-products",
            label: "Quản lý sản phẩm",
            icon: <FaBox />,
          },
          {
            id: "manage-orders",
            label: "Quản lý đơn hàng",
            icon: <FaShoppingCart />,
          },
          { id: "profile", label: "Hồ sơ cửa hàng", icon: <FaUser /> },
          { id: "logout", label: "Đăng xuất", icon: <IoLogOut /> },
        ].map((item) => (
          <li
            key={item.id}
            className={`nav-item`}
            onClick={() => handleMenuClick(item.id)}
          >
            <button className="custom-nav-link">
              <span className="me-2">{item.icon}</span>
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default memo(SiderSeller);
