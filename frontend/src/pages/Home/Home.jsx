import React, { useEffect } from "react";
import "./Home.css";
import {
  TruckFilled,
  ReloadOutlined,
  CustomerServiceFilled,
  StarOutlined,
} from "@ant-design/icons";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   let isLogin = false;
  //   const arr = document.cookie.split("; ");
  //   for (const item of arr) {
  //     const [key] = item.split("=");
  //     if (key === "token") {
  //       isLogin = true;
  //     }
  //   }
  //   if (!isLogin) navigate("/auth/login");
  // });

  // let isLogin = false;
  // const arr = document.cookie.split("; ");
  // for (const item of arr) {
  //   const [key] = item.split("=");
  //   if (key === "token") {
  //     isLogin = true;
  //   }
  // }
  // if (!isLogin) navigate("/auth/login");

  const products = [
    {
      id: 1,
      name: "Giày Nike",
      price: "100.000 VNĐ",
      description: "Mô tả sản phẩm 1",
    },
    {
      id: 2,
      name: "Giày Nike",
      price: "200.000 VNĐ",
      description: "Mô tả sản phẩm 2",
    },
    {
      id: 3,
      name: "Giày Nike",
      price: "300.000 VNĐ",
      description: "Mô tả sản phẩm 3",
    },
    {
      id: 4,
      name: "Giày Nike",
      price: "300.000 VNĐ",
      description: "Mô tả sản phẩm 3",
    },
    {
      id: 5,
      name: "Giày Nike",
      price: "300.000 VNĐ",
      description: "Mô tả sản phẩm 3",
    },
    {
      id: 6,
      name: "Giày Nike",
      price: "300.000 VNĐ",
      description: "Mô tả sản phẩm 3",
    },
    {
      id: 6,
      name: "Giày Nike",
      price: "300.000 VNĐ",
      description: "Mô tả sản phẩm 3",
    },
    {
      id: 6,
      name: "Giày Nike",
      price: "300.000 VNĐ",
      description: "Mô tả sản phẩm 3",
    },
    {
      id: 6,
      name: "Giày Nike",
      price: "300.000 VNĐ",
      description: "Mô tả sản phẩm 3",
    },
    {
      id: 6,
      name: "Giày Nike",
      price: "300.000 VNĐ",
      description: "Mô tả sản phẩm 3",
    },
  ];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div></div>
      </header>

      <section className="home-banner"></section>
      <body>
        <section className="commit">
          <div className="ghnc">
            <TruckFilled />
            <span>Giao hàng nhanh chóng</span>
          </div>
          <div>
            <CustomerServiceFilled />
            <span>Hỗ trợ trực tuyến</span>
          </div>
          <div>
            <ReloadOutlined />
            <span>Hoàn tiền nhanh chóng</span>
          </div>

          <div>
            <StarOutlined />
            <span>Sản phẩm chất lượng cao</span>
          </div>
        </section>

        <section className="home-products">
          <h2>Sản phẩm bán chạy</h2>
          <section className="best-selling-products">
            <Carousel responsive={responsive}>
              <div className="card">
                <img
                  className="product image"
                  src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/7b286498-95fa-4ffc-a62a-d440c12a304d/WMNS+AIR+JORDAN+1+LOW.png"
                  alt="product"
                  width={200}
                />
                <h3>Giay Nike</h3>
                <p className="price">1 000 000 đ</p>

                <p className="number">còn lại: 123</p>
              </div>

              <div className="card">
                <img
                  className="product image"
                  src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/7b286498-95fa-4ffc-a62a-d440c12a304d/WMNS+AIR+JORDAN+1+LOW.png"
                  alt="product"
                  width={200}
                />
                <h3>Giay Nike</h3>
                <p className="price">1 000 000 đ</p>
                <p className="number">còn lại: 123</p>
              </div>
              <div className="card">
                <img
                  className="product image"
                  src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/7b286498-95fa-4ffc-a62a-d440c12a304d/WMNS+AIR+JORDAN+1+LOW.png"
                  alt="product"
                  width={200}
                />
                <h3>Giay Nike</h3>
                <p className="price">1 000 000 đ</p>
                <p className="number">còn lại: 123</p>
              </div>
              <div className="card">
                <img
                  className="product image"
                  src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/7b286498-95fa-4ffc-a62a-d440c12a304d/WMNS+AIR+JORDAN+1+LOW.png"
                  alt="product"
                  width={200}
                />
                <h3>Giay Nike</h3>
                <p className="price">1 000 000 đ</p>
                <p className="number">còn lại: 123</p>
              </div>
              <div className="card">
                <img
                  className="product image"
                  src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/7b286498-95fa-4ffc-a62a-d440c12a304d/WMNS+AIR+JORDAN+1+LOW.png"
                  alt="product"
                  width={200}
                />
                <h3>Giay Nike</h3>
                <p className="price">1 000 000 đ</p>
                <p className="number">còn lại: 123</p>
              </div>
              <div className="card">
                <img
                  className="product image"
                  src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/7b286498-95fa-4ffc-a62a-d440c12a304d/WMNS+AIR+JORDAN+1+LOW.png"
                  alt="product"
                  width={200}
                />
                <h3>Giay Nike</h3>
                <p className="price">1 000 000 đ</p>
                <p className="number">còn lại: 123</p>
              </div>
              <div className="card">
                <img
                  className="product image"
                  src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/7b286498-95fa-4ffc-a62a-d440c12a304d/WMNS+AIR+JORDAN+1+LOW.png"
                  alt="product"
                  width={200}
                />
                <h3>Giay Nike</h3>
                <p className="price">1 000 000 đ</p>
                <p className="number">còn lại: 123</p>
              </div>
              <div className="card">
                <img
                  className="product image"
                  src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/7b286498-95fa-4ffc-a62a-d440c12a304d/WMNS+AIR+JORDAN+1+LOW.png"
                  alt="product"
                  width={200}
                />
                <h3>Giay Nike</h3>
                <p className="price">1 000 000 đ</p>
                <p className="number">còn lại: 123</p>
              </div>
            </Carousel>
          </section>

          <h2>Sản phẩm đề xuất</h2>
          <div className="product-grid-container">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img
                  src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/u_126ab356-44d8-4a06-89b4-fcdcc8df0245/c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/7b286498-95fa-4ffc-a62a-d440c12a304d/WMNS+AIR+JORDAN+1+LOW.png"
                  alt={product.name}
                  className="product-image"
                />
                <h3>{product.name}</h3>
                <p className="price">{product.price}</p>
                <p className="number">Còn lại: {product.stock}</p>
              </div>
            ))}
          </div>
          <Button type="primary" className="xemthem">
            Xem thêm
          </Button>
        </section>
      </body>
      <footer className="home-footer"></footer>
    </div>
  );
};

export default Home;
