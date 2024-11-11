import { memo } from "react";
import { Table, Tag } from "antd";
import img from "../../../../assets/images/image-login.jpg";

function TabItem() {
  const columns = [
    {
      title: "Ảnh sản phẩm",
      dataIndex: "product_image",
      key: "product_image",
      render: (thumbnail_url) => <img src={thumbnail_url} alt="" height={"100px"} width={"100px"} />,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "order_id",
      key: "order_id",
    },
    {
      title: "Số lượng",
      key: "quantity",
      dataIndex: "quantity",
    },
    {
      title: "Thành tiền",
      key: "total_price",
      dataIndex: "total_price",
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (status) => <Tag color="volcano">{status}</Tag>
    },
  ];
  const data = [
    {
      product_image: img,
      product_name: "Nước hoa Gucci siêu thơm phức nức lòng người",
      order_id: "14621421312374",
      quantity: 3,
      total_price: `1.234.567đ`,
      status: "Chờ xác nhận"
    }
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} style={{borderRadius: "10px", overflow: "hidden"}}/>
    </>
  );
}

export default memo(TabItem);
