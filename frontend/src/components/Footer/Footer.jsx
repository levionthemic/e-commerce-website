// Footer Component (React Layout with Enhanced Design and Features)
// File: src/components/Footer/Footer.jsx
import React, { useState } from "react";
import "./Footer.css";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaCopy,
  FaCheck,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copiedItem, setCopiedItem] = useState(null);

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log("Email to subscribe:", email);
    setSubmitted(true);
    console.log("Subscription form submitted successfully");
  };

  const handleCopy = (text, item) => {
    navigator.clipboard.writeText(text);
    console.log(`Copied: ${text}`);
    setCopiedItem(item);
    setTimeout(() => setCopiedItem(null), 2000); // Reset after 2 seconds
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Customer Support Section */}
        <div className="footer__section footer__links">
          <h3>Chăm sóc khách hàng</h3>
          <ul>
            <li>
              <a href="/help">Trung tâm trợ giúp</a>
            </li>
            <li>
              <a href="/blog">Blog</a>
            </li>
            <li>
              <a href="/mall">Mall</a>
            </li>
            <li>
              <a href="/guide">Hướng dẫn mua hàng</a>
            </li>
            <li>
              <a href="/returns">Trả hàng & hoàn tiền</a>
            </li>
          </ul>
        </div>
        {/* About Section */}
        <div className="footer__section footer__about">
          <h3>Về chúng tôi</h3>
          <ul>
            <li>
              <a href="/about">Giới thiệu về công ty</a>
            </li>
            <li>
              <a href="/careers">Tuyển dụng</a>
            </li>
            <li>
              <a href="/terms">Điều khoản sử dụng</a>
            </li>
            <li>
              <a href="/privacy">Chính sách bảo mật</a>
            </li>
          </ul>
        </div>
        {/* Social Media Links Section */}
        <div className="footer__section footer__social">
          <h3>Theo dõi chúng tôi trên</h3>
          <div className="footer__social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
        {/* Newsletter Subscription Section */}
        <div className="footer__section footer__newsletter">
          <h3>Đăng ký nhận tin</h3>
          {submitted ? (
            <p>Cảm ơn bạn đã đăng ký! Hãy kiểm tra email để xác nhận.</p>
          ) : (
            <form onSubmit={handleSubscribe}>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  console.log("Email input updated:", e.target.value);
                }}
                placeholder="Nhập email của bạn"
                required
              />
              <button type="submit">Đăng ký</button>
            </form>
          )}
        </div>
      </div>
      <div className="footer__contact-section">
        <h3>Liên hệ</h3>
        <div className="footer__contact">
          <p>
            Địa chỉ: Số 123, Đường ABC, Thành phố XYZ
            {copiedItem === "address" ? (
              <FaCheck className="copy-icon" />
            ) : (
              <FaCopy
                className="copy-icon"
                onClick={() =>
                  handleCopy("Số 123, Đường ABC, Thành phố XYZ", "address")
                }
              />
            )}
          </p>
          <p>
            Điện thoại: 0123 456 789
            {copiedItem === "phone" ? (
              <FaCheck className="copy-icon" />
            ) : (
              <FaCopy
                className="copy-icon"
                onClick={() => handleCopy("0123 456 789", "phone")}
              />
            )}
          </p>
          <p>
            Email: support@example.com
            {copiedItem === "email" ? (
              <FaCheck className="copy-icon" />
            ) : (
              <FaCopy
                className="copy-icon"
                onClick={() => handleCopy("support@example.com", "email")}
              />
            )}
          </p>
        </div>
      </div>
      <div className="footer__address">
        <p>© 2024 Công ty TNHH FKCJ. Tất cả các quyền được bảo lưu.</p>
      </div>
    </footer>
  );
};

export default Footer;
