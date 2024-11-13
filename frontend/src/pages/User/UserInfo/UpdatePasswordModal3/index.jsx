import { memo } from "react";
import { CustomModal } from "../style";
import { useSelector, useDispatch } from "react-redux";
import {
  closeModal3,
  openModal2,
} from "../../../../redux/slices/UpdatePasswordModalSlice";
import img from "../../../../assets/images/lock-icon.svg";
import img2 from "../../../../assets/images/goback-icon.svg";
import "./UpdatePasswordModal3.scss";

function UpdatePasswordModal3() {
  const updatePasswordModal = useSelector(
    (state) => state.updatePasswordModal.modal3
  );
  const dispatch = useDispatch();
  return (
    <>
      <CustomModal
        open={updatePasswordModal}
        onOk={() => dispatch(closeModal3())}
        onCancel={() => dispatch(closeModal3())}
        width={400}
        footer={null}
        closeIcon={null}
      >
        <div className="inner-wrap-modal-3">
          <div
            className="inner-goback"
            onClick={() => {
              dispatch(closeModal3());
              dispatch(openModal2());
            }}
          >
            <img src={img2} alt="" />
          </div>
          <div className="inner-title">
            <h4>Cập nhật mật khẩu</h4>
            <img src={img} alt="" />
          </div>
          <div className="inner-form">
            <form action="">
              <input
                type="password"
                className="form-control"
                placeholder="Nhập mật khẩu mới"
                required
              />
              <input
                type="password"
                className="form-control"
                placeholder="Xác nhận mật khẩu"
                required
              />

              <button type="submit" className="btn">
                Xác nhận
              </button>
            </form>
          </div>
        </div>
      </CustomModal>
    </>
  );
}

export default memo(UpdatePasswordModal3);
