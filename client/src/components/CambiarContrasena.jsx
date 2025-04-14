import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_URL;

const CorreoRecuperacion = () => {
    const navigate = useNavigate();
    const [formValue, setFormValue] = useState({
        email: localStorage.getItem("emailRecuperacion"),
        password: ''
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
        const { email, password, confirmPassword } = formValue;

        if (!email || !password || !confirmPassword) {
            Swal.fire({
                icon: 'warning',
                title: 'Campos incompletos',
                text: 'Por favor complete todos los campos',
            });
            return;
        }

        if (password.length < 8) {
            Swal.fire("Advertencia", "La contraseña debe tener al menos 8 caracteres", "warning");
            return;
        }

        if (password !== confirmPassword) {
            Swal.fire("Error", "Las contraseñas no coinciden", "warning");
            return;
        }

        try {
            const response = await axios.put(`${BASE_URL}/admin/actualizar-contrasena`, { email, password });
            console.log(response);

            if (response.status === 200) {
                Swal.fire({
                    title: "Éxito",
                    text: "Contraseña actualizada correctamente",
                    icon: "success",
                    timer: 2000,
                    timerProgressBar: true,
                }).then(() => {
                    localStorage.removeItem("emailRecuperacion");
                    navigate('/login');
                });
            }
        } catch (error) {
            Swal.fire("Error", "No se pudo cambiar la contraseña", "error");
        }
    };

    return (
        <div className="mt-5 d-flex justify-content-center">
            <form onSubmit={handleSubmit}>
                <div className="ms-5 mt-3">
                    <div className="mb-3">
                        <label className="form-label">Nueva contraseña:</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={formValue.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirmar nueva contraseña:</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="form-control"
                            value={formValue.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                        <button className="btn btn-sm btn-secondary text-white" type="submit">
                            Cambiar contraseña
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CorreoRecuperacion;
