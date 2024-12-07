import React, { useState, useEffect } from "react";
import { axiosApi } from "../../../services/UserService"; // Giả sử file service của bạn tên là axiosApi.js
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "./ManageProducts.css";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axiosApi.get("/api/v1/seller/product");
        setProducts(response.data.products || []);
      } catch (error) {
        console.error("Error fetching all products:", error);
      }
    };
    fetchAllProducts();
  }, []);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosApi.get(
          `/api/v1/seller/product/search?keyword=${searchTerm}`
        );
        setProducts(response.data.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (searchTerm) {
      fetchProducts();
    }
  }, [searchTerm]);

  const filteredProducts = (products || []).filter(
    (product) =>
      product &&
      product.name &&
      product.stock_item &&
      product.stock_item.qty &&
      product.categories &&
      product.categories.name
  );

  const shortenName = (name) => {
    return name.length > 30 ? name.substring(0, 30) + "..." : name;
  };

  const handleEdit = (product) => {
    navigate("/shop/products/edit", { state: { product: product } });
  };

  return (
    <div className="store-products mx-4 my-3">
      <h2 className="mb-3">Quản lý sản phẩm</h2>
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Mã sản phẩm</th>
            <th>Hình ảnh</th>
            <th className="product-name">Tên sản phẩm</th>
            <th className="price">Giá</th>
            <th className="qty">Số lượng</th>
            <th className="sold-quantity">Số lượng đã bán</th>
            <th className="category">Loại</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              if (!product || !product.name) {
                return null; // Nếu sản phẩm không hợp lệ, bỏ qua
              }

              return (
                <tr key={product._id}>
                  <td>{product.id}</td>
                  <td>
                    <img
                      src={product.thumbnail_url}
                      alt={product.name}
                      style={{ width: "80px", height: "auto" }}
                    />
                  </td>

                  <td className="product-name" title={product.name}>
                    {shortenName(product.name)}
                  </td>

                  <td className="price">
                    {product.price.toLocaleString()} VND
                  </td>

                  <td className="qty">{product?.stock_item.qty || 0}</td>

                  <td className="sold-quantity">
                    {product?.quantity_sold.value || 0}
                  </td>

                  <td className="category">{product.categories.name}</td>

                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleEdit(product)}
                    >
                      <FaEdit />
                    </button>
                    <button className="btn btn-danger btn-sm">
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                Không có sản phẩm nào phù hợp với từ khóa tìm kiếm.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;
