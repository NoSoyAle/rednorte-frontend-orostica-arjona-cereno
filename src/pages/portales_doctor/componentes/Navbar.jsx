import React from "react";
import logo from '../../../assets/logo/logosinfondo.png';
import iconoh from '../../../assets/iconos/usuario.png';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg shadow-sm" style={{ backgroundColor: '#608ac1' }}>

            <div className="container-fluid">

                {/* BRAND */}
                <Link to="/PanelDoctor" className="navbar-brand text-white d-flex align-items-center">
                    <img src={logo} alt="Logo" height="50" />
                    <strong className="ms-2">Panel Doctores</strong>
                </Link>

                {/* TOGGLER */}
                <button
                    className="navbar-toggler bg-light"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#nav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* NAV CONTENT */}
                <div className="collapse navbar-collapse" id="nav">

                    <span className="navbar-text ms-auto me-3 text-white">
                        Bienvenido(a), Doctor(a)
                    </span>

                    {/* DROPDOWN */}
                    <ul className="navbar-nav">

                        <li className="nav-item dropdown">

                            <button
                                className="nav-link dropdown-toggle btn btn-link text-white"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img src={iconoh} alt="Usuario" height="30" />
                            </button>

                            <ul className="dropdown-menu dropdown-menu-end">

                                <li>
                                    <Link to="/Modificar" className="dropdown-item">
                                        Modificar Perfil
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/" className="dropdown-item">
                                        Cerrar Sesión
                                    </Link>
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