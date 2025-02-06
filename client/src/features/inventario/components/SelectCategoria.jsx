import React, { useState, useEffect } from "react";

//constante de opciones
const SelectCategoria = ({ value, onChange }) => {
  const [opciones, setOpciones] = useState([]);

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const respuesta = await fetch("http://localhost:3000/categorias", {
          headers: { "Content-Type": "application/json" },
        });
        const datos = await respuesta.json();
        //console.log(datos);
        setOpciones(datos);
      } catch (error) {
        console.error("Error obteniendo las categorias:", error);
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
