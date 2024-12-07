import React, { memo, useEffect, useState } from "react";
import { Table, Tag, Button, DatePicker, Space } from "antd";
import "./ManageOrders.scss";
import {
  StyledTabs,
  StyledInput,
  StyledCheckSquare,
  StyledCloseSquare,
} from "./Style";
import { axiosApi } from "../../../services/UserService";

const { TabPane } = StyledTabs;
const { RangePicker } = DatePicker;

const ManageOrders = () => {
  const [searchValue, setSearchValue] = useState("");
  const [dateRange, setDateRange] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axiosApi.get("/api/v1/seller/order").then((res) => {
      setOrders(res.data.orders);
    });
  }, []);
  // const handleConfirmOrder = (orderId) => {
  //   setOrders((prevOrders) =>
  //     prevOrders.map((order) =>
  //       order.orderId === orderId ? { ...order, status: "Chờ lấy hàng" } : order
  //     )
  //   );
  // };

  // const handleRejectOrder = (productId) => {
  //   setOrders((prevOrders) =>
  //     prevOrders.map((order) => 
  //       order.productId === productId ? { ...order, status: "cancelled" } : order
  //     )
  //   );
  // };

  const getFilteredData = (status) => {
    return orders.filter((order) => {
      // Kiểm tra trạng thái đơn hàng
      const matchesStatus = status ? order.status === status : true;

      // Kiểm tra giá trị tìm kiếm (tìm theo tên sản phẩm hoặc mã đơn hàng)
      const matchesSearch =
        searchValue === "" ||
        order.orderId.toLowerCase().includes(searchValue.toLowerCase()) ||
        order.orderId.toLowerCase().includes(searchValue.toLowerCase());

      // Kiểm tra ngày đặt hàng
      const matchesDate =
        !dateRange ||
        (dateRange[0] &&
          dateRange[1] &&
          (() => {
            const [startDay, startMonth, startYear] = dateRange[0]
              .format("DD-MM-YYYY")
              .split("-");
            const [endDay, endMonth, endYear] = dateRange[1]
              .format("DD-MM-YYYY")
              .split("-");
            const [orderDay, orderMonth, orderYear] =
              order.orderDate.split("-");

            const startDate = new Date(startYear, startMonth - 1, startDay);
            const endDate = new Date(endYear, endMonth - 1, endDay);
            const orderDate = new Date(orderYear, orderMonth - 1, orderDay);

            return orderDate >= startDate && orderDate <= endDate;
          })());

      return matchesStatus && matchesSearch && matchesDate;
    });
  };

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "productName",
      key: "productName",
      width: 200,
    },
    {
      title: "Người đặt",
      dataIndex: "userName",
      key: "userName",
    },

    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },

    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <>
          {price.toLocaleString()}
          <sup>đ</sup>
        </>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        if (status === "pending") return <Tag color={"red"}>Chờ xác nhận</Tag>;
        if (status === "delivering")
          return <Tag color={"orange"}>Chờ lấy hàng</Tag>;
        if (status === "packaging")
          return <Tag color={"blue"}>Đang vận chuyển</Tag>;
        if (status === "delivered") return <Tag color={"green"}>Đã giao</Tag>;
        return <Tag color={"gray"}>Đã hủy</Tag>;
      },
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Ngày đặt",
      dataIndex: "orderDate",
      key: "orderDate",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) =>
        record.status === "pending" ? (
          <Space className="action">
            <StyledCheckSquare
              // onClick={() => handleConfirmOrder(record.orderId)}
            ></StyledCheckSquare>
            <div classname="deny">
              <StyledCloseSquare
                // onClick={() => handleRejectOrder(record.productId)}
              ></StyledCloseSquare>
            </div>
          </Space>
        ) : null,
    },
  ];

  return (
    <div className="inner-wrap-order-management">
      <h2 className="mb-3">Quản lý đơn hàng</h2>
      <StyledTabs defaultActiveKey="1">
        <TabPane tab="Tất cả" key="1">
          <div
            classname="inner-search"
            style={{ marginBottom: 16, display: "flex", gap: "10px" }}
          >
            <StyledInput
              placeholder="Tìm kiếm đơn hàng theo Mã đơn hàng hoặc Tên sản phẩm"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <RangePicker
              format="DD-MM-YYYY"
              onChange={(dates) => setDateRange(dates)}
            />

            <Button type="primary" onClick={() => setSearchValue("")}>
              Reset
            </Button>
          </div>
          <Table columns={columns} dataSource={getFilteredData()} />
        </TabPane>
        <TabPane tab="Chờ xác nhận" key="2">
          <Table columns={columns} dataSource={getFilteredData("pending")} />
        </TabPane>
        <TabPane tab="Chờ lấy hàng" key="3">
          <Table columns={columns} dataSource={getFilteredData("packaging")} />
        </TabPane>
        <TabPane tab="Đang vận chuyển" key="4">
          <Table columns={columns} dataSource={getFilteredData("delivering")} />
        </TabPane>
        <TabPane tab="Đã giao" key="5">
          <Table columns={columns} dataSource={getFilteredData("delivered")} />
        </TabPane>
        <TabPane tab="Đã hủy" key="6">
          <Table columns={columns} dataSource={getFilteredData("cancelled")} />
        </TabPane>
      </StyledTabs>
    </div>
  );
};

export default memo(ManageOrders);
