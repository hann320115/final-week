import axios from "axios";
import { useEffect, useState } from "react"
import Pagination from "../../components/Pagination";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
const API_PATH = import.meta.env.VITE_API_PATH;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Products(){
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({});
    const [isLoading, setLoading] = useState(false);
      // 取得產品
    const getProducts = async (page = 1) => {
        //page=1 若page無參數會帶入預設值1
        try {
            setLoading(true);
            const respone = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/products?page=${page}`);
            setProducts(respone.data.products);
            setPagination(respone.data.pagination);
            setLoading(false);
        } catch (error) {
            alert("取得商品失敗");
        }
    };
    useEffect(()=>{
        getProducts(1);
    },[])


    return(<>
        <div className="container mt-md-5 mt-3 mb-7">
            {/* 讀取效果 */}
            <Loading isLoading={isLoading} />

            <div className="row">
                {products.map((product)=>{
                    return(
                        <div className="col-md-3" key={product.id}>
                            <div className="card border-0 mb-4 position-relative position-relative">
                                <img src={product.imageUrl} className="card-img-top rounded-0 object-cover" alt="..." style={{height:"200px"}}/>
                                <a href="#" className="text-dark">
                                    <i className="far fa-heart position-absolute" style={{right: "16px", top: "16px"}}></i>
                                </a>
                                <div className="card-body p-0">
                                    <h4 className="mb-0 mt-3">
                                        <Link to={`/products/${product.id}`}>
                                            {product.title}
                                        </Link>
                                    </h4>
                                    <p className="text-muted mt-3">{product.price}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            {/* 分頁 */}
            <Pagination pagination={pagination} changePage={getProducts} />
        </div>
    </>)
}