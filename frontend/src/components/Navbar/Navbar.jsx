// src/components/Navbar/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">E-Shop</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Trang Chủ</Link></li>
        <li><Link to="/login">Đăng Nhập</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
