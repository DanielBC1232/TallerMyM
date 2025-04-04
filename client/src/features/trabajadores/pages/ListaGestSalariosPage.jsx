import React from "react";
import "../styles/agregar.css";
import ListaGestSalarios from "../components/ListaGestSalarios";

const ListarEditVehiculosPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Salarios Registrados</h1>
      <ListaGestSalarios />
    </div>
  );
};

export default ListarEditVehiculosPage;