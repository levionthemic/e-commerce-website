// src/pages/Login/Login.jsx
import React, { memo, useState } from "react";
import "./Signup.scss";
import imageLogin from "../../../assets/images/image-login.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const role = e.target[0].checked ? "buyer" : "seller";

    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/user/signup",
        {
          email: email,
          username: username,
          password: password,
          role: role
        },
        {
          header: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Đăng ký thất bại!",
        text: "Username hoặc email đã tồn tại!",
        footer: ""
      });
    }
  };

  const handleClick = () => {
    navigate("/auth/login");
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
            <div
              className="btn-group"
              role="group"
            >
              <div className="options">
                <input
                  type="radio"
                  className="btn-check"
                  name="role"
                  id="buyer"
                  autoComplete="off"
                  required
                />
                <label className="btn btn-outline-primary" htmlFor="buyer">
                  Người mua
                </label>
              </div>
              <div className="options">
                <input
                  type="radio"
                  className="btn-check"
                  name="role"
                  id="seller"
                  autoComplete="off"
                  required
                />
                <label className="btn btn-outline-primary" htmlFor="seller">
                  Người bán
                </label>
              </div>
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
                autoComplete="off"
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
                autoComplete="off"
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
                autoComplete="off"
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
                autoComplete="off"
              />
            </div>
            <button type="submit" className="form-control button-login">
              Hoàn tất
            </button>
          </form>
          <div className="options" onClick={handleClick}>
            <button className="btn">Đăng nhập</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Signup);
