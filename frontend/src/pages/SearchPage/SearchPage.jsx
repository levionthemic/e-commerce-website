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

const SearchPage = () => {
  const [minPrice, setMinPrice] = useState("");
  const location = useLocation();
  const [maxPrice, setMaxPrice] = useState(1000000); // Giá tối đa mặc định
  const [sortBy, setSortBy] = useState("Liên Quan");
  const [products, setProducts] = useState([]);
  const params = new URLSearchParams(location.search);
  const keyword = params.get("keyword")?.toLowerCase() || "";

  useEffect(() => {
    fetch(`http://localhost:3001/api/v1/products/search?keyword=${keyword}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.data);
      })

    // setFilteredProducts(results);
  }, [location.search, keyword]);
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
              <RangeSlider
                value={maxPrice}
                min={minPrice}
                max={1000000}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
              <Button variant="danger" className="mt-3 w-100">
                Áp Dụng
              </Button>
            </Form.Group>

            {/* Các bộ lọc khác */}
            <Form.Group controlId="storeType" className="mb-3">
              <Form.Label>Loại Cửa Hàng</Form.Label>
              <Form.Check type="checkbox" label="Shopee Mall" />
              <Form.Check type="checkbox" label="Shop Yêu Thích" />
              <Form.Check type="checkbox" label="Xử lý đơn hàng bởi Shopee" />
            </Form.Group>

            <Form.Group controlId="productCondition" className="mb-3">
              <Form.Label>Tình Trạng Sản Phẩm</Form.Label>
              <Form.Check type="checkbox" label="Mới" />
              <Form.Check type="checkbox" label="Đã sử dụng" />
            </Form.Group>

            <Form.Group controlId="paymentOption" className="mb-3">
              <Form.Label>Lựa Chọn Thanh Toán</Form.Label>
              <Form.Check type="checkbox" label="0% Trả Góp" />
            </Form.Group>

            <Form.Group controlId="brand" className="mb-3">
              <Form.Label>Thương Hiệu</Form.Label>
              <Form.Check type="checkbox" label="Nike" />
              <Form.Check type="checkbox" label="Adidas" />
              <Form.Check type="checkbox" label="Puma" />
              <Form.Check type="checkbox" label="Khác" />
            </Form.Group>

            <Form.Group controlId="rating" className="mb-3">
              <Form.Label>Đánh Giá</Form.Label>
              <Form.Check type="checkbox" label="⭐️⭐️⭐️⭐️⭐️ trở lên" />
              <Form.Check type="checkbox" label="⭐️⭐️⭐️⭐️ trở lên" />
              <Form.Check type="checkbox" label="⭐️⭐️⭐️ trở lên" />
            </Form.Group>
          </Form>
        </Col>

        {/* Kết quả tìm kiếm */}
        <Col md={9}>
          <Row className="align-items-center justify-content-between mb-3">
            <h5>Kết quả tìm kiếm cho "keyword"</h5>
            <Dropdown onSelect={(e) => setSortBy(e)}>
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
          <Row xs={1} md={4} className="g-4">
            {products.map((product) => (
              <Col key={product.id}>
                <Card>
                  <Card.Img variant="top" src={product.thumbnail_url} />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{product.price.toLocaleString()} VNĐ</Card.Text>
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
            <Pagination.Prev />
            <Pagination.Item>{1}</Pagination.Item>
            <Pagination.Item>{2}</Pagination.Item>
            <Pagination.Next />
          </Pagination>
        </Col>
      </Row>
    </div>
  );
};

export default SearchPage;
