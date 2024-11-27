import React from "react";

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Tên sản phẩm</th>
          <th>Giá</th>
          <th>Số lượng</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.price.toLocaleString()} VNĐ</td>
            <td>{product.quantity}</td>
            <td>
              <button onClick={() => onEdit(product.id)}>Chỉnh sửa</button>
              <button onClick={() => onDelete(product.id)}>Xóa</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
