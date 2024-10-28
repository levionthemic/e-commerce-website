// src/components/Navbar/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom"; // Không cần useNavigate ở đây
import logo from "../../assets/images/shoppee.png";
import "./Navbar.css";
import { Dropdown, Space } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import SearchComponent from "../SearchComponent/SearchComponent"; // Import SearchComponent

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
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="E-shop" />
        </Link>
      </div>
      <SearchComponent /> {/* Sử dụng SearchComponent ở đây */}
      <div className="right">
        <div className="cart">
          <Link to="/cart">
            <ShoppingCartOutlined
              style={{
                color: "#ffffff",
                fontSize: "24px",
              }}
            />
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
