import { memo, useEffect, useState } from "react"
import { axiosApi } from "../../../services/UserService";

function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axiosApi.get("/api/v1/admin/product")
      .then(data => {
        setProducts(data.data.products);
      })
  })
  return (
    <>
      Product
    </>
  )
}

export default memo(Product);