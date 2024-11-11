import { memo } from "react";
import { StyledTabs } from "./style";
import "./UserOrder.scss";
import iconSearch from "../../../assets/images/icon-search.svg";

function UserOrder() {
  return (
    <>
      <div className="container">
        <div className="row mt-4 mb-2">
          <div className="col-12">
            <h3>Đơn hàng của tôi</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="inner-wrap-user-order">
              <div className="inner-tabs">
                <StyledTabs />
              </div>
              <div className="inner-search">
                <form action="#">
                  <input
                    type="text"
                    placeholder="Tìm kiếm đơn hàng theo Mã đơn hàng, Nhà bán hoặc Tên sản phẩm"
                    className="form-control"
                  />
                  <button type="submit" className="btn">
                    <img src={iconSearch} alt="" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(UserOrder);
