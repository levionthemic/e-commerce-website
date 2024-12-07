// src/components/DefaultComponent.jsx
import React, { Fragment } from "react";
import Navbar from "../Navbar/Navbar";
import "./DefaultComponent.css";
import Footer from "../Footer/Footer"; // Import Footer component
import SiderSeller from "../Sider/SiderSeller";

const DefaultComponent = ({ children, isShowHeader, role }) => {
  if (role === "seller") {
    return (
      <>
        <div className="row">
          <div className="col-2 position-relative">
            <SiderSeller />
          </div>
          <div className="col-10">
            <main>{children}</main>
          </div>
        </div>
      </>
    )
  }
  return (
    <div>
      {isShowHeader ? <Navbar /> : <Fragment />}
      <main>{children}</main> {/* Hiển thị nội dung của các trang con */}
      <Footer />{" "}
    </div>
  );
};

export default DefaultComponent;
