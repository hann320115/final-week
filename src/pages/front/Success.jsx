import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
const API_PATH = import.meta.env.VITE_API_PATH;
const BASE_URL = import.meta.env.VITE_BASE_URL;



export default function Success() {
    const { orderId } = useParams();
    const [orderData, setOrderData] = useState({});

    // 結帳 API
    const getCart = async (orderId) => {
        try{
            const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/order/${orderId}`);
            setOrderData(res.data.order);
        }catch(error){
            alert("結帳失敗");
        }
    };

    useEffect(() => {
        getCart(orderId);
    }, [orderId]);

    return (
        <div className='container full-height'>
            <div style={{
                    minHeight: '400px',
                    backgroundImage:
                        'url(https://images.unsplash.com/photo-1480399129128-2066acb5009e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)',
                    backgroundPosition: 'center center',
                }}
            ></div>
            <div className='mt-5 mb-7'>
                <div className='row'>
                    <div className='col-md-6'>
                        <h2>餐點選購成功</h2>
                        <p className='text-muted'>
                            親愛的顧客，感謝您在本平台訂餐。我們非常感激您對我們的信任和支持，讓我們有機會為您提供美味的餐點和優質的服務。
                        </p>
                        <p className='text-muted'>
                            感謝您選擇本平台，祝您用餐愉快，生活愉快！
                        </p>
                        <Link to='/' className='btn btn-outline-dark me-2 rounded-0 mb-4'>
                            回到首頁
                        </Link>
                    </div>
                    <div className='col-md-6'>
                        <div className='card rounded-0 py-4'>
                            <div className='card-header border-bottom-0 bg-white px-4 py-0'>
                                <h2>選購餐點細節</h2>
                            </div>
                            <div className='card-body px-4 py-0'>
                                <ul className='list-group list-group-flush'>
                                {/* 因為orderData是物件格式，因此需要將其轉換成陣列 */}
                                {/* 因可能還沒有抓到資料undefined 所以需加入判斷 */}
                                {Object.values(orderData?.products || {}).map((item) => {
                                    return (
                                    <li className='list-group-item px-0' key={item.id}>
                                        <div className='d-flex mt-2'>
                                        <img src={item.product.imageUrl} alt='' className='me-2'
                                            style={{ width: '60px', height: '60px' }}
                                        />
                                        <div className='w-100 d-flex flex-column'>
                                            <div className='d-flex justify-content-between fw-bold'>
                                                <h5>{item.product.title}</h5>
                                                <p className='mb-0'>x{item.qty}</p>
                                            </div>
                                            <div className='d-flex justify-content-between mt-auto'>
                                                <p className='text-muted mb-0'>
                                                    <small>NT${item.product.price}</small>
                                                </p>
                                                <p className='mb-0'>NT${item.final_total}</p>
                                            </div>
                                        </div>
                                        </div>
                                    </li>
                                    );
                                })}
                                    <li className='list-group-item px-0 pb-0'>
                                        <div className='d-flex justify-content-between mt-2'>
                                        <p className='mb-0 h4 fw-bold'>總計</p>
                                        <p className='mb-0 h4 fw-bold'>NT${orderData.total}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

