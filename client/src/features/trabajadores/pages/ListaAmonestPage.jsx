//Agregar solcitud de vacaciones
import React from "react";
import ListaAmonestaciones from "../components/ListaAmonestaciones.jsx";//
import "../styles/agregar.css";

const ListaAmonestacionesTrabajadores = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de amonestaciones Creadas</h1>
      <ListaAmonestaciones />
    </div>
  );
};

export default ListaAmonestacionesTrabajadores;
