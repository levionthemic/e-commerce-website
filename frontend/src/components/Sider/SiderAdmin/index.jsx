import { memo, useEffect, useState } from "react";
import "./SiderAdmin.scss";
import logo from "../../../assets/images/AniCart.png";
import { axiosApi } from "../../../services/UserService";
import { prefixAdmin } from "../../../config/system";
import { useNavigate } from "react-router-dom";

import siderIcon1 from "../../../assets/images/admin/sider-menu-icon-1.svg";
import siderIcon2 from "../../../assets/images/admin/sider-menu-icon-2.svg";
import siderIcon3 from "../../../assets/images/admin/sider-menu-icon-3.svg";
import siderIcon4 from "../../../assets/images/admin/sider-menu-icon-4.svg";
import siderIcon5 from "../../../assets/images/admin/sider-menu-icon-5.svg";
import siderIcon6 from "../../../assets/images/admin/sider-menu-icon-6.svg";

import defaultUserIcon from "../../../assets/images/admin/default-user-icon.webp";

function SiderAdmin() {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [navLinksActive, setNavLinksActive] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    axiosApi.get("/api/v1" + prefixAdmin + "/user/get-info").then((data) => {
      setUser(data.data.data);
    });
  }, []);

  const pathname = new URL(window.location.href).pathname;
  useEffect(() => {
    const temp = [false, false, false, false, false, false, false];
    switch (pathname) {
      case `${prefixAdmin}/account`:
        temp[0] = true;
        break;
      case `${prefixAdmin}/dashboard`:
        temp[1] = true;
        break;
      case `${prefixAdmin}/login-log`:
        temp[2] = true;
        break;
      case `${prefixAdmin}/category`:
        temp[3] = true;
        break;
      case `${prefixAdmin}/product`:
        temp[4] = true;
        break;
      case `${prefixAdmin}/user`:
        temp[5] = true;
        break;
      case `${prefixAdmin}/config`:
        temp[6] = true;
        break;

      default:
        break;
    }
    setNavLinksActive(temp);
  }, [pathname]);

  const handleClickMenu = (tab) => {
    switch (tab) {
      case "account":
        navigate(`${prefixAdmin}/account`);
        break;
      case "dashboard":
        navigate(`${prefixAdmin}/dashboard`);
        break;
      case "login-log":
        navigate(`${prefixAdmin}/login-log`);
        break;
      case "category":
        navigate(`${prefixAdmin}/category`);
        break;
      case "product":
        navigate(`${prefixAdmin}/product`);
        break;
      case "user":
        navigate(`${prefixAdmin}/user`);
        break;
      case "config":
        navigate(`${prefixAdmin}/config`);
        break;
      default:
        break;
    }
  };
  return (
    <div className="sider-admin">
      <div className="sider-logo">
        <img src={logo} alt="" />
      </div>
      <div
        className={
          "sider-info " + (navLinksActive[0] ? "sider-info-active" : "")
        }
        onClick={() => handleClickMenu("account")}
      >
        <div className="inner-avatar">
          <img src={user?.avatar || defaultUserIcon} alt="" />
        </div>
        <div className="inner-info">
          <h6>{user?.fullname}</h6>
          <span>{user?.email}</span>
        </div>
      </div>
      <ul className="sider-menu">
        <li
          className={
            "sider-menu-item " + (navLinksActive[1] ? "sider-menu-active" : "")
          }
          onClick={() => handleClickMenu("dashboard")}
        >
          <div className="inner-icon">
            <img src={siderIcon1} alt="" />
          </div>
          <div className="inner-title">TRANG CHỦ</div>
        </li>
        <li
          className={
            "sider-menu-item " + (navLinksActive[2] ? "sider-menu-active" : "")
          }
          onClick={() => handleClickMenu("login-log")}
        >
          <div className="inner-icon">
            <img src={siderIcon2} alt="" />
          </div>
          <div className="inner-title">LỊCH SỬ ĐĂNG NHẬP</div>
        </li>
        <li
          className={
            "sider-menu-item " + (navLinksActive[3] ? "sider-menu-active" : "")
          }
          onClick={() => handleClickMenu("category")}
        >
          <div className="inner-icon">
            <img src={siderIcon3} alt="" />
          </div>
          <div className="inner-title">QUẢN LÝ DANH MỤC</div>
        </li>
        <li
          className={
            "sider-menu-item " + (navLinksActive[4] ? "sider-menu-active" : "")
          }
          onClick={() => handleClickMenu("product")}
        >
          <div className="inner-icon">
            <img src={siderIcon4} alt="" />
          </div>
          <div className="inner-title">QUẢN LÝ SẢN PHẨM</div>
        </li>
        <li
          className={
            "sider-menu-item " + (navLinksActive[5] ? "sider-menu-active" : "")
          }
          onClick={() => handleClickMenu("user")}
        >
          <div className="inner-icon">
            <img src={siderIcon6} alt="" />
          </div>
          <div className="inner-title">QUẢN LÝ TÀI KHOẢN</div>
        </li>
        <li
          className={
            "sider-menu-item " + (navLinksActive[6] ? "sider-menu-active" : "")
          }
          onClick={() => handleClickMenu("config")}
        >
          <div className="inner-icon">
            <img src={siderIcon5} alt="" />
          </div>
          <div className="inner-title">QUẢN LÝ CẤU HÌNH</div>
        </li>
      </ul>
    </div>
  );
}

export default memo(SiderAdmin);
