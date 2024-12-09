import { memo, useEffect, useState } from "react";
import { axiosApi } from "../../../services/UserService";
import {
  DeleteOutlined,
  DiffOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Dropdown, Table } from "antd";
import "./Product.scss";

function Product() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosApi.get("/api/v1/admin/product").then((data) => {
      setLoading(true);
      setProducts(data.data.products);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    axiosApi.get("/api/v1/admin/category").then((data) => {
      setCategories(data.data.data);
    });
  }, []);

  const columns = [
    {
      title: "Mã sản phẩm",
      key: "id",
      dataIndex: "id",
      render: (e) => (
        <div style={{ fontFamily: '"Lexend", sans-serif' }}>{e}</div>
      ),
    },
    {
      title: "Ảnh sản phẩm",
      key: "thumbnail",
      dataIndex: "thumbnail",
      render: (thumbnail) => (
        <img src={thumbnail} alt="" width={"100px"} height="100px" />
      ),
    },
    {
      title: "Tên sản phẩm",
      key: "name",
      dataIndex: "name",
      render: (e) => (
        <div style={{ fontFamily: '"Lexend", sans-serif' }}>{e}</div>
      ),
    },
    {
      title: "Đơn giá",
      key: "price",
      dataIndex: "price",
      render: (price) => (
        <div style={{ fontFamily: '"Lexend", sans-serif' }}>
          {price.toLocaleString()}
          <sup>đ</sup>
        </div>
      ),
    },
    {
      title: "Phần trăm giảm giá",
      key: "discountRate",
      dataIndex: "discountRate",
      render: (discountRate) => (
        <div style={{ fontFamily: '"Lexend", sans-serif' }}>
          {discountRate.toLocaleString()}%
        </div>
      ),
    },
    {
      title: "Số lượng tồn kho",
      key: "stockQuantity",
      dataIndex: "stockQuantity",
      render: (e) => (
        <div style={{ fontFamily: '"Lexend", sans-serif' }}>{e}</div>
      ),
    },
    {
      title: "Số lượng đã bán",
      key: "quantitySold",
      dataIndex: "quantitySold",
      render: (e) => (
        <div style={{ fontFamily: '"Lexend", sans-serif' }}>{e}</div>
      ),
    },
    {
      title: "Danh mục gốc",
      key: "rootCategory",
      dataIndex: "rootCategory",
      render: (e) => (
        <div style={{ fontFamily: '"Lexend", sans-serif' }}>{e}</div>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      dataIndex: "actions",
      render: () => (
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="delete-btn">
            <DeleteOutlined />
          </button>
          <button className="delete-btn">
            <DiffOutlined />
          </button>
        </div>
      ),
    },
  ];

  const data = products.map((product) => {
    const rootCategory = categories.find(
      (category) =>
        category.id === parseInt(product.primary_category_path.split("/")[2])
    )?.text;
    return {
      id: product.id,
      thumbnail: product.thumbnail_url,
      name: product.name,
      price: product.price,
      discountRate: product.discount_rate,
      stockQuantity: product.stock_item?.qty || 0,
      rootCategory: rootCategory,
      quantitySold: product.quantity_sold?.value || 0,
    };
  });

  const handleClickDropdown = (e) => {
    const categoryId = e.target.getAttribute("category_id");

    setLoading(true);
    axiosApi("/api/v1/admin/product", {params: { categoryId: categoryId }})
      .then(res => {
        setProducts(res.data.products);
        setLoading(false);
      })
  }

  const dropdownItems = categories?.map((category) => ({
    label: <div onClick={handleClickDropdown} category_id={category.id}>{category.text}</div>,
    key: `${category.id}`,
  }));

  return (
    <div className="container-fluid">
      <div className="row my-3">
        <h2 className="page-title">Quản lý sản phẩm</h2>
      </div>

      <div className="row my-3">
        <div className="col-12">
          <Dropdown menu={{ items: dropdownItems, selectable: true }}>
            <button type="button" className="dropdown-button">
              <span>Danh mục gốc</span>
              <DownOutlined />
            </button>
          </Dropdown>
        </div>
      </div>

      <div className="row my-3">
        <div className="col-12">
          <Table loading={loading} dataSource={data} columns={columns} />
        </div>
      </div>
    </div>
  );
}

export default memo(Product);
