import { Route, Routes } from 'react-router-dom';
import Login from './scss/pages/Login';
import Dashboard from './scss/admin/Dashboard';
import AdminProducts from './scss/admin/adminProducts';
import Home from './scss/pages/Home';


function App() {
  return (
    <>
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/admin" element={<Dashboard/>}>
        <Route path="products" element={<AdminProducts/>}></Route>
        </Route>
      </Routes>
    </div>

    </>
  )
}

export default App
