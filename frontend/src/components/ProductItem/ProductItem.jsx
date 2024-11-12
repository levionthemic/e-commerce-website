import React from "react";
import "./ProductItem.css";

const ProductItem = ({ product }) => {
  console.log("Dữ liệu sản phẩm trong ProductItem:", product); // Kiểm tra dữ liệu sản phẩm

  return (
    <div className="product-item card p-3 mb-4">
      <img
        src={product.thumbnail_url || "/images/default/default-product.png"}
        alt={product.name}
        className="card-img-top"
      />
      <div className="product-info">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-category">
          {product.primary_category_path || "Không rõ"}
        </p>
        <p className="card-description">
          {product.description?.slice(0, 50) || "Mô tả không có sẵn"}...
        </p>
        <p className="card-price">
          Giá:{" "}
          {(
            product.price *
            (1 - (product.discount_rate || 0) / 100)
          ).toLocaleString()}{" "}
          VNĐ
        </p>

        <div className="product-extra-info">
          <span className="rating">
            ⭐ {product.rating_average || "Chưa có đánh giá"}
          </span>
          <span className="sold">
            Đã bán: {product.quantity_sold?.value || "0"}
          </span>
        </div>

        <p className="brand">Thương hiệu: {product.brand || "Không rõ"}</p>
        <p className="warranty">
          Bảo hành:{" "}
          {product.dimensions?.warrantyInformation || "Không có thông tin"}
        </p>
        <p className="shipping">
          Vận chuyển:{" "}
          {product.dimensions?.shippingInformation || "Không có thông tin"}
        </p>
      </div>

      <button className="btn btn-primary">Thêm vào giỏ hàng</button>
    </div>
  );
};

export default ProductItem;
