import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from "./componentes/Navbar";
import Footer from "./componentes/footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ModificarPerfil() {

    const navigate = useNavigate();
    const cerrar = () => {
        localStorage.clear();
        navigate('/');
    };

    const [editarNombre, setEditarNombre] = useState(false);

    const [nombre, setNombre] = useState('Juan');
    const [apellido, setApellido] = useState('Pérez');

    const [fechaNacimiento, setFechaNacimiento] = useState('');

    const [sexo, setSexo] = useState('');

    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');

    const [especialidad, setEspecialidad] = useState('');

    return (
        <>
            <Navbar />

            <div className="container-fluid mt-4 mb-5 " style={{ width: '65%' }}>

                <div className="bg-light border border-dark-subtle rounded p-5 shadow-sm">

                    <h3 className="text-center mb-4">
                        Modifica tu perfil
                    </h3>

                    {/* FOTO PERFIL */}
                    <div className="text-center mb-4">

                        <img
                            src="/iconos/usuario.png"
                            alt="Perfil"
                            className="rounded-circle border"
                            width="120"
                            height="120"
                        />

                        <div className="mt-3">

                            <label className="form-label">
                                Sube tu foto de perfil
                            </label>

                            <input
                                type="file"
                                className="form-control"
                            />

                        </div>

                    </div>

                    {/* NOMBRE Y APELLIDO */}
                    <div className="row mb-4">

                        <div className="col-md-6">

                            <label className="form-label">
                                Nombre
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={nombre}
                                disabled={!editarNombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />

                        </div>

                        <div className="col-md-6">

                            <label className="form-label">
                                Apellido
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={apellido}
                                disabled={!editarNombre}
                                onChange={(e) => setApellido(e.target.value)}
                            />

                        </div>

                    </div>

                    <div className="mb-4">

                        <button
                            className="btn btn-outline-primary"
                            onClick={() => setEditarNombre(!editarNombre)}
                        >
                            {editarNombre
                                ? 'Guardar Nombre'
                                : 'Modificar Nombre'}
                        </button>

                    </div>

                    {/* FECHA NACIMIENTO */}
                    <div className="mb-4">

                        <label className="form-label">
                            Fecha de nacimiento
                        </label>

                        <DatePicker
                            selected={fechaNacimiento}
                            onChange={(date) => setFechaNacimiento(date)}
                            dateFormat="dd/MM/yyyy"
                            className="form-control w-100 p-2"
                            showYearDropdown
                            scrollableYearDropdown
                            yearDropdownItemNumber={100}
                            placeholderText="Seleccione o escriba una fecha: dd/MM/yyyy"
                        />


                    </div>

                    {/* SEXO */}
                    <div className="mb-4">

                        <label className="form-label d-block">
                            Sexo
                        </label>

                        <div className="form-check form-check-inline">

                            <input
                                className="form-check-input"
                                type="radio"
                                name="sexo"
                                value="Masculino"
                                onChange={(e) =>
                                    setSexo(e.target.value)
                                }
                            />

                            <label className="form-check-label">
                                Masculino
                            </label>

                        </div>

                        <div className="form-check form-check-inline">

                            <input
                                className="form-check-input"
                                type="radio"
                                name="sexo"
                                value="Femenino"
                                onChange={(e) =>
                                    setSexo(e.target.value)
                                }
                            />

                            <label className="form-check-label">
                                Femenino
                            </label>

                        </div>

                    </div>

                    {/* TELÉFONO */}
                    <div className="mb-4">

                        <label className="form-label">
                            Teléfono
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="+56 9 1234 5678"
                            value={telefono}
                            onChange={(e) =>
                                setTelefono(e.target.value)
                            }
                        />

                    </div>

                    {/* CORREO */}
                    <div className="mb-4">

                        <label className="form-label">
                            Correo electrónico
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            placeholder="doctor@rednorte.cl"
                            value={correo}
                            onChange={(e) =>
                                setCorreo(e.target.value)
                            }
                        />

                    </div>

                    {/* ESPECIALIDAD */}
                    <div className="mb-4">

                        <label className="form-label">
                            Especialidad
                        </label>

                        <select
                            className="form-select"
                            value={especialidad}
                            onChange={(e) =>
                                setEspecialidad(e.target.value)
                            }
                        >

                            <option value="">
                                Seleccione una especialidad
                            </option>

                            <option value="Cardiología">
                                Cardiología
                            </option>

                            <option value="Neurología">
                                Neurología
                            </option>

                            <option value="Pediatría">
                                Pediatría
                            </option>

                        </select>

                    </div>

                    {/* BOTÓN */}
                    <div className="text-center mt-5">

                            
                        <button  className="btn btn-success px-5">
                            Guardar Cambios
                        </button>

                    </div>

                </div>

            </div>

            <Footer />
        </>
    );
}

const styles={

}