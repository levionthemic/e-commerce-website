import { memo, useState } from "react";
import { CustomModal } from "../style";
import { useSelector, useDispatch } from "react-redux";
import {
  closeModal1,
  openModal2,
} from "../../../../redux/slices/UpdatePasswordModalSlice";
import img from "../../../../assets/images/lock-icon.svg";
import "./UpdatePasswordModal1.scss";
import axios from "axios";
import Swal from "sweetalert2";

const cookies = () => {
  const cookies = document.cookie.split("; ");
  let result = {};
  cookies.forEach((cookie) => {
    const [key, value] = cookie.split("=");
    result[key] = value;
  });
  return result;
};

function UpdatePasswordModal1() {
  const updatePasswordModal = useSelector(
    (state) => state.updatePasswordModal.modal1
  );
  const dispatch = useDispatch();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
        icon: "error",
        title: "Mật khẩu xác nhận không trùng khớp!",
      });
      return;
    }

    const token = cookies().token;

    axios
      .post(
        "http://localhost:3001/api/v1/user/reset-password",
        {
          token: token,
          currentPassword: currentPassword,
          password: newPassword,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        dispatch(closeModal1());
        Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
          icon: "success",
          title: "Cập nhật mật khẩu thành công!",
        });
        window.location.reload();
      })
      .catch((error) => {
        Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
          icon: "error",
          title: "Cập nhật mật khẩu thất bại!",
          text: error.response.data.message,
        });
      });
  };

  const handleOption = (e) => {
    const token = cookies().token;
    let email = "";
    axios
      .get(`http://localhost:3001/api/v1/user/${token}`)
      .then((res) => {
        email = res.data.user.email;
      })
      .then(() => {
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
            dispatch(closeModal1());
            dispatch(openModal2());
          })
          .catch((error) => {
            Swal.fire({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
              icon: "error",
              title: "Không gửi được OTP!",
            });
          });
      });
  };

  return (
    <>
      <CustomModal
        open={updatePasswordModal}
        onOk={() => dispatch(closeModal1())}
        onCancel={() => dispatch(closeModal1())}
        width={400}
        footer={null}
        closeIcon={null}
      >
        <div className="inner-wrap-modal-1">
          <div className="inner-title">
            <h4>Cập nhật mật khẩu</h4>
            <img src={img} alt="" />
          </div>
          <div className="inner-form">
            <form action="" onSubmit={handleSubmit}>
              <input
                type="password"
                className="form-control"
                placeholder="Nhập mật khẩu hiện tại"
                required
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                }}
              />
              <input
                type="password"
                className="form-control"
                placeholder="Nhập mật khẩu mới"
                required
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
              <input
                type="password"
                className="form-control"
                placeholder="Xác thực mật khẩu"
                required
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              <button type="submit" className="btn">
                Xác nhận
              </button>
            </form>
          </div>
          <div className="inner-option">
            <span onClick={handleOption}>Cập nhật qua Email</span>
          </div>
        </div>
      </CustomModal>
    </>
  );
}

export default memo(UpdatePasswordModal1);
