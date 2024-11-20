import React, { useState } from 'react';
import { productData } from './Data/Data';
import EditProduct from './EditProduct';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import './ManageProducts.css';

const ManageProducts = () => {
  const [products, setProducts] = useState(productData);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const shortenName = (name) => {
    return name.length > 30 ? name.substring(0, 30) + "..." : name;
  };

  const handleDelete = (product) => {
    setShowDeleteConfirm(true);
    setProductToDelete(product);
  };

  const confirmDelete = () => {
    setProducts(products.filter(product => product._id !== productToDelete._id));
    setShowDeleteConfirm(false);
    setProductToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setProductToDelete(null);
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setEditingProduct({ ...product, original_price: product.price });
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingProduct(null);
  };

  return (
    <div className="store-products">
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {!isEditing ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Hình ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Số lượng đã bán</th>
              <th>Loại</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img
                      src={product.thumbnail_url}
                      alt={product.name}
                      style={{ width: '80px', height: 'auto' }}
                    />
                  </td>

                  <td>{shortenName(product.name)}</td>

                  <td>{product.price.toLocaleString()} VND</td>

                  <td>{product.stock_item.qty}</td>

                  <td>{product.quantity_sold.text}</td>

                  <td>{product.categories.name}</td>

                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleEdit(product)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(product)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">Không có sản phẩm nào phù hợp với từ khóa tìm kiếm.</td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        <EditProduct product={editingProduct} onCancel={cancelEdit} onSave={setProducts} />
      )}

      {/* Xác nhận xóa */}
      {showDeleteConfirm && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} tabIndex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteModalLabel">Xác nhận xóa sản phẩm</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={cancelDelete}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Bạn có chắc chắn muốn xóa sản phẩm này không?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={cancelDelete}>Hủy</button>
                <button type="button" className="btn btn-danger" onClick={confirmDelete}>Xóa</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
