import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";


//URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

const SelectClientes = ({ value, onChange }) => {
  const [opciones, setOpciones] = useState([]);

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/clientes/obtenerclientes`);
        const opcionesFormateadas = data.map((cliente) => ({
          value: cliente.idCliente,
          label: cliente.nombre,
        }));
        setOpciones(opcionesFormateadas);
      } catch (error) {
        console.error("Error obteniendo los clientes:", error);
      }
    };
  
    obtenerClientes();
  }, []);  

  const handleChange = (selectedOptions) => {
    // Si no se selecciona nada, pasamos un arreglo vacío
    onChange({
      target: {
        name: "selectClientes", // El nombre del campo que se actualiza
        value: selectedOptions ? selectedOptions.map(option => option.value) : [], // Solo guardamos el modelo
      },
    });
  };

  return (
    <div>
      <Select
        id="vehiculselectClientes"
        options={opciones}
        value={opciones.filter((opcion) => value.includes(opcion.value))} // Filtramos las opciones seleccionadas
        onChange={handleChange}
        placeholder="Seleccione..."
        noOptionsMessage={() => "No hay clientes disponibles"}
        maxMenuHeight={185}
      />
    </div>
  );
};

export default SelectClientes;