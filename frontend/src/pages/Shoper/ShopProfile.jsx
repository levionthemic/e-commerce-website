import React, { useState } from "react";

const ShopProfile = () => {
  const [profile, setProfile] = useState({
    name: "Cửa hàng ABC",
    description: "Chuyên cung cấp các sản phẩm chất lượng cao.",
    address: "123 Đường ABC, Quận X, TP. HCM",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Thông tin mới:", profile);
    setIsEditing(false);
    // Gửi API cập nhật thông tin cửa hàng
  };

  return (
    <div className="shop-profile">
      <h1>Hồ sơ cửa hàng</h1>
      {isEditing ? (
        <div className="profile-form">
          <label>
            Tên cửa hàng:
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Mô tả:
            <textarea
              name="description"
              value={profile.description}
              onChange={handleChange}
            />
          </label>
          <label>
            Địa chỉ:
            <input
              type="text"
              name="address"
              value={profile.address}
              onChange={handleChange}
            />
          </label>
          <button onClick={handleSave}>Lưu</button>
        </div>
      ) : (
        <div className="profile-display">
          <p>
            <strong>Tên cửa hàng:</strong> {profile.name}
          </p>
          <p>
            <strong>Mô tả:</strong> {profile.description}
          </p>
          <p>
            <strong>Địa chỉ:</strong> {profile.address}
          </p>
          <button onClick={() => setIsEditing(true)}>Chỉnh sửa</button>
        </div>
      )}
    </div>
  );
};

export default ShopProfile;
