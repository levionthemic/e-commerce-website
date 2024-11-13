import React from 'react';
import { Input, Button, Form, Divider, Row, Col, Card } from 'antd';
import { ShoppingCartOutlined, UserOutlined, HomeOutlined, CreditCardOutlined } from '@ant-design/icons';
import './Payment.css';

const Payment = () => {
  return (
    <div className="payment-container">
      <Row gutter={16}>
        {/* Bên trái: Thông tin thanh toán */}
        <Col span={12}>
          <Card title="Thông tin thanh toán" className="payment-info-card">
            <Form layout="vertical">
              <Form.Item label="Họ và tên" required>
                <Input placeholder="Nhập họ tên" prefix={<UserOutlined />} />
              </Form.Item>
              <Form.Item label="Địa chỉ giao hàng" required>
                <Input placeholder="Nhập địa chỉ" prefix={<HomeOutlined />} />
              </Form.Item>
              <Form.Item label="Số điện thoại" required>
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
              <Form.Item label="Email" required>
                <Input placeholder="Nhập email" />
              </Form.Item>
              <Form.Item label="Phương thức thanh toán" required>
                <Input placeholder="Nhập phương thức thanh toán" prefix={<CreditCardOutlined />} />
              </Form.Item>
            </Form>
          </Card>
        </Col>

        {/* Bên phải: Thông tin đơn hàng */}
        <Col span={12}>
          <Card title="Đơn hàng của bạn" className="order-info-card">
            <div className="order-item">
              <Row>
                <Col span={18}>
                  <strong>Sản phẩm A</strong>
                </Col>
                <Col span={6}>
                  <span className="order-price">100.000đ</span>
                </Col>
              </Row>
            </div>
            <div className="order-item">
              <Row>
                <Col span={18}>
                  <strong>Sản phẩm B</strong>
                </Col>
                <Col span={6}>
                  <span className="order-price">150.000đ</span>
                </Col>
              </Row>
            </div>
            <Divider />
            <div className="order-summary">
              <Row>
                <Col span={18}>
                  <strong>Tổng cộng</strong>
                </Col>
                <Col span={6}>
                  <span className="total-price">250.000đ</span>
                </Col>
              </Row>
            </div>
            <Button type="primary" block>Thanh toán</Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Payment;
