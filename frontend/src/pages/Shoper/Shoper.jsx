import React, { useState } from "react";
import ShopOverview from "./ShopOverview"; //giu nguyen directory cu
import AddProduct from "./AddProduct"; // Import file Thêm Sản Phẩm
import ManageProducts from ".//ManageProducts/ManageProducts";
import ManageOrders from "./ManageOrders/ManageOrders";
import ChatWithCustomers from "./ChatWithCustomers";
import ShopProfile from "./ShopProfile";
import "./Shoper.css";
import {
  FaHome,
  FaPlus,
  FaBox,
  FaShoppingCart,
  FaComments,
  FaUser,
} from "react-icons/fa";

const Shoper = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Xử lý khi chọn menu
  const handleMenuClick = (tab) => {
    setActiveTab(tab);
  };

  //  nội dung dựa trên tab hiện tại
  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <ShopOverview />; // Tổng quan cửa hàng
      case "add-product":
        return <AddProduct />; // Chuyển sang chức năng Thêm Sản Phẩm
      case "manage-products":
        return <ManageProducts />; // Quản lý sản phẩm
      case "manage-orders":
        return <ManageOrders />; // Quản lý đơn hàng
      case "chat":
        return <ChatWithCustomers />; // Chat với khách hàng
      case "profile":
        return <ShopProfile />; // Hồ sơ cửa hàng
      default:
        return <p>Chọn một mục từ menu.</p>;
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 sidebar ">
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
              {
                id: "chat",
                label: "Chat với khách hàng",
                icon: <FaComments />,
              },
              { id: "profile", label: "Hồ sơ cửa hàng", icon: <FaUser /> },
            ].map((item) => (
              <li
                key={item.id}
                className={`nav-item ${
                  activeTab === item.id ? "custom-active" : ""
                }`}
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

        {/* Nội dung */}
        <div className="col-md-9 col-lg-10 content">
          <h2 className="mb-4">
            {
              {
                overview: "Tổng Quan",
                "add-product": "Thêm Sản Phẩm",
                "manage-products": "Quản Lý Sản Phẩm",
                "manage-orders": "Quản Lý Đơn Hàng",
                chat: "Chat Với Khách Hàng",
                profile: "Hồ Sơ Cửa Hàng",
              }[activeTab]
            }
          </h2>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Shoper;
