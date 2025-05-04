import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCoupons from './pages/admin/AdminCoupons';
import AdminOrders from './pages/admin/AdminOrders';
import FrontLayout from './pages/front/FrontLayout';
import Home from './pages/front/Home';
import Products from './pages/front/Products';
import ProductDetail from './pages/front/ProductDetail';
import Cart from './pages/front/Cart';
import Checkout from './pages/front/Checkout';
import Success from './pages/front/Success';

export default function App() {

  return (
    <>
    <div className="App">
      {/* 前台 */}
      <Routes>
        <Route path="/" element={<FrontLayout/>}>
          <Route path="" element={<Home/>}></Route>
          <Route path="products" element={<Products/>}></Route>
          <Route path="products/:id" element={<ProductDetail/>}></Route>
          <Route path="cart" element={<Cart/>}></Route>
          <Route path='checkout' element={<Checkout />}></Route>
          <Route path='success/:orderId' element={<Success />}></Route>
        </Route>
        <Route path="/login" element={<Login/>}></Route>
        {/* 後台 */}
        <Route path="/admin" element={<Dashboard/>}>
          <Route path="products" element={<AdminProducts/>}></Route>
          <Route path="coupons" element={<AdminCoupons/>}></Route>
          <Route path="orders" element={<AdminOrders/>}></Route>
        </Route>
      </Routes>
    </div>

    </>
  )
}

