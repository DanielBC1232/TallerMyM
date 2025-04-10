import React, { useState, useEffect } from "react";
import { Table, Button, Text } from 'rsuite';
import Swal from "sweetalert2";
const { Column, HeaderCell, Cell } = Table;
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";

// URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

const ListadoVentas = () => {
    const navigate = useNavigate();
    const [filtroData, setFiltroData] = useState({
        nombreCliente: "",
        codigoOrden: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFiltroData({
            ...filtroData,
            [name]: value || ""
        });
    };

    //GET Ventas
    const [datos, setDatos] = useState([]);
    useEffect(() => {
        const getOrdenes = async () => {
            try {
                const { data } = await axios.post(`${BASE_URL}/ventas/obtener-ventas`, filtroData, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}` // Agregar el token JWT en las cabeceras
                    }
                });
                setDatos(data);
                //console.log(data);
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 401) {
                        Swal.fire({
                            icon: "warning",
                            title: "Advertencia",
                            text: "Operación no Autorizada",
                            showConfirmButton: false,
                        });
                        navigate("/login"); // Redirigir al login si el token es inválido o no hay sesión activa
                    } else if (error.response.status === 403) {
                        Swal.fire({
                            icon: "warning",
                            title: "Autenticación",
                            text: "Sesión expirada",
                            showConfirmButton: false,
                        });
                        localStorage.clear();
                        navigate("/login"); // Redirigir al login si la sesión ha expirado
                    } else {
                        console.error("Error al obtener ordenes", error);
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Hubo un error al obtener las órdenes",
                            showConfirmButton: false,
                            timer: 1000,
                        });
                    }
                } else {
                    console.error("Error de conexión", error);
                    Swal.fire({
                        icon: "error",
                        title: "Error de conexión",
                        text: "No se pudo conectar al servidor",
                        showConfirmButton: false,
                        timer: 1000,
                    });
                }
            }
        };
        getOrdenes();
    }, [filtroData]);

    return (
        <div>
            <div className="d-flex gap-4 ms-4">
                <span>
                    Orden:
                    <input className="form-control form-control-sm"
                        name="codigoOrden"
                        type="text"
                        value={filtroData.codigoOrden}
                        onChange={handleChange}
                    />
                </span>
                <span>
                    Cliente:
                    <input className="form-control form-control-sm"
                        name="nombreCliente"
                        type="text"
                        value={filtroData.nombreCliente}
                        onChange={handleChange}
                    />
                </span>
            </div>
            <Table
                width={1200}
                height={800}
                data={datos}
            >
                <Column width={200}>
                    <HeaderCell className="text-center">Codigo de Orden</HeaderCell>
                    <Cell className="text-center" dataKey="codigoOrden" />
                </Column>

                <Column width={200}>
                    <HeaderCell className="text-center">Cliente</HeaderCell>
                    <Cell className="text-center" dataKey="nombreCliente" />
                </Column>

                <Column width={400}>
                    <HeaderCell className="text-center">Fecha de venta</HeaderCell>
                    <Cell className="text-center">
                        {rowData => {
                            const fecha = new Date(rowData.fechaVenta);
                            return `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, "0")}-${fecha.getDate().toString().padStart(2, "0")}`;
                        }}
                    </Cell>
                </Column>

                <Column width={350} fixed="right">
                    <HeaderCell className="text-center">Accion</HeaderCell>

                    <Cell className="text-center" style={{ padding: '6px' }}>
                        {rowData => (
                            <Link className="btn btn-sm text-white btn-secondary rounded-1"
                                to={`/detalles/${rowData.idVenta}`}>
                                Gestionar Venta
                            </Link>
                        )}
                    </Cell>
                </Column>
            </Table>
        </div>

    );
}
export default ListadoVentas;
