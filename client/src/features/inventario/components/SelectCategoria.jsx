import React, { useState, useEffect } from "react";
import axios from "axios";

//constante de opciones
const SelectCategoria = ({ value, onChange }) => {
  const [opciones, setOpciones] = useState([]);

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/categorias");
        setOpciones(data);
      } catch (error) {
        console.error("Error obteniendo las categorías:", error);
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
