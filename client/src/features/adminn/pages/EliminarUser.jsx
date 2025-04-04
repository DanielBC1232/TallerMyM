import React from "react";
import ElimForm from "../components/ElimForm";
import "../styles/agregar.css";

const EliminarUsuario = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Agregar Cliente</h1>
      <ElimForm />
    </div>
  );
};

export default EliminarUsuario;
