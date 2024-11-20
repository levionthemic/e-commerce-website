import React, { useState, useEffect } from 'react';
import './EditProduct.css';

const EditProduct = ({ product, onCancel, onSave }) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [originalPrice] = useState(product.original_price || product.price);  // Giữ nguyên giá cũ
  const [description, setDescription] = useState(product.description);
  const [category, setCategory] = useState(product.categories.name);
  const [stock, setStock] = useState(product.stock_item.qty);
  const [imageUrl, setImageUrl] = useState(product.thumbnail_url);

  const handleSave = () => {
    const updatedProduct = {
      ...product,
      name,
      price,
      original_price: originalPrice,
      description,
      categories: { name: category },
      stock_item: { qty: stock },
      thumbnail_url: imageUrl,
    };

    onSave((prevProducts) =>
      prevProducts.map((p) => (p._id === product._id ? updatedProduct : p))
    );

    onCancel();
  };

  useEffect(() => {
  }, [product]);

  return (
    <div className="edit-product">
      <h3 className="text-center">Chỉnh sửa sản phẩm</h3>

      <div className="row mb-3">
        <div className="col-md-6">
          <div className="form-group">
            <label>Tên sản phẩm</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label>Giá cũ (VND)</label>
            <input
              type="text"
              className="form-control"
              value={originalPrice.toLocaleString()}
              disabled
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label>Giá mới (VND)</label>
            <input
              type="number"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <div className="form-group">
            <label>Mô tả sản phẩm</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-3">
          <div className="form-group">
            <label>Loại sản phẩm</label>
            <select
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="electronics">Điện tử</option>
              <option value="clothing">Thời trang</option>
              <option value="furniture">Nội thất</option>
            </select>
          </div>
        </div>

        <div className="col-md-3">
          <div className="form-group">
            <label>Số lượng sản phẩm</label>
            <input
              type="number"
              className="form-control"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-12">
          <div className="form-group">
            <label>Hình ảnh sản phẩm (URL)</label>
            <input
              type="text"
              className="form-control"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="form-actions d-flex justify-content-between">
        <button className="btn btn-primary" onClick={handleSave}>Lưu</button>
        <button className="btn btn-secondary" onClick={onCancel}>Hủy</button>
      </div>
    </div>
  );
};

export default EditProduct;
