import { memo, useEffect, useState } from "react";
import "./SiderAdmin.scss";
import logo from "../../../assets/images/AniCart.png";
import { axiosApi } from "../../../services/UserService";
import { prefixAdmin } from "../../../config/system";
import { Link } from "react-router-dom";

import siderIcon1 from "../../../assets/images/admin/sider-menu-icon-1.svg";
import siderIcon2 from "../../../assets/images/admin/sider-menu-icon-2.svg";
import siderIcon3 from "../../../assets/images/admin/sider-menu-icon-3.svg";
import siderIcon4 from "../../../assets/images/admin/sider-menu-icon-4.svg";
import siderIcon5 from "../../../assets/images/admin/sider-menu-icon-5.svg";
import siderIcon6 from "../../../assets/images/admin/sider-menu-icon-6.svg";

import defaultUserIcon from "../../../assets/images/admin/default-user-icon.webp";

function SiderAdmin() {
  const [user, setUser] = useState();
  useEffect(() => {
    axiosApi.get("/api/v1" + prefixAdmin + "/user/get-info").then((data) => {
      setUser(data.data.data);
    });
  }, []);
  console.log(user);
  return (
    <div className="sider-admin">
      <div className="sider-logo">
        <img src={logo} alt="" />
      </div>
      <div className="sider-info">
        <Link to={`${prefixAdmin}/account`}>
          <div className="inner-avatar">
            <img src={user?.avatar || defaultUserIcon} alt="" />
          </div>
          <div className="inner-info">
            <h6>{user?.fullname}</h6>
            <span>{user?.email}</span>
          </div>
        </Link>
      </div>
      <ul className="sider-menu">
        <li className="sider-menu-item">
          <Link to={`${prefixAdmin}/dashboard`}>
            <div className="inner-icon">
              <img src={siderIcon1} alt="" />
            </div>
            <div className="inner-title">TRANG CHỦ</div>
          </Link>
        </li>
        <li className="sider-menu-item">
          <Link to={`${prefixAdmin}/login-log`}>
            <div className="inner-icon">
              <img src={siderIcon2} alt="" />
            </div>
            <div className="inner-title">LỊCH SỬ ĐĂNG NHẬP</div>
          </Link>
        </li>
        <li className="sider-menu-item">
          <Link to={`${prefixAdmin}/category`}>
            <div className="inner-icon">
              <img src={siderIcon3} alt="" />
            </div>
            <div className="inner-title">QUẢN LÝ DANH MỤC</div>
          </Link>
        </li>
        <li className="sider-menu-item">
          <Link to={`${prefixAdmin}/product`}>
            <div className="inner-icon">
              <img src={siderIcon4} alt="" />
            </div>
            <div className="inner-title">QUẢN LÝ SẢN PHẨM</div>
          </Link>
        </li>
        <li className="sider-menu-item">
          <Link to={`${prefixAdmin}/user`}>
            <div className="inner-icon">
              <img src={siderIcon6} alt="" />
            </div>
            <div className="inner-title">QUẢN LÝ TÀI KHOẢN</div>
          </Link>
        </li>
        <li className="sider-menu-item">
          <Link to={`${prefixAdmin}/config`}>
            <div className="inner-icon">
              <img src={siderIcon5} alt="" />
            </div>
            <div className="inner-title">QUẢN LÝ CẤU HÌNH</div>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default memo(SiderAdmin);
