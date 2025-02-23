import { Link } from "react-router-dom"



export default function Navbar(){
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
              </ul>
            </div>
            <div className="d-flex">
              <Link to="/" className="nav-link">
                <i className="bi bi-cart3"></i>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>)
}