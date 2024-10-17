// src/components/DefaultComponent.jsx
import React from 'react';
import Navbar from '../Navbar/Navbar';
import './DefaultComponent.css';

const DefaultComponent = ({ children }) => {
  return (
    <div>
      <Navbar /> {/* Hiển thị Navbar */}
      <main>{children}</main> {/* Hiển thị nội dung của các trang con */}
    </div>
  );
};

export default DefaultComponent;
