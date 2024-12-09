import { memo, useEffect } from "react";
import "./User.scss";
import { useState } from "react";
import { Dropdown, Table } from "antd";
import { axiosApi } from "../../../services/UserService";
import { DeleteOutlined, DiffOutlined, DownOutlined } from "@ant-design/icons";
import CryptoJS from "crypto-js";

function User() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(true);
    axiosApi
      .get("/api/v1/admin/user")
      .then((res) => {
        setUsers(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      title: "Ảnh đại diện",
      key: "avatar",
      dataIndex: "avatar",
      render: (avatar) => (
        <img src={avatar} alt="" width={"80px"} height="80px" />
      ),
    },
    {
      title: "Họ và tên",
      key: "fullname",
      dataIndex: "fullname",
    },
    {
      title: "Ngày sinh",
      key: "birthday",
      dataIndex: "birthday",
    },
    {
      title: "Tên biệt danh",
      key: "nickname",
      dataIndex: "nickname",
    },
    {
      title: "Giới tính",
      key: "sex",
      dataIndex: "sex",
    },
    {
      title: "Địa chỉ",
      key: "address",
      dataIndex: "address",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Số điện thoại",
      key: "phoneNumber",
      dataIndex: "phoneNumber",
    },
    {
      title: "Vai trò",
      key: "role",
      dataIndex: "role",
    },
    {
      title: "Username",
      key: "username",
      dataIndex: "username",
    },
    {
      title: "Mật khẩu",
      key: "password",
      dataIndex: "password",
    },
    {
      title: "Trạng thái",
      key: "deleted",
      dataIndex: "deleted",
    },
    {
      title: "Hành động",
      key: "actions",
      dataIndex: "actions",
      render: () => (
        <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
          <button className="delete-btn">
            <DeleteOutlined />
          </button>
          <button className="delete-btn">
            <DiffOutlined />
          </button>
        </div>
      ),
    },
  ];

  const data = users.map((user) => {
    const temp = { ...user };
    var bytes = CryptoJS.AES.decrypt(temp.password, "secretkey");
    temp.password = bytes.toString(CryptoJS.enc.Utf8);
    temp.deleted = temp.deleted ? "Đã khóa" : "Khả dụng";
    return temp;
  });

  return (
    <div className="container-fluid">
      <div className="row my-3">
        <h2 className="page-title">Quản lý tài khoản</h2>
      </div>

      {/* <div className="row my-3">
        <div className="col-12">
          <Dropdown menu={{ items: dropdownItems, selectable: true }}>
            <button type="button" className="dropdown-button">
              <span>Danh mục gốc</span>
              <DownOutlined />
            </button>
          </Dropdown>
        </div>
      </div> */}

      <div className="row my-3">
        <div className="col-12">
          <Table loading={loading} dataSource={data} columns={columns} />
        </div>
      </div>
    </div>
  );
}

export default memo(User);
