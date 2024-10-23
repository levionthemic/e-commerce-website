// src/pages/Login/Login.jsx
import React, { useState } from "react";
import "./Signin.scss";
import imageLogin from "../../assets/images/image-login.jpg";
import axios from "axios";
import { Link } from "react-router-dom";

function Signin() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      "http://localhost:3001/api/v1/user/signin",
      {
        email: email,
        username: username,
        password: password,
      },
      {
        header: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
  };

  return (
    <div className="container position-relative box">
      <div className="signin">
        <div className="signin__image">
          <img src={imageLogin} alt="" />
        </div>
        <div className="signin__form">
          <form onSubmit={handleSubmit}>
            <h2>Đăng kí</h2>
            <div class="button-group">
              <button class="btn">Người mua</button>
              <button class="btn">Người bán</button>
            </div>
            <div className="form-group input-box">
              <label htmlFor="email">
                <i className="fa-solid fa-envelope"></i>
              </label>
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="Email"
                required
                onChange={handleChangeEmail}
                value={email}
              />
            </div>
            <div className="form-group input-box">
              <label htmlFor="username">
                <i className="fa-solid fa-user"></i>
              </label>
              <input
                id="username"
                type="text"
                className="form-control"
                placeholder="Tài khoản"
                required
                onChange={handleChangeUsername}
                value={username}
              />
            </div>
            <div className="form-group input-box">
              <label htmlFor="password">
                <i className="fa-solid fa-lock"></i>
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Mật khẩu"
                required
                onChange={handleChangePassword}
                value={password}
              />
            </div>
            <div className="form-group input-box">
              <label htmlFor="password">
                <i className="fa-solid fa-lock"></i>
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Xác nhận Mật khẩu"
                required
                onChange={handleChangeConfirmPassword}
                value={confirmPassword}
              />
            </div>
            <button type="submit" className="form-control button-login">
              Hoàn tất
            </button>
          </form>
          <div className="options">
            <Link to={"http://localhost:3000/auth/login"}>
              <button className="btn">Đăng nhập</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
