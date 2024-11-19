import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Dropdown, Pagination } from "react-bootstrap";
import "./SearchPage.css";
import { axiosApi } from "../../services/UserService";
import ProductItem from "../../components/ProductItem";
import { useNavigate } from "react-router-dom";
import { animateScroll } from "react-scroll";
import { Skeleton } from "antd";

const SearchPage = () => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000000);
  // const [sortBy, _] = useState("Liên Quan");
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  // const [storeType, setStoreType] = useState([]);
  // const [productCondition, setProductCondition] = useState([]);
  // const [brand, setBrand] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(null);

  const url = new URL(window.location.href);
  const keyword = url.searchParams.get("keyword").toLowerCase() || "";
  const page = parseInt(url.searchParams.get("page")) || 1;

  const navigate = useNavigate();

  const [promotions, setPromotions] = useState([]);

  const togglePromotion = (promo) => {
    setPromotions((prev) =>
      prev.includes(promo) ? prev.filter((p) => p !== promo) : [...prev, promo]
    );
  };

  const handleResetFilters = () => {
    // setMinPrice("");
    // setMaxPrice(1000000);
    // setStoreType([]);
    // setProductCondition([]);
    // setBrand([]);
    // setRatingFilter(null);
    // setPromotions([]);
    // fetchProducts();
  };

  useEffect(() => {
    try {
      axiosApi("/api/v1/products/search", {
        params: {
          keyword: keyword,
          page: page,
        },
      }).then((data) => {
        if (data.data.totalPages !== totalPages) {
          setTotalPages(data.data.totalPages);
        }
        setProducts(data.data.data);
        setLoading(false);
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [page, keyword, totalPages]);

  const handleApplyFilters = () => {
    // setPage(1);
    // fetchProducts();
  };

  const handleSortChange = (sortOption) => {
    // setSortBy(sortOption);
    // setPage(1); // Đảm bảo về trang đầu
    // fetchProducts();
  };

  const toggleStoreType = (type) => {
    // setStoreType((prev) =>
    //   prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    // );
  };

  const toggleProductCondition = (condition) => {
    // setProductCondition((prev) =>
    //   prev.includes(condition)
    //     ? prev.filter((c) => c !== condition)
    //     : [...prev, condition]
    // );
  };

  // const toggleBrand = (brandName) => {
  //   setBrand((prev) =>
  //     prev.includes(brandName)
  //       ? prev.filter((b) => b !== brandName)
  //       : [...prev, brandName]
  //   );
  // };

  return (
    <>
      <div className="search-page container">
        <Row>
          <Col md={3}>
            <div className="filters-section">
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
                    // checked={storeType.includes("Shopee Mall")}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Shop Yêu Thích"
                    onChange={() => toggleStoreType("Shop Yêu Thích")}
                    // checked={storeType.includes("Shop Yêu Thích")}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Xử lý đơn hàng bởi Shopee"
                    onChange={() => toggleStoreType("Shopee")}
                    // checked={storeType.includes("Shopee")}
                  />
                </Form.Group>

                <Form.Group controlId="productCondition" className="mb-4">
                  <Form.Label>Tình Trạng</Form.Label>
                  <Form.Check
                    type="checkbox"
                    label="Đã sử dụng"
                    onChange={() => toggleProductCondition("Đã sử dụng")}
                    // checked={productCondition.includes("Đã sử dụng")}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Mới"
                    onChange={() => toggleProductCondition("Mới")}
                    // checked={productCondition.includes("Mới")}
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
            </div>
          </Col>

          <Col md={9}>
            <Row className="align-items-center justify-content-between mb-3">
              <h5>Kết quả tìm kiếm cho "{keyword}"</h5>
              <Dropdown onSelect={(e) => handleSortChange(e)}>
                <Dropdown.Toggle variant="outline-primary">
                  {/* {sortBy} */}
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

            <Row xs={1} md={4} className="g-3">
              {loading ? (
                <>
                  {Array.from({ length: 40 }).map((_, index) => (
                    <Col
                      key={index}
                      style={{
                        padding: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ProductItem product={null} loading={true}/>
                    </Col>
                  ))}
                </>
              ) : (
                <>
                  {products && (
                    <>
                      {products.map((product) => (
                        <Col
                          key={product.id}
                          style={{
                            padding: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <ProductItem product={product} loading={false}/>
                        </Col>
                      ))}
                    </>
                  )}
                </>
              )}
            </Row>

            <Row xs={1} md={4} className="g-3">
              {products && (
                <>
                  {products.map((product) => (
                    <Col
                      key={product.id}
                      style={{
                        padding: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ProductItem product={product} />
                    </Col>
                  ))}
                </>
              )}
            </Row>

            {/* Phân trang */}
            <Pagination className="mt-4 justify-content-center">
              <Pagination.Prev
                onClick={() => {
                  animateScroll.scrollToTop({
                    duration: 800,
                    smooth: true,
                    offset: -70,
                  });
                  setTimeout(() => {
                    url.searchParams.set("page", Math.max(page - 1, 1));
                    navigate(url.pathname + url.search);
                  }, 800);
                }}
              />
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                  key={index}
                  active={index + 1 === page}
                  onClick={() => {
                    animateScroll.scrollToTop({
                      duration: 800,
                      smooth: true,
                      offset: -70,
                    });
                    setTimeout(() => {
                      url.searchParams.set("page", index + 1);
                      navigate(url.pathname + url.search);
                    }, 800);
                  }}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => {
                  animateScroll.scrollToTop({
                    duration: 800,
                    smooth: true,
                    offset: -70,
                  });
                  setTimeout(() => {
                    url.searchParams.set(
                      "page",
                      Math.min(page + 1, totalPages)
                    );
                    navigate(url.pathname + url.search);
                  }, 800);
                }}
              />
            </Pagination>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SearchPage;
