import { Outlet } from "react-router-dom"
import Navbar from "../../components/Navbar"
import { useEffect, useState } from "react";
import axios from "axios";
const API_PATH = import.meta.env.VITE_API_PATH;
const BASE_URL = import.meta.env.VITE_BASE_URL;
import MessageToast from '../../components/MessageToast';

export default function FrontLayout(){
    const [cartData, setCartData] = useState({});
    // 取得購物車資料寫在 FrontLayout 以便在 Outlet 傳入到所有子頁面
    const getCart = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`);
            setCartData(res.data.data)
        } catch{
            alert("取得購物車失敗")
        }
    }
    useEffect(() => {
        getCart();
    }, [])

    return(<>
        <Navbar cartData={cartData} />
        <MessageToast />
        <Outlet context={{getCart ,cartData,setCartData }}></Outlet> {/*以物件方式傳入購物車資料*/ }
        <div className="bg-dark">
            <div className="container">
                <div className="d-flex align-items-center justify-content-between text-white py-4">
                    <p className="mb-0">© 2024 學習使用</p>
                    <ul className="d-flex list-unstyled mb-0 h4">
                        <li><a href="#" className="text-white mx-3"><i className="fab fa-facebook"></i></a></li>
                        <li><a href="#" className="text-white mx-3"><i className="fab fa-instagram"></i></a></li>
                        <li><a href="#" className="text-white ms-3"><i className="fab fa-line"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </>)
}