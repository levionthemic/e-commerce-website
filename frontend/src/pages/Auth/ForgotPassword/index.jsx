import { memo, useState } from "react";
import "./ForgotPassword.scss";
import img from "../../../assets/images/image-login.jpg";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      axios
        .post(
          "http://localhost:3001/api/v1/user/otp-request",
          {
            email: email,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          navigate("/auth/otp-confirm", { state: email });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Lỗi!",
            text: error.response.data.message,
          });
        });
    }
  };
  return (
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
            <h3>Quên mật khẩu?</h3>
            <p>Vui lòng nhập thông tin tài khoản để lấy lại mật khẩu</p>
          </div>
          <div className="inner-form">
            <form action="#" onSubmit={handleSubmit}>
              <input
                type="email"
                className="form-control"
                placeholder="Nhập email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
              <button type="submit" className="btn">
                Gửi OTP
              </button>
            </form>
          </div>
        </div>
        <div className="inner-image">
          <img src={img} alt="" />
        </div>
      </div>
    </div>
  );
}

export default memo(ForgotPassword);
