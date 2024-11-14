import React, { memo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/AniCart.png";
import "./Navbar.css";
import { Dropdown, Button } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const items = [
  {
    label: <a href="/user/info">Tài khoản của tôi</a>,
    key: "0",
  },
  {
    label: <a href="/user/order">Đơn hàng của tôi</a>,
    key: "1",
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
      <a
        href="/"
        style={{ color: "red" }}
        onClick={() => {
          document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
          document.cookie = "cartId=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
          window.location.reload();
        }}
      >
        Đăng xuất
      </a>
    ),
    key: "3",
  },
];

function Navbar() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchKeyword.trim()) {
      navigate(`/search?keyword=${searchKeyword.trim()}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.location.href = "/";
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
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
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
}

export default memo(Navbar);
