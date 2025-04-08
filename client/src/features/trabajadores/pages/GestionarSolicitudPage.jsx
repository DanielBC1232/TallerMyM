//Agregar solcitud de vacaciones
import React from "react";
import GestionVacaciones from "../components/ListarGestVacaciones";//
import "../styles/agregar.css";

const GestionarSolicitudVacaciones = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Agregar Cliente</h1>
      <GestionVacaciones />
    </div>
  );
};

export default GestionarSolicitudVacaciones;
