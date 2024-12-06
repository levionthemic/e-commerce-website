import React, { useState } from "react";
import Overviews from "../../components/Overviews/Overviews";
// import AdminProduct from '../../components/AdminProduct/AdminProduct';
import "./Admin.css"; // Import file CSS

const Admin = () => {
  const [activeTab, setActiveTab] = useState("overview"); // Quản lý tab hiện tại

  const handleMenuClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div
          className="col-md-3 col-lg-2 sidebar p-4"
          style={{ width: "200px" }}
        >
          <h2 className="text-center mb-4">Admin Menu</h2>
          <ul className="nav flex-column">
            <li
              className={`nav-item mb-2 ${
                activeTab === "overview" ? "active" : ""
              }`}
              onClick={() => handleMenuClick("overview")}
            >
              <a className="nav-link" href="#">
                Tổng quan
              </a>
            </li>
            <li
              className={`nav-item mb-2 ${
                activeTab === "product" ? "active" : ""
              }`}
              onClick={() => handleMenuClick("product")}
            >
              <a className="nav-link" href="#">
                Sản phẩm
              </a>
            </li>
          </ul>
        </div>

        {/* Content */}
        <div className="col-md-9 col-lg-10 content">
          <h2 className="mb-2" style={{ fontSize: "30px" }}>
            {activeTab === "overview" ? "Tổng Quan" : "Sản Phẩm"}
          </h2>
          {activeTab === "overview" && <Overviews />}
          {/* {activeTab === "product" && <AdminProduct />} */}
        </div>
      </div>
    </div>
  );
};

export default Admin;
