import { memo, useState } from "react";
import "./ResetPassword.scss";
import img from "../../../assets/images/image-login.jpg";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const cookies = () => {
  const cookies = document.cookie.split("; ");
  let result = {};
  cookies.forEach((cookie) => {
    const [key, value] = cookie.split("=");
    result[key] = value;
  });
  return result;
}

function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: "Mật khẩu không khớp!",
      });
      return;
    }
    const token = cookies().token;
    
    axios
      .post(
        "http://localhost:3001/api/v1/user/reset-password",
        {
          token: token,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        Swal.fire({
          icon: "info",
          title: "Thông báo",
          text: res.data.message,
        });
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        navigate("/auth/login");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Lỗi!",
          text: error.response.data.message,
        });
      });
  };

  return (
    <>
      <div className="box">
        <div className="inner-wrap">
          <div className="inner-content">
            <div
              className="inner-goback"
              onClick={() => {
                navigate(-1);
              }}
            >
              <ArrowLeftOutlined />
            </div>
            <div className="inner-title">
              <h3>Cập nhật mật khẩu</h3>
            </div>
            <div className="inner-form">
              <form action="" onSubmit={handleSubmit}>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Nhập mật khẩu"
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
                <input
                  type="password"
                  className="form-control"
                  placeholder="Xác nhận mật khẩu"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  required
                />
                <button type="submit" className="btn">
                  Cập nhật
                </button>
              </form>
            </div>
          </div>
          <div className="inner-image">
            <img src={img} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(ResetPassword);
