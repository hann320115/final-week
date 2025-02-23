import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
const API_PATH = import.meta.env.VITE_API_PATH;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function ProductDetail(){
    const [product, setProduct] = useState({});
    const {id} = useParams();
    // 取得產品
    const getProduct = async () => {
        try {
        const respone = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/product/${id}`);
            setProduct(respone.data.product);
            console.log(respone.data.product)
        } catch (error) {
            alert("取得商品失敗");
        }
    };
    useEffect(()=>{
        getProduct(id);
    },[id])
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
            </div>
        </div>
    </>)
}