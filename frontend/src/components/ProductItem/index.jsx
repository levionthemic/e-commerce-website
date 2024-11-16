import { memo } from "react";
import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Rating from "react-rating";
import "./ProductItem.css";

function ProductItem({ product }) {
  const navigate = useNavigate();
  return (
    <Card
      className="product-card"
      onClick={() => {
        navigate(`/detailproduct/${product.id}`);
      }}
    >
      <Card.Img
        variant="top"
        src={product.thumbnail_url || "/images/default/default-product.png"}
      />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
          <span className="product-price">
            {(
              product.original_price *
              (1 - product.discount_rate / 100)
            ).toLocaleString()}
            <sup>đ</sup>
          </span>
        </Card.Text>
        <Card.Text className="product-info">
          <span>
            {product.rating_average || "0"}{" "}
            <Rating
              emptySymbol="fa-regular fa-star"
              fullSymbol="fa-solid fa-star"
              initialRating={product.rating_average}
              readonly
              style={{ color: "#dfdf29"}}
            />
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
  );
}

export default memo(ProductItem);
