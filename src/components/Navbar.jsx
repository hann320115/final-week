import { Link } from "react-router-dom"



export default function Navbar({cartData}){

    return(<>
      <div className="bg-white sticky-top">
        <div className="container">
          <nav className="navbar px-0 navbar-expand-lg navbar-light bg-white">
            <Link className="navbar-brand position-absolute" to="/"
              style={{left: "50%", transform: "translate(-50%, -50%)", top: "50%",}}>
              Navbar
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse bg-white custom-header-md-open" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link className="nav-link ps-0" to="products">產品列表</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link ps-0" to="login">管理員登入</Link>
                </li>
              </ul>
            </div>
            <div className="d-flex">
              <Link to="/cart" className="nav-link position-relative">
                <i className="bi bi-cart3"></i>
                <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                  {cartData?.carts?.length}
                </span>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>)
}