import React, { useState, useEffect } from "react";
import axios from "axios";
import { Stat, StatGroup, HStack } from "rsuite";
import Swal from "sweetalert2";
import { Link, useNavigate } from 'react-router-dom';

export const BASE_URL = import.meta.env.VITE_API_URL;

export const Reportes = () => {
    const [clientes, setClientes] = useState([]);
    const [mecanicos, setMecanicos] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getClientesInactivos = async () => {
            try {
                const response = await axios.get(
                    `${BASE_URL}/clientes/obtener-clientes-inactivos`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}` // Añadir el JWT al header
                        }
                    }
                );
                setClientes(response.data);
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
                        console.error("Error al obtener clientes inactivos:", error);
                    }
                } else {
                    console.error("Error desconocido al obtener clientes inactivos:", error);
                }
            }
        };

        const getMecanicosEficientes = async () => {
            try {
                const response = await axios.get(
                    `${BASE_URL}/trabajadores/trabajadores-eficientes`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}` // Añadir el JWT al header
                        }
                    }
                );
                setMecanicos(response.data);
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
                        console.error("Error al obtener mecánicos eficientes:", error);
                    }
                } else {
                    console.error("Error desconocido al obtener mecánicos eficientes:", error);
                }
            }
        };

        getClientesInactivos();
        getMecanicosEficientes();
    }, []);


    const descargarReporteClientes = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/reportes/reporte-clientes-inactivos`,
                {
                    responseType: 'blob',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}` // Agregar JWT en los headers
                    }
                });

            if (response.status === 200 || response.status === 201) {
                await Swal.fire({
                    icon: "success",
                    title: "Documento generado exitosamente",
                    showConfirmButton: false,
                    timer: 1000,
                });

                const blob = new Blob([response.data], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                });

                const downloadUrl = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = downloadUrl;

                // Intentar obtener el nombre del archivo desde el header
                const contentDisposition = response.headers['content-disposition'];
                let fileName = '';
                if (contentDisposition) {
                    const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
                    if (fileNameMatch && fileNameMatch.length === 2) {
                        fileName = fileNameMatch[1];
                    }
                }
                // Si no se recibió el nombre, se genera uno con la fecha actual
                if (!fileName) {
                    const fechaActual = new Date().toISOString().split('T')[0];
                    fileName = `Clientes-Inactivos-${fechaActual}.xlsx`;
                }

                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                link.remove();
                window.URL.revokeObjectURL(downloadUrl);
            }

        } catch (error) {
            if (error.response) {
                // Manejo de respuestas HTTP
                if (error.response.status === 401) {
                    Swal.fire("Advertencia", "Operacion no Autorizada", "warning");
                    navigate(0); // Redirigir a login si no está autorizado
                }
                else if (error.response.status === 403) {
                    Swal.fire("Autenticación", "Sesión expirada", "warning");
                    localStorage.clear();
                    navigate("/login"); // Redirigir a login si la sesión ha expirado
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error al descargar el reporte",
                        text: "No se pudo generar el archivo XLSX.",
                    });
                }
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error al descargar el reporte",
                    text: "No se pudo generar el archivo XLSX.",
                });
            }
        }

    }

    const descargarReporteTrabajadores = async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}/reportes/reporte-trabajadores-eficientes`,
                {
                    responseType: 'blob',
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}` // Se agrega el token JWT
                    }
                }
            );

            if (response.status === 200 || response.status === 201) {
                await Swal.fire({
                    icon: "success",
                    title: "Documento generado exitosamente",
                    showConfirmButton: false,
                    timer: 1000,
                });

                const blob = new Blob([response.data], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                });

                const downloadUrl = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = downloadUrl;

                // Intentar obtener el nombre del archivo desde el header
                const contentDisposition = response.headers['content-disposition'];
                let fileName = '';
                if (contentDisposition) {
                    const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
                    if (fileNameMatch && fileNameMatch.length === 2) {
                        fileName = fileNameMatch[1];
                    }
                }
                // Si no se recibió el nombre, se genera uno con la fecha actual
                if (!fileName) {
                    const fechaActual = new Date().toISOString().split('T')[0];
                    fileName = `Trabajadores-Eficientes-${fechaActual}.xlsx`;
                }

                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                link.remove();
                window.URL.revokeObjectURL(downloadUrl);
            }

        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    Swal.fire({
                        icon: "warning",
                        title: "Advertencia",
                        text: "Operacion no Autorizada",
                        showConfirmButton: false,
                    });
                    navigate(0); // Redirigir si no autorizado
                } else if (error.response.status === 403) {
                    Swal.fire({
                        icon: "warning",
                        title: "Autenticación",
                        text: "Sesión expirada",
                        showConfirmButton: false,
                    });
                    localStorage.clear();
                    navigate("/login"); // Redirigir si la sesión ha expirado
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error al descargar el reporte",
                        text: "No se pudo generar el archivo XLSX.",
                    });
                }
            } else {
                // En caso de un error de red o no se recibe respuesta
                Swal.fire({
                    icon: "error",
                    title: "Error desconocido",
                    text: "Hubo un error al intentar obtener el reporte.",
                });
            }
        }
    }

    return (
        <div className="container mt-5">
            <div className="row">

                {/* Reportes Clientes inactivos */}
                <div className="col col-6">
                    <h3>Clientes Inactivos</h3>
                    <button className="btn btn-sm btn-primary"
                        onClick={() => descargarReporteClientes()}>Generar Reporte</button>
                    <table className="table mt-3">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Teléfono</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.length > 0 ? (
                                clientes.map((cliente) => (
                                    <tr key={cliente.idCliente}>
                                        <td>{cliente.nombreCliente}</td>
                                        <td>{cliente.correo}</td>
                                        <td>{cliente.telefono}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" style={{ textAlign: "center" }}>
                                        No hay resultados
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>

                {/* Reporte Trabajadores Eficientes (Mecánicos) */}
                <div className="col-6">
                    <h3>Mecánicos Más Eficientes</h3>
                    <button className="btn btn-sm btn-primary" onClick={descargarReporteTrabajadores}>
                        Generar Reporte
                    </button>
                    <table className="table mt-3">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Cédula</th>
                                <th>Total Órdenes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mecanicos && mecanicos.length > 0 ? (
                                mecanicos.map((mecanico) => (
                                    <tr key={mecanico.cedula}>
                                        <td>{mecanico.nombreCompleto}</td>
                                        <td>{mecanico.cedula}</td>
                                        <td>{mecanico.totalOrdenes}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" style={{ textAlign: "center" }}>No hay resultados</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default Reportes;
