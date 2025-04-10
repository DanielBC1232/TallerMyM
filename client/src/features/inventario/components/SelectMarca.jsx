import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

//URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

//constante de opciones
const SelectMarca = ({ value, onChange }) => {
  const navigate = useNavigate();

  const [opciones, setOpciones] = useState([]);

  useEffect(() => {
    const obtenerMarcas = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/marcas/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Agregar el token JWT en el header
          }
        });
        setOpciones(data);
      } catch (error) {
        if (error.response) {
          // Manejo de respuestas HTTP
          if (error.response.status === 401) {
            Swal.fire({
              icon: "warning",
              title: "Advertencia",
              text: "Operacion no Autorizada",
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
          } else {
            console.error("Error obteniendo las Marcas:", error);
          }
        } else {
          console.error("Error desconocido", error);
        }
      }
    };
  
    obtenerMarcas();
  }, []);
  

  return (
    <div className="">
      <select id="marca" name="marca" className="form-select" value={value} onChange={onChange}>
        <option value="">Seleccione...</option>
        {opciones.map((Marca) => (
          <option key={Marca.idMarca} value={Marca.nombreMarca}>
            {Marca.nombreMarca}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectMarca;
