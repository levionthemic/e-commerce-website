// src/components/DefaultComponent.jsx
import React from "react";
import Navbar from "../Navbar/Navbar";
import "./DefaultComponent.css";
import Footer from "../Footer/Footer"; // Import Footer component

const DefaultComponent = ({ children }) => {
  return (
    <div>
      <Navbar /> {/* Hiển thị Navbar */}
      <main>{children}</main> {/* Hiển thị nội dung của các trang con */}
      <Footer />{" "}
    </div>
  );
};

export default DefaultComponent;
