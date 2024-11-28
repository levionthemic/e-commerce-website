import React, { useState } from "react";
import "./ChatWindow.css";

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Khách hàng",
      text: "Xin chào! Tôi muốn hỏi về sản phẩm này.",
    },
    { id: 2, sender: "Shop", text: "Chào bạn! Bạn cần hỗ trợ thông tin gì ạ?" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { id: Date.now(), sender: "Shop", text: newMessage },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header"></div>
      <div className="chat-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${
              message.sender === "Shop" ? "shop-message" : "customer-message"
            }`}
          >
            <span className="sender">{message.sender}:</span>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Nhập tin nhắn..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Gửi</button>
      </div>
    </div>
  );
};

export default ChatWindow;
