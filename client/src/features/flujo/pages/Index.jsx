import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  data,
} from "react-router-dom";
import axios from "axios";
import { Grid, Row, Col, Card, VStack, Text } from "rsuite";
import "../styles/flu.css";

import OrdenEnProceso from "../components/OrdenEnProceso";

const IndexFlujo = () => {
  const navigate = useNavigate(); // Hook para navegar

  return (
    <div className="grid-container">
      {/* OPCIONES */}
      <nav
        className="sidebar p-4 rounded-3 shadow-sm p-2"
        style={{ maxWidth: "550px" }}
      >
        <a className="btn btn-secondary btn-sm text-white">Agregar orden</a>
      </nav>

      {/* FLUJO */}
      <div className="main rounded-3">
        <div className="">
          <Grid fluid>
            <Row className="d-flex gap-3">
              {/* COLUMNA EN PROCESO */}
              <Col xs={8} className="flujo-col ">
                <div className="bg-primary rounded-top-4 py-2 mb-4">
                  <h6 className="text-white pt-2">Pendiente</h6>
                </div>
                <div className="px-4">
                  <OrdenEnProceso />
                </div>
              </Col>
              {/* COLUMNA EN PROCESO */}

              <Col xs={8} className="bg-dark">
                En Progreso
              </Col>
              <Col xs={8} className="bg-dark">
                Listo
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default IndexFlujo;
