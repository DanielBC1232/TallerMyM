import React, { useState } from "react";
import ContenedorProductos from "../components/contenedorArticulo";

import SelectCategoria from "../components/SelectCategoria";
import SelectVehiculos from "../components/SelectVehiculos";
import SelectMarca from "../components/SelectMarca";
import RangoPrecio from "../components/RangoPrecio";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import axios from "axios";

import { Button, Grid, Row, Col, FlexboxGrid, Divider } from "rsuite";

import "../styles/inv.css";

const IndexInventario = () => {
  const navigate = useNavigate(); // Hook para navegar
  const [formData, setFormData] = useState({
    nombre: "",
    marca: "",
    categoria: "",
    vehiculosCompatibles: [],
    precio: 0,
    stock: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "precio" || name === "stock"
          ? Number(value)
          : name === "vehiculosCompatibles"
          ? JSON.stringify(value)
          : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="grid-container">
      <nav
        className="sidebar p-4 rounded-3 shadow-sm"
        style={{ maxWidth: "550px" }}
      >
        <form onSubmit={handleSubmit}>
          <div className="row my-4">
            <RangoPrecio />
          </div>
          <div className="mt-3">
            <input
              name="nombre"
              className="form-control"
              placeholder="Buscar por nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>
          <br />
          <div className="row my-2 d-flex justify-content-center">
            <Grid fluid>
              <FlexboxGrid justify="center">
                <Row className="show-grid">
                  <Col xs={12}>
                    <span>Categoria:</span>
                    <SelectCategoria
                      value={formData.categoria}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col xs={12}>
                    <span>Marca:</span>
                    <SelectMarca
                      value={formData.marca}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
              </FlexboxGrid>
              <br />
              <FlexboxGrid justify="center">
                <Row className="show-grid">
                  <Col xs={12}>
                    <span>Stock:</span>
                    <select
                      className="form-control"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                    >
                      <option value="">Cualquiera</option>
                      <option value="10">Menos de 10</option>
                      <option value="50">Menos de 50</option>
                      <option value="100">Menos de 100</option>
                      <option value="500">Menos de 500</option>
                      <option value="1000">Menos de 1000</option>
                    </select>
                  </Col>
                  <Col xs={12}>
                    <span>Compatible con:</span>
                    <SelectVehiculos
                      value={formData.vehiculosCompatibles}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
              </FlexboxGrid>
            </Grid>
          </div>
          <br />

          <div className="row mx-1">
            <Divider />
            <div className="d-flex flex-column gap-4 my-3">
              <Button
                type="submit"
                className="btn btn-sm btn-primary px-5 text-white"
                style={{ minWidth: "50px", maxWidth: "350px" }}
              >
                Buscar
              </Button>
            </div>
            <Button
              className="btn btn-sm btn-secondary px-5 text-white"
              style={{ minWidth: "50px", maxWidth: "350px" }}
            >
              <Link to="/inventario-agregar" className="btn-link">
                Agregar Repuesto/Servicio
              </Link>
            </Button>
          </div>
        </form>
      </nav>

      <div className="main rounded-3 p-3">
        <div className="article-container article-scroll">
          <ContenedorProductos />
        </div>
      </div>
    </div>
  );
};

export default IndexInventario;
