import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import SpinnerIcon from '@rsuite/icons/Spinner';
import { Link, useNavigate } from 'react-router-dom';

//URL BASE
export const BASE_URL = import.meta.env.VITE_API_URL;

const SelectVehiculos = ({ idCliente, value, onChange }) => {
  const [opciones, setOpciones] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/vehiculos/cliente-vehiculos/${idCliente}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}` // Incluir JWT en el encabezado
          }
        });

        const opcionesFormateadas = data.map(vehiculo => ({
          value: vehiculo.idVehiculo,
          label: `${vehiculo.marcaVehiculo} ${vehiculo.modeloVehiculo} ${vehiculo.annoVehiculo}`,
        }));

        setOpciones(opcionesFormateadas);
      } catch (error) {
        if (error.response) {
          // Manejo de errores HTTP
          if (error.response.status === 401) {
            Swal.fire({
              icon: "warning",
              title: "Advertencia",
              text: "Operación no autorizada",
              showConfirmButton: false,
            });
            navigate(0); // Redirige a la página de login si no está autorizado
          }
          else if (error.response.status === 403) {
            Swal.fire({
              icon: "warning",
              title: "Autenticación",
              text: "Sesión expirada",
              showConfirmButton: false,
            });
            localStorage.clear();
            navigate("/login"); // Redirige a login si la sesión ha expirado
          }
          else {
            console.error("Error al obtener vehículos:", error);
            Swal.fire({
              title: 'Error al obtener vehículos!',
              icon: 'error',
              showConfirmButton: false
            });
          }
        } else {
          // Manejo de errores en caso de problemas de red u otros
          console.error("Error desconocido", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un error desconocido, por favor intente nuevamente",
            showConfirmButton: false,
          });
        }
      }
    };

    fetchVehiculos();
  }, [idCliente]);

  useEffect(() => {
    if (value) {
      const selected = opciones.find(opcion => opcion.value === value) || null;
      setSelectedOption(selected);
    } else {
      setSelectedOption(null);
    }
  }, [value, opciones]);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    if (typeof onChange === "function") {
      onChange({
        target: {
          name: "vehiculoSeleccionado",
          value: selectedOption ? selectedOption.value : "",
        },
      });
    }
  };

  return (
    <Select
      id="vehiculoSeleccionado"
      options={opciones}
      value={selectedOption}
      onChange={handleChange}
      placeholder="Seleccionar Vehículo"
      noOptionsMessage={() => "No hay vehículos disponibles"}
      maxMenuHeight={140}
    />
  );
};

export default SelectVehiculos;
