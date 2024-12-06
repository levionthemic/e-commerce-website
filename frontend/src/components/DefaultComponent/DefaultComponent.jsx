// src/components/DefaultComponent.jsx
import React, { Fragment } from "react";
import Navbar from "../Navbar/Navbar";
import "./DefaultComponent.css";
import Footer from "../Footer/Footer"; // Import Footer component

const DefaultComponent = ({ children, isShowHeader }) => {
  return (
    <div>
      {isShowHeader ? <Navbar /> : <Fragment />}
      <main>{children}</main> {/* Hiển thị nội dung của các trang con */}
      <Footer />{" "}
    </div>
  );
};

export default DefaultComponent;
