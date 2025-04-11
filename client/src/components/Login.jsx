import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_URL;

const Login = () => {
    const navigate = useNavigate();
    const [formValue, setFormValue] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formValue;
        if (!email || !password) {
            // Usamos SweetAlert2 para notificar
            Swal.fire({
                icon: 'warning',
                title: 'Campos incompletos',
                text: 'Por favor complete ambos campos',
            });
            return;
        }
        try {
            const response = await axios.post(`${BASE_URL}/admin/iniciar-sesion`, formValue);
            //console.log(formValue);
            
            if (response.status === 200) {
                // Login exitoso, redirige -- GENERAR SESION

                //Guardar datos de login a localStorage
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('idUsuario', response.data.idUsuario);
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('email', response.data.email);
                localStorage.setItem('idRol', response.data.idRol);//1-admin,2-user

                //console.log(response.data);

                navigate('/');
            }
        } catch (error) {
            const status = error.response?.status;
            const message = error.response?.data?.message || 'Error inesperado';

            if (status === 401) {
                Swal.fire({
                    icon: 'error',
                    title: 'Credenciales incorrectas',
                    text: message,
                });
            } else if (status === 423) {
                Swal.fire({
                    icon: 'error',
                    title: 'Cuenta bloqueada',
                    text: message,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de inicio de sesión',
                    text: message,
                });
            }

            console.error('Error al intentar iniciar sesión:', error);
        }
    };

    return (
        <div className="mt-5 d-flex justify-content-center">
            <form onSubmit={handleSubmit}>
                <div className="ms-5 mt-3">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Correo:
                        </label>
                        <input
                            type="email"
                            className="form-control form-select-sm"
                            name="email"
                            value={formValue.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Contraseña:
                        </label>
                        <input
                            type="password"
                            className="form-control form-select-sm"
                            name="password"
                            value={formValue.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div >
                        <div className="d-flex justify-content-center mt-4">
                            <button className="btn btn-sm btn-secondary text-white" type="submit">
                                Iniciar sesión
                            </button>
                        </div>
                        <div className="d-flex justify-content-center mt-4">
                            <Link to="/verificar-correo" className="text-decoration-none">
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
