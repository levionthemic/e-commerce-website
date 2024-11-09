import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/AniCart.png";
import "./Navbar.css";
import { Dropdown, Button} from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { SearchOutlined } from '@ant-design/icons';

const items = [
  {
    label: <a href="/profile">Tài khoản của tôi</a>,
    key: "0",
  },
  {
    label: <a href="/settings">Cài đặt</a>,
    key: "2",
  },
  {
    type: "divider",
  },
  {
    label: (
      <a href="/login" style={{ color: "red" }}>
        Đăng xuất
      </a>
    ),
    key: "3",
  },
];

const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Xử lý sự kiện khi người dùng nhấn "Enter" hoặc nút "Tìm kiếm"
  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/search?keyword=${search.trim()}`); // Điều hướng đến trang tìm kiếm với từ khóa
    }
  };

  // Xử lý sự kiện nhấn "Enter" trong ô tìm kiếm
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Xử lý reload trang khi nhấn vào logo
  const handleLogoClick = (e) => {
    e.preventDefault();
    window.location.href = "/"; // Reload trang
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" onClick={handleLogoClick}>
            <img src={logo} alt="E-shop" />
          </Link>
        </div>
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Tìm kiếm sản phẩm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={handleKeyPress} // Bắt sự kiện nhấn phím
          />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            className="ant-btn"
            onClick={handleSearch} // Bắt sự kiện khi nhấn nút tìm kiếm
          />
        </div>
        <div className="right">
          {/* Liên kết tới trang giỏ hàng */}
          <Link to="/cart" className="icon">
            <ShoppingCartOutlined />
          </Link>
          {/* Menu người dùng */}
          <Dropdown menu={{ items }} trigger={["click"]}>
            <span className="icon" onClick={(e) => e.preventDefault()}>
              <UserOutlined />
            </span>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
