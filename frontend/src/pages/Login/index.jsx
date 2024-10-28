// src/pages/Login/Login.jsx
import React, { useEffect, useState } from "react";
import "./Login.scss";
import imageLogin from "../../assets/images/image-login.jpg";
import { useNavigate } from "react-router-dom";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const navigate = useNavigate();

  // Chuyển sang trang chủ nếu đã đăng nhập (có token trong cookie)
  useEffect(() => {
    const arr = document.cookie.split("; ");
    for (const item of arr) {
      const [key] = item.split("=");
      if (key === "token") {
        navigate("/");
      }
    }
  });

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleClick = () => {
    navigate("/auth/signin");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý đăng nhập ở đây (gọi API hoặc kiểm tra thông tin)
    const fetchApi = async () => {
      const res = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.code === 200) {
        // Gán token lên cookie
        document.cookie = `token=${res.data.token}`;
        navigate("/");
      }
    };
    fetchApi();
  };

  return (
    <div className="container position-relative box">
      <div className="login">
        <div className="login__image">
          <img src={imageLogin} alt="" />
        </div>
        <div className="login__form">
          <form onSubmit={handleSubmit}>
            <h2>Đăng nhập</h2>
            <div class="button-group">
              <button class="btn active">Người mua</button>
              <button class="btn">Người bán</button>
              <button class="btn">Admin</button>
            </div>
            <div className="form-group input-box">
              <label for="username">
                <i className="fa-solid fa-user"></i>
              </label>
              <input
                id="username"
                type="text"
                className="form-control"
                placeholder="Tài khoản"
                onChange={handleChangeUsername}
                required
              />
            </div>
            <div className="form-group input-box">
              <label for="password">
                <i className="fa-solid fa-lock"></i>
              </label>
              <input
                id="password"
                type={isShowPassword ? "text" : "password"}
                className="form-control"
                placeholder="Mật khẩu"
                onChange={handleChangePassword}
                required
                
              />
              <span
                onClick={() => setIsShowPassword(!isShowPassword)}
                style={{
                  position: "absolute",
                  top: "55%",
                  right: "20px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
              </span>
            </div>
            <button type="submit" className="form-control button-login">
              Đăng nhập
            </button>
          </form>
          <div className="options">
            <button className="btn" onClick={handleClick}>
              Đăng kí
            </button>
            <button className="btn">Quên mật khẩu</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
