import { memo, useEffect } from "react";
import React, { useState } from "react";
import { Space, Switch, Table } from "antd";
import { axiosApi } from "../../../services/UserService";

const columns = [
  {
    title: "ID danh mục",
    dataIndex: "id",
    key: "id",
    width: "10%",
  },
  {
    title: "Ảnh minh họa",
    dataIndex: "icon",
    key: "icon",
    width: "10%",
    render: (url) => (
      <>{url ? <img src={url} alt="" width={80} height={80} /> : <></>}</>
    ),
  },

  {
    title: "Tên danh mục",
    dataIndex: "name",
    key: "name",
    width: "40%",
  },
  {
    title: "ID người bán",
    dataIndex: "seller_id",
    key: "seller_id",
  },
  {
    title: "Tên người bán",
    dataIndex: "sellerName",
    key: "sellerName",
    width: "20%",
  },
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

function Category() {
  const [checkStrictly, setCheckStrictly] = useState(false);
  const [categories, setCategories] = useState([]);
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    axiosApi.get("/api/v1/admin/category").then((res) => {
      setCategories(res.data.data);
      setSellers(res.data.sellers);
    });
  }, []);

  const getListChildCategories = (categories) => {
    return categories.map((category) => {
      if (category.children) {
        return {
          key: category.id,
          id: category.id,
          name: category.name || category.text,
          children: getListChildCategories(category.children),
        };
      }
      return {
        key: category.id,
        id: category.id,
        name: category.name || category.text,
      };
    });
  };
  const data = categories.map((category, index) => ({
    key: category.id,
    id: category.id,
    icon: category.icon_url,
    name: category.text || category.name,
    seller_id: category.seller_id,
    sellerName: sellers[index]?.nickname,
    children: getListChildCategories(category.children),
  }));

  console.log(data);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <Space
            align="center"
            style={{
              marginBottom: 16,
            }}
          >
            CheckStrictly:{" "}
            <Switch checked={checkStrictly} onChange={setCheckStrictly} />
          </Space>
          <Table
            columns={columns}
            rowSelection={{
              ...rowSelection,
              checkStrictly,
            }}
            dataSource={data}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(Category);