import React, { useState } from "react";
import "./ShopProfile.css";
import {
  FaPhone,
  FaEnvelope,
  FaBuilding,
  FaClock,
  FaStore,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

const ShopProfile = () => {
  const [profile, setProfile] = useState({
    shopname: "Cửa Hàng ABC",
    description: "Chuyên cung cấp các sản phẩm chất lượng cao.",
    address: "123 Đường ABC, Quận X, TP. HCM",
    phone: "0123456789",
    email: "cuahangabc@example.com",
    businessType: "Bán lẻ - Thời trang",
    workingHours: "08:00 - 22:00 (Thứ 2 - Chủ Nhật)",
    establishedDate: "01/01/2020",
    featuredProduct: "Điện thoại iPhone 14 Pro Max",
    socialLinks: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      twitter: "https://twitter.com",
    },
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEditMode = () => setIsEditing(!isEditing);

  return (
    <div className="shop-profile">
      {/* Banner */}
      <div className="banner-container">
        <img
          src="https://via.placeholder.com/1200x300"
          alt="Shop Banner"
          className="banner-img"
        />
        <button className="change-banner">Thay đổi ảnh bìa</button>
      </div>

      {/* Avatar */}
      <div className="avatar-container">
        <img
          src="https://via.placeholder.com/150"
          alt="Avatar"
          className="avatar-img"
        />
        <button className="change-avatar">Thay đổi ảnh đại diện</button>
      </div>

      {/* Tên cửa hàng */}
      <div className="shop-name">
        {isEditing ? (
          <div className="edit-shop-name">
            <label htmlFor="shopname" className="form-label">
              <h5 className="shop-title">Tên Shop</h5>
            </label>
            <input
              type="text"
              id="shopname"
              className="form-control shop-name-input"
              name="shopname"
              value={profile.shopname}
              onChange={handleInputChange}
              placeholder="Nhập tên shop"
            />
          </div>
        ) : (
          <h2>{profile.shopname}</h2>
        )}
        <p>{profile.description}</p>
      </div>

      {/* Thông tin cửa hàng */}
      <div className="shop-info">
        <div className="row">
          <div className="card">
            <h5>
              <FaBuilding className="icon" /> Địa chỉ
            </h5>
            {isEditing ? (
              <input
                type="text"
                className="form-control"
                name="address"
                value={profile.address}
                onChange={handleInputChange}
              />
            ) : (
              <p>{profile.address}</p>
            )}
          </div>
          <div className="card">
            <h5>
              <FaPhone className="icon" /> Số điện thoại
            </h5>
            {isEditing ? (
              <input
                type="text"
                className="form-control"
                name="phone"
                value={profile.phone}
                onChange={handleInputChange}
              />
            ) : (
              <p>{profile.phone}</p>
            )}
          </div>
          <div className="card">
            <h5>
              <FaEnvelope className="icon" /> Email
            </h5>
            {isEditing ? (
              <input
                type="email"
                className="form-control"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
              />
            ) : (
              <p>{profile.email}</p>
            )}
          </div>
          <div className="card">
            <h5>
              <FaClock className="icon" /> Thời gian làm việc
            </h5>
            {isEditing ? (
              <input
                type="text"
                className="form-control"
                name="workingHours"
                value={profile.workingHours}
                onChange={handleInputChange}
              />
            ) : (
              <p>{profile.workingHours}</p>
            )}
          </div>
          <div className="card">
            <h5>
              <FaStore className="icon" /> Loại hình kinh doanh
            </h5>
            {isEditing ? (
              <input
                type="text"
                className="form-control"
                name="businessType"
                value={profile.businessType}
                onChange={handleInputChange}
              />
            ) : (
              <p>{profile.businessType}</p>
            )}
          </div>
          <div className="card">
            <h5>
              <FaStore className="icon" /> Ngày thành lập
            </h5>
            {isEditing ? (
              <input
                type="date"
                className="form-control"
                name="establishedDate"
                value={profile.establishedDate}
                onChange={handleInputChange}
              />
            ) : (
              <p>{profile.establishedDate}</p>
            )}
          </div>
          <div className="card">
            <h5>
              <FaStore className="icon" /> Sản phẩm nổi bật
            </h5>
            {isEditing ? (
              <input
                type="text"
                className="form-control"
                name="featuredProduct"
                value={profile.featuredProduct}
                onChange={handleInputChange}
              />
            ) : (
              <p>{profile.featuredProduct}</p>
            )}
          </div>
          <div className="card">
            <h5>
              <FaStore className="icon" /> Mạng xã hội
            </h5>
            <p>
              <a href={profile.socialLinks.facebook}>
                <FaFacebook /> Facebook
              </a>{" "}
              |{" "}
              <a href={profile.socialLinks.instagram}>
                <FaInstagram /> Instagram
              </a>{" "}
              |{" "}
              <a href={profile.socialLinks.twitter}>
                <FaTwitter /> Twitter
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Nút chỉnh sửa */}
      <div className="text-center">
        <button className="btn btn-primary" onClick={toggleEditMode}>
          {isEditing ? "Lưu thay đổi" : "Chỉnh sửa"}
        </button>
      </div>
    </div>
  );
};

export default ShopProfile;
