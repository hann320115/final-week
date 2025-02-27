import axios from 'axios';
import { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
const API_PATH = import.meta.env.VITE_API_PATH;
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useDispatch } from "react-redux";
import { createAsyncMessage } from "../../slice/messageSlice";

function Cart() {
    const { cartData, getCart } = useOutletContext(); // 取得購物車資料 + 重新渲染
    const [loadingItems, setLoadingItem] = useState([]);
    const dispatch = useDispatch();
    // 刪除品項
    const removeCartItem = async (id) => {
        try {
            const res = await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/cart/${id}`);
            console.log(res);
            getCart();
        } catch (error) {
            console.log(error);
        }
    };
    // 修改購物車商品數量
    const updateCartItem = async (item, quantity) => {
        const data = {
            data: {
                product_id: item.product_id,
                qty: quantity,
            },
        };
        setLoadingItem([...loadingItems, item.id]);
        try {
            const res = await axios.put(`${BASE_URL}/v2/api/${API_PATH}/cart/${item.id}`,
                data,
            );
            setLoadingItem(
                loadingItems.filter((loadingObject) => loadingObject !== item.id),
            );
            dispatch(createAsyncMessage(res.data)); //代入錯誤訊息
            getCart();
        } catch (error) {
            dispatch(createAsyncMessage(error.response.data)); //代入錯誤訊息
        }
    };

return (
    <div className='container'>
        <div className='row justify-content-center'>
            <div className='col-md-6 bg-white py-5 full-height'>
                
            {cartData?.carts?.length === 0 ? (
                <>
                    <div className='alert alert-secondary'>還沒有選擇餐點喔</div>
                    <Link className='btn btn-dark w-100 mt-4 rounded-0 py-3' to='/products'>
                        選擇美味套餐
                    </Link>
                </>) 
                : (<>
                    <div className='d-flex justify-content-between'>
                        <h2 className='mt-2'>您的餐點</h2>
                    </div>
                    {cartData?.carts?.map((item) => {
                        return (
                            <div className='d-flex mt-4 bg-light' key={item.id}>
                                {/* 商品圖片 */}
                                <img src={item.product.imageUrl}  alt='' className='object-cover' style={{ width: '120px',}} />
                                <div className='w-100 p-3 position-relative'>
                                {/* 刪除 XX 按鈕 */}
                                <button type='button' className='position-absolute btn'
                                    style={{ top: '10px', right: '10px' }}
                                    onClick={() => {
                                        removeCartItem(item.id);
                                    }}
                                >
                                    <i className='bi bi-x-lg'></i>
                                </button>
                                {/* 商品名稱 */}
                                <p className='mb-0 fw-bold'>{item.product.title}</p>
                                {/* 商品內容 */}
                                <p className='mb-1 text-muted' style={{ fontSize: '14px' }}>
                                    {item.product.content}
                                </p>
                                <div className='d-flex justify-content-between align-items-center w-100'>
                                    <div className='input-group w-50 align-items-center'>
                                        {/* 商品數量 */}
                                        <select name='' className='form-select' id='' 
                                            value={item.qty}   //讀取下拉值，以便e.target.value讀取
                                            disabled={loadingItems.includes(item.id)} //這段要請AI大大解釋
                                            onChange={(e) => {
                                                updateCartItem(item, e.target.value * 1); // 將(商品,數量)帶入更新數量的函式
                                                                                          // 因select的值為字串，使用*1 將string型別轉換為number  
                                            }}
                                        >
                                            {/* 下拉選單的數量 20筆 */}
                                            {[...new Array(20)].map((i, num) => {
                                                return (
                                                    <option value={num + 1} key={num}>
                                                        {num + 1}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    {/* 各項商品 - 總金額 */}
                                    <p className='mb-0 ms-auto'>NT${item.final_total}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            <div className='d-flex justify-content-between mt-4'>
                <p className='mb-0 h4 fw-bold'>總金額</p>
                <p className='mb-0 h4 fw-bold'>NT${cartData.final_total}</p>
            </div>
            <Link to='/checkout' className='btn btn-dark w-100 mt-4 rounded-0 py-3'>
                確認餐點正確
            </Link>
            </>
        )}
            </div>
        </div>
    </div>
);
}

export default Cart;