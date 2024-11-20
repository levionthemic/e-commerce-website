import { memo, useEffect, useState } from "react";
import { DatePicker, Radio } from "antd";
import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  RestOutlined,
} from "@ant-design/icons";
import "./UserInfo.scss";
import avatar from "../../../assets/images/avatar.svg";
import icon from "../../../assets/images/icon.svg";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { openModal1 } from "../../../redux/slices/UpdatePasswordModalSlice";
import { openEmailModal1 } from "../../../redux/slices/UpdateEmailModalSlice";
import UpdatePasswordModal1 from "./UpdatePasswordModal1";
import UpdatePasswordModal2 from "./UpdatePasswordModal2";
import UpdatePasswordModal3 from "./UpdatePasswordModal3";
import UpdateEmailModal1 from "./UpdateEmailModal1";
import UpdateEmailModal3 from "./UpdateEmailModal3";
import UpdateEmailModal2 from "./UpdateEmailModal2";
import { cookies } from "../../../helpers/cookies";
import { axiosApi } from "../../../services/UserService";

function UserInfo() {
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    fullname: "",
    nickname: "",
    birthday: "",
    sex: "",
    nationality: "",
  });
  const [nations, setNations] = useState([]);
  // const [imageUrl, setImageUrl] = useState("");
  // const [image, setImage] = useState("");

  const uploadImage = () => {
    // const data = new FormData();
    // data.append("file", image);
    // data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
    // data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_NAME);
    // fetch(
    //   `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,
    //   {
    //     method: "post",
    //     body: data,
    //   }
    // )
    //   .then((resp) => resp.json())
    //   .then((data) => {
    //     setImageUrl(data.url);
    //   })
    //   .catch((err) => console.log(err));
  };

  useEffect(() => {
    axiosApi.get("/api/v1/user/nations").then((res) => {
      setNations(res.data.data);
    });
  }, []);

  useEffect(() => {
    const token = cookies().token;
    axiosApi.get(`/api/v1/user/${token}`).then((res) => {
      setUser(res.data.user);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      title: "Cảnh báo!",
      text: "Bạn có chắc chắn muốn cập nhật?",
      confirmButtonText: "Cập nhật",
      cancelButtonText: "Hủy",
    }).then((res) => {
      if (res.isConfirmed) {
        axiosApi
          .patch("/api/v1/user/update", { ...user })
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Thành công!",
              text: res.data.message,
              didClose: () => {
                window.location.reload();
              },
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Lỗi!",
              text: error.response.data.message,
            });
          });
      }
    });
  };

  const handleUpdatePhoneNumber = () => {
    Swal.fire({
      title: "Nhập số điện thoại: ",
      input: "tel",
      inputAttributes: {
        maxlength: "10",
        pattern: "[0-9]{10}",
        required: true,
        placeholder: "Cần nhập 10 chữ số",
      },
      showCancelButton: true,
      confirmButtonText: "Cập nhật",
      cancelButtonText: "Hủy bỏ",
      showLoaderOnConfirm: true,
      preConfirm: async (phoneNumber) => {
        Swal.fire({
          icon: "warning",
          showCancelButton: true,
          showConfirmButton: true,
          title: "Cảnh báo!",
          text: "Bạn có chắc chắn muốn cập nhật?",
          confirmButtonText: "Cập nhật",
          cancelButtonText: "Hủy",
        }).then((res) => {
          if (res.isConfirmed) {
            axiosApi
              .patch("/api/v1/user/update", {
                phoneNumber: phoneNumber,
              })
              .then((res) => {
                Swal.fire({
                  icon: "success",
                  title: "Thành công!",
                  text: res.data.message,
                  didClose: () => {
                    window.location.reload();
                  },
                });
              })
              .catch((error) => {
                Swal.fire({
                  icon: "error",
                  title: "Lỗi!",
                  text: error.response.data.message,
                });
              });
          }
        });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };
  const handleUpdateAddress = () => {
    Swal.fire({
      title: "Nhập địa chỉ: ",
      input: "text",
      inputAttributes: {
        required: true,
      },
      showCancelButton: true,
      confirmButtonText: "Cập nhật",
      cancelButtonText: "Hủy bỏ",
      showLoaderOnConfirm: true,
      preConfirm: async (address) => {
        Swal.fire({
          icon: "warning",
          showCancelButton: true,
          showConfirmButton: true,
          title: "Cảnh báo!",
          text: "Bạn có chắc chắn muốn cập nhật?",
          confirmButtonText: "Cập nhật",
          cancelButtonText: "Hủy",
        }).then((res) => {
          if (res.isConfirmed) {
            axiosApi
              .patch("/api/v1/user/update", {
                address: address,
              })
              .then((res) => {
                Swal.fire({
                  icon: "success",
                  title: "Thành công!",
                  text: res.data.message,
                  didClose: () => {
                    window.location.reload();
                  },
                });
              })
              .catch((error) => {
                Swal.fire({
                  icon: "error",
                  title: "Lỗi!",
                  text: error.response.data.message,
                });
              });
          }
        });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  const handleUpdatePassword = () => {
    dispatch(openModal1());
  };

  const handleUpdateEmail = () => {
    dispatch(openEmailModal1());
  };

  const handleClick = () => {
    Swal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
      icon: "info",
      title: "Tính năng chưa được hoàn thiện!",
    });
  };

  return (
    <>
      <div className="container">
        <div className="row mt-5 mb-2">
          <div className="col-12">
            <h3>Thông tin tài khoản</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="inner-wrap-user-info">
              <div className="inner-left-content">
                <h5 className="mb-4">Thông tin cá nhân</h5>
                <form action="#" onSubmit={handleSubmit}>
                  <div className="form-section-1">
                    <div className="inner-avatar" onClick={uploadImage}>
                      <img src={avatar} alt="" />
                      <img src={icon} alt="" />
                    </div>
                    <div className="inner-info">
                      <div className="form-group">
                        <label htmlFor="fullname">Họ và tên</label>
                        <input
                          type="text"
                          className="form-control"
                          value={user.fullname}
                          id="fullname"
                          onChange={(e) => {
                            const newUser = { ...user };
                            newUser.fullname = e.target.value;
                            setUser(newUser);
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="nickname">Biệt danh</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={"Thêm biệt danh"}
                          id="nickname"
                          value={user.nickname}
                          onChange={(e) => {
                            const newUser = { ...user };
                            newUser.nickname = e.target.value;
                            setUser(newUser);
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-section-2">
                    <div className="form-group">
                      <label htmlFor="birthday">Ngày sinh</label>
                      <DatePicker
                        picker="date"
                        format="DD/MM/YYYY"
                        value={dayjs(user.birthday)}
                        onChange={(e) => {
                          const newUser = { ...user };
                          newUser.birthday = e.format("DD/MM/YYYY");
                          setUser(newUser);
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="sex">Giới tính</label>
                      <Radio.Group
                        value={user.sex}
                        onChange={(e) => {
                          const newUser = { ...user };
                          newUser.sex = e.target.value;
                          setUser(newUser);
                        }}
                      >
                        <Radio value={"male"}>Nam</Radio>
                        <Radio value={"female"}>Nữ</Radio>
                        <Radio value={"other"}>Khác</Radio>
                      </Radio.Group>
                    </div>
                    <div className="form-group">
                      <label htmlFor="nationality">Quốc tịch</label>
                      <select
                        className="form-select"
                        id="nationality"
                        value={user.nationality}
                        onChange={(e) => {
                          const newUser = { ...user };
                          newUser.nationality = e.target.value;
                          setUser(newUser);
                        }}
                      >
                        <option selected disabled>
                          -- Chọn quốc tịch --
                        </option>
                        {nations.length ? (
                          <>
                            {nations.map((item) => (
                              <option
                                value={item.num_code}
                                key={item.num_code}
                                selected={item.num_code === user.nationality}
                              >
                                {item.en_short_name}
                              </option>
                            ))}
                          </>
                        ) : (
                          <></>
                        )}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <button type="submit" className="btn">
                      Cập nhật thay đổi
                    </button>
                  </div>
                </form>
              </div>

              <div className="inner-right-content">
                <div className="section-1">
                  <h5>Số điện thoại và Email</h5>
                  <div className="inner-item">
                    <div className="inner-item-info">
                      <div className="inner-icon">
                        <PhoneOutlined
                          style={{ transform: "rotateY(180deg)" }}
                        />
                      </div>
                      <div className="inner-content">
                        <h6>Số điện thoại</h6>
                        <p>{user.phoneNumber || "Chưa cập nhật"}</p>
                      </div>
                    </div>
                    <div className="inner-button">
                      <button
                        type="button"
                        className="btn"
                        onClick={handleUpdatePhoneNumber}
                      >
                        Cập nhật
                      </button>
                    </div>
                  </div>
                  <div className="inner-item">
                    <div className="inner-item-info">
                      <div className="inner-icon">
                        <MailOutlined />
                      </div>
                      <div className="inner-content">
                        <h6>Địa chỉ Email</h6>
                        <p>{user.email || "Chưa cập nhật"}</p>
                      </div>
                    </div>
                    <div className="inner-button">
                      <button
                        type="button"
                        className="btn"
                        onClick={handleUpdateEmail}
                      >
                        Cập nhật
                      </button>
                    </div>
                  </div>
                  <UpdateEmailModal1 />
                  <UpdateEmailModal2 />
                  <UpdateEmailModal3 />
                </div>

                <div className="section-2">
                  <h5>Bảo mật</h5>
                  <div className="inner-item">
                    <div className="inner-item-info">
                      <div className="inner-icon">
                        <LockOutlined />
                      </div>
                      <div className="inner-content">
                        <p>Thiết lập mật khẩu</p>
                      </div>
                    </div>
                    <div className="inner-button">
                      <button
                        type="button"
                        className="btn"
                        onClick={handleUpdatePassword}
                      >
                        Cập nhật
                      </button>
                    </div>
                  </div>
                  <UpdatePasswordModal1 />
                  <UpdatePasswordModal2 />
                  <UpdatePasswordModal3 />
                  <div className="inner-item">
                    <div className="inner-item-info">
                      <div className="inner-icon">
                        <RestOutlined />
                      </div>
                      <div className="inner-content">
                        <p>Yêu cầu xóa tài khoản</p>
                      </div>
                    </div>
                    <div className="inner-button">
                      <button
                        type="button"
                        className="btn"
                        onClick={handleClick}
                      >
                        Cập nhật
                      </button>
                    </div>
                  </div>
                </div>

                <div className="section-3">
                  <h5>Địa chỉ</h5>
                  <div className="inner-item">
                    <div className="inner-item-info inner-address">
                      <p>{user.address || "Chưa cập nhật"}</p>
                    </div>
                    <div className="inner-button">
                      <button
                        type="button"
                        className="btn"
                        onClick={handleUpdateAddress}
                      >
                        Cập nhật
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(UserInfo);
