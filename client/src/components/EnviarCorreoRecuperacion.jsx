import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export const BASE_URL = import.meta.env.VITE_API_URL;

const VerificarCorreo = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');

    const handleEnviarCorreo = async () => {
        if (!email) {
            Swal.fire('Advertencia', 'Debe ingresar un correo electrónico', 'warning');
            return;
        }

        try {
            const response = await axios.put(`${BASE_URL}/admin/enviar-correo-token`, { email });
            //console.log(response);
            
            if (response.status === 200) {
                Swal.fire('Éxito', 'Se ha enviado un código de verificación al correo', 'success');
            }
        } catch (error) {
            Swal.fire('Error', 'No se pudo enviar el código de verificación', 'error');
        }
    };

    const handleVerificarToken = async () => {
        if (!token) {
            Swal.fire('Advertencia', 'Debe ingresar el código de verificacion', 'warning');
            return;
        }
        try {
            const response = await axios.post(`${BASE_URL}/admin/verificar-token`, { email, token });

            if (response.status === 200) {
                Swal.fire('Éxito', 'Código verificado correctamente', 'success');
                localStorage.setItem("emailRecuperacion", email);
                navigate("/cambiar-contrasena");
            }
        } catch (error) {
            Swal.fire('Error', 'Código inválido o expirado', 'error');
        }
    };
    
    return (
        <div className="container mt-5" style={{ maxWidth: '500px' }}>
            <div className="mb-3">
                <label className="form-label">Correo electrónico</label>
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.trim())}
                    placeholder='*****@gmail.com' />
                <button className="btn btn-primary mt-2" onClick={handleEnviarCorreo}>
                    Enviar correo
                </button>
            </div>
            <div className="mt-4">
                <label className="form-label">Código de verificacion:</label>
                <input type="text" className="form-control"
                    value={token}
                    onChange={(e) => setToken(e.target.value.trim())}/>
                <button className="btn btn-primary mt-2" onClick={handleVerificarToken}>
                    Verificar código
                </button>
            </div>
        </div>
    );
};

export default VerificarCorreo;
