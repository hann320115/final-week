import axios from "axios";
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";
import { createAsyncMessage } from "../../slice/messageSlice";
const API_PATH = import.meta.env.VITE_API_PATH;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function ProductDetail(){
    const [product, setProduct] = useState({});
    const {id} = useParams();
    const { getCart } = useOutletContext(); //傳入 Navbar 的購物車資料
    const dispatch = useDispatch();

    // 取得產品
    const getProduct = async () => {
        try {
        const respone = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/product/${id}`);
            setProduct(respone.data.product);
        } catch (error) {
            alert("取得商品失敗");
        }
    };
    useEffect(()=>{
        getProduct(id);
    },[id])

    // 讀取效果 - (加入購物車時按鈕禁用)
    const [isLoading, setIsLoading] = useState(false)
    // 購物車數量
    const [cartQuantity, setCartQuantity] = useState(1);
    // 加入購物車
    const addToCart = async () => {
        const data = {
            data: {
                product_id: product.id,
                qty: cartQuantity,
            },
        };
        setIsLoading(true);
        try {
            const res = await axios.post(`${BASE_URL}/v2/api/${API_PATH}/cart`,
                data,
            );
            console.log(res)
            dispatch(createAsyncMessage(res.data)); //代入錯誤訊息
            getCart();
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false);
            dispatch(createAsyncMessage(error.response.data)); //代入錯誤訊息
        }
    }
    // 
    


    return(<>
        <div className="container">
            <div className="object-cover" style={{ minHeight: "400px", backgroundImage: `url(${product.imageUrl})`,
            backgroundPosition: "center center"}}>
            </div>
            <div className="row justify-content-between mt-4 mb-7">
                <div className="col-md-7">
                    <h2 className="mb-0">{product.title}</h2>
                    <p className="fw-bold">{product.price}</p>
                    <p>{product.content}</p>
                </div>
                <div className='col-md-4'>
                    <div className='input-group mb-3 border mt-3'>
                        <div className='input-group-prepend'>
                            {/* 減數量 */}
                            <button
                                className='btn btn-outline-dark rounded-0 border-0 py-3'
                                type='button'
                                id='button-addon1'
                                onClick={() =>
                                setCartQuantity((pre) => (pre === 1 ? pre : pre - 1)) // 防止變負號
                                }
                            >
                                <i className='bi bi-dash'></i>
                            </button>
                        </div>
                        {/* 數字框 */}
                        <input
                            type='number'
                            className='form-control border-0 text-center my-auto shadow-none'
                            placeholder=''
                            aria-label='Example text with button addon'
                            aria-describedby='button-addon1'
                            readOnly   // 防止使用者輸入文字
                            value={cartQuantity}
                        />
                        {/* 加數量 */}
                        <div className='input-group-append'>
                            <button
                                className='btn btn-outline-dark rounded-0 border-0 py-3'
                                type='button'
                                id='button-addon2'
                                onClick={() => setCartQuantity((num) => num + 1)}
                            >
                                <i className='bi bi-plus'></i>
                            </button>
                        </div>
                    </div>
                    <button
                        type='button'
                        className='btn btn-dark w-100 rounded-0 py-3'
                        onClick={() => addToCart()}
                        disabled={isLoading}
                    >
                        加入購物車
                    </button>
                    </div>
            </div>

        </div>
    </>)
}