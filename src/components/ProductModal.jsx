import axios from "axios";
import { useContext, useEffect, useState } from "react";
const API_PATH = import.meta.env.VITE_API_PATH;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function ProductModal({ closeProductModal,getProducts,type, tempProduct}) {
  const [tempData, setTempData] = useState({
    title: '',
    category: '',
    origin_price: 100,
    price: 300,
    unit: '',
    description: '',
    content: '',
    is_enabled: 1,
    imageUrl: '',
  });

//   const [, dispatch] = useContext(MessageContext)

// 判斷開啟modal的種類
  useEffect(() => {
    if (type === 'create') {
      setTempData({
        title: '',
        category: '',
        origin_price: 100,
        price: 300,
        unit: '',
        description: '',
        content: '',
        is_enabled: 1,
        imageUrl: '',
      });
    } else if (type === 'edit') {
      setTempData(tempProduct);
    }
  }, [type, tempProduct]);

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
      // 新增API
      let api = `v2/api/${API_PATH}/admin/product`;
      let method = 'post';
      // 編輯API
      if (type === 'edit') {
        api = `v2/api/${API_PATH}/admin/product/${tempProduct.id}`;
        method = 'put';
        console.log(api,method)
      }
      const res = await axios[method](`${BASE_URL}/${api}`,{ data: tempData, }, ); //API獲取

      console.log(res);
      // handleSuccessMessage(dispatch, res);
      closeProductModal();
      getProducts();
    } catch (error) {
      console.log(error);
      // handleErrorMessage(dispatch, error);
    }
  };

  return (
    <div className='modal fade' tabIndex='-1' id='productModal'>
      <div className='modal-dialog modal-lg'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='exampleModalLabel'>
              { type === 'create' ? '建立新商品' : `編輯 ${tempData.title}`}
            </h1>
            <button
              type='button'
              className='btn-close'
              aria-label='Close'
              onClick={closeProductModal}
            />
          </div>
          <div className='modal-body'>
            <div className='row'>
              <div className='col-sm-4'>
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='image'>
                    輸入圖片網址
                    <input
                      type='text'
                      name='imageUrl'
                      id='image'
                      placeholder='請輸入圖片連結'
                      className='form-control'
                    />
                  </label>
                </div>
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='customFile'>
                    或 上傳圖片
                    <input
                      type='file'
                      id='customFile'
                      className='form-control'
                    />
                  </label>
                </div>
                <img src='null' alt='' className='img-fluid' />
              </div>
              <div className='col-sm-8'>
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='title'>
                    標題
                    <input type='text' id='title' name='title' placeholder='請輸入標題' className='form-control'
                      onChange={handleChange}
                      value={tempData.title}
                    />
                  </label>
                </div>
                <div className='row'>
                  <div className='form-group mb-2 col-md-6'>
                    <label className='w-100' htmlFor='category'>
                      分類
                      <input
                        type='text'
                        id='category'
                        name='category'
                        placeholder='請輸入分類'
                        className='form-control'
                        onChange={handleChange}
                        value={tempData.category}
                      />
                    </label>
                  </div>
                  <div className='form-group mb-2 col-md-6'>
                    <label className='w-100' htmlFor='unit'>
                      單位
                      <input
                        type='unit'
                        id='unit'
                        name='unit'
                        placeholder='請輸入單位'
                        className='form-control'
                        onChange={handleChange}
                        value={tempData.unit}
                      />
                    </label>
                  </div>
                </div>
                <div className='row'>
                  <div className='form-group mb-2 col-md-6'>
                    <label className='w-100' htmlFor='origin_price'>
                      原價
                      <input
                        type='number'
                        id='origin_price'
                        name='origin_price'
                        placeholder='請輸入原價'
                        className='form-control'
                        onChange={handleChange}
                        value={tempData.origin_price}
                      />
                    </label>
                  </div>
                  <div className='form-group mb-2 col-md-6'>
                    <label className='w-100' htmlFor='price'>
                      售價
                      <input
                        type='number'
                        id='price'
                        name='price'
                        placeholder='請輸入售價'
                        className='form-control'
                        onChange={handleChange}
                        value={tempData.price}
                      />
                    </label>
                  </div>
                </div>
                <hr />
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='description'>
                    產品描述
                    <textarea
                      type='text'
                      id='description'
                      name='description'
                      placeholder='請輸入產品描述'
                      className='form-control'
                      onChange={handleChange}
                      value={tempData.description}
                    />
                  </label>
                </div>
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='content'>
                    說明內容
                    <textarea
                      type='text'
                      id='content'
                      name='content'
                      placeholder='請輸入產品說明內容'
                      className='form-control'
                      onChange={handleChange}
                      value={tempData.content}
                    />
                  </label>
                </div>
                <div className='form-group mb-2'>
                  <div className='form-check'>
                    <label
                      className='w-100 form-check-label'
                      htmlFor='is_enabled'
                    >
                      是否啟用
                      <input
                        type='checkbox'
                        id='is_enabled'
                        name='is_enabled'
                        placeholder='請輸入產品說明內容'
                        className='form-check-input'
                        onChange={handleChange}
                        checked={Boolean(tempData.is_enabled)} //也可寫成{!!tempData.is_enabled}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              onClick={closeProductModal}
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

