import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

// URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

const ListaJustificaciones = ({ formData, trigger }) => {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ausencias, setAusencias] = useState({}); // Para mapear idAusencia a datos de ausencia

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Obtener lista de ausencias para mostrar información relacionada
        const ausenciasRes = await axios.get(
          `${BASE_URL}/trabajadores/obtener-ausencias`
        );
        const ausenciasMap = {};
        ausenciasRes.data.forEach((ausencia) => {
          ausenciasMap[ausencia.idAusencia] = ausencia;
        });
        setAusencias(ausenciasMap);

        // Obtener las justificaciones
        const { data } = await axios.get(
          `${BASE_URL}/trabajadores/obtener-justificaciones`
        );
        setDatos(data);
      } catch (error) {
        console.error("Error al obtener justificaciones:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron cargar las justificaciones",
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
    if (!fechaString) return "-";
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString("es-ES");
  };

  // Función para eliminar justificación
  const deleteJustificacion = (idJustificacion) => {
    Swal.fire({
      title: "¿Confirmar eliminación?",
      text: "¿Estás seguro de eliminar esta justificación?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `${BASE_URL}/trabajadores/delete-justificacion/${idJustificacion}`
          );

          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Eliminada",
              text: "La justificación fue eliminada correctamente",
              showConfirmButton: false,
              timer: 1500,
            });
            // Actualizar el estado eliminando el registro
            setDatos(
              datos.filter(
                (justificacion) =>
                  justificacion.idJustificacion !== idJustificacion
              )
            );
          }
        } catch (error) {
          console.error("Error al eliminar:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo eliminar la justificación",
            showConfirmButton: true,
          });
        }
      }
    });
  };

  if (loading) {
    return <div className="p-5 text-center">Cargando justificaciones...</div>;
  }

  return (
    <div className="p-5">
      <h2>Lista de Justificaciones</h2>
      <table className="table table-hover table-striped shadow-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>ID Ausencia</th>
            <th>Fecha Ausencia</th>
            <th>Fecha Justificación</th>
            <th>Motivo</th>
            <th>Estado</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((justificacion) => (
            <tr key={justificacion.idJustificacion}>
              <td>{justificacion.idJustificacion}</td>
              <td>{justificacion.idAusencia}</td>
              <td>
                {ausencias[justificacion.idAusencia]
                  ? formatFecha(
                      ausencias[justificacion.idAusencia].fechaAusencia
                    )
                  : "-"}
              </td>
              <td>{formatFecha(justificacion.fechaJustificacion)}</td>
              <td>{justificacion.motivo}</td>
              <td>
                <span
                  className={`badge ${
                    justificacion.estado === "Aprobada"
                      ? "bg-success"
                      : justificacion.estado === "Rechazada"
                      ? "bg-danger"
                      : "bg-warning"
                  }`}
                >
                  {justificacion.estado}
                </span>
              </td>
              <td>
                <div className="d-flex gap-2">
                  <button
                    onClick={() =>
                      deleteJustificacion(justificacion.idJustificacion)
                    }
                    className="btn btn-danger btn-sm text-white"
                  >
                    Eliminar
                  </button>
                  <button className="btn btn-secondary btn-sm text-white">
                    <Link
                      to={`/justificacion-editar/${justificacion.idJustificacion}`}
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
};

export default ListaJustificaciones;
