import React from "react";
import ListarEditUsuarios from "../components/ListarEditUsuarios";
import "../styles/agregar.css";

const ListarEditUsuariosPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Vehiculos Registrados</h1>
      <ListarEditUsuarios />
    </div>
  );
};

export default ListarEditUsuariosPage;