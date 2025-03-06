import { Button, Grid, Row, Col } from "rsuite";
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
import SelectClientes from "../../clientes/components/SelectClientes";

const Cotizar = () => {
  return (
    <div className="container bg-white mt-5 p-5">
      <Grid>

        <form>
          <Row className="show-grid" gutter={16}>
            <Col xs={12} className="column">
              <label><label>Monto Total:</label>
                <input className="form-control " type="number" min="0" style={{ minWidth: "250px" }} />
              </label>

              <label><label>Monto Mano de Obra:</label>
                <input className="form-control" type="number" min="0" style={{ minWidth: "250px" }} />
              </label>
            </Col>

            <Col xs={12} className="column">
              <label><label>Tiempo estimado:</label>
                <input className="form-control" style={{ minWidth: "250px" }} />
              </label>

              <label><label>Cliente:</label>
                <SelectClientes />
              </label>
            </Col>
          </Row>
          <div className="d-flex justify-content-center mt-5">
            <Button type="submit" className="btn btn-secondary text-white" style={{ minWidth: "50px", width: "155px" }}>Generar Cotización</Button>
          </div>

        </form>
      </Grid>
    </div >

  );
}
export default Cotizar;