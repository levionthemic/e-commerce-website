import React from 'react';
import './Home.css';

const Home = () => {
  const products = [
    { id: 1, name: 'Sản phẩm 1', price: '100.000 VNĐ', description: 'Mô tả sản phẩm 1' },
    { id: 2, name: 'Sản phẩm 2', price: '200.000 VNĐ', description: 'Mô tả sản phẩm 2' },
    { id: 3, name: 'Sản phẩm 3', price: '300.000 VNĐ', description: 'Mô tả sản phẩm 3' },
  ];

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Chào mừng bạn đến với E-Shop</h1>
        <p>Khám phá các sản phẩm tốt nhất ngay hôm nay!</p>
      </header>

      <section className="home-banner">
        <img src="https://via.placeholder.com/1200x300" alt="Banner" />
      </section>

      <section className="home-products">
        <h2>Các sản phẩm nổi bật</h2>
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="product-price">{product.price}</p>
              <button className="btn-add-to-cart">Thêm vào giỏ hàng</button>
            </div>
          ))}
        </div>
      </section>

      <footer className="home-footer">
        <button className="btn-explore">Khám phá thêm</button>
      </footer>
    </div>
  );
};

export default Home;
