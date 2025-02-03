import React, { useState } from "react";
import SelectCategoria from "../components/SelectCategoria";
import SelectMarca from "../components/SelectMarca";
import SelectProveedor from "../components/SelectProveedor";
import SubirImagen from "../components/SubirImagen";
import SelectVehiculos from "../components/SelectVehiculos";
import { Grid, Row, Col } from "rsuite";
import "../styles/inv.css";

const Agregar = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    marca: "",
    descripcion: "",
    precio: 0,
    stock: 0,
    fechaIngreso: "",
    ubicacion: "",
    proveedor: "",
    categoria: "",
    vehiculosCompatibles: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container main mx-auto p-5">
        <Grid fluid>
          <Row className="show-grid" gutter={16}>
            <Col xs={6}>
              <SubirImagen />
            </Col>
            <Col
              xs={16}
              className="d-grid gap-5 bg-white shadow-sm p-5 rounded-3"
            >
              <Row className="show-grid" gutter={16}>
                <Col xs={12} className="column">
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">
                      Nombre:
                    </label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      className="form-control"
                      value={formData.nombre}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="marca" className="form-label">
                      Marca:
                    </label>
                    <SelectMarca
                      value={formData.marca}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="vehiculos" className="form-label">
                      Vehículos compatibles:
                    </label>
                    <SelectVehiculos
                      value={formData.vehiculosCompatibles}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="categoria" className="form-label">
                      Categoría:
                    </label>
                    <SelectCategoria value={formData.categoria}
                      onChange={handleChange}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="proveedor" className="form-label">
                      Proveedor:
                    </label>
                    <SelectProveedor value={formData.proveedor}
                      onChange={handleChange}/>
                  </div>
                </Col>
                <Col xs={12} className="column">
                  <div className="mb-3">
                    <label htmlFor="precio" className="form-label">
                      Precio:
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">₡</span>
                      <input
                        id="precio"
                        name="precio"
                        type="number"
                        min={0}
                        step={100}
                        className="form-control"
                        value={formData.precio}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="fechaIngreso" className="form-label">
                      Fecha de ingreso:
                    </label>
                    <input
                      id="fechaIngreso"
                      name="fechaIngreso"
                      type="date"
                      className="form-control"
                      value={formData.fechaIngreso}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="ubicacion" className="form-label">
                      Ubicación en almacén:
                    </label>
                    <input
                      id="ubicacion"
                      name="ubicacion"
                      type="text"
                      className="form-control"
                      value={formData.ubicacion}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="stock" className="form-label">
                      Stock:
                    </label>
                    <input
                      id="stock"
                      name="stock"
                      type="number"
                      min={0}
                      className="form-control"
                      value={formData.stock}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">
                      Descripción:
                    </label>
                    <textarea
                      id="descripcion"
                      name="descripcion"
                      className="form-control"
                      value={formData.descripcion}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="d-grid justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ maxWidth: "120px" }}
                    >
                      Agregar
                    </button>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    </form>
  );
};

export default Agregar;
