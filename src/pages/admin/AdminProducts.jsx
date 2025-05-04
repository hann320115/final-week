import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ProductModal from "../../components/ProductModal";
import { Modal } from "bootstrap";
import DeleteModal from "../../components/DeleteModal";
import Pagination from "../../components/Pagination";
const API_PATH = import.meta.env.VITE_API_PATH;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});

  const [type, setType] = useState("create");
  const [tempProduct, setTempProduct] = useState({});

  // 取得產品
  const getProducts = async (page = 1) => {
    //page=1 若page無參數會帶入預設值1
    try {
      // 取出token
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("userToken="))
        ?.split("=")[1];
      // 代入token
      axios.defaults.headers.common["Authorization"] = token;
      const respone = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/admin/products?page=${page}`
      );
      setProducts(respone.data.products);
      setPagination(respone.data.pagination);
    } catch{
      alert("取得商品失敗");
    }
  };
  // 取消點擊遮罩關閉modal + 加入deleteModal
  const productModal = useRef(null);
  const deleteModal = useRef(null);
  useEffect(() => {
    productModal.current = new Modal("#productModal", {
      backdrop: "static",
    });
    deleteModal.current = new Modal("#deleteModal", {
      backdrop: "static",
    });
    getProducts();
  }, []);

  // ================================= Modal - 產品詳細 =================================
  const openProductModal = (type, product) => {
    setType(type);
    setTempProduct(product);
    productModal.current.show();
  };
  const closeProductModal = () => {
    productModal.current.hide();
  };
  // ================================= Modal - 刪除產品 =================================
  // -------------------------------------- 開啟
  const openDeleteModal = (product) => {
    setTempProduct(product);
    deleteModal.current.show();
  };
  // -------------------------------------- 關閉
  const closeDeleteModal = () => {
    deleteModal.current.hide();
  };

  // ================================= 刪除產品 API =================================
  const deleteProduct = async (id) => {
    try {
      const res = await axios.delete(
        `${BASE_URL}/v2/api/${API_PATH}/admin/product/${id}`
      );
      if (res.data.success) {
        getProducts();
        //   handleSuccessMessage(dispatch, res);
        deleteModal.current.hide();
      }
    } catch (error) {
      alert(error.response.data.message)
      //   handleErrorMessage(dispatch, error);
    }
  };

  return (
    <>
      <div className="p-3">
        <ProductModal
          closeProductModal={closeProductModal}
          getProducts={getProducts}
          tempProduct={tempProduct}
          type={type}
        />
        {/* -------------- 刪除提示 modal --------------------*/}
        <DeleteModal
          close={closeDeleteModal}
          text={tempProduct.title}
          handleDelete={deleteProduct}
          id={tempProduct.id}
        />
        {/* ------------------------------------------------- */}
        <h3>產品列表</h3>
        <hr />
        <div className="text-end">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => openProductModal("create", {})}
          >
            建立新商品
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">分類</th>
              <th scope="col">名稱</th>
              <th scope="col">售價</th>
              <th scope="col">啟用狀態</th>
              <th scope="col">編輯</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product.id}>
                  <td>{product.category}</td>
                  <td>{product.title}</td>
                  <td>{product.price}</td>
                  <td>{product.is_enabled ? "啟用" : "未啟用"}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => openProductModal("edit", product)}
                    >
                      編輯
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm ms-2"
                      onClick={() => openDeleteModal(product)}
                    >
                      刪除
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* 分頁 */}
        <Pagination pagination={pagination} changePage={getProducts} />



      </div>
    </>
  );
}
