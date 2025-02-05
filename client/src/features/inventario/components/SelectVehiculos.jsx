import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";


const SelectVehiculos = ({ value, onChange }) => {
  const [opciones, setOpciones] = useState([]);

  useEffect(() => {
    const obtenerVehiculos = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/vehiculos-compatibles");
        const opcionesFormateadas = data.map((vehiculo) => ({
          value: vehiculo.modelo,
          label: vehiculo.modelo,
        }));
        setOpciones(opcionesFormateadas);
      } catch (error) {
        console.error("Error obteniendo los vehículos:", error);
      }
    };
  
    obtenerVehiculos();
  }, []);  

  const handleChange = (selectedOptions) => {
    // Si no se selecciona nada, pasamos un arreglo vacío
    onChange({
      target: {
        name: "vehiculosCompatibles", // El nombre del campo que se actualiza
        value: selectedOptions ? selectedOptions.map(option => option.value) : [], // Solo guardamos el modelo
      },
    });
  };

  return (
    <div>
      <Select
        id="vehiculosCompatibles"
        isMulti
        options={opciones}
        value={opciones.filter((opcion) => value.includes(opcion.value))} // Filtramos las opciones seleccionadas
        onChange={handleChange}
        placeholder="Seleccione..."
        noOptionsMessage={() => "No hay vehículos disponibles"}
      />
    </div>
  );
};

export default SelectVehiculos;
