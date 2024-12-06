import { memo, useEffect, useState } from "react";
import { Table, Tag } from "antd";
import { axiosApi } from "../../../../../services/UserService";

function TabItem({ status }) {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    axiosApi
      .get(`/api/v1/user/order`, { params: { status: status } })
      .then((res) => {
        setOrderList(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [status]);

  const getStatus = (status) => {
    switch (status) {
      case "confirming":
        return "Chờ xác nhận";
      case "pending":
        return "Đang xử lý";
      case "delivering":
        return "Đang vận chuyển";
      case "delivered":
        return "Đã giao";
      case "discarded":
        return "Đã hủy";
      default:
        return "";
    }
  };

  const columns = [
    {
      title: "Ảnh sản phẩm",
      dataIndex: "product_image",
      key: "product_image",
      render: (thumbnail_url) => (
        <img src={thumbnail_url} alt="" height={"100px"} width={"100px"} />
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "order_id",
      key: "order_id",
    },
    {
      title: "Số lượng",
      key: "quantity",
      dataIndex: "quantity",
    },
    {
      title: "Thành tiền",
      key: "total_price",
      dataIndex: "total_price",
      render: (total_price) => (
        <>
          {total_price.toLocaleString()}
          <sup>đ</sup>
        </>
      ),
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (status) => <Tag color="volcano">{status}</Tag>,
    },
  ];

  let data = [];
  if (orderList.length) {
    orderList.forEach((order) => {
      order.products.forEach((product) => {
        data.push({
          product_image: product.thumbnail_url,
          product_name: product.name,
          order_id: order.orderId,
          quantity: product.quantity,
          total_price: parseInt(
            product.original_price *
              (1 - product.discount_rate / 100) *
              product.quantity
          ),
          status: getStatus(order.status),
        });
      });
    });
  }

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        style={{ borderRadius: "10px", overflow: "hidden" }}
      />
    </>
  );
}

export default memo(TabItem);
