import React, { useState, useEffect, memo } from "react";
import "./AddUser.scss";
import { useNavigate } from "react-router-dom";
import { DatePicker, Radio, Select, Tooltip, Upload, message } from "antd";
import { axiosApi } from "../../../../services/UserService";
import Swal from "sweetalert2";
import dayjs from "dayjs";

const AddUser = () => {
  const navigate = useNavigate();

  const [text, setText] = useState();
  const [id, setId] = useState();
  const [iconUrl, setIconUrl] = useState();
  const [sellerId, setSellerId] = useState();
  const [parentId, setParentId] = useState();

  const [imageUrl, setImageUrl] = useState();
  const [imageFile, setImageFile] = useState();

  const [isUploadImage, setIsUploadImage] = useState(false);

  // useEffect(() => {
  //   axiosApi("/api/v1/seller/product")
  //     .then(res => {
  //       setCategories(res.data.categories);
  //     })
  // }, []);

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append(
      "upload_preset",
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    );
    formData.append("cloud_name", process.env.REACT_APP_CLOUDINARY_NAME);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/upload`,
        {
          method: "post",
          body: formData,
        }
      );
      const data = await res.json();
      message.success("Upload successful");
      return data.secure_url;
    } catch (error) {
      message.error("Upload failed. Please try again.");
    }
  };

  const handleUpload = (file) => {
    setImageFile(file);
    setIsUploadImage(true);
    getBase64(file, (url) => {
      setImageUrl(url);
    });
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (isUploadImage) {
      imgUrl = await uploadImage();
    }

    // axiosApi
    //   .post("/api/v1/seller/product/add", {
    //     name: name,
    //     price: price,
    //     discountRate: discountRate,
    //     description: description,
    //     stockQty: stockQty,
    //     thumbnailUrl: imgUrl,
    //     categoryId: category.split("&")[0],
    //     categoryName: category.split("&")[1]
    //   })
    //   .then((res) => {
    //     Swal.fire({
    //       icon: "success",
    //       title: "Thành công!",
    //       text: res.data.message,
    //       didClose: () => {
    //         navigate(-1);
    //       },
    //     });
    //   })
    //   .catch((error) => {
    //     Swal.fire({
    //       icon: "error",
    //       title: "Lỗi!",
    //       text: error.response.data.message,
    //     });
    //   });
  };

  return (
    <div className="edit-user">
      <h3>Chỉnh sửa tài khoản</h3>
      <form action="" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12">
            <div className="row mb-3">
              <div className="col-4">
                <div className="form-group">
                  <label>Ảnh đại diện</label>
                  <br></br>
                  <Tooltip title="Click để upload ảnh" placement="rightTop">
                    <Upload
                      showUploadList={false}
                      customRequest={({ file }) => handleUpload(file)}
                      beforeUpload={beforeUpload}
                    >
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt=""
                          className="product-image mx-5"
                        />
                      ) : (
                        <p className="click-upload">Upload tại đây</p>
                      )}
                    </Upload>
                  </Tooltip>
                </div>
              </div>
              <div className="col-8">
                <div className="form-group mb-4">
                  <label>Họ và tên</label>
                  <input
                    className="form-control"
                    id="id"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="birthday">Ngày sinh</label>
                  <br></br>
                  <DatePicker
                    picker="date"
                    format="DD/MM/YYYY"
                    // value={dayjs(user.birthday)}
                    // onChange={(e) => {
                    //   const newUser = { ...user };
                    //   newUser.birthday = e.format("MM/DD/YYYY");
                    //   setUser(newUser);
                    //   setHasUpdated(true);
                    // }}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-6">
                <div className="form-group mb-3">
                  <label>Tên biệt danh:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nhập tên biệt danh"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="sex">Giới tính</label> <br></br>
                  <Radio.Group
                    // value={user.sex}
                    onChange={(e) => {
                      // const newUser = { ...user };
                      // newUser.sex = e.target.value;
                      // setUser(newUser);
                      // setHasUpdated(true);
                    }}
                  >
                    <Radio value={"male"}>Nam</Radio>
                    <Radio value={"female"}>Nữ</Radio>
                    <Radio value={"other"}>Khác</Radio>
                  </Radio.Group>
                </div>

                <div className="form-group mb-3">
                  <label>Địa chỉ:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nhập địa chỉ"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </div>

                <div className="form-group mb-3">
                  <label>Email: </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Nhập email"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </div>

                <div className="form-group mb-3">
                  <label>Số điện thoại: </label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Nhập email"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="sex">Vai trò</label>
                  <Radio.Group
                    // value={user.sex}
                    onChange={(e) => {
                      // const newUser = { ...user };
                      // newUser.sex = e.target.value;
                      // setUser(newUser);
                      // setHasUpdated(true);
                    }}
                  >
                    <Radio value={"buyer"}>Người mua</Radio>
                    <Radio value={"selller"}>Người bán</Radio>
                    <Radio value={"admin"}>Quản trị viên</Radio>
                  </Radio.Group>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group mb-3">
                  <label>Username: </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nhập username"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </div>

                <div className="form-group mb-3">
                  <label>Mật khẩu: </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nhập mật khẩu"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="sex">Trạng thái</label> <br></br>
                  <Radio.Group
                    // value={user.sex}
                    onChange={(e) => {
                      // const newUser = { ...user };
                      // newUser.sex = e.target.value;
                      // setUser(newUser);
                      // setHasUpdated(true);
                    }}
                  >
                    <Radio value={"true"}>Đã khóa</Radio>
                    <Radio value={"false"}>Khả dụng</Radio>
                  </Radio.Group>
                </div>
              </div>
            </div>

            <div className="form-group button-action">
              <button type="submit" className="btn btn-primary">
                Cập nhật
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  navigate("/admin/category");
                }}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default memo(AddUser);
