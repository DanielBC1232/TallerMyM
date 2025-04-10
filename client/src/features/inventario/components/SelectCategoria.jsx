import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

//URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

//constante de opciones
const SelectCategoria = ({ value, onChange }) => {
  const [opciones, setOpciones] = useState([]);

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/categorias`, {
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
            console.error("Error obteniendo las categorías:", error);
          }
        } else {
          console.error("Error desconocido", error);
        }
      }
    };

    obtenerCategorias();
  }, []);


  return (
    <div className="">
      <select id="categoria" name="categoria" className="form-select" value={value} onChange={onChange}>
        <option value="">Seleccione...</option>
        {opciones.map((categoria) => (
          <option key={categoria.idCategoria} value={categoria.nombreCategoria}>
            {categoria.nombreCategoria}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCategoria;
