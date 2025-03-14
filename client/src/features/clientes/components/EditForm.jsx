import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditarCliente = () => {
  const { cedula } = useParams(); // Obtener el idCliente de la URL
  const navigate = useNavigate();
  const [cliente, setCliente] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    correo: "",
    telefono: "",
  });

  // Obtener los datos del cliente al cargar el componente
  useEffect(() => {
    const obtenerCliente = async () => {
      try {
        //implementar obtener un cliente por id /ocupo primero cargar los datos
        const response = await axios.get(`http://localhost:3000/clientes/cliente?cedula=${cedula}`);
        setCliente(response.data);
      } catch (error) {
        console.error("Error al obtener el cliente:", error);
        alert("Error al obtener los datos del cliente");
      }
    };
    obtenerCliente();
  }, [cedula]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/clientes/editar/cliente?cedula=${cedula}`, cliente);//!!
      alert("Cliente actualizado exitosamente");
      navigate("/clientes/listar-edit"); // Redirigir a la lista de clientes (edición)
    } catch (error) {
      console.error("Error al actualizar el cliente:", error);
      alert("Error al actualizar el cliente");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Editar Cliente</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={cliente.nombre}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block">Apellido:</label>
          <input
            type="text"
            name="apellido"
            value={cliente.apellido}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block">Cédula:</label>
          <input
            type="text"
            name="cedula"
            value={cliente.cedula}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block">Correo:</label>
          <input
            type="email"
            name="correo"
            value={cliente.correo}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block">Teléfono:</label>
          <input
            type="text"
            name="telefono"
            value={cliente.telefono}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditarCliente;