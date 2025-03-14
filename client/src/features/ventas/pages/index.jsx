import React, { useState, useEffect } from "react";
import { Button, Grid, Row, Col, FlexboxGrid, Divider } from "rsuite";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  data,
} from "react-router-dom";
import axios from "axios";

import ListaCotizaciones from "../components/ListaCotizaciones";

const Index = () => {
  return (
    <div className="grid-container">
      <nav
        className="sidebar p-4 rounded-3 shadow-sm"
        style={{ maxWidth: "550px" }}
      >
        <form>
          <br />
          <div className="row my-2 d-flex justify-content-center">
            <Grid fluid>
              <FlexboxGrid justify="center">
                <Row className="show-grid">
                  <Col xs={12}>
                    <input type="text" className="form-control form-control-sm" />
                  </Col>
                  <Col xs={12}>
                    <input type="text" className="form-control form-control-sm" />
                  </Col>
                </Row>
              </FlexboxGrid>
              <br />
              <FlexboxGrid justify="center">
                <Row className="show-grid">
                  <Col xs={12}>
                    <input type="text" className="form-control form-control-sm" />

                  </Col>
                  <Col xs={12}>
                    <input type="text" className="form-control form-control-sm" />

                  </Col>
                </Row>
              </FlexboxGrid>
            </Grid>
          </div>
          <br />
          <div className="row mx-1">
            <div>
              <Row gutter={10}>
                <Col xs={11}>
                  <Button
                    type="button"
                    className="btn btn-sm btn-secondary text-white"
                    style={{ minWidth: "50px", width: "130px" }}>
                    Registrar Venta
                  </Button>
                </Col>
                <Col xs={2}>
                  <Divider vertical />
                </Col>
                <Col xs={11}>
                  <Button
                    type="button"
                    className="btn btn-sm btn-secondary text-white"
                    style={{ minWidth: "50px", width: "135px" }}>
                    <Link to="/cotizacion" className="btn-link">Cotizacion</Link>
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </form>
      </nav>

      <div className="main rounded-3">
        <div className="article-scroll">
          {/* consultar historial de ventas (filtros)  */}

          
        </div>
      </div>
    </div>
  );
};
export default Index;
