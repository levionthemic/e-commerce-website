import { memo } from "react";
import "./Checkout.scss";

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
            <div className="inner-section">
              <h4>Chọn hình thức giao hàng</h4>
              <div className="form-check">
                <input type="radio" className="form-check-input" name="transfer-type" id="type1"/>
                <label htmlFor="type1">Giao hàng tiết kiệm</label>
              </div>
              <div className="form-check">
                <input type="radio" className="form-check-input" name="transfer-type" id="type2"/>
                <label htmlFor="type2">Giao hàng nhanh</label>
              </div>
              <div className="inner-order-list">
                <div className="inner-order">
                  <p>Giao vào chủ nhật 17/11</p>
                  <div className="inner-info">
                    <div className="inner-left">
                      <div className="inner-image">
                        <img src="" alt=""/>
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
            <div className="ineer-section">
              <h4>Chọn hình thức thanh toán</h4>
              <div className="form-check">
                <input type="radio" className="form-check-input" />
                <label htmlFor="pay-type">Thanh toán tiền mặt</label>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="inner-section">
              
            </div>
            <div className="ineer-section"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(Checkout);
