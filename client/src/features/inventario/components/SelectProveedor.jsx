import React, { useState, useEffect } from "react";
import axios from "axios";

//constante de opciones
const SelectProveedor = ({ value, onChange }) => {
  const [opciones, setOpciones] = useState([]);

  useEffect(() => {
    const obtenerProveedors = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/proveedor");
        setOpciones(data);
      } catch (error) {
        console.error("Error obteniendo las Proveedors:", error);
      }
    };
  
    obtenerProveedors();
  }, []);
  

  return (
    <div className="">
      <select id="proveedor" name="proveedor" className="form-select" value={value} onChange={onChange}>
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
