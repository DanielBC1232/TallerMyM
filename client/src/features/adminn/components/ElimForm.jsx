import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ElimForm = () => {
  const { idUsuario } = useParams();
  // Obtener el idCliente de la URL
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    username: "",
    email: "",
    password: "",
    idRol: "",
  });

  // Obtener los datos del cliente al cargar el componente------------------**********
  useEffect(() => {
    const obtenerUsuarionn = async () => {
      try {
        //implementar obtener un cliente por id /ocupo primero cargar los datos
        const response = await axios.get(`http://localhost:3000/admin/obtenerUsuarioEdit/${idUsuario}`);
        console.log("Datos obtenidos:", response.data);

        setUsuario(response.data);
      } catch (error) {
        console.error("Error al obtener el cliente:", error);
        alert("Error al obtener los datos del cliente");
      }
    };
    obtenerUsuarionn();
  }, [idUsuario]);

/*
  useEffect(() => {
    console.log("Estado usuario actualizado:", usuario);
  }, [usuario]);
*/

  // Manejar cambios en los campos del formulario   POSIBLE CULPABLE -------------^^^^
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Datos a enviar", usuario);
      await axios.delete(`http://localhost:3000/admin/eliminar/${idUsuario}` ); //!!
      alert("Vehiculo actualizado exitosamente");
      navigate("/admin/listarElimUsuarios"); // Redirigir a la lista de vehiculos (edición)
    } catch (error) {
      console.error("Error al Eliminaaar el vehiculo:", error);
      alert("Error al Eliminaaar el vehiculo");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Editar Usuario</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Nombre del usuario</label>
          <input
            type="text"
            name="username"
            value={usuario.username}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div>
          <label className="block">Email:</label>
          <input
            type="text"
            name="email"
            value={usuario.email}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div>
          <label className="block">Contraseña Actual:</label>
          <input
            type="text"
            name="password"
            value={usuario.password}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block">Rol Asignado:</label>
          <input
            type="number"
            name="idRol"
            value={usuario.idRol}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <button
          type="button" // Importante: type="button" para que no active el submit
          onClick={() => {
            console.log("Datos actuales del formulario:", usuario);
            alert(JSON.stringify(usuario, null, 2));
          }}
          className="bg-gray-500 text-white p-2 rounded mr-2"
        >
          Ver Datos
        </button>

        

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Eliminar
        </button>
      </form>
    </div>
  );
};

export default ElimForm;
