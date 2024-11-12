import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Card,
  Row,
  Col,
  Dropdown,
  Pagination,
} from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
import "./SearchPage.css";
import { useLocation, Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const SearchPage = () => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [sortBy, setSortBy] = useState("Liên Quan");
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [storeType, setStoreType] = useState([]);
  const [productCondition, setProductCondition] = useState([]);
  const [brand, setBrand] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const keyword = params.get("keyword")?.toLowerCase() || "";
  const [promotions, setPromotions] = useState([]);

  const togglePromotion = (promo) => {
    setPromotions((prev) =>
      prev.includes(promo) ? prev.filter((p) => p !== promo) : [...prev, promo]
    );
  };

  const handleResetFilters = () => {
    setMinPrice("");
    setMaxPrice(1000000);
    setStoreType([]);
    setProductCondition([]);
    setBrand([]);
    setRatingFilter(null);
    setPromotions([]);
    fetchProducts();
  };

  const fetchProducts = async () => {
    try {
      const url = new URL("http://localhost:3001/api/v1/products/search");
      url.searchParams.append("keyword", keyword);
      url.searchParams.append("minPrice", minPrice || 0);
      url.searchParams.append("maxPrice", maxPrice || 1000000);
      url.searchParams.append("sortBy", sortBy);
      url.searchParams.append("page", page);

      // Add other filters if selected
      if (storeType.length > 0)
        url.searchParams.append("storeType", storeType.join(","));
      if (productCondition.length > 0)
        url.searchParams.append("productCondition", productCondition.join(","));
      if (brand.length > 0) url.searchParams.append("brand", brand.join(","));
      if (ratingFilter) url.searchParams.append("ratingFilter", ratingFilter);
      if (promotions.length > 0)
        url.searchParams.append("promotions", promotions.join(","));

      const response = await fetch(url);
      const data = await response.json();
      setProducts(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [
    keyword,
    minPrice,
    maxPrice,
    sortBy,
    page,
    storeType,
    productCondition,
    brand,
    ratingFilter,
  ]);

  const handleApplyFilters = () => {
    setPage(1);
    fetchProducts();
  };

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
    setPage(1); // Đảm bảo về trang đầu
    fetchProducts();
  };

  const toggleStoreType = (type) => {
    setStoreType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleProductCondition = (condition) => {
    setProductCondition((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition]
    );
  };

  const toggleBrand = (brandName) => {
    setBrand((prev) =>
      prev.includes(brandName)
        ? prev.filter((b) => b !== brandName)
        : [...prev, brandName]
    );
  };

  return (
    <div className="search-page container">
      <Row>
        {/* Bộ lọc tìm kiếm */}
        <Col md={3} className="filters-section">
          <h5>Bộ Lọc Tìm Kiếm</h5>
          <Form>
            <Form.Group controlId="priceRange" className="mb-4">
              <Form.Label>Khoảng Giá</Form.Label>
              <div className="d-flex align-items-center mb-2">
                <Form.Control
                  type="number"
                  placeholder="Từ"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="me-2"
                  style={{ width: "45%" }}
                />
                <Form.Control
                  type="number"
                  placeholder="Đến"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  style={{ width: "45%" }}
                />
              </div>
              <Button
                variant="danger"
                className="mt-2 w-100"
                onClick={handleApplyFilters}
              >
                Áp Dụng
              </Button>
            </Form.Group>

            <Form.Group controlId="storeType" className="mb-4">
              <Form.Label>Loại Shop</Form.Label>
              <Form.Check
                type="checkbox"
                label="Shopee Mall"
                onChange={() => toggleStoreType("Shopee Mall")}
                checked={storeType.includes("Shopee Mall")}
              />
              <Form.Check
                type="checkbox"
                label="Shop Yêu Thích"
                onChange={() => toggleStoreType("Shop Yêu Thích")}
                checked={storeType.includes("Shop Yêu Thích")}
              />
              <Form.Check
                type="checkbox"
                label="Xử lý đơn hàng bởi Shopee"
                onChange={() => toggleStoreType("Shopee")}
                checked={storeType.includes("Shopee")}
              />
            </Form.Group>

            <Form.Group controlId="productCondition" className="mb-4">
              <Form.Label>Tình Trạng</Form.Label>
              <Form.Check
                type="checkbox"
                label="Đã sử dụng"
                onChange={() => toggleProductCondition("Đã sử dụng")}
                checked={productCondition.includes("Đã sử dụng")}
              />
              <Form.Check
                type="checkbox"
                label="Mới"
                onChange={() => toggleProductCondition("Mới")}
                checked={productCondition.includes("Mới")}
              />
            </Form.Group>

            <Form.Group controlId="rating" className="mb-4">
              <Form.Label>Đánh Giá</Form.Label>
              {[5, 4, 3].map((star) => (
                <Form.Check
                  key={star}
                  type="checkbox"
                  label={`${"⭐️".repeat(star)} trở lên`}
                  onChange={() => setRatingFilter(star)}
                  checked={ratingFilter === star}
                />
              ))}
            </Form.Group>

            <Form.Group controlId="promotion" className="mb-4">
              <Form.Label>Dịch Vụ & Khuyến Mãi</Form.Label>
              <Form.Check
                type="checkbox"
                label="Voucher Xtra"
                onChange={() => togglePromotion("Voucher Xtra")}
                checked={promotions.includes("Voucher Xtra")}
              />
              <Form.Check
                type="checkbox"
                label="Đang giảm giá"
                onChange={() => togglePromotion("Đang giảm giá")}
                checked={promotions.includes("Đang giảm giá")}
              />
              <Form.Check
                type="checkbox"
                label="Hàng có sẵn"
                onChange={() => togglePromotion("Hàng có sẵn")}
                checked={promotions.includes("Hàng có sẵn")}
              />
            </Form.Group>

            <Button
              variant="secondary"
              className="mt-3 w-100"
              onClick={handleResetFilters}
            >
              Xóa Tất Cả
            </Button>
          </Form>
        </Col>

        {/* Kết quả tìm kiếm */}
        <Col md={9}>
          <Row className="align-items-center justify-content-between mb-3">
            <h5>Kết quả tìm kiếm cho "{keyword}"</h5>
            <Dropdown onSelect={(e) => handleSortChange(e)}>
              <Dropdown.Toggle variant="outline-primary">
                {sortBy}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="Liên Quan">Liên Quan</Dropdown.Item>
                <Dropdown.Item eventKey="Giá: Từ Thấp đến Cao">
                  Giá: Từ Thấp đến Cao
                </Dropdown.Item>
                <Dropdown.Item eventKey="Giá: Từ Cao đến Thấp">
                  Giá: Từ Cao đến Thấp
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Row>

          {/* Danh sách sản phẩm */}
          <Row xs={1} md={5} className="g-3">
            {products.map((product) => (
              <Col key={product.id}>
                <Card className="product-card">
                  <Card.Img
                    variant="top"
                    src={
                      product.thumbnail_url ||
                      "/images/default/default-product.png"
                    }
                  />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                      <span className="product-price">
                        {product.price.toLocaleString()} VNĐ
                      </span>
                    </Card.Text>
                    <Card.Text className="product-info">
                      <span>
                        {product.rating_average || "0"}{" "}
                        <FaStar color="#ffab00" />
                      </span>{" "}
                      | Đã bán: {product.quantity_sold?.value || 0}
                    </Card.Text>
                    <Link to={`/detailproduct/${product.id}`}>
                      <Button variant="primary" className="w-100">
                        Xem Chi Tiết
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Phân trang */}
          <Pagination className="mt-4 justify-content-center">
            <Pagination.Prev
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            />
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index}
                active={index + 1 === page}
                onClick={() => setPage(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            />
          </Pagination>
        </Col>
      </Row>
    </div>
  );
};

export default SearchPage;
