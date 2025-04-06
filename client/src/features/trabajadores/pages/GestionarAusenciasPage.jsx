//Agregar solcitud de vacaciones
import React from "react";
import ListaGestAusencias from "../components/ListaGestAusencias.jsx";//
import "../styles/agregar.css";

const GestionarAusencias = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Ausencias </h1>
      
      <ListaGestAusencias />
    </div>
  );
};

export default GestionarAusencias;
