import React, { useEffect, useState } from "react";
import ProductItem from "../../components/ProductItem/ProductItem";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        console.log("Dữ liệu sản phẩm từ API:", response.data); // Kiểm tra dữ liệu từ API
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error); // Log nếu có lỗi xảy ra
      } finally {
        console.log("Hoàn tất việc gọi API"); // Log để xác nhận đã hoàn thành
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>; // Hiển thị thông báo loading trong khi chờ dữ liệu

  return (
    <div className="container my-5">
      <h2>Danh Sách Sản Phẩm</h2>
      <div
        className="d-flex flex-wrap justify-content-center"
        style={{ gap: "20px" }}
      >
        {products.map((product) => (
          <div key={product._id} style={{ flex: "0 0 30%" }}>
            <ProductItem product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
