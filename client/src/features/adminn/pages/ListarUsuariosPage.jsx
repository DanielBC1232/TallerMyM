import React from "react";
import ListarUsuarios from "../components/ListarUsuarios";
import "../styles/agregar.css";

const ListarUsuariosPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Clientes Registrados</h1>
      <ListarUsuarios />
    </div>
  );
};

export default ListarUsuariosPage;