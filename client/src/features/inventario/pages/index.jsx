import React from "react";
import "../../../../node_modules/bootstrap/dist/js/bootstrap";
import Articulo from "../components/Articulo";
import SelectCategoria from "../components/SelectCategoria";
import SelectStock from "../components/SelectStock";
import SelectMarca from "../components/SelectMarca";
import FiltroNombre from "../components/FiltroNombre";
import VehiculosCompatibles from "../components/VehiculosCompatibles";
import RangoPrecio from "../components/RangoPrecio";

import "../styles/inv.css";

const IndexInventario = () => {
  return (
    <div className="grid-container">
      <nav className="sidebar p-4 rounded-3">
        <FiltroNombre />

        <div className="my-4 d-flex gap-3 column-gap-5">
          <div className="col row">
            <SelectCategoria />
            <SelectMarca />
          </div>
          <div className="col row">
            <SelectStock />
            <VehiculosCompatibles />
          </div>
        </div>
        <div className="col row mb-4">
          <RangoPrecio />
        </div>

        <div className="d-flex flex-column gap-4 mb-4">
          <button className="btn btn-sm btn-primary px-5 text-white">
            Buscar
          </button>
        </div>

        <div className="row mx-1">
          <hr />
          <button className="btn btn-sm btn-primary px-5 text-white">
            Agregar Repuesto/Servicio
          </button>
        </div>
      </nav>
      <div className="main rounded-3 p-3">
        <div className="article-container article-scroll">
          <Articulo />
          <Articulo />
          <Articulo />
          <Articulo />
          <Articulo />
          <Articulo />
          <Articulo />
          <Articulo />
          <Articulo />
          <Articulo />
          <Articulo />
          <Articulo />
          <Articulo />
          <Articulo />
          <Articulo />
          <Articulo />
          <Articulo />
          <Articulo />
          <Articulo />
          <Articulo />
          <Articulo />
        </div>
      </div>
    </div>
  );
};

export default IndexInventario;
