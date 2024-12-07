import React, { useState } from "react";
import { Tabs, Table, Tag, Button, Input, DatePicker, Space } from "antd";
import "./ManageOrders.scss";
import {
  StyledTabs,
  StyledInput,
  StyledCheckSquare,
  StyledCloseSquare,
} from "./Style";
import { CloseSquareFilled, CheckSquareFilled } from "@ant-design/icons";
const { TabPane } = StyledTabs;
const { RangePicker } = DatePicker;

const OrderManagement = () => {
  const [searchValue, setSearchValue] = useState("");
  const [dateRange, setDateRange] = useState(null);
  const [orders, setOrders] = useState([
    {
      key: "1",
      product: "Bánh chưng ngày tết trung thu",
      quantity: "2",
      buyer: "Khoa",
      total: "537,700",
      status: "Chờ xác nhận",
      shipping: "Nhanh",
      orderId: "211222S6KHSTX3",
      orderDate: "06-11-2024",
    },
    {
      key: "2",
      product: "Cành đào mừng lễ giáng sinh",
      quantity: "3",
      buyer: "Thắng",
      total: "537,700",
      status: "Đã hủy",
      shipping: "Nhanh",
      orderId: "211222RY7904A9",
      orderDate: "20-11-2024",
    },
    {
      key: "3",
      product: "Giá Úp Cốc Mạ Vàng Sang Chảnh Mới Nhất 2024",
      quantity: "5",
      buyer: "Thiện",
      total: "183,000",
      status: "Đang vận chuyển",
      shipping: "Nhanh",
      orderId: "211222RGQHWRS4",
      orderDate: "09-10-2024",
    },
  ]);

  const handleConfirmOrder = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === orderId ? { ...order, status: "Chờ lấy hàng" } : order
      )
    );
  };

  const handleRejectOrder = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === orderId ? { ...order, status: "Đã hủy" } : order
      )
    );
  };

  const getFilteredData = (status) => {
    return orders.filter((order) => {
      // Kiểm tra trạng thái đơn hàng
      const matchesStatus = status ? order.status === status : true;

      // Kiểm tra giá trị tìm kiếm (tìm theo tên sản phẩm hoặc mã đơn hàng)
      const matchesSearch =
        searchValue === "" ||
        order.product.toLowerCase().includes(searchValue.toLowerCase()) ||
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
      dataIndex: "product",
      key: "product",
      width: 200,
    },
    {
      title: "Người đặt",
      dataIndex: "buyer",
      key: "buyer",
    },

    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },

    {
      title: "Thành tiền",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "orange";
        if (status === "Đã hủy") color = "red";
        if (status === "Đang vận chuyển") color = "green";
        if (status === "Chờ lấy hàng") color = "blue";
        if (status === "Đã giao") color = "green";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Vận chuyển",
      dataIndex: "shipping",
      key: "shipping",
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
        record.status === "Chờ xác nhận" ? (
          <Space className="action">
            <StyledCheckSquare
              onClick={() => handleConfirmOrder(record.orderId)}
            ></StyledCheckSquare>
            <div classname="deny">
              <StyledCloseSquare
                onClick={() => handleRejectOrder(record.orderId)}
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
          <Table
            columns={columns}
            dataSource={getFilteredData("Chờ xác nhận")}
          />
        </TabPane>
        <TabPane tab="Chờ lấy hàng" key="3">
          <Table
            columns={columns}
            dataSource={getFilteredData("Chờ lấy hàng")}
          />
        </TabPane>
        <TabPane tab="Đang vận chuyển" key="4">
          <Table
            columns={columns}
            dataSource={getFilteredData("Đang vận chuyển")}
          />
        </TabPane>
        <TabPane tab="Đã giao" key="5">
          <Table columns={columns} dataSource={getFilteredData("Đã giao")} />
        </TabPane>
        <TabPane tab="Đã hủy" key="6">
          <Table columns={columns} dataSource={getFilteredData("Đã hủy")} />
        </TabPane>
      </StyledTabs>
    </div>
  );
};

export default OrderManagement;
