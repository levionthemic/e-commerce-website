import React, { useState, useEffect, memo } from "react";
import "./EditCategory.scss";
import { useNavigate } from "react-router-dom";
import { Select, Tooltip, Upload, message } from "antd";
import { axiosApi } from "../../../../services/UserService";
import Swal from "sweetalert2";

const EditCategory = () => {
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
    <div className="edit-category">
      <h3>Chỉnh sửa danh mục</h3>
      <form action="" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-3">
                <div className="form-group mb-4">
                  <label htmlFor="id">Mã danh mục</label>
                  <input
                    className="form-control"
                    id="id"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-9">
                <div className="form-group mb-4">
                  <label>Tên danh mục:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nhập tên danh mục"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="icon_url">Icon danh mục</label>
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

              <div className="col-6">
                <div className="form-group mb-4">
                  <label>Mã danh mục cha:</label><br></br>
                  <Select
                    showSearch
                    placeholder="Chọn 1 mã danh mục cha"
                    optionFilterProp="label"
                    // onChange={onChange}
                    // onSearch={onSearch}
                    options={[
                      {
                        value: "jack",
                        label: "Jack",
                      },
                      {
                        value: "lucy",
                        label: "Lucy",
                      },
                      {
                        value: "tom",
                        label: "Tom",
                      },
                    ]}
                  />
                </div>
                <div className="form-group mb-4">
                  <label>Tên người bán:</label><br></br>
                  <Select
                    showSearch
                    placeholder="Chọn tên người bán"
                    optionFilterProp="label"
                    // onChange={onChange}
                    // onSearch={onSearch}
                    options={[
                      {
                        value: "jack",
                        label: "Jack",
                      },
                      {
                        value: "lucy",
                        label: "Lucy",
                      },
                      {
                        value: "tom",
                        label: "Tom",
                      },
                    ]}
                  />
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

export default memo(EditCategory);
