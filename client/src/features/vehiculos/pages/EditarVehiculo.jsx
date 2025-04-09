import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import SelectClientes from "../../clientes/components/SelectClientes";
import Swal from "sweetalert2";

// URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

const EditarVehiculo = () => {
  const { idVehiculo } = useParams();
  const navigate = useNavigate();

  const [vehiculo, setVehiculo] = useState({
    placaVehiculo: "",
    modeloVehiculo: "",
    marcaVehiculo: "",
    annoVehiculo: "",
    tipoVehiculo: "",
    idCliente: "",
  });

  // Obtener los datos del vehiculo al cargar el componente
  useEffect(() => {
    const obtenerVehiculo = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/vehiculos/ObteneridVehiculo/${idVehiculo}`);
        setVehiculo(response.data);
      } catch (error) {
        console.error("Error al obtener el Vehiculo:", error);
        Swal.fire("Error", "Error al obtener los datos del Vehículo", "error");
      }
    };
    obtenerVehiculo();
  }, [idVehiculo]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehiculo({ ...vehiculo, [name]: value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BASE_URL}/vehiculos/editar/${idVehiculo}`, vehiculo);
      Swal.fire("Éxito", "Vehículo actualizado exitosamente", "success");
      navigate("/vehiculos");
    } catch (error) {
      console.error("Error al actualizar el vehiculo:", error);
      Swal.fire("Error", "Error al actualizar el vehículo", "error");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Editar Vehículo</h1>
      <form onSubmit={handleSubmit} className="space-y-4 ms-5" style={{ maxWidth: "400px" }}>
        <div>
          <label className="block">Placa Vehículo:</label>
          <input
            type="text"
            name="placaVehiculo"
            value={vehiculo.placaVehiculo}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block">Modelo del Vehículo:</label>
          <input
            type="text"
            name="modeloVehiculo"
            value={vehiculo.modeloVehiculo}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block">Marca del Vehículo:</label>
          <input
            type="text"
            name="marcaVehiculo"
            value={vehiculo.marcaVehiculo}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block">Año del Vehículo:</label>
          <input
            type="text"
            name="annoVehiculo"
            value={vehiculo.annoVehiculo}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block">Tipo de Vehículo:</label>
          <input
            type="text"
            name="tipoVehiculo"
            value={vehiculo.tipoVehiculo}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block">Cliente:</label>
          <SelectClientes
            value={vehiculo.idCliente}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditarVehiculo;
