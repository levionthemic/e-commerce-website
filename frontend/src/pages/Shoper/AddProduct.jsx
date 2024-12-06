import React, { useState } from "react";
import axios from "axios";
import "./AddProduct.css";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    media: null,
  });

  const [preview, setPreview] = useState([]); // Preview ảnh/video

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, media: files });

    // Tạo preview ảnh/video
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreview(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation dữ liệu
    if (!formData.name || !formData.price || !formData.category) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc!");
      return;
    }

    // Chuẩn bị dữ liệu gửi
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("stock", formData.stock);
    if (formData.media) {
      formData.media.forEach((file) => formDataToSend.append("media", file));
    }

    // Gửi dữ liệu qua API
    try {
      const response = await axios.post(
        "http://localhost:5000/api/products",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Sản phẩm đã được đăng thành công!");
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        media: null,
      });
      setPreview([]);
    } catch (error) {
      console.error("Lỗi khi đăng sản phẩm:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại!");
    }
  };

  return (
    <div className="add-product-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tên sản phẩm *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Nhập tên sản phẩm"
            required
          />
        </div>
        <div className="form-group">
          <label>Mô tả</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Nhập mô tả sản phẩm"
          />
        </div>
        <div className="form-group">
          <label>Giá *</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Nhập giá sản phẩm"
            required
          />
        </div>
        <div className="form-group">
          <label>Danh mục *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Chọn danh mục</option>
            <option value="electronics">Điện tử</option>
            <option value="fashion">Thời trang</option>
            <option value="home">Đồ gia dụng</option>
          </select>
        </div>
        <div className="form-group">
          <label>Số lượng</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            placeholder="Nhập số lượng"
          />
        </div>
        <div className="form-group">
          <label>Upload ảnh/video</label>
          <input
            type="file"
            name="media"
            multiple
            onChange={handleFileChange}
            accept="image/*,video/*"
          />
        </div>
        {/* Preview ảnh/video */}
        <div className="preview-container">
          {preview.map((src, index) => (
            <div key={index} className="preview-item">
              <img src={src} alt="preview" className="preview-image" />
            </div>
          ))}
        </div>
        <button type="submit" className="btn-submit">
          Lưu
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
