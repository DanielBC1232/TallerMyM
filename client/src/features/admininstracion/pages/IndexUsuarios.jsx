import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ModalAgregarUsuario from "../components/ModalAgregarUsuario";

export const BASE_URL = import.meta.env.VITE_API_URL;

const ListarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [FiltroUsuario, setFiltroUsuario] = useState("");

  const navigate = useNavigate();

  const ObtenerUsuarios = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/obtenerUsuarios`);
      setUsuarios(response.data);
      setError("");
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      setError("Error al obtener usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    ObtenerUsuarios();
  }, []);

  const UsuariosFiltrados = usuarios.filter((usuario) =>
    usuario.username.toLowerCase().includes(FiltroUsuario.toLowerCase())
  );

  const handleEditar = (idUsuario) => {
    navigate(`/usuario-editar/${idUsuario}`);
  };

  const handleCambiarEstado = async (idUsuario, estado) => {
    const accion = estado === 1 ? "activar" : "desactivar";
    const textoConfirmacion =
      estado === 1
        ? "Esta acción activará al usuario."
        : "Esta acción desactivará al usuario.";

    const confirmacion = await Swal.fire({
      title: "¿Estás seguro?",
      text: textoConfirmacion,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Sí, ${accion}`,
      cancelButtonText: "Cancelar",
    });

    if (confirmacion.isConfirmed) {
      try {
        await axios.put(`${BASE_URL}/admin/cambiar-estado-usuario`, {
          idUsuario,
          isLocked: estado,
        });
        Swal.fire(
          `${accion.charAt(0).toUpperCase() + accion.slice(1)}`,
          `El estado ha sido actualizado correctamente`,
          "success"
        );
        ObtenerUsuarios(); // Refrescar
      } catch (error) {
        console.error(`Error al cambiar estado del usuario:`, error);
        Swal.fire("Error", `No se pudo cambiar estado del usuario`, "error");
      }
    }
  };

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  return (
    <div className="p-6 m-5">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre de usuario"
          value={FiltroUsuario}
          onChange={(e) => setFiltroUsuario(e.target.value)}
          className="border p-2 rounded me-3 form-control-sm"
        />
        <ModalAgregarUsuario />
      </div>

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Nombre Usuario</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Estado</th>
            <th className="py-2 px-4 border">Último cambio de contraseña</th>
            <th className="py-2 px-4 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {UsuariosFiltrados.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center text-muted py-3">
                {FiltroUsuario
                  ? "No se encontraron usuarios con ese nombre."
                  : "No hay usuarios registrados."}
              </td>
            </tr>
          ) : (
            UsuariosFiltrados.map((usuario) => (
              <tr key={usuario.idUsuario}>
                <td className="py-2 px-4 border">{usuario.username}</td>
                <td className="py-2 px-4 border">{usuario.email}</td>
                <td className="py-2 px-4 border">{usuario.isLocked ? "Bloqueado" : "Activo"}</td>
                <td className="py-2 px-4 border">{usuario.lastPasswordChange ? new Date(usuario.lastPasswordChange).toLocaleDateString() : 'Ninguno'}</td>
                <td className="py-2 px-4 border">
                  <button
                    className="btn btn-sm btn-secondary text-white me-2"
                    onClick={() => handleEditar(usuario.idUsuario)}
                  >
                    Editar
                  </button>
                  {usuario.isLocked ? (
                    <button
                      className="btn btn-sm btn-success text-white"
                      onClick={() => handleCambiarEstado(usuario.idUsuario, 0)}
                    >
                      Activar
                    </button>
                  ) : (
                    <button
                      className="btn btn-sm btn-danger text-white"
                      onClick={() => handleCambiarEstado(usuario.idUsuario, 1)}
                    >
                      Desactivar
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListarUsuarios;
