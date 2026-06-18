import React from "react";
import logo from "../../../assets/logo/logosinfondo.png";
import iconoh from "../../../assets/iconos/usuario.png";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const nombre =
        localStorage.getItem("nombre") ||
        "Doctor";

    const cerrarSesion = () => {

        localStorage.clear();

        navigate("/");

    };

    return (

        <nav
            className="navbar navbar-expand-lg shadow-sm"
            style={{
                backgroundColor: "#087f7a"
            }}
        >

            <div className="container-fluid">

                <Link
                    to="/PanelDoctor"
                    className="navbar-brand text-white d-flex align-items-center"
                >

                    <img
                        src={logo}
                        alt="Logo"
                        height="50"
                    />

                    <strong className="ms-2">
                        Panel Doctores
                    </strong>

                </Link>

                <button
                    className="navbar-toggler bg-light"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#nav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="nav"
                >

                    <span
                        className="
                        navbar-text
                        ms-auto
                        me-3
                        text-white
                        fw-bold"
                    >
                        Bienvenido/a Dr(a). {nombre}
                    </span>

                    <ul className="navbar-nav">

                        <li className="nav-item dropdown">

                            <button
                                className="
                                nav-link
                                dropdown-toggle
                                btn
                                btn-link
                                text-white"
                                data-bs-toggle="dropdown"
                            >
                                <img
                                    src={iconoh}
                                    alt="Usuario"
                                    height="30"
                                />
                            </button>

                            <ul
                                className="
                                dropdown-menu
                                dropdown-menu-end"
                            >

                                <li>

                                    <Link
                                        to="/Modificar"
                                        className="dropdown-item"
                                    >
                                        Modificar Perfil
                                    </Link>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <button
                                        className="
                                        dropdown-item
                                        text-danger"
                                        onClick={
                                            cerrarSesion
                                        }
                                    >
                                        Cerrar Sesión
                                    </button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;