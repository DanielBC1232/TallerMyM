import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Para redirigir a la página de edición

const ListarGestVacaciones = () => {
  const [vacaciones, setVacaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filtroTrabajador, setfiltroTrabajador] = useState("");
  const navigate = useNavigate(); // Hook para redirigir

  // Función para obtener todas las vacaciones
  const obtenervacaciones = async () => {
    try {
      const response = await axios.get("http://localhost:3000/trabajadores/obtenerSolicitudVacaciones"); // obtener solicitud, fechaInicio, FechaFin, motivoRechazo, trabajador
      setVacaciones(response.data);
      setError("");
    } catch (error) {
      console.error("Error al obtener vacaciones:", error);
      setError("Error al obtener vacaciones");
    } finally {
      setLoading(false);
    }
  };

  // Obtener vacaciones al cargar el componente
  useEffect(() => {
    obtenervacaciones();
  }, []);

  // Filtrar vacaciones por idTrabajador
  const vacacionesFiltrados = vacaciones.filter((vacaciones) =>
    vacaciones.idTrabajador &&
    String(vacaciones.idTrabajador).includes(filtroTrabajador)
  );

  // Función para redirigir a la página de edición
  const handleAprobar = (idTrabajador) => {
    navigate(`/AprobarVacaciones/${idTrabajador}`); // Redirige a la página de edición
  };
  // Función para redirigir a la página de edición
 

  if (loading) {
    return <p>Cargando vacaciones...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de vacaciones</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por ID de trabajador"
          value={filtroTrabajador}
          onChange={(e) => setfiltroTrabajador(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      {/* Tabla de vacaciones */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Solicitud</th>
            <th className="py-2 px-4 border">Fecha Inicio</th>
            <th className="py-2 px-4 border">Fecha Fin</th>
            <th className="py-2 px-4 border">Motivo de Rechazo</th>
            <th className="py-2 px-4 border">Id Trabajador</th>
            <th className="py-2 px-4 border">Acciones</th> {/* Nueva columna */}
          </tr>
        </thead>
        <tbody>
          {vacacionesFiltrados.map((vacacion) => (
            <tr key={vacacion.idTrabajador}>
              <td className="py-2 px-4 border">{vacacion.solicitud}</td>
              <td className="py-2 px-4 border">{vacacion.fechaInicio}</td>
              <td className="py-2 px-4 border">{vacacion.fechaFin}</td>
              <td className="py-2 px-4 border">{vacacion.motivoRechazo}</td>
              <td className="py-2 px-4 border">{vacacion.idTrabajador}</td>
              <td className="py-2 px-4 border">
                {/* Botón de editar */}
                <button
                  onClick={() => handleAprobar(vacacion.idTrabajador)}
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Ver
                </button>

                

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {vacacionesFiltrados.length === 0 && filtroTrabajador && (
        <p className="text-red-500 mt-4">No se encontraron vacaciones con ese ID de trabajador.</p>
      )}
    </div>
  );
};

export default ListarGestVacaciones;
