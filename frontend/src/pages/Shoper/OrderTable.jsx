import React from "react";

const OrderTable = ({ orders, onStatusChange }) => {
  return (
    <table className="order-table">
      <thead>
        <tr>
          <th>Tên khách hàng</th>
          <th>Tổng tiền</th>
          <th>Trạng thái</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.customerName}</td>
            <td>{order.total.toLocaleString()} VNĐ</td>
            <td>{order.status}</td>
            <td>
              <select
                value={order.status}
                onChange={(e) => onStatusChange(order.id, e.target.value)}
              >
                <option value="Chờ xác nhận">Chờ xác nhận</option>
                <option value="Đang giao">Đang giao</option>
                <option value="Đã giao">Đã giao</option>
                <option value="Đã hủy">Đã hủy</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
