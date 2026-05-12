import React from "react";
import logo from '../../../assets/logo/logosinfondo.png';
import iconoh from '../../../assets/iconos/usuario.png';
import { Link } from 'react-router-dom';

function Navbar() {    

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img
                        src={logo}
                        alt="Logo"
                        height="50"
                    />
                    <strong className="ms-2">
                        Panel Doctores
                    </strong>
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >

                    <span className="navbar-toggler-icon"></span>

                </button>

                <div className="d-flex align-items-center ms-auto">

                    <div
                        className="collapse navbar-collapse"
                        id="navbarNavDropdown"
                    >

                        <span className="navbar-text me-3">

                            Bienvenido(a), Doctor(a)
                        </span>
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <img
                                        src={iconoh}
                                        alt="Usuario"
                                        height="30"
                                    />
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link to="/" className="dropdown-item">
                                            Cerrar Sesión
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/Modificar" className="dropdown-item">
                                            Modificar Perfil
                                        </Link>
                                    </li>
                                    
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;