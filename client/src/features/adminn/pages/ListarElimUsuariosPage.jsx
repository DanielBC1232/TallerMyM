import React from "react";
import ListarElimUsuarios from "../components/ListarElimUsuarios";
import "../styles/agregar.css";

const ListarElimUsuariosPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Vehiculos Registrados</h1>
      <ListarElimUsuarios />
    </div>
  );
};

export default ListarElimUsuariosPage;