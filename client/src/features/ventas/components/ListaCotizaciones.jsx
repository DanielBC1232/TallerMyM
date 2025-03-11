import { Button, Grid, Row, Col } from "rsuite";
import React, { useState, useEffect } from "react";
import axios, { Axios } from "axios";

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
                                <button className="btn btn-danger btn-sm text-white me-3">Eliminar</button>
                                <button className="btn btn-secondary btn-sm text-white">Editar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}
export default ListaCotizaciones;
