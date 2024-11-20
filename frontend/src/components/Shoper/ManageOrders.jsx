import React, { useState } from "react";
import { Tabs, Table, Tag, Button, Input, DatePicker } from "antd";
import "./ManageOrders.css";


const { TabPane } = Tabs;
const { RangePicker } = DatePicker;




const OrderManagement = () => {
  const [searchValue, setSearchValue] = useState("");
  const [ setDateRange] = useState(null);

  const data = [
    {
      key: "1",
      product: "Bộ Khay Mứt Tết Cành Đào Gốm Sứ Tráng Men Bát Tràng | Khay Bánh Kẹo",
      type: "HOA ĐÀO XANH",
      total: "537,700",
      status: "Chờ lấy hàng",
      shipping: "Nhanh",
      orderId: "211222S6KHSTX3",
      action: "Chuẩn bị hàng",
    },
    {
      key: "2",
      product: "Bộ Khay Mứt Tết Cành Đào Gốm Sứ Tráng Men Bát Tràng | Khay Bánh Kẹo",
      type: "HOA ĐÀO HỒNG",
      total: "537,700",
      status: "Đã hủy",
      shipping: "Nhanh",
      orderId: "211222RY7904A9",
      action: "Xem chi tiết",
    },
    {
      key: "3",
      product: "Giá Úp Cốc Mạ Vàng Sang Chảnh Mới Nhất 2021 Hàng Cao Cấp",
      type: "HƯƠU",
      total: "183,000",
      status: "Đã giao cho DVVC",
      shipping: "Nhanh",
      orderId: "211222RGQHWRS4",
      action: "Xem chi tiết",
    },
  ];

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Phân loại",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Tổng đơn hàng",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "blue";
        if (status === "Đã hủy") color = "red";
        if (status === "Đã giao cho DVVC") color = "green";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Vận chuyển",
      dataIndex: "shipping",
      key: "shipping",
    },
    {
      title: "ID Đơn hàng",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      render: (text) => <Button type="link">{text}</Button>,
    },
  ];

  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Tất cả" key="1">
          <div style={{ marginBottom: 16, display: "flex", gap: "10px" }}>
            <Input
              placeholder="Mã đơn hàng"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <RangePicker onChange={(dates) => setDateRange(dates)} />
            <Button type="primary">Tìm kiếm</Button>
          </div>
          <Table columns={columns} dataSource={data} />
        </TabPane>
        <TabPane tab="Chờ xác nhận" key="2">
          <p>Không có dữ liệu.</p>
        </TabPane>
        <TabPane tab="Chờ lấy hàng" key="3">
          <p>Không có dữ liệu.</p>
        </TabPane>
        <TabPane tab="Đang giao" key="4">
          <p>Không có dữ liệu.</p>
        </TabPane>
        <TabPane tab="Đã giao" key="5">
          <p>Không có dữ liệu.</p>
        </TabPane>
        <TabPane tab="Đơn hủy" key="6">
          <p>Không có dữ liệu.</p>
        </TabPane>
        <TabPane tab="Trả hàng/Hoàn tiền" key="7">
          <p>Không có dữ liệu.</p>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default OrderManagement;
