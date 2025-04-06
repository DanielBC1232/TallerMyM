//Agregar solcitud de vacaciones
import React from "react";
import ListaAusencias from "../components/ListaAusencias.jsx";//
import "../styles/agregar.css";

const ListaAusenciasTrabajadores = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Ausencias Creadas</h1>
      <ListaAusencias />
    </div>
  );
};

export default ListaAusenciasTrabajadores;
