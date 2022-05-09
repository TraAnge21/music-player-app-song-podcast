import '../assets/css/nucleo-icons.css'
import '../assets/css/nucleo-svg.css'
import '../assets/css/soft-ui-dashboard.css?v=1.0.3'
import {Link} from "react-router-dom";


export default function Navbar(){
    return (
        <>
            <div className="background top-0">
                <div className="row">
                    <div className="col-12">
                        <nav
                            className="navbar rounded-pill  container bg-dark navbar-expand-lg position-absolute ms-5 z-index-3 w-100 shadow-none my-3 navbar-transparent mt-4">
                            <div className="container">
                                <Link className="navbar-brand font-weight-bolder fs-5 ms-lg-0 ms-3 text-white"
                                   to="/">
                                    Music App
                                </Link>
                                <button className="navbar-toggler shadow-none ms-2" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false"
                                        aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon mt-2">
                                      <span className="navbar-toggler-bar bar1"/>
                                      <span className="navbar-toggler-bar bar2"/>
                                      <span className="navbar-toggler-bar bar3"/>
                                    </span>
                                </button>
                                <div className="collapse navbar-collapse" id="navigation">
                                    <ul className="navbar-nav mx-auto ms-xl-auto me-xl-7">
                                        <li className="nav-item">
                                            <Link className="nav-link me-2" to="/addPodcast">
                                                <i className="fa fa-plus opacity-6  me-1"/>
                                                Add Podcast
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>

        </>
    )
}