import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Login() {
    const [user,setUser] = useState(
        {
            "username": "",
            "password": ""
        }
    )
    // 取得帳號密碼input的value與name
    const handleChangeInput = (e)=>{
        const {name,value} = e.target;
        setUser({...user,[name]:value});
    }
    // 登入驗證，並使用axios儲存token
    const navigate = useNavigate(); //轉址
    const [loginState,setLoginState] = useState("");
    const submit = async(e)=>{
        e.preventDefault()
        try{
            const respone = await axios.post(`${BASE_URL}/v2/admin/signin`,user);
            const {token ,expired} = respone.data; //expired是登入到期日
            //儲存token         自訂名稱=token    expires= new Date(到期日)
            document.cookie =`userToken=${token}; expires=${new Date(expired)};`;
            // 若登入成功轉到後台頁面
            alert("登入成功")
            if(respone.data.success){
                navigate('/admin/products');
            }
        }catch(error){
            alert("登入失敗");
            setLoginState(error.response.data.message)
        }
    } 


  return (
        <div className="container">
            <div className="d-flex flex-column justify-content-center align-items-center vh-100">
                <h1 className="mb-1">請先登入</h1>
                    <div className={`py-4 my-4 bg-danger text-white text-center fs-4 rounded w-50 ${loginState?'d-block':'d-none'}`}>{loginState}</div>
                <form onSubmit={submit} className="d-flex flex-column gap-3">
                    <div className="form-floating mb-3">
                        <input name="username" type="email" className="form-control" id="username" placeholder="name@example.com"
                            onChange={handleChangeInput}/>
                        <label htmlFor="username">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input name="password" type="password" className="form-control" id="password" placeholder="Password"
                            onChange={handleChangeInput}/>
                        <label htmlFor="password">Password</label>
                    </div>
                    <button className="btn btn-primary">登入</button>
                </form>
            </div>
        </div>
    );
}
