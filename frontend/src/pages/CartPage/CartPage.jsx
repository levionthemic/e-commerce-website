import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../../redux/slices/cartSlice";
import "./CartPage.css";

const CartPage = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const [selectedItems, setSelectedItems] = useState({});

  // Toggle selection for each item
  const handleToggleSelect = (id) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Calculate total of selected items
  const selectedTotalAmount = items
    .filter((item) => selectedItems[item.id])
    .reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container my-5 cart-page">
      <h2 className="mb-4">Giỏ Hàng Của Bạn</h2>
      {items.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống.</p>
      ) : (
        <>
          <div className="cart-store-section">
            <div className="cart-store-header d-flex align-items-center mb-3">
              <input type="checkbox" className="me-2" />
              <h5 className="store-name">Nhà Sách Phương Thu</h5>
            </div>
            <div className="cart-items">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="cart-item row align-items-center py-3 border-bottom"
                >
                  <div className="col-md-1 text-center">
                    <input
                      type="checkbox"
                      checked={!!selectedItems[item.id]}
                      onChange={() => handleToggleSelect(item.id)}
                    />
                  </div>
                  <div className="col-md-2">
                    <img
                      src={item.image || "/images/default/default-product.png"}
                      alt={item.name}
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-3">
                    <h5>{item.name}</h5>
                    <p className="text-muted">
                      Phân loại: {item.category || "N/A"}
                    </p>
                  </div>
                  <div className="col-md-2 text-center">
                    <span>{item.price.toLocaleString()} VNĐ</span>
                  </div>
                  <div className="col-md-2 d-flex align-items-center justify-content-center">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => dispatch(increaseQuantity(item.id))}
                    >
                      +
                    </button>
                  </div>
                  <div className="col-md-1 text-center">
                    <span>
                      {(item.price * item.quantity).toLocaleString()} VNĐ
                    </span>
                  </div>
                  <div className="col-md-1 text-center">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="d-flex justify-content-between mt-4">
            {/* Voucher Section */}
            <div className="voucher-section">
              <h5>Chọn Mã Giảm Giá</h5>
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Nhập mã giảm giá của bạn"
              />
            </div>

            {/* Summary Section */}
            <div className="summary-section text-end">
              <h5>Tổng cộng: {selectedTotalAmount.toLocaleString()} VNĐ</h5>
              <button className="btn btn-success mt-3">Mua Hàng</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
