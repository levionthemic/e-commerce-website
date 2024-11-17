import React, { useEffect, useState } from "react";
import "./CartPage.css";
import { axiosApi } from "../../services/UserService";
import { cookies } from "../../helpers/cookies";
import { useNavigate } from "react-router-dom";
import { Table } from "antd";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { decreaseCartQuantity } from "../../redux/slices/cartSlice";

const CartPage = () => {
  const [cartList, setCartList] = useState([]);
  const [quantities, setQuantities] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartQuantity = useSelector((state) => state.cart.quantity);

  const handleIncreaseQuantity = (e) => {
    const indexRow =
      e.target.parentElement.parentElement.parentElement.getAttribute(
        "data-row-key"
      );
    let temp = [...quantities];
    temp[indexRow]++;
    setQuantities(temp);
  };

  const handleDecreaseQuantity = (e) => {
    const indexRow =
      e.target.parentElement.parentElement.parentElement.getAttribute(
        "data-row-key"
      );
    let temp = [...quantities];
    temp[indexRow] = Math.max(temp[indexRow] - 1, 1);
    setQuantities(temp);
  };

  const handleDelete = (e) => {
    Swal.fire({
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      title: "Cảnh báo!",
      text: "Bạn có chắc chắn muốn cập nhật?",
      confirmButtonText: "Cập nhật",
      cancelButtonText: "Hủy",
    }).then((res) => {
      if (res.isConfirmed) {
        const indexRow =
          e.target.parentElement.parentElement.getAttribute("data-row-key");
        axiosApi
          .post("/api/v1/cart/delete", {
            cartId: cookies().cartId,
            productId: cartList[indexRow].id,
          })
          .then(() => {
            Swal.fire({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
              icon: "success",
              title: "Xóa sản phẩm khỏi giỏ hàng thành công!",
            });
            dispatch(decreaseCartQuantity(1));
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const totalPrice = cartList.reduce(
    (sum, item, index) =>
      sum +
      quantities[index] * item.original_price * (1 - item.discount_rate / 100),
    0
  );

  useEffect(() => {
    axiosApi
      .get("/api/v1/cart/" + cookies().cartId)
      .then((res) => {
        setCartList(res.data.data);
        setQuantities(res.data.data.map((item) => item.quantity));
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, [cartQuantity]);

  const columns = [
    {
      title: "",
      key: "selected",
      dataIndex: "selected",
      render: (selected) => (
        <input type="checkbox" name="select" selected={selected} />
      ),
    },
    {
      title: "Ảnh sản phẩm",
      key: "thumbnail",
      dataIndex: "thumbnail",
      render: (thumbnail) => (
        <img src={thumbnail} alt="" width={"100px"} height="100px" />
      ),
    },
    {
      title: "Thông tin sản phẩm",
      key: "info",
      dataIndex: "info",
      render: ([name, category]) => (
        <div>
          <h6>{name}</h6>
          <p>
            Phân loại: <i>{category}</i>
          </p>
        </div>
      ),
    },
    {
      title: "Đơn giá",
      key: "price",
      dataIndex: "price",
      render: (price) => (
        <>
          {price.toLocaleString()}
          <sup>đ</sup>
        </>
      ),
    },
    {
      title: "Số lượng",
      key: "quantity",
      dataIndex: "quantity",
      render: (quantity) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            justifyContent: "center",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        >
          <button
            style={{
              border: "none",
              borderRight: "1px solid #ddd",
              background: "none",
              textAlign: "center",
              fontSize: "18px",
              padding: "0px 7px",
            }}
            onClick={handleDecreaseQuantity}
          >
            -
          </button>
          <div>{quantity}</div>
          <button
            style={{
              border: "none",
              borderLeft: "1px solid #ddd",
              background: "none",
              textAlign: "center",
              fontSize: "18px",
              padding: "0px 5px",
            }}
            onClick={handleIncreaseQuantity}
          >
            +
          </button>
        </div>
      ),
    },
    {
      title: "Thành tiền",
      key: "total_price",
      dataIndex: "total_price",
      render: (total_price) => (
        <div
          style={{
            fontSize: "18px",
            color: "red",
            fontWeight: 500,
            width: "110px",
          }}
        >
          {total_price.toLocaleString()}
          <sup>đ</sup>
        </div>
      ),
    },
    {
      title: "",
      key: "actions",
      dataIndex: "actions",
      render: () => (
        <button className="btn btn-danger" onClick={handleDelete}>
          Xóa
        </button>
      ),
    },
  ];

  const data = cartList.map((item, index) => ({
    key: index,
    selected: false,
    thumbnail: item.thumbnail_url,
    info: [item.name, item.categories.name],
    price: (
      item.original_price *
      (1 - item.discount_rate / 100)
    ).toLocaleString(),
    quantity: quantities[index],
    total_price:
      quantities[index] * item.original_price * (1 - item.discount_rate / 100),
  }));

  return (
    <div className="container my-5 cart-page">
      <h3 className="mb-4">Giỏ Hàng Của Bạn</h3>
      {cartList.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống.</p>
      ) : (
        <div className="position-relative">
          <Table dataSource={data} columns={columns} />

          <div className="summary-section text-end">
            <h5>
              Tổng cộng: {totalPrice.toLocaleString()}
              <sup>đ</sup>
            </h5>
            <button
              className="btn btn-success mt-3"
              onClick={() => {
                navigate("/checkout", { state: { cartList: cartList } });
              }}
            >
              Mua Hàng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
