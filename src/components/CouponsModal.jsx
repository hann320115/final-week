import axios from "axios";
import { useContext, useEffect, useState } from "react";
const API_PATH = import.meta.env.VITE_API_PATH;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function CouponsModal({ closeModal,getCoupons , type, tempCoupon}) {
  const [tempData, setTempData] = useState({
      "title": "超級特惠價格",
      "is_enabled": 1,
      "percent": 80,
      "due_date": 1555459200,
      "code": "testCode"
    });

    // 優惠券到期日
    const [date ,setDate] = useState(new Date())




// 判斷開啟modal的種類
useEffect(() => {
  if (type === 'create') {
    setTempData({
      title: '',
      is_enabled: 1,
      percent: 80,
      due_date: 1555459200,
      code: 'testCode',
    });
    setDate(new Date());
  } else if (type === 'edit') {
    setTempData(tempCoupon);
    setDate(new Date(tempCoupon.due_date))
  }
}, [type, tempCoupon]);

// 轉換型別並寫入TempData
  const handleChange = (e) => {
    const { value, name } = e.target;
    if (['price', 'origin_price'].includes(name)) {
      setTempData({
        ...tempData,
        [name]: Number(value),
      });
    } else if (name === 'is_enabled') {
      setTempData({
        ...tempData,
        [name]: +e.target.checked, // boolean 前面加上+可以將布林值做轉型 false 變成 0
      });
    } else {
      setTempData({
        ...tempData,
        [name]: value,
      });
    }
  };
// 依照開啟modal種類來選擇使用的API
const submit = async () => {
  try {
    let api = `${BASE_URL}/v2/api/${API_PATH}/admin/coupon`;
    let method = 'post';
    if (type === 'edit') {
      api = `${BASE_URL}/v2/api/${API_PATH}/admin/coupon/${tempCoupon.id}`;
      method = 'put';
    }
    const res = await axios[method](
      api,
      {
        data: {
          ...tempData,
          due_date: date.getTime(), // 轉換成 unix timestamp
        },
      },
    );
    console.log(res);
    closeModal();
    getCoupons();
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className='modal fade' tabIndex='-1' id='couponModal'>
      <div className='modal-dialog modal-lg'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='exampleModalLabel'>
              { type === 'create' ? '建立新優惠券' : `編輯 ${tempData.title}`}
            </h1>
            <button
              type='button'
              className='btn-close'
              aria-label='Close'
              onClick={closeModal}
            />
          </div>
          {/* ======== 優惠券 - 內容 ======== */}
          <div className='modal-body'>
            {/* 標題 */}
            <div className='mb-2'>
              <label className='w-100' htmlFor='title'>
                標題
                <input
                  type='text'
                  id='title'
                  placeholder='請輸入標題'
                  name='title'
                  className='form-control mt-1'
                  value={tempData.title}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className='row'>
              {/* 折扣 */}
              <div className='col-md-6 mb-2'>
                <label className='w-100' htmlFor='percent'>
                  折扣（%）
                  <input
                    type='text'
                    name='percent'
                    id='percent'
                    placeholder='請輸入折扣（%）'
                    className='form-control mt-1'
                    value={tempData.percent}
                    onChange={handleChange}
                  />
                </label>
              </div>
              {/* 到期日 */}
              <div className='col-md-6 mb-2'>
                <label className='w-100' htmlFor='due_date'>
                  到期日
                  <input
                    type='date'
                    id='due_date'
                    name='due_date'
                    placeholder='請輸入到期日'
                    className='form-control mt-1'
                    value={`${date.getFullYear().toString()}-${(
                      date.getMonth() + 1
                    )
                      .toString()
                      .padStart(2, 0)}-${date
                      .getDate()
                      .toString()
                      .padStart(2, 0)}`}
                    onChange={(e) => {
                      setDate(new Date(e.target.value));
                    }}
                  />
                </label>
              </div>
              {/* 優惠號碼 */}
              <div className='col-md-6 mb-2'>
                <label className='w-100' htmlFor='code'>
                  優惠碼
                  <input
                    type='text'
                    id='code'
                    name='code'
                    placeholder='請輸入優惠碼'
                    className='form-control mt-1'
                    value={tempData.code}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
            {/* 啟用是否 */}
            <label className='form-check-label' htmlFor='is_enabled'>
              <input
                className='form-check-input me-2'
                type='checkbox'
                id='is_enabled'
                name='is_enabled'
                checked={!!tempData.is_enabled}
                onChange={handleChange}
              />
              是否啟用
            </label>
          </div>
          {/* 按鈕 */}
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              onClick={closeModal}
            >
              關閉
            </button>
            <button type='button' className='btn btn-primary' onClick={submit}>
              儲存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

