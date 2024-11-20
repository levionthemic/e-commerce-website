import React, { useState } from "react";

const ProductForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    media: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, media: e.target.files }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div>
        <label>Tên sản phẩm:</label>
        <input type="text" name="name" onChange={handleChange} required />
      </div>
      <div>
        <label>Mô tả:</label>
        <textarea name="description" onChange={handleChange} required />
      </div>
      <div>
        <label>Giá:</label>
        <input type="number" name="price" onChange={handleChange} required />
      </div>
      <div>
        <label>Danh mục:</label>
        <select name="category" onChange={handleChange} required>
          <option value="">Chọn danh mục</option>
          <option value="electronics">Điện tử</option>
          <option value="clothing">Thời trang</option>
          <option value="home">Đồ gia dụng</option>
        </select>
      </div>
      <div>
        <label>Số lượng:</label>
        <input type="number" name="quantity" onChange={handleChange} required />
      </div>
      <div>
        <label>Upload ảnh/video:</label>
        <input type="file" name="media" onChange={handleFileChange} multiple />
      </div>
      <button type="submit">Lưu</button>
    </form>
  );
};

export default ProductForm;
