import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

// URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

const ListaAusencias = ({ formData, trigger }) => {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [trabajadores, setTrabajadores] = useState({}); // Para almacenar nombres de trabajadores hace falta reparar

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                
                // Obtener lista de trabajadores para mostrar nombres (Esto no esta haciendo nada no esta funcional)
                const trabajadoresRes = await axios.get(`${BASE_URL}/trabajadores/obtener-trabajadores`);
                const trabajadoresMap = {};
                trabajadoresRes.data.forEach(trabajador => {
                    trabajadoresMap[trabajador.idTrabajador] = trabajador.nombre;
                });
                //------------------------------------
                setTrabajadores(trabajadoresMap);
                
                // Obtener las ausencias
                const { data } = await axios.get(`${BASE_URL}/trabajadores/obtener-ausencias`);
                setDatos(data);
            } catch (error) {
                console.error("Error al obtener datos:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No se pudieron cargar las ausencias",
                    showConfirmButton: true,
                });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [formData, trigger]);

    // Función para formatear fecha
    const formatFecha = (fechaString) => {
        if (!fechaString) return '-';
        const fecha = new Date(fechaString);
        return fecha.toLocaleDateString('es-ES');
    };

    // Función para mostrar estado de justificación
    const getEstadoJustificacion = (justificada) => {
        return justificada ? "Justificada" : "No justificada";
    };

    // Función para eliminar ausencia
   
    if (loading) {
        return <div className="p-5 text-center">Cargando ausencias...</div>;
    }

    return (
        
        
        <div className="p-5">
            <h1>Lista de Ausencias Justificacion</h1>
            <br />
             <div className="mb-3 text-start">
                    <Link to="/Lista-Justificaciones" className="btn btn-primary">
                      + Listado De Justificaciones
                    </Link>
                  </div>
            <table className="table table-hover table-striped shadow-sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Trabajador</th>
                        <th>Fecha Ausencia</th>
                        <th>Estado</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.map((ausencia) => (
                        <tr key={ausencia.idAusencia}>
                            <td>{ausencia.idAusencia}</td>
                            <td>
                                {trabajadores[ausencia.idTrabajador] || `ID: ${ausencia.idTrabajador}`}{/*Hay que arreglar esto */}
                            </td>

                            <td>{formatFecha(ausencia.fechaAusencia)}</td>
                            
                            <td>
                                <span className={`badge ${ausencia.justificada ? 'bg-success' : 'bg-warning'}`}>
                                    {getEstadoJustificacion(ausencia.justificada)}
                                </span>
                            </td>

                            <td>
                                <div className="d-flex gap-2">
                                    {!ausencia.justificada && (
                                        <button className="btn btn-info btn-sm text-white">
                                            <Link 
                                                to={`/justificar-ausencia/${ausencia.idAusencia}`} 
                                                className="text-white text-decoration-none"
                                            >
                                                Justificar
                                            </Link>
                                        </button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListaAusencias;