import React, { useState, useEffect, useRef } from "react";
import { FaRegMinusSquare, FaRegPlusSquare } from "react-icons/fa";
import { useParams } from "react-router-dom"; // Import useParams để lấy params từ URL
import "./DetailProduct.css";
import { axiosApi } from "../../services/UserService";
import Rating from "react-rating";
import { cookies } from "../../helpers/cookies";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { increaseCartQuantity } from "../../redux/slices/cartSlice";

const DetailProduct = () => {
  const { productId } = useParams(); // Lấy productId từ URL
  const [product, setProduct] = useState(null); // Lưu thông tin sản phẩm
  const [loading, setLoading] = useState(true); // Trạng thái tải
  const [quantity, setQuantity] = useState(1); // Số lượng sản phẩm
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Chỉ mục ảnh hiện tại
  const reviewSectionRef = useRef(null);
  const dispatch = useDispatch();

  // Lấy dữ liệu sản phẩm từ API
  useEffect(() => {
    const fetchProductDetail = async () => {
      setLoading(true);
      try {
        axiosApi.get(`/api/v1/products/detail/${productId}`).then((res) => {
          if (res.data.code === 200) {
            setProduct(res.data.data); // Cập nhật dữ liệu sản phẩm
          } else {
            console.error("Sản phẩm không tồn tại");
          }
        });
      } catch (error) {
        console.error("Có lỗi xảy ra khi gọi API:", error);
      } finally {
        setLoading(false); // Đổi trạng thái loading khi hoàn tất
      }
    };

    fetchProductDetail();
  }, [productId]); // Fetch lại dữ liệu khi productId thay đổi

  if (loading) {
    return <div>Đang tải...</div>; // Hiển thị khi đang tải dữ liệu
  }

  if (!product) {
    return <div>Không tìm thấy sản phẩm.</div>; // Hiển thị nếu không tìm thấy sản phẩm
  }

  // Hàm thay đổi ảnh khi click vào thumbnail
  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  // Hàm cuộn xuống phần đánh giá sản phẩm
  const handleScrollToReviews = () => {
    if (reviewSectionRef.current) {
      reviewSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePurchaseNow = () => {};

  const handleAddToCart = () => {
    axiosApi
      .post("api/v1/cart/add", {
        cartId: cookies().cartId,
        productId: productId,
        quantity: quantity,
      })
      .then(() => {
        Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
          icon: "success",
          title: "Thêm vào giỏ hàng thành công!",
        });
        dispatch(increaseCartQuantity(1));
      })
      .catch(() => {
        Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
          icon: "error",
          title: "Không thể thêm sản phẩm vào giỏ hàng!",
        });
      });
  };

  return (
    <div className="container my-4" style={{ maxWidth: "1140px" }}>
      <div className="row">
        {/* Hình ảnh sản phẩm */}
        <div className="col-md-4">
          <div
            className="image-gallery"
            style={{
              height: "550px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <img
              src={product.thumbnail_url}
              alt={product.name}
              className="img-fluid"
              style={{ maxHeight: "500px", objectFit: "contain" }}
            />
          </div>
          <div className="thumbnail-gallery mt-2 d-flex justify-content-center">
            {product.images &&
              product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`thumbnail ${
                    currentImageIndex === index ? "active" : ""
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                  style={{
                    cursor: "pointer",
                    width: "60px",
                    height: "60px",
                    margin: "0 5px",
                    border:
                      currentImageIndex === index
                        ? "2px solid #007bff"
                        : "2px solid transparent",
                  }}
                />
              ))}
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="col-md-8">
          <div className="product-infomation">
            <h1>{product.name}</h1>
            <hr />
            <div className="inner-rating">
              <div className="rating">
                <Rating
                  emptySymbol="fa-regular fa-star"
                  fullSymbol="fa-solid fa-star"
                  initialRating={product.rating_average}
                  readonly
                  style={{ color: "#dfdf29" }}
                />{" "}
                {product.rating || 5}{" "}
              </div>
              <div className="divider"></div>
              <div className="review-info d-flex align-items-center">
                <span style={{ marginRight: "-5px" }}>
                  {product.reviews ? product.reviews.length : 0}
                </span>
                <button
                  className="btn btn-link"
                  onClick={handleScrollToReviews}
                >
                  Đánh giá
                </button>
              </div>
            </div>

            <div className="store-name mb-2">Cửa hàng: {product.storeName}</div>
            <div className="product-id mb-2">
              Mã sản phẩm: {product.productId}
            </div>
            <div className="quantity mb-2">
              Số lượng còn: {product.stock_item ? product.stock_item.qty : 0}
            </div>
            <div className="quantity-sold mb-2">
              Đã bán:{" "}
              {product.quantity_sold ? product.quantity_sold.value : "0"}
            </div>
            <hr />

            <div className="prices mt-2">
              <span className="new-price h4">
                {(
                  product.original_price *
                  (1 - product.discount_rate / 100)
                ).toLocaleString()}
                <sup>đ</sup>
              </span>
              <span className="old-price text-muted ml-2">
                {product.original_price.toLocaleString()}
                <sup>đ</sup>
              </span>
            </div>

            {product.discount_rate > 0 && (
              <div className="discount mt-2 p-3">
                <strong>
                  Mã Giảm Giá Của Shop:{" "}
                  <span className="discount-rate">{`Giảm ${product.discount_rate}%`}</span>
                </strong>
              </div>
            )}

            <div className="quantity mt-3">
              <span className="font-weight-bold">Số lượng:</span>
              <div className="d-flex align-items-center mt-2">
                <FaRegMinusSquare
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                  style={{ cursor: "pointer", fontSize: "20px" }}
                />
                <input
                  type="number"
                  className="quantity-input"
                  value={quantity}
                  min="1"
                  max={product.stock_item.qty || 1000}
                  onChange={(e) => {
                    const value =
                      e.target.value === ""
                        ? ""
                        : Math.max(
                            1,
                            Math.min(
                              product.stock_item.qty || 1000,
                              parseInt(e.target.value) || 1
                            )
                          );
                    setQuantity(value);
                  }}
                  onBlur={() => {
                    if (quantity === "") {
                      setQuantity(1); // Đặt lại thành 1 nếu ô nhập trống
                    }
                  }}
                  style={{
                    width: "60px",
                    textAlign: "center",
                    margin: "0 5px",
                  }}
                />
                <FaRegPlusSquare
                  onClick={() =>
                    setQuantity(
                      quantity < (product.stock_item.qty || 1000)
                        ? quantity + 1
                        : product.stock_item.qty || 1000
                    )
                  }
                  style={{ cursor: "pointer", fontSize: "20px" }}
                />
              </div>
            </div>

            <div className="button-container mt-3">
              <button className="btn btn-primary" onClick={handlePurchaseNow}>
                Mua ngay
              </button>
              <button className="btn btn-success" onClick={handleAddToCart}>
                Thêm vào giỏ hàng
              </button>
            </div>
            <hr />
          </div>
        </div>
      </div>
      <div className="description mt-2 text-center">
        <h2 className="description-title">MÔ TẢ SẢN PHẨM</h2>
        <div dangerouslySetInnerHTML={{ __html: product.description }} />
      </div>
      <div className="reviews mt-4" ref={reviewSectionRef}>
        <h2>ĐÁNH GIÁ SẢN PHẨM CỦA KHÁCH HÀNG</h2>
        <div className="review-summary mt-4">
          <h4 style={{ color: "red" }}>
            {product.rating || 0}
            <span className="red-stars">
              {Array.from({ length: 5 }, (_, index) => (
                <span key={index} className="star filled">
                  ★
                </span>
              ))}
            </span>
          </h4>
          <p className="review-stats">
            Số bình luận: {product.reviews ? product.reviews.length : 0}
          </p>
        </div>

        {product.reviews &&
          product.reviews.map((review) => (
            <div key={review.id}>{/* Render review details */}</div>
          ))}
      </div>
    </div>
  );
};

export default DetailProduct;
