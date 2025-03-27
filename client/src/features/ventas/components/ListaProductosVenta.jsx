import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";


//URL BASE
export const BASE_URL = import.meta.env.VITE_API_URL;

const ListaProductosVenta = () => {
    const { idVenta } = useParams();
    const [reload, setReload] = useState(0);//listado
    const [productos, setProductos] = useState([]);//listado
    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const { data } = await axios.get(`${BASE_URL}/ventas/obtener-productos-venta/${parseInt(idVenta)}`);
                setProductos(data)

            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        };
        if (idVenta) {
            obtenerDatos();
        }
    }, [idVenta, reload]);

    // Remover producto de la venta
    async function RemoverProductoVenta(id, idProductoParam, cantidadParam) {
        try {
            const deleteData = {
                idProductoVenta: parseInt(id),
                idProducto: parseInt(idProductoParam),
                cantidad: parseInt(cantidadParam)
            }
            console.log(deleteData)
            const res = await axios.post(`${BASE_URL}/ventas/eliminar-producto-venta/`, deleteData);
            setReload(prev => prev + 1);

        } catch (error) {
            Swal.fire({
                text: "Error al remover producto",
                icon: "error",
                showConfirmButton: false,
            });
            console.error("Error al eliminar el producto:", error)
        }
    }

    return (
        <div className="">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Monto Unitario</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {productos.length > 0 ? (
                        <>
                            {productos.map(producto => (
                                <tr key={producto.idProducto}>
                                    <td className="text-center">{producto.nombreProducto}</td>
                                    <td className="text-center">x {producto.cantidad}</td>
                                    <td className="text-center">₡ {producto.montoFinalUnitario}</td>
                                    <td className="text-center">
                                        <button className="btn btn-sm text-white btn-danger"
                                            onClick={() => RemoverProductoVenta(producto.idProductoVenta, producto.idProducto, producto.cantidad)}
                                        >Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                            {/* Fila monto total */}
                            <tr>
                                <td className="text-center"><strong>Total</strong></td>
                                <td></td>
                                <td className="text-center"><strong>₡ {productos[0].montoTotalVenta}</strong></td>
                                <td></td>
                            </tr>
                        </>
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">No hay productos en esta venta</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )

}
export default ListaProductosVenta;