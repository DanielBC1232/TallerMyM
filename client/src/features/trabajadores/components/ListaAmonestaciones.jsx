import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

// URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

const ListaAmonestaciones = ({ formData, trigger }) => {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAmonestaciones = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`${BASE_URL}/trabajadores/obtenerAmonestaciones`);
                setDatos(data);
            } catch (error) {
                console.error("Error al obtener amonestaciones:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No se pudieron cargar las amonestaciones",
                    showConfirmButton: true,
                });
            } finally {
                setLoading(false);
            }
        };
        getAmonestaciones();
    }, [formData, trigger]);

    // Función para formatear fecha
    const formatFecha = (fechaString) => {
        if (!fechaString) return '-';
        const fecha = new Date(fechaString);
        return fecha.toLocaleDateString('es-ES');
    };

    // Función para eliminar amonestación
    const deleteAmonestacion = (idAmonestacion) => {
        Swal.fire({
            title: "¿Confirmar eliminación?",
            text: "¿Estás seguro de eliminar esta amonestación?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`${BASE_URL}/trabajadores/Elim-Amonestacion/${idAmonestacion}`);
                    
                    if (response.status === 200) {
                        Swal.fire({
                            icon: "success",
                            title: "Eliminada",
                            text: "La amonestación fue eliminada correctamente",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        // Actualizar el estado eliminando el registro
                        setDatos(datos.filter(amonestacion => amonestacion.idAmonestacion !== idAmonestacion));
                    }
                } catch (error) {
                    console.error("Error al eliminar:", error); 
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "No se pudo eliminar la amonestación",
                        showConfirmButton: true,
                    });
                }
            }
        });
    };

    if (loading) {
        return <div className="p-5 text-center">Cargando amonestaciones...</div>;
    }

    return (
        <div className="p-5">
            <table className="table table-hover table-striped shadow-sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Trabajador</th>
                        <th>Fecha</th>
                        <th>Tipo</th>
                        <th>Motivo</th>
                        <th>Acción</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.map((amonestacion) => (
                        <tr key={amonestacion.idAmonestacion}>
                            <td>{amonestacion.idAmonestacion}</td>
                            <td>{amonestacion.idTrabajador}</td>
                            <td>{formatFecha(amonestacion.fechaAmonestacion)}</td>
                            <td>{amonestacion.tipoAmonestacion}</td>
                            <td>{amonestacion.motivo}</td>
                            <td>{amonestacion.accionTomada || '-'}</td>
                            <td>
                                <div className="d-flex gap-2">
                                    <button 
                                        onClick={() => deleteAmonestacion(amonestacion.idAmonestacion)}
                                        className="btn btn-danger btn-sm text-white"
                                    >
                                        Eliminar
                                    </button>
                                    <button className="btn btn-secondary btn-sm text-white">
                                        <Link 
                                            to={`/amonestaciones-editar/${amonestacion.idAmonestacion}`} 
                                            className="text-white text-decoration-none"
                                        >
                                            Editar
                                        </Link>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListaAmonestaciones;