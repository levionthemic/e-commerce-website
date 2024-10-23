// src/pages/Login/Login.jsx
import React, { useState } from "react";
import "./Login.scss";
import imageLogin from "../../assets/images/image-login.jpg";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý đăng nhập ở đây (gọi API hoặc kiểm tra thông tin)
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div className="container position-relative box">
      <div className="login">
        <div className="login__image">
          <img src={imageLogin} alt="" />
        </div>
        <div className="login__form">
          <form>
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
                type="password"
                className="form-control"
                placeholder="Mật khẩu"
                onChange={handleChangePassword}
                required
              />
            </div>
            <button
              type="submit"
              className="form-control button-login"
              onSubmit={handleSubmit}
            >
              Đăng nhập
            </button>
            <div className="options">
              <button className="btn">Đăng kí</button>
              <button className="btn">Quên mật khẩu</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
