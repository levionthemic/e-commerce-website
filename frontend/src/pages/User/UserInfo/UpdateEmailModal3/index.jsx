import { memo, useState } from "react";
import { CustomModal } from "../style";
import { useSelector, useDispatch } from "react-redux";
import img from "../../../../assets/images/email-icon.svg";
import img2 from "../../../../assets/images/goback-icon.svg";
import "./UpdateEmailModal3.scss";
import axios from "axios";
import Swal from "sweetalert2";
import {
  closeEmailModal1,
  closeEmailModal2,
  closeEmailModal3,
  openEmailModal2,
  openEmailModal3,
} from "../../../../redux/slices/UpdateEmailModalSlice";

const cookies = () => {
  const cookies = document.cookie.split("; ");
  let result = {};
  cookies.forEach((cookie) => {
    const [key, value] = cookie.split("=");
    result[key] = value;
  });
  return result;
};

function UpdateEmailModal3() {
  const updateEmailModal = useSelector(
    (state) => state.updateEmailModal.modal3
  );
  const dispatch = useDispatch();

  const [otp, setOtp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = cookies().token;

    axios
      .post(
        "http://localhost:3001/api/v1/user/otp-check",
        {
          otp: otp,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        console.log(updateEmailModal.email);
        axios
          .patch(
            "http://localhost:3001/api/v1/user/update",
            {
              token: token,
              email: updateEmailModal.email,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then(() => {
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
              title: "Cập nhật email thành công!",
            });
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
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
              title: error.response.data.message,
            });
          });
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
          title: error.response.data.message,
        });
      });
  };

  const handleResendOTP = (e) => {
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
              icon: "info",
              title: "Đã gửi lại OTP!",
            });
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
        open={updateEmailModal.value}
        onOk={() => dispatch(closeEmailModal3())}
        onCancel={() => dispatch(closeEmailModal3())}
        width={400}
        footer={null}
        closeIcon={null}
      >
        <div className="inner-wrap-modal-3">
          <div
            className="inner-goback"
            onClick={() => {
              dispatch(closeEmailModal3());
              dispatch(openEmailModal2());
            }}
          >
            <img src={img2} alt="" />
          </div>
          <div className="inner-title">
            <h4>Cập nhật Email</h4>
            <img src={img} alt="" />
          </div>
          <div className="inner-desc">
            <p>
              Vui lòng nhập OTP được gửi đến Email mới để hoàn tất thay đổi.
            </p>
          </div>
          <div className="inner-form">
            <form action="" onSubmit={handleSubmit}>
              <input
                type="tel"
                className="form-control"
                placeholder="Nhập OTP"
                required
                maxLength={6}
                pattern="[0-9]{6}"
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
              />
              <div className="inner-buttons">
                <button type="submit" className="btn">
                  Xác nhận
                </button>
                <button type="button" className="btn" onClick={handleResendOTP}>
                  Gửi lại
                </button>
              </div>
            </form>
          </div>
        </div>
      </CustomModal>
    </>
  );
}

export default memo(UpdateEmailModal3);
