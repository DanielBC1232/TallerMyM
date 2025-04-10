import React, { useState } from "react";
import swal from "sweetalert2";
import SelectProveedor from "../../inventario/components/SelectProveedor";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

// URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

const AgregarGastoOperativo = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        tipoGasto: "",
        detalle: "",
        monto: 0,
        proveedor: ""
    });

    // Función genérica para actualizar cualquier campo
    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Para inputs HTML estándar
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        handleChange(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(formData);

        // Validación mejorada: todos los campos son obligatorios
        if (!formData.tipoGasto) {
            swal.fire("Error", "Debe seleccionar un tipo de gasto", "error");
            return;
        }

        if (!formData.detalle || formData.detalle.trim() === "") {
            swal.fire("Error", "El detalle del gasto es obligatorio", "error");
            return;
        }

        if (!formData.monto || formData.monto <= 0) {
            swal.fire("Error", "Debe ingresar un monto válido mayor a cero", "error");
            return;
        }

        if (!formData.proveedor) {
            swal.fire("Error", "Debe seleccionar un proveedor o 'ninguno'", "error");
            return;
        }

        try {
            const response = await axios.post(
                `${BASE_URL}/finanzas/agregar-gasto-operativo/`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem('token')}` // Añadido el token JWT al header
                    }
                }
            );

            if (response.status === 201) {
                swal.fire("Éxito", "Gasto operativo registrado correctamente", "success");
                // Reiniciar el formulario a su estado inicial
                setFormData({
                    tipoGasto: "",
                    detalle: "",
                    monto: 0,
                    proveedor: ""
                });
                navigate(0)
            }
        } catch (error) {
            if (error.response) {
                // Manejo de respuestas HTTP
                if (error.response.status === 401) {
                    swal.fire("Advertencia", "Operacion no Autorizada", "warning");
                    navigate(0); // Redirigir a login si no está autorizado
                }
                else if (error.response.status === 403) {
                    swal.fire("Autenticación", "Sesión expirada", "warning");
                    localStorage.clear();
                    navigate("/login"); // Redirigir a login si la sesión ha expirado
                } else {
                    console.error("Error al registrar el gasto:", error);
                    swal.fire("Error", "Hubo un problema al registrar el gasto operativo", "error");
                }
            } else {
                // Manejo de errores en caso de que no haya respuesta del servidor (por ejemplo, problemas de red)
                console.error("Error desconocido al registrar el gasto:", error);
                swal.fire("Error", "Hubo un problema desconocido, por favor intente nuevamente", "error");
            }
        }

    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <span>
                    Tipo de gasto:
                    <select
                        className="form-select form-select-sm"
                        name="tipoGasto"
                        style={{ height: "40px", fontSize: "16px" }}
                        onChange={handleInputChange}
                        value={formData.tipoGasto}>
                        <option value="">Seleccione...</option>
                        <option value="Servicios Basicos">Servicios Básicos</option>
                        <option value="Adquisicion Inventario">Adquisición de Inventario</option>
                    </select>
                </span>

                <span>
                    Detalle:
                    <input
                        className="form-control form-control-sm"
                        type="text"
                        name="detalle"
                        onChange={handleInputChange}
                        value={formData.detalle}
                        placeholder="Ejemplo: Factura electrica, Factura de agua,..."
                    />
                </span>

                <span>
                    Monto:
                    <input
                        className="form-control form-control-sm"
                        type="number"
                        name="monto"
                        onChange={handleInputChange}
                        value={formData.monto}
                        min={0}
                    />
                </span>

                <span>
                    Proveedor ("Ninguno" si no aplica):
                    <SelectProveedor
                        onChange={handleInputChange}
                        value={formData.proveedor}
                    />
                </span>

                <button type="submit" className="btn btn-sm text-white btn-secondary">
                    Registrar
                </button>
            </div>
        </form>
    );
}

export default AgregarGastoOperativo;