import React from "react";
import "./ShopOverview.css";

const ShopOverview = () => {
  // Dummy data cho tổng quan
  const statistics = {
    totalProducts: 120,
    totalOrders: 85,
    totalRevenue: 125000000, // 125 triệu
    pendingOrders: 15,
    bestSellingProduct: "iPhone 14 Pro Max",
  };

  return (
    <div className="shop-overview">
      <div className="overview-header">
        <h2>Tổng quan</h2>
      </div>
      <div className="overview-cards">
        {/* Card 1: Tổng số sản phẩm */}
        <div className="overview-card">
          <h3>Tổng Số Sản Phẩm</h3>
          <p>{statistics.totalProducts}</p>
        </div>

        {/* Card 2: Tổng số đơn hàng */}
        <div className="overview-card">
          <h3>Tổng Số Đơn Hàng</h3>
          <p>{statistics.totalOrders}</p>
        </div>

        {/* Card 3: Tổng doanh thu */}
        <div className="overview-card">
          <h3>Tổng Doanh Thu</h3>
          <p>{statistics.totalRevenue.toLocaleString()} VNĐ</p>
        </div>

        {/* Card 4: Đơn hàng đang chờ xử lý */}
        <div className="overview-card">
          <h3>Đơn Hàng Chờ Xử Lý</h3>
          <p>{statistics.pendingOrders}</p>
        </div>

        {/* Card 5: Sản phẩm bán chạy nhất */}
        <div className="overview-card">
          <h3>Sản Phẩm Bán Chạy Nhất</h3>
          <p>{statistics.bestSellingProduct}</p>
        </div>
        
        <div className="overview-card">
          <h3>Đơn Hàng Đã Hủy</h3>
          <p>{statistics.bestSellingProduct}</p>
        </div>
      </div>
    </div>
  );
};

export default ShopOverview;
