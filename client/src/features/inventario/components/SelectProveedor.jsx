import React, { useState, useEffect } from "react";

//constante de opciones
const SelectProveedor = ({ value, onChange }) => {
  const [opciones, setOpciones] = useState([]);

  useEffect(() => {
    const obtenerProveedors = async () => {
      try {
        const respuesta = await fetch("http://localhost:3000/proveedor", {
          headers: { "Content-Type": "application/json" },
        });
        const datos = await respuesta.json();
        console.log(datos);
        setOpciones(datos);
      } catch (error) {
        console.error("Error obteniendo las Proveedors:", error);
      }
    };

    obtenerProveedors();
  }, []);

  return (
    <div className="">
      <select name="Proveedor" className="form-select" value={value} onChange={onChange}>
        <option value="">Seleccione...</option>
        {opciones.map((Proveedor) => (
          <option key={Proveedor.idProveedor} value={Proveedor.nombreProveedor}>
            {Proveedor.nombreProveedor}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectProveedor;
