import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import "./ProductItem.css";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="product-item card p-3 mb-4">
      <img
        src={product.image || "/images/default/default-product.png"}
        alt={product.name}
        className="card-img-top"
      />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">Giá: {product.price.toLocaleString()} VNĐ</p>
        <button className="btn btn-primary" onClick={handleAddToCart}>
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
