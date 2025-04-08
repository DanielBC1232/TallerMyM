import React, { useState, useEffect } from "react";
import ListaTrabajadores from "../components/ListaTrabajadores";
import axios from "axios";
import { Button, Grid, Row, Col, FlexboxGrid, Divider } from "rsuite";
import { Link, useNavigate } from "react-router-dom";
import "../styles/gtr.css";

export const BASE_URL = import.meta.env.VITE_API_URL;

const IndexTrabajadores = () => {
  const navigate = useNavigate();

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

        <div className="row mx-1">
          <Row gutter={10}>
            <Col xs={11}>
              <Button className="btn btn-sm btn-secondary text-white" style={{ minWidth: "50px", width: "155px" ,margin:"10px"}}>
                <Link to="/trabajadores-agregar" className="btn-link">Agregar Trabajador</Link>
              </Button>
            </Col>
            
            <Col xs={2}>
              <Divider vertical />
            </Col>
            
            <Col xs={11}>
              <Button className="btn btn-sm btn-secondary text-white" style={{ minWidth: "50px", width: "155px",margin:"10px" }}>
                <Link to="#" className="btn-link">Filtrar</Link>
              </Button>
            </Col>

            <Col xs={11}>
              <Button className="btn btn-sm btn-secondary text-white" style={{ minWidth: "50px", width: "155px",margin:"10px" }}>
                <Link to="/AgregarSolicitud-Vacaciones" className="btn-link">Solicitar Vacaciones</Link>
              </Button>
            </Col>

            <Col xs={2}>
              <Divider vertical />
            </Col>
          
            <Col xs={11}>
              <Button className="btn btn-sm btn-secondary text-white" style={{ minWidth: "50px", width: "155px",margin:"10px" }}>
                <Link to="/GestionarSolicitud-Vacaciones" className="btn-link">Aprobar Vacaciones</Link>
              </Button>
            </Col>

            <Col xs={11}>
              <Button className="btn btn-sm btn-secondary text-white" style={{ minWidth: "50px", width: "155px",margin:"10px" }}>
                <Link to="/Gestionar-Salarios" className="btn-link">Gestionar Salarios</Link>
              </Button>
            </Col>

            <Col xs={2}>
              <Divider vertical />
            </Col>

            <Col xs={11}>
              <Button className="btn btn-sm btn-secondary text-white" style={{ minWidth: "50px", width: "155px",margin:"10px" }}>
                <Link to="/Gestionar-Amonest-Trab-List" className="btn-link">Generar Amonestacion</Link>
              </Button>
            </Col>

            <Col xs={11}>
              <Button className="btn btn-sm btn-secondary text-white" style={{ minWidth: "50px", width: "155px",margin:"10px" }}>
                <Link to="/Gestionar-Ausencias-Trab-List" className="btn-link">Registrar Ausencia</Link>
              </Button>
            </Col>
            <Col xs={2}>
              <Divider vertical />
            </Col>
            
            <Col xs={11}>
              <Button className="btn btn-sm btn-secondary text-white" style={{ minWidth: "50px", width: "155px",margin:"10px" }}>
                <Link to="/List-Ausencias-Justificaciones" className="btn-link">Justificar Ausencia</Link>
              </Button>
            </Col>

          </Row>
        </div>
      </nav>

      <div className="main rounded-3">
        <div className="article-scroll">
          <h2>Lista Trabajadores Activos</h2>
          <ListaTrabajadores />
        </div>
      </div>
    </div>
  );
};

export default IndexTrabajadores;
