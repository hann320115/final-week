import axios from "axios";
import { useEffect, useRef, useState } from "react";
import CouponsModal from "../../components/CouponsModal";
import { Modal } from "bootstrap";
import DeleteModal from "../../components/DeleteModal";
import Pagination from "../../components/Pagination";
const API_PATH = import.meta.env.VITE_API_PATH;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [pagination, setPagination] = useState({});

  const [type, setType] = useState("create");
  const [tempCoupon, setTempCoupon] = useState({});


  // ============= 取消點擊遮罩關閉modal + 加入deleteModal =============
  const couponsModal = useRef(null);
  const deleteModal = useRef(null);
  useEffect(() => {
    couponsModal.current = new Modal("#couponModal", {
      backdrop: "static",
    });
    deleteModal.current = new Modal("#deleteModal", {
      backdrop: "static",
    });
    getCoupons();
  }, []);

  // ================================= 取得優惠券 =================================
  const getCoupons = async (page = 1) => {
    //page=1 若page無參數會帶入預設值1
    try {
      const respone = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/admin/coupons?page=${page}`
      );
      setCoupons(respone.data.coupons);
      setPagination(respone.data.pagination);
    } catch (error) {
      alert("取得商品失敗");
    }
  };

  // ================================= Modal =================================
  const openCouponsModal = (type, coupons) => {
    setType(type);
    setTempCoupon(coupons);
    couponsModal.current.show();
  };
  const closeCouponsModal = () => {
    couponsModal.current.hide();
  };
  // ================================= Modal - 刪除優惠券 =================================
  // -------------------------------------- 開啟
  const openDeleteModal = (product) => {
    setTempCoupon(product);
    deleteModal.current.show();
  };
  // -------------------------------------- 關閉
  const closeDeleteModal = () => {
    deleteModal.current.hide();
  };

  // ================================= 刪除優惠券 API =================================
  const deleteCoupons = async (id) => {
    try {
      const res = await axios.delete(
        `${BASE_URL}/v2/api/${API_PATH}/admin/coupon/${id}`
      );
      if (res.data.success) {
        getCoupons();
        deleteModal.current.hide();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="p-3">
        <CouponsModal
          closeModal={closeCouponsModal}
          getCoupons={getCoupons}
          tempCoupon={tempCoupon}
          type={type}
        />
        {/* -------------- 刪除提示 modal --------------------*/}
        <DeleteModal
          close={closeDeleteModal}
          text={tempCoupon.title}
          handleDelete={deleteCoupons}
          id={tempCoupon.id}
        />
        {/* ------------------------------------------------- */}
        <h3>優惠券列表</h3>
        <hr />
        <div className="text-end">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => openCouponsModal("create", {})}
          >
            建立新優惠券
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">標題</th>
              <th scope="col">折扣</th>
              <th scope="col">到期日</th>
              <th scope="col">優惠碼</th>
              <th scope="col">啟用狀態</th>
              <th scope="col">編輯</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((product) => {
              return (
                <tr key={product.id}>
                  <td>{product.title}</td>
                  <td>{product.percent}</td>
                  <td>{new Date(product.due_date).toDateString()}</td>
                  <td>{product.code}</td>
                  <td>{product.is_enabled ? "啟用" : "未啟用"}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => openCouponsModal("edit", product)}
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
        <Pagination pagination={pagination} changePage={getCoupons} />



      </div>
    </>
  );
}
