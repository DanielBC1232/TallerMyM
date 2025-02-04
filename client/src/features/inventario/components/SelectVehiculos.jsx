import React, { useState, useEffect } from "react";
import Select from "react-select";

const SelectVehiculos = ({ value, onChange }) => {
  const [opciones, setOpciones] = useState([]);

  useEffect(() => {
    const obtenerVehiculos = async () => {
      try {
        const respuesta = await fetch("http://localhost:3000/vehiculos-compatibles", {
          headers: { "Content-Type": "application/json" },
        });
        const datos = await respuesta.json();
        const opcionesFormateadas = datos.map((vehiculo) => ({
          value: vehiculo.modelo,  // Guardamos el modelo como el valor
          label: vehiculo.modelo,  // Mostramos el modelo en la opción
        }));
        setOpciones(opcionesFormateadas);
      } catch (error) {
        console.error("Error obteniendo los vehiculos:", error);
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
