//Agregar solcitud de vacaciones
import React from "react";
import ListaGestAmonestaciones from "../components/ListaGestAmonest.jsx";//
import "../styles/agregar.css";

const GestionarAmonestaciones = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Listado Trabajadores Amonestacion</h1>
      <ListaGestAmonestaciones />
    </div>
  );
};

export default GestionarAmonestaciones;
