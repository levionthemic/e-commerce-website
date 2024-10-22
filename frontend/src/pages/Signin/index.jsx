// src/pages/Login/Login.jsx
import React, { useState } from "react";
import "./Signin.scss";
import imageLogin from "../../assets/images/image-login.jpg";

function Signin() {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Xử lý đăng nhập ở đây (gọi API hoặc kiểm tra thông tin)
  //   console.log('Username:', username);
  //   console.log('Password:', password);
  // };

  return (
    <div className="container position-relative box">
      <div className="signin">
        <div className="signin__image">
          <img src={imageLogin} alt="" />
        </div>
        <div className="signin__form">
          <form>
            <h2>Đăng kí</h2>
            <div class="button-group">
              <button class="btn active">
                Người mua
              </button>
              <button class="btn">
                Người bán
              </button>
            </div>
            <div className="form-group input-box">
              <label for="email">
                <i className="fa-solid fa-envelope"></i>
              </label>
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="Email"
                required
              />
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
                required
              />
            </div>
            <div className="form-group input-box">
              <label for="password">
                <i className="fa-solid fa-lock"></i>
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Mật khẩu"
                required
              />
            </div>
            <div className="form-group input-box">
              <label for="password">
                <i className="fa-solid fa-lock"></i>
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Xác nhận Mật khẩu"
                required
              />
            </div>
            <button type="submit" className="form-control button-login">
              Hoàn tất
            </button>
            <div className="options">
              <button className="btn">Đăng nhập</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signin;
