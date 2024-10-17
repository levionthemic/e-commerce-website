import axios from 'axios';

// Khởi tạo một instance axios với cấu hình mặc định
export const axiosJWT = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Hàm đăng nhập
export const login = async (credentials) => {
  try {
    const response = await axios.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi đăng nhập:', error);
    throw error;
  }
};

// Hàm lấy thông tin chi tiết người dùng
export const getDetailsUser = async (userId, token) => {
  try {
    const response = await axiosJWT.get(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy thông tin người dùng:', error);
    throw error;
  }
};

// Hàm làm mới access token
export const refreshToken = async (refreshToken) => {
  try {
    const response = await axios.post('/auth/refresh-token', {
      token: refreshToken,
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi làm mới token:', error);
    throw error;
  }
};