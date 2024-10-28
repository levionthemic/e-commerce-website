import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchPage.css';
import anhgiay from "../../assets/images/anh_giay.jpg";

const products = [
  { id: 1, name: "Giày Nike", price: "100.000 VNĐ", start: 4.5, sale: 120, description: "Mô tả sản phẩm 1", image: anhgiay },
  { id: 2, name: "Giày Adidas", price: "120.000 VNĐ", start: 4.0, sale: 90, description: "Mô tả sản phẩm 2", image: anhgiay },
  { id: 3, name: "Giày Puma", price: "90.000 VNĐ", start: 3.5, sale: 80, description: "Mô tả sản phẩm 3", image: anhgiay },
  { id: 4, name: "Giày New Balance", price: "110.000 VNĐ", start: 4.2, sale: 110, description: "Mô tả sản phẩm 4", image: anhgiay },
  { id: 5, name: "Giày Converse", price: "95.000 VNĐ", start: 4.1, sale: 70, description: "Mô tả sản phẩm 5", image: anhgiay },
  { id: 6, name: "Giày Reebok", price: "85.000 VNĐ", start: 3.8, sale: 60, description: "Mô tả sản phẩm 6", image: anhgiay },
  { id: 7, name: "Giày Asics", price: "105.000 VNĐ", start: 4.3, sale: 150, description: "Mô tả sản phẩm 7", image: anhgiay },
  { id: 8, name: "Giày Vans", price: "80.000 VNĐ", start: 3.0, sale: 30, description: "Mô tả sản phẩm 8", image: anhgiay },
  { id: 9, name: "Giày Under Armour", price: "130.000 VNĐ", start: 4.5, sale: 200, description: "Mô tả sản phẩm 9", image: anhgiay },
  { id: 10, name: "Giày Hoka One One", price: "140.000 VNĐ", start: 4.7, sale: 170, description: "Mô tả sản phẩm 10", image: anhgiay },
  { id: 11, name: "Giày Saucony", price: "125.000 VNĐ", start: 4.4, sale: 110, description: "Mô tả sản phẩm 11", image: anhgiay },
  { id: 12, name: "Giày On Running", price: "150.000 VNĐ", start: 4.8, sale: 90, description: "Mô tả sản phẩm 12", image: anhgiay },
  { id: 13, name: "Giày Skechers", price: "110.000 VNĐ", start: 4.0, sale: 140, description: "Mô tả sản phẩm 13", image: anhgiay },
  { id: 14, name: "Giày Mizuno", price: "95.000 VNĐ", start: 3.9, sale: 50, description: "Mô tả sản phẩm 14", image: anhgiay },
  { id: 15, name: "Giày Hoka", price: "150.000 VNĐ", start: 4.6, sale: 60, description: "Mô tả sản phẩm 15", image: anhgiay },
  { id: 16, name: "Giày New Era", price: "130.000 VNĐ", start: 4.1, sale: 30, description: "Mô tả sản phẩm 16", image: anhgiay },
  { id: 17, name: "Giày Salomon", price: "145.000 VNĐ", start: 4.7, sale: 120, description: "Mô tả sản phẩm 17", image: anhgiay },
  { id: 18, name: "Giày Fila", price: "120.000 VNĐ", start: 4.2, sale: 90, description: "Mô tả sản phẩm 18", image: anhgiay },
  { id: 19, name: "Giày Umbro", price: "115.000 VNĐ", start: 4.0, sale: 70, description: "Mô tả sản phẩm 19", image: anhgiay },
  { id: 20, name: "Giày Kappa", price: "105.000 VNĐ", start: 4.1, sale: 50, description: "Mô tả sản phẩm 20", image: anhgiay },
  { id: 21, name: "Giày Asics Gel", price: "160.000 VNĐ", start: 4.9, sale: 80, description: "Mô tả sản phẩm 21", image: anhgiay },
];

