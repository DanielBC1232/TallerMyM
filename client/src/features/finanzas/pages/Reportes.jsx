import React, { useState, useEffect } from "react";
import axios from "axios";
import { Stat, StatGroup, HStack } from "rsuite";
import Swal from "sweetalert2";

export const BASE_URL = import.meta.env.VITE_API_URL;

export const Reportes = () => {
    const [clientes, setClientes] = useState([]);
    const [mecanicos, setMecanicos] = useState(null);
    useEffect(() => {
        const getClientesInactivos = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/clientes/obtener-clientes-inactivos`);
                setClientes(response.data);
            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        };
        getClientesInactivos();

        const getMecanicosEficientes = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/trabajadores/trabajadores-eficientes`);
                setMecanicos(response.data);
            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        };
        getMecanicosEficientes();

    }, []);

    const descargarReporteClientes = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/reportes/reporte-clientes-inactivos`, { responseType: 'blob' });

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
            Swal.fire({
                icon: "error",
                title: "Error al descargar la reporte",
                text: "No se pudo generar el archivo XLSX.",
            });
        }
    }

    const descargarReporteTrabajadores = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/reportes/reporte-trabajadores-eficientes`, { responseType: 'blob' });

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
            Swal.fire({
                icon: "error",
                title: "Error al descargar la reporte",
                text: "No se pudo generar el archivo XLSX.",
            });
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
