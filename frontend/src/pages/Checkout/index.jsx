import { memo } from "react";
import "./Checkout.scss";
import img from "../../assets/images/image-login.jpg";
import icon from "../../assets/images/money-icon.svg";

function Checkout() {
  return (
    <>
      <div className="container">
        <div className="row mt-4 mb-2">
          <div className="col-12">
            <h3>Thanh toán</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-9">
            <div className="inner-section inner-section-1">
              <h4>Chọn hình thức giao hàng</h4>
              <div className="inner-form-check">
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="transfer-type"
                    id="type1"
                    checked
                  />
                  <label htmlFor="type1">Giao hàng tiết kiệm</label>
                </div>
                <div className="form-check form-check-disabled">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="transfer-type"
                    id="type2"
                    disabled
                  />
                  <label htmlFor="type2">Giao hàng nhanh</label>
                </div>
              </div>

              <div className="inner-order-list">
                <div className="inner-order">
                  <p>Giao vào chủ nhật 17/11</p>
                  <div className="inner-info">
                    <div className="inner-left">
                      <div className="inner-image">
                        <img src={img} alt="" />
                      </div>
                      <div className="inner-content">
                        <p>Nước hoa Gucci thơm mê lì</p>
                        <p>SL: x2</p>
                      </div>
                    </div>
                    <div className="inner-right">
                      <p>5.678.123đ</p>
                    </div>
                  </div>
                  <div className="inner-price">
                    <p>Tiền vận chuyển: </p>
                    <p>32.123đ</p>
                  </div>
                </div>
                <div className="inner-order">
                  <p>Giao vào chủ nhật 17/11</p>
                  <div className="inner-info">
                    <div className="inner-left">
                      <div className="inner-image">
                        <img src={img} alt="" />
                      </div>
                      <div className="inner-content">
                        <p>Nước hoa Gucci thơm mê lì</p>
                        <p>SL: x2</p>
                      </div>
                    </div>
                    <div className="inner-right">
                      <p>5.678.123đ</p>
                    </div>
                  </div>
                  <div className="inner-price">
                    <p>Tiền vận chuyển: </p>
                    <p>32.123đ</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="inner-section inner-section-2">
              <h4>Chọn hình thức thanh toán</h4>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  readOnly
                  checked
                />
                <label htmlFor="pay-type">
                  <span>Thanh toán tiền mặt</span>
                  <img src={icon} alt="" />
                  
                </label>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="inner-section inner-section-3">
              <div className="inner-title">
                <h4>Giao tới</h4>
                <span>Thay đổi</span>
              </div>
              <div className="inner-content">
                <div className="inner-info">
                  <span>Dũng Nguyễn</span>
                  <div className="divider"></div>
                  <span>0862787097</span>
                </div>
                <div className="inner-address">
                  138/52/15 Nguyễn Duy Cung, P.12, quận Gò Vấp, TPHCM
                </div>
              </div>
            </div>
            <div className="inner-section inner-section-4">
              <div className="inner-title">
                <h4>Đơn hàng</h4>
                <span>Thay đổi</span>
              </div>
              <div className="inner-quantity">
                <span>2 sản phẩm</span>
                <span>Thu gọn</span>
              </div>
              <div className="inner-products">
                <div className="inner-product">
                  <div>2</div>
                  <div>Nước hoa Gucci thơm mê lì</div>
                  <div>5.678.123đ</div>
                </div>
                <div className="inner-product">
                  <div>2</div>
                  <div>Nước hoa Gucci thơm mê lì</div>
                  <div>5.678.123đ</div>
                </div>
              </div>
              <div className="inner-info-prices">
                <div className="inner-price">
                  <span>Tổng tiền hàng</span>
                  <span>11.356.246đ</span>
                </div>
                <div className="inner-price">
                  <span>Phí vận chuyển</span>
                  <span>64.246đ</span>
                </div>
              </div>
              <div className="inner-price-total">
                <div>Tổng tiền thanh toán</div>
                <div>11.420.492đ</div>
                <p>
                  (Giá này đã bao gồm thuế GTGT, phí đóng gói, phí vận chuyển và
                  các chi phí phát sinh khác)
                </p>
              </div>
              <div className="inner-order-button">
                <button type="button" className="btn">
                  Đặt hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(Checkout);