import React, { useEffect, useState } from "react";
import "./Home.css";
import {
  TruckFilled,
  ReloadOutlined,
  CustomerServiceFilled,
  StarOutlined,
} from "@ant-design/icons";
import { Button, Col } from "react-bootstrap";

import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import { axiosApi } from "../../services/UserService";
import ProductItem from "../../components/ProductItem";
import { CustomCarousel } from "./style";

const Home = () => {
  const navigate = useNavigate();

  // Lọc và sắp xếp sản phẩm bán chạy
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [productsDisplayed, setProductsDisplayed] = useState(15);

  let isLogin = false;
  const arr = document.cookie.split("; ");
  for (const item of arr) {
    const [key] = item.split("=");
    if (key === "token") {
      isLogin = true;
    }
  }
  if (!isLogin) {
    navigate("/auth/login");
  }
  useEffect(() => {
    let isLogin = false;
    const arr = document.cookie.split("; ");
    for (const item of arr) {
      const [key] = item.split("=");
      if (key === "token") {
        isLogin = true;
      }
    }
    if (!isLogin) {
      navigate("/auth/login");
    }
  });

  // Lấy dữ liệu sản phẩm bán chạy
  useEffect(() => {
    axiosApi
      .get("/api/v1/products")
      .then((res) => {
        const sortedProducts = res.data.data
          .filter(
            (product) =>
              product.quantity_sold && product.quantity_sold.value > 0
          )
          .sort((a, b) => b.quantity_sold.value - a.quantity_sold.value)
          .slice(0, 10);
        setBestSellingProducts(sortedProducts);
      })
      .catch((error) => {
        console.error("Có lỗi khi lấy dữ liệu sản phẩm:", error);
        window.location.reload();
      });
  }, []);

  // Lấy dữ liệu sản phẩm đề xuất
  useEffect(() => {
    axiosApi
      .get("/api/v1/products")
      .then((res) => {
        const sortedProducts = res.data.data
          .filter(
            (product) =>
              product.rating_average !== null &&
              product.rating_average !== undefined
          )
          .sort((a, b) => b.rating_average - a.rating_average)
          .slice(0, 36); // Lấy 30 sản phẩm để hiển thị và có thể tải thêm
        setRecommendedProducts(sortedProducts);
      })
      .catch((error) => {
        console.error("Có lỗi khi lấy dữ liệu sản phẩm:", error);
        window.location.reload();
      });
  }, []);

  // Hàm xử lý khi nhấn nút "Xem thêm"
  const loadMoreRecommendedProducts = () => {
    setProductsDisplayed((prev) => prev + 12); // Tăng số lượng sản phẩm hiển thị lên 10
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
            <CustomCarousel>
              {bestSellingProducts.length > 0 ? (
                bestSellingProducts.map((product) => (
                  
                    <ProductItem product={product} key={product.id}/>
               
                ))
              ) : (
                <p>Đang tải sản phẩm...</p>
              )}
            </CustomCarousel>
          </section>

          <h2>Sản phẩm đề xuất</h2>
          <div className="product-grid-container">
            {recommendedProducts.slice(0, productsDisplayed).map((product) => (
              <Col key={product.id} className="d-flex justify-content-center">
                <ProductItem product={product} />
              </Col>
            ))}
          </div>

          {/* Nút xem thêm */}
          <Button
            type="button"
            className="xemthem"
            onClick={loadMoreRecommendedProducts}
          >
            Xem thêm
          </Button>
        </section>
      </body>
      <footer className="home-footer"></footer>
    </div>
  );
};

export default Home;
