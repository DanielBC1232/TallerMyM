import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export const BASE_URL = import.meta.env.VITE_API_URL;

const VerificarCorreo = () => {
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [tokenEnviado, setTokenEnviado] = useState(false);

    const handleEnviarCorreo = async () => {
        if (!email) {
            Swal.fire('Advertencia', 'Debe ingresar un correo electrónico', 'warning');
            return;
        }

        try {
            const response = await axios.post(`${BASE_URL}/recuperacion/enviar-token`, { email });

            if (response.status === 200) {
                Swal.fire('Éxito', 'Se ha enviado un token al correo', 'success');
                setTokenEnviado(true);
            }
        } catch (error) {
            Swal.fire('Error', 'No se pudo enviar el token', 'error');
        }
    };

    const handleVerificarToken = async () => {
        if (!token) {
            Swal.fire('Advertencia', 'Debe ingresar el token', 'warning');
            return;
        }

        try {
            const response = await axios.post(`${BASE_URL}/recuperacion/verificar-token`, { email, token });

            if (response.status === 200) {
                Swal.fire('Éxito', 'Token verificado correctamente', 'success');
                // Aquí podrías redirigir al cambio de contraseña o habilitar otro formulario
            }
        } catch (error) {
            Swal.fire('Error', 'Token inválido o expirado', 'error');
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
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    className="btn btn-primary mt-2"
                    onClick={handleEnviarCorreo}
                >
                    Enviar token
                </button>
            </div>

            {tokenEnviado && (
                <div className="mt-4">
                    <label className="form-label">Token recibido</label>
                    <input
                        type="text"
                        className="form-control"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                    />
                    <button
                        className="btn btn-success mt-2"
                        onClick={handleVerificarToken}
                    >
                        Verificar token
                    </button>
                </div>
            )}
        </div>
    );
};

export default VerificarCorreo;
