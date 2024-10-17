// src/pages/Login/Login.jsx
import React, { useState } from 'react';
import './Login.css'; // Nếu cần, bạn có thể tạo file CSS tương ứng

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý đăng nhập ở đây (gọi API hoặc kiểm tra thông tin)
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="login-container">
      <h1>Đăng Nhập</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Tên đăng nhập:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Mật khẩu:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Đăng Nhập</button>
      </form>
    </div>
  );
};

export default Login;
