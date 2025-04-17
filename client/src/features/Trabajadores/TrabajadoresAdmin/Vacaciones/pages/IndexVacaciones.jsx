import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
export const BASE_URL = import.meta.env.VITE_API_URL;
const ListarGestVacaciones = () => {
  const [vacaciones, setVacaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filtroTrabajador, setfiltroTrabajador] = useState("");
  const navigate = useNavigate();

  const obtenervacaciones = async () => {
    try {
      setLoading(true);
      setError("");
      
      const response = await axios.get(
        `${BASE_URL}/trabajadores/obtenerSolicitudVacaciones`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
  
      setVacaciones(response.data);
  
    } catch (error) {
      console.error("Error al obtener vacaciones:", error);
      
      // Manejo específico de errores de autenticación
      if (error.response?.status === 401) {
        Swal.fire("Sesión expirada", "Por favor inicie sesión nuevamente", "warning");
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }
  
      // Manejo de otros errores
      const errorMessage = error.response?.data?.message || "Error al obtener las solicitudes de vacaciones";
      setError(errorMessage);
      Swal.fire("Error", errorMessage, "error");
  
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenervacaciones();
  }, []);

  const vacacionesFiltrados = vacaciones.filter(
    (vacacion) =>
      vacacion.idTrabajador &&
      String(vacacion.idTrabajador).includes(filtroTrabajador)
  );

  const handleAprobar = (idVacaciones) => {
    navigate(`/EditarVacaciones/${idVacaciones}`);
  };

  if (loading) return <p>Cargando vacaciones...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

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
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Solicitud</th>
            <th className="py-2 px-4 border">Fecha Inicio</th>
            <th className="py-2 px-4 border">Fecha Fin</th>
            <th className="py-2 px-4 border">Motivo de Rechazo</th>
            <th className="py-2 px-4 border">Id Trabajador</th>
            <th className="py-2 px-4 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vacacionesFiltrados.map((vacacion) => (
            <tr key={`${vacacion.idVacaciones}-${vacacion.idTrabajador}`}>
              <td className="py-2 px-4 border">{vacacion.solicitud}</td>
              <td className="py-2 px-4 border">
                {new Date(vacacion.fechaInicio).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border">
                {new Date(vacacion.fechaFin).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border">{vacacion.motivoRechazo}</td>
              <td className="py-2 px-4 border">{vacacion.nombreTrabajador}</td>
              <td className="py-2 px-4 border">
                <button
                  onClick={() => handleAprobar(vacacion.idVacaciones)}
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
        <p className="text-red-500 mt-4">
          No se encontraron vacaciones con ese ID de trabajador.
        </p>
      )}
      <Link to="/trabajadores-admin">
        <button
          className="btn btn-secondary btn-sm text-white"
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            borderColor: "#d1d5db",
            padding: "9px 10px",
            fontSize: "18px",
            margin: 10,
          }}
        >
          Regresar
        </button>
      </Link>
    </div>
  );
};

export default ListarGestVacaciones;
