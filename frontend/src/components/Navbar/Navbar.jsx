// src/components/Navbar/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/shoppee.png";
import "./Navbar.css";
import { Button, Dropdown, Space } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  DownOutlined,
} from "@ant-design/icons";

const items = [
  {
    label: <a href="">Tài khoản của tôi</a>,
    key: "0",
  },

  {
    label: <a href="">Cài đặt</a>,
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
  return (
    <nav className="navbar">
      {/* Thêm div này */}
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="E-shop" />
        </Link>
      </div>
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Tìm kiếm sản phẩm"
        />
        <Button type="primary" icon={<SearchOutlined />} />
      </div>
      <div className="right">
        <div className="cart">
          <Link to="/cart">
            <ShoppingCartOutlined
              style={{
                color: "#ffffff",
                fontSize: "24px",
                stroke: "#ffffff",
                fill: "#ffffff",
              }}
            />{" "}
            {/* Đổi viền và nền icon thành trắng */}
          </Link>
        </div>
        <div className="login">
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <UserOutlined
                  style={{
                    color: "#ffffff",
                    fontSize: "24px",
                    stroke: "#ffffff",
                    fill: "#ffffff",
                  }}
                />
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
