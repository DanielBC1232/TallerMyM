import { Button, Grid, Row, Col } from "rsuite";
import React, { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import Swal from "sweetalert2";
import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";

// URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

const ListaCotizaciones = () => {
    const [datos, setDatos] = useState([]);
    useEffect(() => {
        const getCotizaciones = async () => {
            try {
                const { data } = await axios.get(`${BASE_URL}/cotizacion/obtener-cotizaciones/`);
                setDatos(data);
            } catch (error) {
                console.error("Error al obtener cotizaciones:", error);
            }
        };
        getCotizaciones();
    }, []);

    function deleteCotizacion(id) {
        Swal.fire({
            text: "Seguro que desea eliminar esta cotización?",
            icon: "error",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {// al confirmar

                axios.delete(`${BASE_URL}/cotizacion/eliminar-cotizacion/${id}`)
                    .then((res) => {
                        console.log(res);

                        if (res.status === 200) {
                            Swal.fire({
                                icon: "success",
                                title: "Cotización eliminada correctamente",
                                showConfirmButton: false,
                                timer: 1500,
                            }).then(() => {
                                //window.location.reload();//recargar pagina
                            });
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Error al eliminar cotización",
                                showConfirmButton: false,
                                timer: 1000,
                            });
                        }
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "No se pudo eliminar la cotizacion",
                            showConfirmButton: true,
                        });
                    });
            }
        });
    }

    const descargarCotizacion = async (id) => {
        //console.log(id);
        try {

            const response = await axios.post(
                `${BASE_URL}/reportes/descargar-cotizacion/${id}`,
                null,
                { responseType: 'blob' }
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
                    fileName = `Cotizacion-${fechaActual}.xlsx`;
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
                title: "Error al descargar la cotizacion",
                text: "No se pudo generar el archivo XLSX.",
            });
        }
    }
    return (
        <div className="p-5">
            <table className="table table-hover table-striped shadow-sm">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Monto Total</th>
                        <th>Tiempo estimado</th>
                        <th>Detalle</th>
                        <th>Fecha</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {datos.map((cotizacion, index) => (
                        <tr key={index}>
                            <td>{cotizacion.nombre + " " + cotizacion.apellido}</td>
                            <td>{"₡ " + cotizacion.montoTotal}</td>
                            <td>{cotizacion.tiempoEstimado}</td>
                            <td>{cotizacion.detalles}</td>

                            <td>{new Date(cotizacion.fecha).toLocaleDateString()}</td>
                            <td>
                                <button type="button" onClick={() => deleteCotizacion(cotizacion.idCotizacion)}
                                    className="btn btn-danger btn-sm text-white me-3">Eliminar</button>
                                <button className="btn btn-secondary btn-sm text-white"><Link to={`/cotizacion-editar/${cotizacion.idCotizacion}`} className="btn-link">Editar</Link></button>
                                <button type="button" onClick={() => descargarCotizacion(cotizacion.idCotizacion)}
                                    className="btn btn-success btn-sm text-white ms-3">Decargar Cotizacion</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default ListaCotizaciones;
