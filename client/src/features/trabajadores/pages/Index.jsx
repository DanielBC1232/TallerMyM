import React, { useState, useEffect } from "react";
import ListaTrabajadores from "../components/ListaTrabajadores";
import axios from "axios";
import { Button, Grid, Row, Col, FlexboxGrid, Divider } from "rsuite";
import { Link, useNavigate } from "react-router-dom";
import "../styles/gtr.css";

export const BASE_URL = import.meta.env.VITE_API_URL;

const IndexTrabajadores = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    cedula: "",
    salarioMin: 0,
    salarioMax: 0,
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name.includes("salario") ? Number(value) : value,
    });
  };

  const [trigger, setTrigger] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setTrigger(prev => !prev);
  };

  return (
    <div className="grid-container">
      <nav className="sidebar p-4 rounded-3 shadow-sm" style={{ maxWidth: "550px" }}>
        <form onSubmit={handleSubmit}>
          <br />
          <Grid fluid>
            <FlexboxGrid justify="center">
              <Row className="show-grid">
                <Col xs={12}>
                  <span>Nombre:</span>
                  <input
                    name="nombreCompleto"
                    className="form-control"
                    placeholder="Buscar por nombre"
                    value={formData.nombreCompleto}
                    onChange={handleChange}
                  />
                </Col>
                <Col xs={12}>
                  <span>Cédula:</span>
                  <input
                    name="cedula"
                    className="form-control"
                    placeholder="Buscar por cédula"
                    value={formData.cedula}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
            </FlexboxGrid>
            <br />
            <FlexboxGrid justify="center">
              <Row className="show-grid">
                <Col xs={12}>
                  <span>Salario Mínimo:</span>
                  <input
                    type="number"
                    name="salarioMin"
                    className="form-control"
                    value={formData.salarioMin}
                    onChange={handleChange}
                  />
                </Col>
                <Col xs={12}>
                  <span>Salario Máximo:</span>
                  <input
                    type="number"
                    name="salarioMax"
                    className="form-control"
                    value={formData.salarioMax}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
            </FlexboxGrid>
          </Grid>
          <br />
          <div className="row mx-1">
            <Divider />
            <Row gutter={10}>
              <Col xs={11}>
                <Button className="btn btn-sm btn-secondary text-white" style={{ minWidth: "50px", width: "140px" }}>
                  <Link to="/trabajadores-agregar" className="btn-link">Agregar Trabajador</Link>
                </Button>
              </Col>
              <Col xs={2}>
                <Divider vertical />
              </Col>
              <Col xs={11}>
              <button 
              type="submit"
              className="btn btn-sm btn-secondary text-white" style={{ minWidth: "50px", width: "130px" }}>
                  Filtrar
                </button>
              </Col>
            </Row>
          </div>
        </form>
      </nav>
      <div className="main rounded-3">
        <div className="article-scroll">
          <ListaTrabajadores formData={formData} trigger={trigger}/>
        </div>
      </div>
    </div>
  );
};

export default IndexTrabajadores;
