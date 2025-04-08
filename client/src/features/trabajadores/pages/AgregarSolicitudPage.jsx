//Agregar solcitud de vacaciones
import React from "react";
import CreateForm from "../components/CreateSolicitud";//
import "../styles/agregar.css";

const AgregarSolicitudVacaciones = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Agregar Cliente</h1>
      <CreateForm />
    </div>
  );
};

export default AgregarSolicitudVacaciones;