const options = [
  {
    id: 1,
    name: "Option 1",
    subOptions: [
      { id: 1.1, name: "Option 1.123456789" },
      { id: 1.2, name: "Option 1.2" },
      { id: 1.3, name: "Option 1.3" },
    ],
  },
  {
    id: 2,
    name: "Option 2",
    subOptions: [
      { id: 2.1, name: "Option 2.1" },
      { id: 2.2, name: "Option 2.2" },
      { id: 2.3, name: "Option 2.3" },
    ],
  },
  {
    id: 3,
    name: "Option 3",
    subOptions: [
      { id: 3.1, name: "Option 3.1" },
      { id: 3.2, name: "Option 3.2" },
      { id: 3.3, name: "Option 3.3" },
    ],
  },
];

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [openOptions, setOpenOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortField, setSortField] = useState('default');
  const productsPerPage = 20;

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setQuery(params.get('keyword') || ''); // Lấy từ khóa từ URL
  }, [location]);

  const toggleOption = (id) => {
    setOpenOptions((prevOpenOptions) => {
      return prevOpenOptions.includes(id)
        ? prevOpenOptions.filter(optionId => optionId !== id)
        : [...prevOpenOptions, id];
    });
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortField === 'default') return 0;
    const aValue = sortField === 'price' ? parseInt(a.price.replace(/\.\d+/g, '').replace(/ VNĐ/, ''), 10) :
                    sortField === 'start' ? a.start :
                    sortField === 'sale' ? a.sale : 0;
    const bValue = sortField === 'price' ? parseInt(b.price.replace(/\.\d+/g, '').replace(/ VNĐ/, ''), 10) :
                    sortField === 'start' ? b.start :
                    sortField === 'sale' ? b.sale : 0;

    return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
  });

  const totalProducts = sortedProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const currentProducts = sortedProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <div className="search-page">
      <div className="sidebar">
        <h2>Danh Mục Sản Phẩm</h2>
        <ul>
          {options.map(option => (
            <li key={option.id} style={{ border: "1px solid #ccc", margin: "5px 0", padding: "10px", borderRadius: "5px" }}>
              <div onClick={() => toggleOption(option.id)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                <span>{option.name}</span>
                {option.subOptions.length > 0 ? (openOptions.includes(option.id) ? " ▼" : " ►") : null}
              </div>
              {openOptions.includes(option.id) && option.subOptions.length > 0 && (
                <ul>
                  {option.subOptions.map(subOption => (
                    <li key={subOption.id}>
                      <button onClick={() => console.log(`Redirecting to product with id: ${subOption.id}`)}>
                        {subOption.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className='product-area'>
        <h2>{query || "Tìm Kiếm"}</h2> {/* Hiển thị từ khóa tìm kiếm */}
        <div>
          <label>Sắp xếp theo:</label>
          <select onChange={(e) => setSortField(e.target.value)} value={sortField}>
            <option value="default">Mặc định</option>
            <option value="price">Giá</option>
            <option value="start">Đánh giá</option>
            <option value="sale">Số lượng bán</option>
          </select>
          <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
            <option value="asc">Tăng dần</option>
            <option value="desc">Giảm dần</option>
          </select>
        </div>
        <div className="product-list">
          {currentProducts.length === 0 ? (
            <p>Không tìm thấy sản phẩm nào.</p>
          ) : (
            currentProducts.map(product => (
              <div key={product.id} className="product-item">
                <img src={product.image} alt={product.name} style={{ width: '100%', height: 'auto', borderRadius: '4px' }} />
                <h3>{product.name}</h3>
                <p>{product.price}</p>
                <p>{product.start} ★</p>
                <p>Đã bán: {product.sale}</p>
                <p>{product.description}</p>
              </div>
            ))
          )}
        </div>
        <div className="pagination">
          <span>Trang {currentPage} / {totalPages}</span>
          <button className="nav-button" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>{'<'}</button>
          <div className="page-numbers">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => goToPage(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button className="nav-button" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>{'>'}</button>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;