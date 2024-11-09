import { memo, useEffect, useState } from "react";
import { DatePicker, Radio } from "antd";
import { LockOutlined, MailOutlined, PhoneOutlined, RestOutlined } from "@ant-design/icons";
import axios from "axios";
import "./UserInfo.scss";
import avatar from "../../../assets/images/avatar.svg";

function UserInfo() {
  const [sex, setSex] = useState("male");
  const [nations, setNations] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/v1/user/nations").then((res) => {
      setNations(res.data.data);
    });
  });

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2>Thông tin tài khoản</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="inner-wrap">
              <div className="inner-left-content">
                <h5>Thông tin cá nhân</h5>
                <form action="">
                  <div className="form-section-1">
                    <div className="inner-avatar">
                      <img src={avatar} alt="" />
                    </div>
                    <div className="inner-info">
                      <div className="form-group">
                        <label htmlFor="fullname">Họ và tên</label>
                        <input
                          type="text"
                          className="form-control"
                          value={"Dũng Nguyễn"}
                          id="fullname"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="nickname">Biệt danh</label>
                        <input
                          type="text"
                          className="form-control"
                          value={"Thêm biệt danh"}
                          id="nickname"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-section-2">
                    <div className="form-group">
                      <label htmlFor="birthday">Ngày sinh</label>
                      <DatePicker picker="date" format="DD/MM/YYYY" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="sex">Giới tính</label>
                      <Radio.Group
                        value={sex}
                        onChange={(e) => {
                          setSex(e.target.value);
                        }}
                      >
                        <Radio value={"male"}>Nam</Radio>
                        <Radio value={"female"}>Nữ</Radio>
                        <Radio value={"other"}>Khác</Radio>
                      </Radio.Group>
                    </div>
                    <div className="form-group">
                      <label htmlFor="nationality">Quốc tịch</label>
                      <select class="form-select" id="nationality">
                        <option selected disabled>
                          -- Chọn quốc tịch --
                        </option>
                        {nations.length ? (
                          <>
                            {nations.map((item) => (
                              <option value={item.num_code} key={item.num_code}>
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
                    <button type="submit" className="btn">Cập nhật thay đổi</button>
                  </div>
                </form>
              </div>
              
              <div className="inner-right-content">
                <div className="section-1">
                  <h5>Số điện thoại và Email</h5>
                  <div className="inner-item">
                    <div className="inner-item-info">
                      <div className="inner-icon">
                        <PhoneOutlined style={{ transform: "rotateY(180deg)"}}/>
                      </div>
                      <div className="inner-content">
                        <h6>Số điện thoại</h6>
                        <p>0862787097</p>
                      </div>
                    </div>
                    <div className="inner-button">
                      <button type="button">Cập nhật</button>
                    </div>
                  </div>
                  <div className="inner-item">
                    <div className="inner-item-info">
                      <div className="inner-icon">
                        <MailOutlined />
                      </div>
                      <div className="inner-content">
                        <h6>Địa chỉ Email</h6>
                        <p>dungnguyenthanh123321@gmail.com</p>
                      </div>
                    </div>
                    <div className="inner-button">
                      <button type="button">Cập nhật</button>
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
                      <button type="button">Cập nhật</button>
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
                      <button type="button">Cập nhật</button>
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
