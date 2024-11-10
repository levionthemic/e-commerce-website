import { memo, useEffect, useState } from "react";
import { DatePicker, Radio } from "antd";
import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  RestOutlined,
} from "@ant-design/icons";
import axios from "axios";
import "./UserInfo.scss";
import avatar from "../../../assets/images/avatar.svg";
import icon from "../../../assets/images/icon.svg";
import Swal from "sweetalert2";
import dayjs from "dayjs";

const cookies = () => {
  const cookieArr = document.cookie.split(";");
  let result = {};
  for (const cookieItem of cookieArr) {
    const [key, value] = cookieItem.split("=");
    result[key] = value;
  }
  return result;
};

function UserInfo() {
  const [user, setUser] = useState({
    fullname: "",
    nickname: "",
    birthday: "",
    sex: "",
    nationality: "",
  });
  const [nations, setNations] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/v1/user/nations").then((res) => {
      setNations(res.data.data);
    });
  }, []);

  useEffect(() => {
    const token = cookies().token;
    axios.get(`http://localhost:3001/api/v1/user/${token}`).then((res) => {
      setUser(res.data.user);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .patch(
        "http://localhost:3001/api/v1/user/update",
        { ...user },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Thành công!",
          text: res.data.message,
        });
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
      <div className="container">
        <div className="row mt-5 mb-2">
          <div className="col-12">
            <h3>Thông tin tài khoản</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="inner-wrap">
              <div className="inner-left-content">
                <h5 className="mb-4">Thông tin cá nhân</h5>
                <form action="#" onSubmit={handleSubmit}>
                  <div className="form-section-1">
                    <div className="inner-avatar">
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
                        <p>0862787097</p>
                      </div>
                    </div>
                    <div className="inner-button">
                      <button type="button" className="btn">
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
                        <p>ngocliem10a5nth@gmail.com</p>
                      </div>
                    </div>
                    <div className="inner-button">
                      <button type="button" className="btn">
                        Cập nhật
                      </button>
                    </div>
                  </div>
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
                      <button type="button" className="btn">
                        Cập nhật
                      </button>
                    </div>
                  </div>
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
                      <button type="button" className="btn">
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
