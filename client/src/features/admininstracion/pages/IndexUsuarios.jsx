import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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

  const handleDesactivar = async (idUsuario) => {
    const confirmacion = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción desactivará al usuario.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, desactivar",
      cancelButtonText: "Cancelar",
    });

    if (confirmacion.isConfirmed) {
      try {
        await axios.post(`${BASE_URL}/admin/desactivarUsuario`, { idUsuario });
        Swal.fire("Desactivado", "El usuario ha sido desactivado correctamente", "success");
        ObtenerUsuarios(); // Refrescar lista
      } catch (error) {
        console.error("Error al desactivar usuario:", error);
        Swal.fire("Error", "No se pudo desactivar el usuario", "error");
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
          className="border p-2 rounded"
        />
        <Link to="/usuario-agregar" className="btn btn-sm btn-secondary text-white ms-3">
          Agregar Usuario
        </Link>
      </div>

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Nombre Usuario</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {UsuariosFiltrados.map((usuario) => (
            <tr key={usuario.idUsuario}>
              <td className="py-2 px-4 border">{usuario.username}</td>
              <td className="py-2 px-4 border">{usuario.email}</td>
              <td className="py-2 px-4 border">
                <button
                  className="btn btn-sm btn-secondary text-white me-2"
                  onClick={() => handleEditar(usuario.idUsuario)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger text-white"
                  onClick={() => handleDesactivar(usuario.idUsuario)}
                >
                  Desactivar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {UsuariosFiltrados.length === 0 && FiltroUsuario && (
        <p className="text-red-500 mt-4">No se encontraron usuarios con ese nombre.</p>
      )}
    </div>
  );
};

export default ListarUsuarios;
