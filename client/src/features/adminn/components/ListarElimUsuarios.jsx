import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Para redirigir a la página de edición

const ListarElimUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]); // Todos los vehículos
    const [loading, setLoading] = useState(true); // Estado para manejar la carga
    const [error, setError] = useState(""); // Estado para manejar errores
    const [FiltroUsuario, setFiltroUsuario] = useState(""); // Estado para el filtro de placa
   const navigate = useNavigate(); // Hook para redirigir

   // Función para obtener todos los vehículos
   const ObtenerUsuarios = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/obtenerUsuarios");
      setUsuarios(response.data); // Guardar los vehículos en el estado
      setError(""); // Limpiar el mensaje de error
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      setError("Error al obtener usuarios"); // Mostrar mensaje de error
    } finally {
      setLoading(false); // Finalizar la carga
    }
  };

  // Obtener vehículos al cargar el componente
  useEffect(() => {
    ObtenerUsuarios();
  }, []);


  // Filtrar vehículos por placa
  const UsuariosFiltrados = usuarios.filter((usuario) =>
    usuario.username.toLowerCase().includes(FiltroUsuario.toLowerCase())
  );

  // Función para redirigir a la página de edición
  const handleEditar = (idUsuario) => {
    navigate(`/admin/eliminar/${idUsuario}`); //********** */
  };

  if (loading) {
    return <p>Cargando Usuarios...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Usuarios</h1>
      
        {/* Campo de búsqueda por placa */}
        <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por Nombre de usuario"
          value={FiltroUsuario}
          onChange={(e) => setFiltroUsuario(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {/* Tabla de clientes */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
          <th className="py-2 px-4 border">Nombre Usuario</th>
            <th className="py-2 px-4 border">email</th>
            <th className="py-2 px-4 border">password</th>
            <th className="py-2 px-4 border">IdRol</th>
          </tr>
        </thead>
        <tbody>
        {UsuariosFiltrados.map((usuario) => (
            <tr key={usuario.idUsuario}>
              <td className="py-2 px-4 border">{usuario.username}</td>
              <td className="py-2 px-4 border">{usuario.email}</td>
              <td className="py-2 px-4 border">{usuario.password}</td>
              <td className="py-2 px-4 border">{usuario.idRol}</td>

              <td className="py-2 px-4 border">
                {/* Botón de editar */}
                <button
                  onClick={() => handleEditar(usuario.idUsuario)}
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Eliminar
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
       {/* Mensaje si no hay coincidencias */}
       {UsuariosFiltrados.length === 0 && FiltroUsuario && (
        <p className="text-red-500 mt-4">No se encontraron vehículos con esa placa.</p>
      )}
    </div>
  );
};

export default ListarElimUsuarios;