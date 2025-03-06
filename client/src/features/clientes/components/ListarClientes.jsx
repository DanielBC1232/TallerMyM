import React, { useEffect, useState } from "react";
import axios from "axios";

const ListarClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //QUEDAMOS AQUUUUII
  // Función para obtener todos los clientes
  const obtenerClientes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/clientes/obtenerclientes");
      setClientes(response.data);
      setError("");
    } catch (error) {
      console.error("Error al obtener clientes:", error);
      setError("Error al obtener clientes");
    } finally {
      setLoading(false);
    }
  };

  // Obtener clientes al cargar el componente
  useEffect(() => {
    obtenerClientes();
  }, []);

  if (loading) {
    return <p>Cargando clientes...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Clientes</h1>

      {/* Tabla de clientes */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Nombre</th>
            <th className="py-2 px-4 border">Apellido</th>
            <th className="py-2 px-4 border">Cédula</th>
            <th className="py-2 px-4 border">Correo</th>
            <th className="py-2 px-4 border">Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.idCliente}>
              <td className="py-2 px-4 border">{cliente.nombre}</td>
              <td className="py-2 px-4 border">{cliente.apellido}</td>
              <td className="py-2 px-4 border">{cliente.cedula}</td>
              <td className="py-2 px-4 border">{cliente.correo}</td>
              <td className="py-2 px-4 border">{cliente.telefono}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarClientes;