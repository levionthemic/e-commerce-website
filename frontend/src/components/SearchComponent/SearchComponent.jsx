import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchProduct } from "../../redux/slices/productSlice";

const SearchComponent = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    dispatch(searchProduct(value));
  };

  const handleSearchClick = () => {
    if (search) {
      navigate(`/search?keyword=${search}`); // Chuyển hướng đến trang tìm kiếm với từ khóa
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick(); // Tìm kiếm khi nhấn Enter
    }
  };

  return (
    <div style={{ marginBottom: '20px', border: '1px solid green' }}>
      <input
        type="text"
        placeholder="Nhập từ khóa"
        value={search}
        onChange={onSearch}
        onKeyPress={handleKeyPress} // Gọi hàm khi nhấn phím
        style={{ padding: '10px', marginRight: '5px' }}
      />
      <button
        onClick={handleSearchClick} // Gọi hàm khi nhấn nút tìm kiếm
        style={{ padding: '10px', backgroundColor: '#16A085', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        Tìm kiếm
      </button>
    </div>
  );
};

export default SearchComponent;
