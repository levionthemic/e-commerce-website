import React from "react";
import ProductItem from "../../components/ProductItem/ProductItem";

const products = [
  {
    id: 1,
    name: "Giày Nike",
    price: 1000000,
    stock: 123,
    image: "/images/nike-shoe.jpg",
  },
  {
    id: 2,
    name: "Giày Adidas",
    price: 1500000,
    stock: 50,
    image: "/images/adidas-shoe.jpg",
  },
  {
    id: 3,
    name: "Giày Puma",
    price: 1200000,
    stock: 75,
    image: "/images/puma-shoe.jpg",
  },
  // Thêm sản phẩm khác nếu cần
];

const ProductList = () => {
  return (
    <div className="container my-5">
      <h2>Danh Sách Sản Phẩm</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4">
            <ProductItem product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
