import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm";

const EditProduct = () => {
  const { productId } = useParams(); // Lấy productId từ URL
  const navigate = useNavigate();
  const [productData, setProductData] = useState(null); // Lưu thông tin sản phẩm
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${productId}`
        );
        const data = await response.json();
        setProductData(data);
      } catch (error) {
        console.error("Lỗi khi tải thông tin sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleUpdate = async (updatedData) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${productId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        console.log("Cập nhật sản phẩm thành công!");
        navigate("/shoper/manage-products"); // Quay lại trang quản lý sản phẩm
      } else {
        console.error("Cập nhật sản phẩm thất bại");
      }
    } catch (error) {
      console.error("Có lỗi xảy ra khi cập nhật sản phẩm:", error);
    }
  };

  if (loading) return <div>Đang tải thông tin sản phẩm...</div>;

  return (
    <div className="edit-product">
      <h1>Chỉnh sửa sản phẩm</h1>
      {productData ? (
        <ProductForm initialData={productData} onSubmit={handleUpdate} />
      ) : (
        <div>Không tìm thấy sản phẩm.</div>
      )}
    </div>
  );
};

export default EditProduct;
